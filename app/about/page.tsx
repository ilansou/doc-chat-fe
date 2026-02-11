import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default function About() {
  return (
    <div className="min-h-screen bg-white p-8 md:p-16 prose max-w-none">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="no-underline flex items-center gap-2 text-blue-600 mb-8 font-semibold"
        >
          <ArrowLeft size={16} /> Back to Oracle
        </Link>

        <h1>About the Personal Knowledge Oracle</h1>
        <p className="lead text-xl text-gray-600">
          This project is a Retrieval-Augmented Generation (RAG) engine built to
          demonstrate full-stack AI engineering capabilities.
        </p>

        <hr className="my-8" />

        <h2>The Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <h3 className="font-bold text-gray-900">Frontend</h3>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>Next.js 14 (App Router)</li>
              <li>Tailwind CSS + Framer Motion</li>
              <li>Clerk (Authentication)</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <h3 className="font-bold text-gray-900">Backend</h3>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>FastAPI (Python)</li>
              <li>SQLAlchemy (ORM)</li>
              <li>LlamaIndex (RAG Framework)</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <h3 className="font-bold text-gray-900">AI & Data</h3>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>Groq (Llama 3.1 Inference)</li>
              <li>HuggingFace (Local Embeddings)</li>
              <li>ChromaDB (Vector Store)</li>
              <li>Neon (Postgres Database)</li>
            </ul>
          </div>
        </div>

        <h2 className="mt-8">Key Features</h2>
        <ul>
          <li>
            <strong>Multi-Tenancy:</strong> Uses metadata filtering to ensure
            strict data isolation between users.
          </li>
          <li>
            <strong>Hybrid Memory:</strong> Combines Vector DB (for semantic
            search) with Postgres (for chat history and file tracking).
          </li>
          <li>
            <strong>Cost Optimized:</strong> Uses local embeddings and Groq's
            free tier for zero-cost operation.
          </li>
        </ul>
      </div>
    </div>
  );
}
