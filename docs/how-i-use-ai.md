# How I Use AI

> Guiding principle: **High cohesion, low coupling**

## Core rule

I use AI to speed up delivery, not to decide the architecture for me.

I define the system shape first, then use AI inside that shape.

## What I define first

- feature boundaries
- what belongs to UI, service, repository, and store
- what should stay stable if the data source changes
- what should stay local to a feature

## How I use AI inside that shape

- generate code in the existing dependency direction
- keep UI focused on rendering and user interaction
- keep behavior in services
- keep data access behind repositories
- avoid new abstractions unless they solve a real problem

## What I review myself

- does the change increase cohesion inside a feature
- does it reduce or increase coupling
- does it keep the data boundary replaceable
- does it add code or dependencies without clear value

## Why this matters

AI is useful when the boundaries are clear. That keeps the codebase scalable, easy to read, and easy to change later.
