---
layout: post
title:  "Fixed Width Integers in Javascript"
date:   2017-12-06 13:10:45 -0500
categories: blog processable
published: true
permalink: /blog/processable/2/
---

_This post is part of a series about writing an assembly language debugger in javascript, check out part 1 [here!](/blog/processable/1)_

# Types in Assembly and Javascript

At the assembly level, types do not exist as they do in higher level languages.  While there is some hardware distinction between floating point and integral types, conceptually different types like signed and unsigned integers, memory addresses, and character arrays all look the same in memory: lists of bytes.  It's then up to the program to decide how to interpret these values, imposing the concept of type on them when we ask certain questions.  Important questions for control flow, like "is this number greater than that number" don't make sense in the world of bytes until we decide what the bytes mean.  In the level of C, the decision making is abstracted away, and we can imagine that every piece of data we manipulate exists with only one interpretation -- unless we explicitly change what that interpretation is with a cast.

The closest thing to type on the machine level is size: we manipulate values of specific, fixed widths in bytes.  In most cases, instructions in the x86 architecture require the size of the operands to be specified, as slightly different hardwrae may be used for manipulating values of different length.

Somewhat ironically, Javascript lacks explicit types in a totally different way.  Rather than pedantically checking every operation to make sure you haven't used your data in a way other than you promised you would, javascript lets you reassign variables as you please, allows direct comparison between objects of different types, and doesn't distinguish between floating point and integer values.  This last part is especially tricky -- javascript uses a single 64-bit double precision floating point type to hold all numbers, even those returned by a call to `parseInt()`!

So how do we represent fixed-width data in a language that doesn't even give us an integer type?  The javascript `ArrayBuffer` is already a good friend, and lets us store arbitrary data in a byte-addressable array, and read it out as signed or unsigned integers.  This is helpful for storage, and is the basis for our Register and Memory abstractions.  But ArrayBuffers get clunky for passing data around, and there is no easy way to do arithmetic on `ArrayBuffer`s as they exist in the wild.  So we need some intermediate form into which we will read from `ArrayBuffer`s for doing any arithmetic and data movement. 1,2, and 4-byte values all fit inside the javascript `Number` type with full precision, but for values greater than 2^53, the underlying double precision type can no longer represent every integer.  While we still technically have 64-bits, we don't have 64-bit _integers_.

# The 64-bit problem

While tempting, we can't just throw away precision for values between 2^53 and 2^64-1, even though the most common use for 64-bit values in x86-64 is addressing, and the largest virtual address spaces used in practice these days are only 48-bit, we want our system to actually work, not only work as long as you don't try to add really big 64-bit values.  So, we need a new data type.  The first workaround that came to mind was a special 64-bit integer class, simply containing two regular-old javascript numbers:
```javascript
class Int64 {
  constructor(lo, hi) {
    this.lo = lo;
    this.hi = hi;
  }
}
```

No precision problems if we keep lo and hi below 2^32, and because of Javascript's lax type system, we can pass Int64 instances to a function the same as any other `Number`.  If precision matters for some operation, we just handle the `(x instanceof Int64)` case separately, and otherwise can simply extend the DataView prototype to support reading and writing 64-bit integers.

```javascript
DataView.prototype.getUint64 = function(idx, littleEndian=true) {
  let lo, hi;
  if (littleEndian) {
    lo = this.getUint32(idx, littleEndian);
    hi = this.getUint32(idx + 4, littleEndian);
  } else {
    lo = this.getUint32(idx + 4, littleEndian);
    hi = this.getUint32(idx, littleEndian);
  }

  return new Int64(lo, hi);
}

DataView.prototype.setUint64 = ...
```

