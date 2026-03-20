# Forestince Admin

> Architecture principle: **High cohesion, low coupling**

Forestince Admin is a responsive operations platform for managing campus facilities, booking demand, and usage visibility. The implementation is intentionally documented from an architectural perspective: clear boundaries, swappable data access, and a structure that can evolve without forcing UI rewrites.

## Architecture summary

- `feature-first` modules keep behavior close to the domain they serve
- each feature owns its own `repository`, `repository.mock`, and `service`
- the UI depends on feature services rather than raw data sources
- repositories define the data boundary and isolate infrastructure concerns
- a shared local store simulates the current data source while preserving a backend-ready shape
- state changes in one feature propagate to other read models through the same internal contracts

## Dependency direction

```mermaid
flowchart TD
    classDef presentation fill:#D6E8FF,stroke:#4A90E2,color:#0B2545,stroke-width:1.5px
    classDef application fill:#FFF5CC,stroke:#E6B800,color:#4A3D00,stroke-width:1.5px
    classDef boundary fill:#FFE1E1,stroke:#D9534F,color:#5A2020,stroke-width:1.5px
    classDef infrastructure fill:#EDE7FF,stroke:#7A57D1,color:#322654,stroke-width:1.5px

    subgraph P["Presentation"]
        DP["Dashboard Page"]:::presentation
        RP["Booking Requests Page"]:::presentation
        FP["Facilities Page"]:::presentation
        UI["Shared UI Components"]:::presentation
    end

    subgraph A["Application / Feature Services"]
        DS["Dashboard Service"]:::application
        RS["Booking Requests Service"]:::application
        FS["Facilities Service"]:::application
    end

    subgraph B["Repository Boundary"]
        DR["Dashboard Repository Contract"]:::boundary
        RR["Booking Requests Repository Contract"]:::boundary
        FR["Facilities Repository Contract"]:::boundary
    end

    subgraph I["Infrastructure"]
        MDR["Mock Dashboard Repository"]:::infrastructure
        MRR["Mock Booking Requests Repository"]:::infrastructure
        MFR["Mock Facilities Repository"]:::infrastructure
        STORE["Shared Mock Store"]:::infrastructure
        LS["localStorage"]:::infrastructure
    end

    DP --> DS
    RP --> RS
    FP --> FS

    UI --- DP
    UI --- RP
    UI --- FP

    DS --> DR
    RS --> RR
    FS --> FR

    DR -.implemented by.-> MDR
    RR -.implemented by.-> MRR
    FR -.implemented by.-> MFR

    MDR --> STORE
    MRR --> STORE
    MFR --> STORE
    STORE --> LS
```

This direction keeps orchestration in the service layer, keeps data access behind repositories, and prevents presentation code from coupling itself to infrastructure details.

## Feature map

- `dashboard/`
  exposes the operational overview read model
- `booking-requests/`
  owns the approval and rejection flow for incoming requests
- `facilities/`
  owns capacity, utilization, and availability surfaces
- `shared/`
  contains reusable UI primitives, styling, icons, and low-level utilities
- `app/`
  wires routing and service composition together

## Why this structure scales

- high cohesion: each feature keeps its own types, repository contract, repository implementation, and service behavior in one place
- low coupling: UI consumes stable service APIs and does not know whether data comes from local state, HTTP, or another source
- incremental extensibility: repositories can be reimplemented without changing page-level code
- controlled complexity: the code avoids a god service while also avoiding unnecessary enterprise ceremony

## Current runtime model

The current implementation uses a shared local store with `localStorage` persistence. That choice keeps the application instant while preserving the same interaction shape a remote backend would expose. Replacing the current implementations with `Http*Repository` variants is a bounded infrastructure change, not a UI rewrite.

More detail:

- [Architecture](./docs/architecture.md)
- [How I Use AI](./docs/how-i-use-ai.md)

## Setup

```bash
yarn install
yarn build
yarn dev
```

The app runs on `http://localhost:4173`.
