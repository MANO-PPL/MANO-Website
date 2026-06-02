# MANO Website

This repository contains the source code for the MANO website. It is structured into two dedicated directories: frontend and backend.

## Repository Folder Structure

```
MANO_Website/
├── backend/                  # Express API Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js         # PostgreSQL/MySQL database connection client
│   │   ├── controllers/      # Route controllers (enquiries, resumes)
│   │   ├── middleware/       # Multer file upload & error handler middlewares
│   │   ├── routes/           # API routes declarations
│   │   ├── app.js            # Express application setup
│   │   └── server.js         # Server entry point
│   ├── tests/
│   │   └── api.test.js       # Jest API integration tests
│   ├── package.json
│   └── .env                  # Backend environment configurations
│
├── frontend/                 # React Vite Frontend App
│   ├── src/                  # React components, pages, context, data
│   │   ├── components/       # UI Components (Contact modals, resume modals, forms)
│   │   ├── pages/            # Page layouts
│   │   ├── context/          # State management contexts
│   │   ├── data/             # Config data and local arrays
│   │   ├── App.jsx           # Base App routes configuration
│   │   └── main.jsx          # React renderer entry point
│   ├── public/               # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env                  # Frontend environment configurations
│
└── README.md                 # Project documentation
```

## Backend Service

The backend is built using Node.js, Express, and Multer. It supports PostgreSQL and MySQL databases dynamically.

### Database Setup
The database connection dynamically adapts based on the environment variables defined in the `backend/.env` file. On startup, the server automatically bootstraps the required tables.

The SQL tables schema created is:
- **enquiries**: Stores contact form enquiries (id, name, email, company name, whatsapp contact, service requested, project details, creation timestamp).
- **resumes**: Stores uploaded job application resumes (id, name, email, job role, uploaded file name, stored file path, creation timestamp).

### Setup and Running the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` folder (refer to `.env` example parameters below).
4. Start the server:
   ```bash
   npm start
   ```
   The backend server will run by default on port 8001.

### Running Backend API Integration Tests
The backend contains a test suite built on Jest and Supertest. It simulates database transactions to run tests without requiring a live database connection.
To execute the tests:
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Execute the test command:
   ```bash
   npm test
   ```

---

## Frontend Application

The frontend is a single-page application built using React, Vite, and Tailwind CSS.

### Centralized Endpoints Configuration
The API endpoint URLs are centralized in `frontend/src/config.js`. They resolve using the environment variable `VITE_API_BASE_URL` with a fallback to `http://localhost:8001`.

### Setup and Running the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` folder (refer to `.env` example parameters below).
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Compile the production bundle:
   ```bash
   npm run build
   ```
   The build artifacts will be generated in `frontend/dist/`.

---

## Environment Variables Configuration

### Backend Environment Variables (`backend/.env`)
Create `backend/.env` with the following variables:
```env
PORT=8001
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# Database configuration
DB_TYPE=mysql
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mano_website
DB_PORT=3306

# Groq API configuration
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
CHROMA_URL=http://localhost:8000

# Gmail SMTP configuration
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token
GMAIL_USER=hmmmmnicebike@gmail.com
ADMIN_EMAIL=recipient_emails_comma_separated
```

### Frontend Environment Variables (`frontend/.env`)
Create `frontend/.env` with the following variables:
```env
VITE_API_BASE_URL=http://localhost:8001
VITE_RAG_API_URL=http://localhost:8001/chat
```
