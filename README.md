# MatchDay AI 🏟️ ⚽

An intelligent, real-time stadium operations platform designed for FIFA to drastically improve the fan experience and streamline crowd management during the World Cup.

## 🏆 The Problem
Managing crowds of 80,000+ people across multiple languages, finding seats, handling medical incidents, and preventing gate congestion are massive logistical challenges for FIFA organizers.

## 💡 Our Solution
**MatchDay AI** acts as a dual-sided intelligence layer:
1. **For Fans:** A mobile-first personalized experience that provides voice-driven AI navigation (in multiple languages), accessibility routing, and instant emergency alerts.
2. **For Organizers:** A God's-eye view Command Center with live heatmaps and AI-driven decision support that tells organizers exactly *what* to do during crowd congestion.

## 🚀 Key Features
- **Global Voice Pipeline**: Speaks 5+ languages with automated intent routing.
- **Dynamic Stadium Architecture**: AI visually overlays routes and live density on specific stadium SVG maps.
- **Real-Time Intelligence (Sockets)**: Connects crowd sensors to AI generation, triggering instant push broadcasts.
- **Contextual RAG**: Grounded in FIFA safety protocols to ensure AI recommendations are accurate and safe.

## 🛠️ Tech Stack
- **Frontend**: React, TailwindCSS, Socket.io-client
- **Backend**: Node.js, Express, Socket.io
- **AI / LLM**: Google Gemini Flash 1.5
- **Vector DB**: MongoDB Atlas Vector Search
- **Auth**: JWT Role-Based Access Control

## 🏁 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-org/matchday-ai.git

# 2. Start Backend
cd backend
npm install
npm run dev

# 3. Start Frontend (In a new terminal)
npm install
npm run dev
```

Check out `DEMO_FLOW.md` for the perfect hackathon pitch script!
