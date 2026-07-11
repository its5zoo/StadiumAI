# Known Issues & Technical Debt

1. **JWT Storage**: Currently, the JWT token is stored in `localStorage` inside `AuthContext.jsx`. This is prone to XSS attacks. Before a production release, it should be migrated to `httpOnly` secure cookies.
2. **AI Latency**: Gemini API can occasionally take >3 seconds to respond. A "Thinking..." state was added, but WebSockets could be introduced for streaming responses in the future.
3. **Database Dependency**: While fail-safes exist, restarting the server clears the fallback mock states. Persistent caching (Redis) could bridge the gap if MongoDB goes completely offline for hours.
