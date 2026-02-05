"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Menu, Loader2 } from "lucide-react";

// Import our new components
import Sidebar from "@/components/Sidebar";
import MessageBubble from "@/components/MessageBubble";

// --- TYPES ---
type Source = {
  file_name: string;
  page_label: string;
  text_snippet: string;
  score: number;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

export default function Home() {
  // --- STATE ---
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! Upload a PDF to the sidebar and ask me anything about it.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- HANDLERS ---
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);

    const formData = new FormData();
    const newFiles: { name: string; size: string }[] = [];

    Array.from(e.target.files).forEach((file) => {
      formData.append("files", file);
      newFiles.push({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
      });
    });

    try {
      await axios.post("http://localhost:8000/upload", formData);
      setFiles((prev) => [...prev, ...newFiles]);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: `✅ Indexed ${newFiles.length} file(s). Ready to chat!`,
        },
      ]);
    } catch (error) {
      alert("Error uploading files");
    } finally {
      setUploading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: userMsg },
    ]);
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:8000/chat", {
        message: userMsg,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          sources: data.sources,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Sorry, I couldn't reach the server. Is the backend running?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER ---
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 1. Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        uploading={uploading}
        files={files}
        onUpload={handleUpload}
      />

      {/* 2. Main Chat Area */}
      <main className="flex-1 flex flex-col w-full transition-all duration-300">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-md text-gray-600"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-800">
              🔮 Personal Oracle
            </h1>
          </div>
        </header>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
          {messages.map((msg) => (
            // 3. Message Bubble Component
            <MessageBubble
              key={msg.id}
              role={msg.role}
              content={msg.content}
              sources={msg.sources}
            />
          ))}

          {loading && (
            <div className="flex gap-4 max-w-4xl mx-auto">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                <Loader2 size={16} className="text-white animate-spin" />
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-2xl text-gray-500 text-sm">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question about the uploaded documents..."
              className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-black"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
