# MatchDay AI 🏟️

**MatchDay AI** is a production-ready, real-time stadium operations platform powered by Generative AI and Retrieval Augmented Generation (RAG). Built for scale and safety, it bridges the gap between stadium organizers and thousands of fans using live intelligence.

## 🚀 The Problem
Managing 80,000+ fans in a mega-event like the FIFA World Cup is a logistical nightmare. 
- Fans struggle with static maps, causing severe gate congestion.
- Organizers lack real-time context and communication tools.
- Language barriers prevent crucial emergency updates from reaching all attendees.

## 💡 The Solution
MatchDay AI transforms stadium operations using **Live Data + GenAI**:
1. **Fan Portal**: Hyper-personalized AI assistant that understands exactly where the fan is and routes them intelligently using real stadium data (RAG). Seamlessly translates to their native language.
2. **Organizer Dashboard**: Live WebSocket feeds of every zone. If a gate becomes congested, the AI analyzes the live data and RAG context to instantly recommend safe diversion routes. Organizers can send emergency broadcast toasts directly to fans.

## ✨ Core Features
- 🔐 **Role-Based Access Control (RBAC)**: Secure separation between Fans and Organizers.
- 🧠 **RAG Knowledge Engine**: Context-grounded AI navigation, eliminating hallucinations.
- 🚦 **Live Crowd Intelligence**: Real-time WebSocket simulator mirroring MetLife Stadium occupancy data.
- 🛡️ **Enterprise Security**: Rate limiting, Helmet headers, Zod input validation, and a strict AI Prompt Guard protecting against injection attacks.
- 🌐 **Global Accessibility**: Zero-latency AI-powered translations for international fans.
- 📊 **Audit Logging**: Every AI query and system action is persistently logged in MongoDB.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, WebSockets (socket.io-client)
- **Backend**: Node.js, Express, Socket.io, Zod, Helmet, Mongoose
- **AI & RAG**: Google Gemini API (`gemini-1.5-flash`, `gemini-embedding-2`)
- **Database**: MongoDB Atlas (Document & Vector Storage)
- **DevOps**: Docker, GitHub Actions

## 🎥 Demo Instructions
For Judges testing the system, follow these steps to see the magic:
1. Open the **Fan Dashboard** and ask: `Where is the nearest washroom from Gate 5?` (The AI uses RAG to answer instantly).
2. Ask a question in Spanish: `¿Dónde está la puerta 4?` (The AI automatically translates).
3. Open the **Organizer Dashboard** in another window.
4. Watch the Live Crowd Density. Notice **Gate 5 (West)** is flashing red at 85% capacity.
5. Watch the AI Operations Recommendations panel generate a routing solution based on live data.
6. Click **Emergency Broadcast**, type a message, and watch it instantly appear as a Toast on the Fan's screen!

## 🔮 Future Scope
- Integration with live CCTV feeds for computer vision density tracking.
- Ticketing API integration for personalized routing right from the user's seat.

---
*Built with ❤️ for GenAI Hackathons.*
