# frontend/ — MANO Website React App

## Structure

```
frontend/
├── src/                  ← React components, pages, context, data
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
├── public/               ← Static assets (logos, images)
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Running the Frontend

```bash
cd frontend
npm install       # only needed once or after package changes
npm run dev       # Dev server: http://localhost:5173/pcpl
npm run build     # Production build → frontend/dist/
```

## Chatbot Widget (Coming Next)

Will be added at: `src/components/ChatbotWidget.jsx`
Registered in: `src/App.jsx` → `BrandLayout`

Add to `frontend/.env`:
```
VITE_RAG_API_URL=http://localhost:8001/chat        # local dev
VITE_RAG_API_URL=https://yourdomain.com/rag/chat  # production
```
