---
layout: post
title: 'Processable: A Visual Debugger for x86'
date:   2017-11-23 13:10:45 -0500
categories: blog processable
published: true
permalink: /blog/processable/1/
---

This post is about _Processable_, the visual debugger and program tracer that I am implementing for my Senior Thesis in the Computer Science department at Princeton University.  The project intends to be a virtual machine emulating a subset of the x86 instruction set and architecture, written entirely in Javascript and runnable in the browser.   This project is a sequel to [Assemblance](http://assemblance.cs.princeton.edu), the annotated assembly explorer I developed for my Junior Independent Work.  Both are advised by the incredible [Bob Dondero](http://cs.princeton.edu/~rdondero)

<div class="center-content" markdown="1">_Check out the pre-alpha prototype [here](/processable/prototype/), or the (unstable) bleeding edge [here](/processable/alpha/)_
</div>

## Motivation
One of the most useful tools on the belt of the Computer Science educator is the program trace.  In almost every introductory Computer Science class in any language, the instructor will at some point take the time to walk through a program's execution step by step.  Depending on the context, they may include any number of details after each step. This may include listing variable names and values, drawing the function call stack, or even sketching out the layout of the program's data in memory.

<div markdown="1" class="center-content">
![Program Trace]({{ "/assets/stackExcerptLoop.gif" | absolute_url }})
</div>

While taking the _Introduction to Systems Programming (COS217)_ course at Princeton, we would see an instructor perform a trace almost every class.  Even further, we were provided with PDFs of step-by-step program trace cartoons as supplementary material, generated manually in LibreOffice by Bob Dondero.  The traces were incredibly helpful for understanding, but performing them on a blackboard is onerous, and making them into a PDF even more so.  This project is an attempt to automate the process of tracing a specific subset of programs, and will ideally double as a primitive but easy-to-use debugger for small pieces of academic software.

# Why assembly?
Most of the effort of computer science education is currently focused on teaching students their _first_ programming language.  Getting the foot in the door in crucial for encouraging students to learn programming in the first place, and high level languages are a much more intuitive place to start than Assembly.  For these higher level languages, several tools already exist to visualize program execution.  In particular, sites like [Python Tutor](http://pythontutor.com) provide trace generators for Python, C/C++, Ruby, Java, and Javascript.  The tool displays the state of the program after each line of code by dividing memory into local variables and dynamically allocated objects; boxes enclose each variable, and arrows follow object references.

However this sort of visual tool does not exist for assembly languages.  Writing assembly requires a different mindset from high-level applications programming, and maintaining a mental image of a program's state is important for writing bug-free code.  Program tracing is incredibly helpful for building this type of intuition, and I aim to fill a gap in available tools for automating this at the assembly level.

# Why javascript?
Despite its many flaws, Javascript has been getting it's act together recently and I'm slowly becoming a fan.  With great MV* frameworks like Angular and React, and the sweet sugary syntax of ES6+, it seems possible to put together something that successfully interprets assembly and doesn't drive me insane in the process.  The bigger motivation however is to create a tool that runs in the browser.  In terms of reach and compatibility, there is nothing like the web.  Every machine has a web browser, and I hate downloading special-purpose software that I don't imagine using all the time.  By keeping the whole thing in the browser, it keeps setup to a minimum and makes sharing that much easier.

## Goals
This project is first and foremost an educational tool, and while I will strive for accuracy in emulation, I will prioritize benefit to the novice programmer over identical system behavior.

More concretely, I would like to create a tool that:
* Supports a usable subset of x86
	- I will first strive for the subset taught in the COS217 course, which excludes all floating point operations and registers, and focuses on control flow and integer arithmetic
* Is easy to use and aesthetically pleasing
* Is maintainable and extensible
	- In particular I would love to be able to expand beyond a single flavor of assembly language.  If designed correctly, much of the infrastructure should carry over between architectures, and while specific instructions or register sizes and names may change, the basic concepts remain similar.
* Performs reasonably well on modern machines
	- A program of the size typical for a class assignment should be able to run without lagging or hogging too much memory

Finally, I would like to write about the process of creating this tool as I go, publishing thoughts, struggles, and prototypes as relevant.  I'm three months in at this point, and have a good amount of backlogged progress to write about.  Hopefully this means there is more to come soon, stay tuned!