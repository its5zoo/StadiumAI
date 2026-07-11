# MatchDay AI Architecture

```mermaid
graph TD
    %% Frontend Layer
    subgraph Frontend [Presentation Layer (React/Vite)]
        F1[Fan Portal]
        F2[Organizer Dashboard]
        F3[Socket.io Client]
    end

    %% API Gateway & Security Layer
    subgraph Gateway [API & Security Layer (Express)]
        G1[Helmet & Rate Limiter]
        G2[Zod Validator]
        G3[Auth Middleware JWT]
    end

    %% Core Services Layer
    subgraph Services [Core Business Services]
        S1[Socket.io Server]
        S2[Live Simulator Engine]
        S3[RAG Retriever Service]
    end

    %% AI Intelligence Layer
    subgraph AI [Generative AI Layer]
        A1[Prompt Guard Security]
        A2[Navigation Assistant AI]
        A3[Crowd Insights AI]
        A4[Translation AI]
    end

    %% External & Persistence Layer
    subgraph External [External APIs & DB]
        E1[(MongoDB Atlas)]
        E2[Google Gemini API]
    end

    %% Relationships
    F1 -->|HTTP Requests| G1
    F2 -->|HTTP Requests| G1
    F3 <-->|WebSockets| S1
    
    G1 --> G2
    G2 --> G3
    G3 --> Services
    
    S2 -->|Real-Time Updates| S1
    S3 -->|Fetch Knowledge Base| E1
    
    Services --> A1
    A1 --> A2
    A1 --> A3
    A1 --> A4
    
    A2 <--> E2
    A3 <--> E2
    A4 <--> E2
```

## Core Technologies
- **Frontend**: React, Vite, TailwindCSS (FIFA Themed), Lucide Icons
- **Backend**: Node.js, Express, Socket.io
- **Security**: Helmet, Express-Rate-Limit, Zod, JWT
- **AI/ML**: `@google/generative-ai` (Gemini-1.5-flash, gemini-embedding-2), Custom Prompt Guard
- **Database**: MongoDB Atlas (Storage + Vector Embeddings)
- **DevOps**: Docker, GitHub Actions CI/CD
