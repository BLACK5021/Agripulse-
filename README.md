# AgriPulse - MVP

AgriPulse is a minimal viable product (MVP) for an AgriTech solution that provides:
- AI-like crop advisory (rule-based)
- Localized weather (mocked)
- Simple farmer marketplace (post & browse)
- SMS hooks (placeholders for integration)

## Repo structure
```
AgriPulse_MVP/
├─ backend/
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ index.html
│  ├─ app.js
│  └─ styles.css
├─ ai-engine/
│  ├─ advisory.py
│  └─ requirements.txt
└─ README.md
```

## How to run (locally)
Requirements: Node.js (v14+), npm. Python is optional (for ai-engine).

1. Clone or unzip the repo.
2. Start the backend (this will also serve the frontend):
   ```
   cd backend
   npm install
   node server.js
   ```
3. Open your browser at http://localhost:5000

## Notes
- The backend contains a simple rule-based advisory endpoint at `/api/advice`.
- The marketplace is a simple in-memory list that resets when the server restarts.
- To integrate SMS delivery, replace the placeholder in README with your preferred provider (Africa's Talking, Twilio).
- The `ai-engine/advisory.py` is an optional Python helper illustrating how to implement advisory logic in Python.
