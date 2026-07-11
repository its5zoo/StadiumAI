# MatchDay AI - Architecture

## High-Level Flow
\`\`\`mermaid
graph TD
    A[Frontend React App] -->|HTTP Request| B(Backend Express API)
    B --> C{AI Controller}
    C -->|Try| D[Gemini SDK]
    C -->|Catch| E[Mock Fallback Service]
    D --> F[MongoDB Context]
    E --> G[Local JSON Mock]
    B --> H[(MongoDB - Audit/Auth)]
\`\`\`

## Security Layers
1. **Frontend**: \`<ProtectedRoute>\` prevents UI access.
2. **Middleware**: \`auth.middleware.js\` validates JWT token.
3. **RBAC**: \`role.middleware.js\` confirms \`req.user.role\` allows access.
4. **Prompt Guard**: \`promptGuard.ai.js\` rejects malicious injections before Gemini execution.

## Data Persistence
- **MongoDB**: Used for Auth, Audit Logs, AI Query Logs, and Dynamic Stadium data.
- **Resilience**: The DB connection handles failures gracefully. If MongoDB goes down, the backend falls back to in-memory mocks so the frontend never crashes.
