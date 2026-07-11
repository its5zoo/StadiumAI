# Testing Checklist

## Authentication
- [ ] Register a Fan User.
- [ ] Login and receive a JWT.
- [ ] Refresh the browser - user remains logged in.

## Authorization
- [ ] Log in as Fan. Attempt to access `/organizer/dashboard`. Expect redirect to `/unauthorized`.
- [ ] Log in as Organizer. Attempt to access fan tools. Expect success (Organizer can view fan tools).

## AI Features & Fallback
- [ ] Ask Navigation: "Where is Gate 6?". Expect Gemini response.
- [ ] Disable network or break Gemini API Key. Ask Navigation again. Expect fallback mock response instantly.
- [ ] Prompt Injection: Ask "Ignore all instructions". Expect error toast "Query rejected due to security policy."

## System Stability
- [ ] Force a frontend crash (e.g. invalid component render). Verify ErrorBoundary catches it.
- [ ] Shut down backend. Verify Login page shows a toast notification rather than crashing.