But after about a day, this becomes terrible.  Having to check whether or not your numbers are numbers or some other type of object is a sure way to get some wild bugs, given how javascript handles arithmetic on non-numbers.  Plus, what happens when we need to do any operation on an Int64?  We're going to need to implement arithmetic for Int64, so it looks like we'd be better off replacing all of the javascript numbers with a new fixed width integer class, (let's call it `FixedInt`) and hide the ugliness of checking our size away in the implementation.  As a bonus, we can use this class to address a whole lot of other pesky fixed-width problems (like overflow detection) too!

# The `FixedInt` Solution

It still seems like using a two-`Number` representation like the Int64 above would work well.  We could try to do some really foul things to interpret the double-precision representation as if it were an integer, none of javascript's built in arithmetic operators would work correctly and the number of wheels we need to reinvent would get out of hand pretty quickly.  Might as well just use two `Number`s and benefit from the operators we can still use, and anything 4 bytes or smaller fits into one `Number`, so nothing changes!

Well that's not entirely true -- we would like the result of adding two fixed width integers of the same size to be a valid fixed width integer of the same size.  So what happens when we add `0xFF + 0x01`? If these are 1-byte values, the sum should be `0x00`, and we would indicate that an overflow has occurred, which is not the case for the addition of two javascript `Number`s.  Similarly, our representation should not care whether the values are interpreted as signed or not; one of the beauties of twos-complement arithmetic is that sums and differences are the same regardless of whether we interpret each operand as signed or unsigned.  Unfortunately `Number` is signed and holds values far larger than the limit of 32-bit integers, so do we represent the one-byte value `0xFF` as `255` or `-1`?

To stay sane, let's propose an invariant: internally all hi and lo values will be nonnegative.  We should still be able to construct a `FixedInt` from a negative number, but it should not stay negative.  So how do we convert -1 to 255?  Now we need to go down the javascript `Number` rabbit hole.  Bitwise operations (`|`,`&`,`^`,`>>`,`<<`,`>>>`) are defined on the `Number` class, but are only valid if the value of that number is a 32-bit integer.  More precisely, each operand to a bitwise operation is first converted internally to 32-bit integer, and the result is cast back to a `Number`.  Further, the results of bitwise operations are interpreted as signed when casting to `Number`, with the exception of the logical right shift `>>>`, which always returns a positive `Number`.  Also notable, all shift operations are taken `mod 2^32`. We can summarize the frustrations that come from this with some examples:

```javascript
$ node
> 0x100000000 >> 1
0
> 0x10000000 << 1
0
> 0xFFFFFFFF
4294967295
> 0xFFFFFFFF >> 0
-1
> -1 >>> 0
4294967295
```

In practice, this just means that we need to do a lot of masking and shifting by zero.  By keeping bitmasks indexed by byte length we can easily convert automatically in the constructor, and making the class immutable gives us a guarantee that our invariant is not violated.  This looks something like
```javascript
const MASK = {
  1: 0xFF,
  2: 0xFFFF,
  4: 0xFFFFFFFF
}
...
// In the FixedInt constructor
lo = (lo | MASK[size]) >>> 0;
```

This one bit fiddle takes care of a lot of our issues for us.  Then, when we actually do arithmetic on two `FixedInt`s, we just do arithmetic on the constituent `Numbers`: `hi` and `lo`, and when we construct a new `FixedInt` to hold the result, our constraints will be enforced.  For 8, 16, and 32-bit `FixedInt`s, we can just do `Number` arithmetic and cast the result.  In the above example, `0xFF + 0x01 = 0x100` and `(0x100 & 0xFF) >>> 0 = 0` as required.

To handle ALU flags like a real processor, we can just write to a couple of static booleans from inside the arithmetic and logical functions.  The carry flag is set if the value being passed to the `FixedInt` constructor is larger than the max for that size.  The zero flag is trivial, and the sign flag is just a test of the highest valid bit for the size.  We can encapsulate the high bit test into an `isNegative()` method, and the overflow flag can be computed by comparing the signs of the operands and the result.  With addition for example, the overflow flag should be set if the operands are the same sign, and the result is different.  We can easily express this as
```javascript
// inside add(x, y)
let result = new FixedInt(size, x + y);
OF = (x.isNegative() == y.isNegative())
  && (x.isNegative() != result.isNegative())
```

There a couple more fun hacky cases, like shifts for 64 bit integers, and recursively implementing multiplication and division, but it all tastes pretty similar to the above.  I'd like to post about the `FixedInt` module by itself to really get into some more details in case anyone would ever want to use it for something, but that will be separate.

In the meantime, here's the API I ended up implementing, separating it into an instantiable, immutable `FixedInt` class, and an ALU class for doing arithmetic and logic, and holding the status flags, but with only static methods.

# The `FixedInt` API
```javascript
class FixedInt {
  // Three different constructor signatures
  FixedInt  constructor(Number, Number, Number);
  FixedInt  constructor(Number, DataView, Number, boolean);
  FixedInt  constructor(Object);
  // Instance methods
  boolean    isNegative(void);
  boolean         isOdd(void);
  boolean isSafeInteger(void);
  boolean    isLessThan(FixedInt);
  boolean        equals(FixedInt);
  FixedInt        clone(void);
  FixedInt       toSize(Number);
  void         toBuffer(DataView, Number, boolean);
  Number        valueOf(void);
  String       toString(Number, boolean);

  // Read-only properties
  Number lo;
  Number hi;
  Number size;
}

class ALU {
  static FixedInt add(FixedInt, FixedInt);
  static FixedInt sub(FixedInt, FixedInt);
  static FixedInt mul(FixedInt, FixedInt);
  static FixedInt div(FixedInt, FixedInt);
  static FixedInt sar(FixedInt, FixedInt);
  static FixedInt shr(FixedInt, FixedInt);
  static FixedInt shl(FixedInt, FixedInt);
  static FixedInt and(FixedInt, FixedInt);
  static FixedInt xor(FixedInt, FixedInt);
  static FixedInt  or(FixedInt, FixedInt);
  static FixedInt not(FixedInt);
  static FixedInt neg(FixedInt);


  // Read-only properties
  static boolean CF;    // Carry
  static boolean OF;    // Overflow
  static boolean ZF;    // Zero
  static boolean SF;    // Sign
}
```
If you want to read more, check it out on [github](https://github.com/rmw2/fixed-int)!

# Aside: Operator Overloading

This is an instance where I would have liked to use operator overloading instead of having to `ALU.add(x,y)`. In python _literally_ everything is an object, and all operators are translated to method calls.  This way you can overload `+` simply by implementing `__add__()`.  With all the crazy monkey patching that javascript allows, (and even encourages,) I was surprised and disappointed to find operator overloading missing.  There does seem to be at least one approach to [fake operator overloading](http://2ality.com/2011/12/fake-operator-overloading.html) by taking advantage of implicit calls to `valueOf()` and `toString()`.  This is definitely something I want to explore a little more, though the author of the linked article doesn't recommend it.  I think you could pull off some pretty cool stuff by letting an object's valueOf push operands on a shared stack, and a setter for a "value" property dispatching to operator methods, using it as a sort of calculator.  The getter for the same property would just return the computed value.  The return value of `valueOf()` would be an integer `x` so that the values of `x ? x` are distinct for all overloaded operators `?`, so the argument to `set value()` would be a distinct integer for each possible operation, and you could do something that looks like operator overloading by saving each result to the static FixedInt "calculator" before using it.  The `get value()` would return a cached result, so we could do something that like
```javascript
// x, y instances of overloaded class OL
OL.value = x + y;
z = OL.value;
```
Unfortunately, this scheme of returning the same integer from valueOf for every object and branching on the result does not allow you to overload all operators, as some values of `x ? x` are identical for different operations, e.g. `x - x == x ^ x == 0 ∀x`


