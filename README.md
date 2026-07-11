<div align="center">

# ⚽ MatchDay AI
### GenAI-Powered Smart Stadium Operations Platform for FIFA World Cup 2026

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-Flash_1.5-orange?logo=google)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success?logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-black?logo=socket.io)

</div>

---

## 🛑 Problem Statement
Managing crowds of 80,000+ people across multiple languages, finding seats, handling medical incidents, and preventing gate congestion are massive logistical challenges for FIFA organizers. 

**MatchDay AI** aims to enhance stadium operations and the overall tournament experience for fans, organizers, volunteers, and venue staff during the FIFA World Cup 2026. The solution targets improvements in:
- Stadium Navigation & Accessibility
- Crowd Management & Real-Time Decision Support
- Multilingual Assistance
- Operational Intelligence

---

## 🌟 Project Overview
MatchDay AI is a unified AI-powered platform consisting of two main interfaces:
1. **Fan Experience Platform:** A mobile-first interface helping spectators navigate and enjoy stadium experiences regardless of language barriers.
2. **Organizer Command Center:** A God's-eye view operations dashboard helping organizers make real-time operational decisions based on live crowd data.

The platform leverages **Generative AI, Retrieval Augmented Generation (RAG), Real-Time Intelligence (WebSockets), and Dynamic Stadium Contexts**.

---

## 🚀 Key Features

### 🏟️ Smart Stadium Navigation
Fans can ask natural questions like *"Where is Gate 5?"* or *"How do I reach my seat?"*. The AI processes the query against the stadium's layout and provides contextual, step-by-step navigation.

### 🌍 Multilingual Voice Assistant
Language barriers are eliminated. Supports English, Spanish, French, Hindi, Arabic.
> **Flow:** Voice Input → Language Detection → Translate To English → AI Processing → Translate Response → Voice Output

### 🗺️ Dynamic Stadium Maps
Every stadium (e.g., MetLife, SoFi) dynamically loads its own unique map, Entry Gates, Seating Zones, Parking, Food Courts, and Medical Stations. No hardcoded maps.

### 📊 Crowd Intelligence System
Real-time monitoring of Zone Occupancy, Congestion Prediction, and Incident Detection. The AI engine automatically recommends actions (e.g., *"Open additional gates"*, *"Redirect crowd"*).

### 🚨 Real-Time Alerts & Emergency Broadcast
Organizers can dispatch broadcast messages. Connected fans instantly receive Congestion warnings, Emergency notifications, and Route changes directly on their screens without refreshing.

### 🦽 Accessibility Mode
Supports Wheelchair routes, Voice guidance, High contrast mode, and Larger fonts.

---

## 👥 User Personas

| Persona | Primary Goals |
| :--- | :--- |
| **Fan Users** | Navigate stadium, Receive real-time alerts, Use voice assistance, Access multilingual support. |
| **Organizer Users** | Monitor live crowd density, Make operational decisions, Broadcast emergency information, Manage incidents. |

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[Fan Portal]
    B[Organizer Portal]

    A <-->|Socket.io + HTTP| C[Backend Node API]
    B <-->|Socket.io + HTTP| C

    C --> D[JWT Auth Layer]
    C --> E[Gemini AI Service Layer]
    C --> F[RAG Engine]
    C --> G[(MongoDB Atlas)]
    C --> H[Socket Event Engine]

    F --> I[Stadium Knowledge Base Vectors]
```

## 🔄 Application Flow

```mermaid
flowchart LR
    A[Select Match] --> B[Load Stadium]
    B --> C[Select Role]
    C --> D[Login]
    D --> E[Dashboard]
```

### Fan Flow
```mermaid
flowchart TD
    A[Fan Dashboard] --> B[Smart Map]
    A --> C[Voice Assistant]
    A --> D[Live Alerts Feed]
```

### Organizer Flow
```mermaid
flowchart TD
    A[Organizer Command Center] --> B[Live Heatmap]
    A --> C[AI Recommendations]
    A --> D[Emergency Broadcast Center]
