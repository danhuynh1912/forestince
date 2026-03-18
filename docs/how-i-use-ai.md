# How I Use AI

> Non-negotiable rule: **High cohesion, low coupling**

## Core stance

I do not use AI as a shortcut around architecture. I use it as a force multiplier inside a system of constraints.

Those constraints are explicit:

- optimize for scalability, not just speed of code generation
- preserve high cohesion inside feature boundaries
- preserve low coupling across layers
- make abstractions earn their existence
- keep the public shape of the code understandable without needing the author in the room

## System thinking before generation

Before asking AI to produce code, I define the system shape first:

- what are the feature boundaries
- what belongs to UI, service, repository, and infrastructure
- what should remain stable if the data source changes
- what should be local to a feature instead of becoming a shared dependency

That changes the role of AI. It stops being a code spawner and starts behaving more like an implementation assistant inside an already-defined architecture.

## High cohesion, low coupling as operating rule

When using AI, I keep asking the same questions:

- does this code increase cohesion inside a feature or scatter logic across the app
- does this dependency make a consumer know too much about implementation details
- is this abstraction helping the system evolve, or just adding ceremony
- if the data source changes tomorrow, how many files need to care

This rule is why the codebase is organized around feature services and repositories instead of pages importing raw mock data directly.

## How I constrain AI output

I guide AI toward bounded problems:

- scaffold a feature in the existing dependency direction
- generate typed contracts, not ambiguous helpers
- keep component logic focused on rendering and interaction
- keep orchestration in services
- keep infrastructure behind repositories

In practice, that means AI is allowed to help fill in implementation detail, but not redefine the architectural shape opportunistically.

## Where judgment stays human

The important decisions remain manual:

- drawing the feature boundaries
- deciding where not to abstract
- deciding when a service is useful and when it is just indirection
- deciding which dependencies are worth their runtime and maintenance cost
- reviewing whether generated code actually preserves the intended coupling model

## Validation loop

I validate AI output against system properties, not only against syntax:

- pages should not couple themselves to storage details
- behavior that spans multiple read models should live above the component layer
- infrastructure should remain swappable
- naming should reflect domain intent instead of implementation noise
- the codebase should still be legible as it grows

## Why this matters

AI is most valuable when it accelerates a coherent system. Without system thinking, it tends to generate locally plausible code that slowly degrades the whole architecture.

The goal is not merely to ship faster. The goal is to use AI while protecting the qualities that make a codebase durable:

- clear boundaries
- scalable structure
- cohesive modules
- low coupling
- maintainable evolution
