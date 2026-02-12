# 🔮 Personal Knowledge Oracle (AI RAG SaaS)

### [🚀 View Live Demo](https://doc-chat-fe.vercel.app)

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_|_FastAPI_|_LlamaIndex-blue)

## 📖 About The Project

The **Personal Knowledge Oracle** is a full-stack RAG (Retrieval-Augmented Generation) application that allows users to securely upload PDF documents and "chat" with them using AI.

Unlike generic chatbots, this application uses **Vector Embeddings** to "read" your specific files and answer questions based **only** on your data, with zero hallucinations.

It features a **Multi-Tenant Architecture**, ensuring that User A can never access User B's documents, making it a production-ready SaaS prototype.

---

## ⚡ Tech Stack

### Frontend (Client)

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Lucide Icons
- **Authentication:** Clerk (Secure User Management)
- **HTTP Client:** Axios
- **State Management:** React Hooks

### Backend (Server) - _[View Backend Repo](https://github.com/ilansou/doc-chat-be)_

- **API Framework:** FastAPI (Python)
- **AI Orchestration:** LlamaIndex
- **LLM Inference:** Groq (Llama 3.1-8b-instant) - _Sub-second latency_
- **Vector Database:** ChromaDB (Semantic Search)
- **Relational Database:** PostgreSQL (Neon.tech) via SQLAlchemy
- **Embeddings:** HuggingFace (`all-MiniLM-L6-v2`) - _Local CPU inference_

---

## 🚀 Key Features

### 1. 🔒 Multi-Tenancy & Security

Implemented strict **Row Level Security (RLS)** logic at the application level.

- **Vector Store:** Documents are tagged with `user_id`. Queries use `ExactMatchFilter` to ensure data isolation.
- **Database:** Chat history is fetched only for the authenticated user via Clerk tokens.

### 2. 🧠 Retrieval Augmented Generation (RAG)

- Uploads PDFs/Markdown files.
- Chunks text and converts to Vector Embeddings.
- Retrieves the top 5 most relevant chunks to answer user queries.

### 3. 🔍 Source Attribution (The "Killer Feature")

- The AI doesn't just answer; it cites its sources.
- Clickable **Source Cards** show the exact filename, page number, and text snippet used to generate the answer.

### 4. 💾 Hybrid Persistence

- **ChromaDB:** Stores the "Knowledge" (Vectors).
- **PostgreSQL:** Stores the "Experience" (Chat History & File Metadata).
- **Frontend:** Persists state across reloads.

---

## 🛠️ Installation & Local Setup

### Prerequisites

- Node.js 18+
- Python 3.10+
- Accounts for: Clerk, Groq, Neon (Postgres)

### 1. Clone the Repositories

```bash
# Clone Frontend
git clone https://github.com/ilansou/doc-chat-fe.git
cd oracle-frontend

# Clone Backend (In a separate terminal)
git clone https://github.com/ilansou/doc-chat-be.git
cd oracle-backend
```

### 2. Setup Backend

```bash
cd oracle-backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
# GROQ_API_KEY=...
# DATABASE_URL=...
```

### 3. Setup Frontend

```bash
cd oracle-frontend
npm install

# Create .env.local file
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
# CLERK_SECRET_KEY=...
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run Client: npm run dev

## ☁️ Deployment

- Frontend: Deployed on Vercel.\
- Backend: Deployed on Render (Python Web Service).\
- Database: Hosted on Neon (Serverless Postgres).
