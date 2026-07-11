# MatchDay AI - API Documentation 📚

## Base URL
`http://localhost:5000/api/v1`

## 1. Authentication (`/auth`)
- `POST /register`: Register a new user (Requires `name`, `email`, `password`, `role`).
- `POST /login`: Authenticate and receive a JWT token.

## 2. Public Data (`/stadiums`, `/matches`)
- `GET /stadiums`: Retrieves a list of supported stadiums and zone boundaries.
- `GET /matches`: Retrieves upcoming FIFA fixtures.

## 3. Fan Endpoints (`/fan`)
*Requires `Authorization: Bearer <token>` (Role: FAN).*
- `GET /dashboard`: Retrieves personalized match data and mock alerts.

## 4. Organizer Endpoints (`/organizer`)
*Requires `Authorization: Bearer <token>` (Role: ORGANIZER).*
- `GET /dashboard`: Live fan attendance and gate metrics.
- `GET /heatmap`: Fetch static backup of live heatmap data.
- `GET /incidents`: Fetch active security/medical incidents.
- `POST /broadcast`: Dispatch manual fallback alerts (`type`, `message`).
- `POST /recommendations`: Request a manual AI suggestion.

## 5. AI Endpoints (`/ai`)
*Requires `Authorization: Bearer <token>`.*
- `POST /voice/query`: Unified endpoint for handling navigation and translation. Requires `text`, `userLanguage`.
- `POST /crowd-analysis`: (Organizer only) Generates an evacuation/congestion report based on current crowd density.

## 6. Socket.io Events
- **Namespace**: `/`
- **Auth**: `{ token: "<JWT>" }`
- **Events Emitted by Server**:
  - `crowd-update` (to Organizers): Sends array of zone densities.
  - `recommendation-generated` (to Organizers): Sends AI operational recommendation string.
  - `broadcast` (to Fans): Sends `{ type, message }` alert to be flashed on screen.
