---
layout: post
title:  "Virtual Virtual Memory Areas"
date:   2017-11-23 13:10:45 -0500
categories: blog processable
published: false
permalink: /blog/processable/3/
---

_This post is part of a series about writing an assembly language debugger in javascript, check out part 1 [here!](/blog/processable/1)_

## Virtual Address Spaces

One of the most important concepts for

## Virtual Memory on Real Machines

Real machines have address translation baked right into the hardware.  To implement fast address translation, it is assumed that all addresses are virtual addresses, and every memory access is run through the translation circuit in the CPU.  While the CPU also maintains a cache of virtual-to-physical address translations in the Translation Lookaside Buffer (TLB) to save time on frequently accessed virtual addresses, an unknown virtual address starts a chain of lookups starting at a not-so-famous register named `crc3`.  In a standard multi-level page table, the value in `crc3` points to the physical address of the beginning of the current process's _Page Directory_, which is just an array of addresses.  The 64-bit virtual address requested by the process can then be broken into a series of indexes into page directories (9-bits each for a 64-bit address space with 4096byte pages, as there are (4096 = 2^12) / 8 = 2^9 addresses per page directory).  At each level, the addresses is masked and shifted to obtain the index into the page directory, and then the address at the given index into the current page directory points to the beginning of the next page directory or table.  The final page table entry points to the start of the page in physical memory, and the last 12 bits of the virtual address are used as the byte offset into that page.

Since each page table or page directory lives in a single page of physical memory, each page table entry points to the beginning of a page, at an address divisible by the page size.  Continuing with the assumption of 4096 byte pages, this means the bottom 12 bits of every page table entry must be zero, so we can just ignore those bits and use them to store other information about the page instead.  Important things we might want to know about a page include: is this page writable? is this page currently in memory, or on the disk? is this page executable?  That way every time we access a piece of memory, we also know its permissions, and can reject illegal uses of particular areas appropriately.

When a virtual address is referenced for a process and the page on which that address lives is not present in RAM, the hardware generates a page fault.  This gives control back to the operating system via the page fault handler, which has a chance to find the

## Virtualizing virtual memory

Our abstraction lives one level above this: we do not have multiple processes running on a single machine, and so we must only implement the concept of virtual memory as it appears to a user process.  That is, the process expects to be able to access any address from 0 to 2^48-1 without interfering with any other process.


```javascript


```