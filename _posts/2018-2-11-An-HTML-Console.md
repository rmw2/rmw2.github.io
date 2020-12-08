---
layout: post
title:  "Making an HTML Console"
date:   2017-12-06 13:10:45 -0500
categories: blog processable
published: false
permalink: /blog/processable/5/
---

_This post is part of a series about writing an assembly language debugger in javascript, check out part 1 [here!](/blog/processable/1)_

It's very hard to run any useful program without a console.  Even the simplest example program around, the iconic "Hello World," involves a print to the console.  So if we want our debugger to be useful at all, we should have a way of handling print statements.  Even if one is writing in assembly

## How Does Console I/O Work?

## Buffering

Because system calls are expensive, the C standard library will buffer I/O streams in userspace.  The first call to `getchar()` for example will make a call to `read()` for

Similarly, because device and file I/O are also expensive, the kernel maintains its own buffers .

This way, keyboard interrupts can be serviced immediately by stuffing characters in a kernel buffer