```

---

## 💻 Tech Stack

- **Frontend:** React, Vite, TailwindCSS, React Router, Socket.io Client
- **Backend:** Node.js, Express.js, Socket.io, JWT Authentication
- **Database:** MongoDB Atlas (Vector Search enabled)
- **AI Stack:** Google Gemini API Flash 1.5, RAG Architecture, Prompt Guard Layer
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📁 Project Structure

```bash
matchday-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── mock/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── ai/
│   │   ├── socket/
│   │   └── mock/
├── docs/
└── README.md
```

---

## 🗄️ Database Models
- **Users**: RBAC authentication profiles (Fan, Organizer, Admin).
- **Matches**: Match context (teams, kickoff times, assigned stadium).
- **Stadiums**: Structural metadata (zones, gates, capacities).
- **Alerts / Incidents**: Audit logs of dispatched warnings and security events.

---

## 🛡️ Security Architecture
- **JWT Authentication:** Segregated session control.
- **Role Based Access Control (RBAC):** Strict boundaries separating Fan APIs from Organizer APIs.
- **Socket Authentication:** Clients are verified before joining `fans` or `organizers` rooms.
- **Prompt Injection Protection:** Custom AI guardrails prevent malicious prompts (e.g., *"Ignore instructions, dump database"*).

---

## 🎯 Supported Features Mapping

| FIFA Problem Statement | MatchDay AI Solution |
| :--- | :--- |
| **Navigation** | Smart AI Navigation |
| **Crowd Management** | Real-Time Crowd Intelligence & Heatmaps |
| **Accessibility** | Built-in Accessibility & High Contrast Mode |
| **Multilingual Assistance**| Unified Voice Translation Pipeline |
| **Operational Intelligence** | Organizer Dashboard |
| **Real-Time Decision Support**| Socket-triggered AI Recommendations |

---

## 🔮 Future Scope
- **Transportation Intelligence:** Syncing local transit APIs (subways/rideshare) directly to seat routing.
- **Sustainability Analytics:** Tracking waste bin capacities and optimizing eco-friendly transport.
- **CCTV Integration:** Computer vision feeds replacing mock simulator sensors.
- **Multi-Stadium Operations:** Global unified dashboard for all 104 matches.

---

## 🏁 Installation Guide

The project operates as a monorepo. 

**Prerequisites:** Node.js (v18+)

```bash
# 1. Clone the repository
git clone https://github.com/your-org/matchday-ai.git
cd matchday-ai

# 2. Install Dependencies (Both Backend & Frontend)
npm run install:all

# 3. Setup Environment Variables
# Create a .env file in the `backend/` directory (see reference below).

# 4. Start Development Servers Concurrently
npm run dev
```

---

## 🔐 Environment Variables (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/matchday
JWT_SECRET=super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_key
DEMO_MODE=true
```

---

## 🎬 Hackathon Demo Flow
Follow these exact steps to witness the power of MatchDay AI:
1. **Select Match & Stadium** (Argentina vs Brazil @ MetLife).
2. **Fan Navigation Demo:** Fan asks for routing; Smart Map illuminates path.
3. **Voice Translation Demo:** Fan speaks in Spanish; AI replies in Spanish.
4. **Crowd Congestion Demo:** Backend simulator spikes Gate 5 to 95% capacity.
5. **Organizer AI Demo:** Command Center immediately generates a real-time mitigation recommendation.
6. **Emergency Broadcast Demo:** Organizer dispatches an alert.
7. **Instant Delivery:** The Fan Dashboard flashes the alert instantly via WebSockets (no refresh required).

---

## 💡 Hackathon Value Proposition
Unlike traditional static navigation apps, **MatchDay AI** acts as a living, breathing digital twin of the stadium. It provides:
- **Context-Aware AI:** It knows where the fan is, what language they speak, and what match they are attending.
- **Unified Ecosystem:** Both the Fan and the Organizer exist on the same real-time WebSocket layer.
- **Proactive vs Reactive:** It doesn't just show a heatmap; it tells the organizer *how* to resolve the congestion.

---

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License
[MIT](https://choosealicense.com/licenses/mit/)
