"use client";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight, Lock, Brain, Database } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

export default function Page() {
  return (
    <>
      {/* 1. If Signed In, show the App */}
      <SignedIn>
        <ChatInterface />
      </SignedIn>

      {/* 2. If Signed Out, show Landing Page */}
      <SignedOut>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center text-center p-6">
          <div className="max-w-3xl space-y-8">
            {/* Hero Icon */}
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-blue-200">
              <Brain size={40} className="text-white" />
            </div>

            {/* Headlines */}
            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                Your Personal{" "}
                <span className="text-blue-600">Knowledge Oracle</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload your PDFs and Markdown files. Chat with them securely
                using AI. Your data is isolated and private.
              </p>
            </div>

            {/* Login Button */}
            <SignInButton mode="modal">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Get Started for Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </SignInButton>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 text-left">
              <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  <Database size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">RAG Technology</h3>
                <p className="text-sm text-gray-500">
                  Retrieval Augmented Generation ensures the AI answers based
                  ONLY on your data.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                  <Lock size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Private & Secure
                </h3>
                <p className="text-sm text-gray-500">
                  Your data is isolated. What you upload is only visible to you.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                  <Brain size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Smart Citations
                </h3>
                <p className="text-sm text-gray-500">
                  The AI highlights exactly which page and line it got the
                  answer from.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
