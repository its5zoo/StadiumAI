# System Architecture 🏗️

MatchDay AI is built to be highly scalable, fault-tolerant, and responsive.

## Core Flow

1. **Client Layer (React)**
   - The user interacts via Voice (Web Speech API) or Text.
   - Sockets remain connected in the background to receive instantaneous broadcast alerts without refreshing.

2. **WebSocket Layer (Socket.io)**
   - Authenticated JWT connections segregate `Fans` and `Organizers` into isolated rooms.
   - A background Simulator Service (or real IoT sensors in production) emits `crowd-update` events every few seconds.

3. **Backend API (Node/Express)**
   - Manages standard REST operations (Auth, Profile, Stadium metadata).
   - Handles the `/voice/query` endpoint which detects language, routes intent, and processes RAG.

4. **AI & RAG Engine (Gemini + MongoDB)**
   - **Vector Search**: The query is vectorized and compared against chunks of FIFA safety PDFs stored in MongoDB.
   - **Gemini Flash 1.5**: The retrieved chunks are passed as context to Gemini, generating highly specific, stadium-aware answers.

5. **Decision Support Loop**
   - When a zone hits >80% congestion via the socket engine, the backend automatically triggers the AI to evaluate the state.
   - The AI generates a recommendation (e.g., "Deploy volunteers to Gate 5").
   - This recommendation is emitted via sockets directly to the Organizer Command Center.
