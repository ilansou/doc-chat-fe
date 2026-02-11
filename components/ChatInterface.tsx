"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Menu, Loader2, Paperclip, Plus } from "lucide-react"; // Added Paperclip
import { useUser, UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import MessageBubble from "@/components/MessageBubble";
import CitationModal from "@/components/CitationModal";

export const dynamic = "force-dynamic";

export default function ChatInterface() {
  const { user } = useUser();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Data State
  const [chats, setChats] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<any | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for hidden input

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // 1. Fetch Data on Load
  useEffect(() => {
    if (user) refreshData();
  }, [user]);

  const refreshData = async () => {
    if (!user) return;
    try {
      const chatsRes = await axios.get(`${API_URL}/chats/${user.id}`);
      setChats(chatsRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  // 2. Load Specific Chat
  const loadChat = async (chatId: string) => {
    setLoading(true);
    setCurrentChatId(chatId);
    setMessages([]); // Clear current view while loading
    try {
      const res = await axios.get(`${API_URL}/chat/${chatId}`);
      setMessages(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // 3. Create New Chat
  const startNewChat = () => {
    setCurrentChatId(null);
    setMessages([
      {
        role: "assistant",
        content: "Hello! I'm ready to answer questions about your documents.",
      },
    ]);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.length) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("user_id", user.id);
    Array.from(e.target.files).forEach((file) =>
      formData.append("files", file),
    );

    try {
      await axios.post(`${API_URL}/upload`, formData);
      alert("Documents uploaded successfully!");
    } catch (error) {
      alert("Error uploading documents");
    } finally {
      setUploading(false);
      // Reset input so you can upload the same file again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !user) return;
    const userMsg = input;
    setInput("");

    const tempMsgs = [...messages, { role: "user", content: userMsg }];
    setMessages(tempMsgs);
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/chat`, {
        message: userMsg,
        user_id: user.id,
        chat_id: currentChatId,
      });

      setMessages([
        ...tempMsgs,
        { role: "assistant", content: data.response, sources: data.sources },
      ]);
      if (!currentChatId) refreshData(); // Refresh sidebar if new chat created
    } catch (error) {
      setMessages([
        ...tempMsgs,
        { role: "assistant", content: "Error connecting to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    if (!confirm("Are you sure you want to delete this chat?")) return;
    await axios.delete(`${API_URL}/chat/${chatId}`);
    if (currentChatId === chatId) startNewChat();
    refreshData();
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <Sidebar
        isOpen={isSidebarOpen}
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={loadChat}
        onDeleteChat={handleDeleteChat}
        onNewChat={startNewChat}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col w-full relative transition-all duration-300">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-md cursor-pointer text-slate-600 transition"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-800">
              🔮 Personal Oracle
            </h1>
          </div>
          <UserButton afterSignOutUrl="/" />
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-8 scroll-smooth bg-slate-50">
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <p>Select a chat or start a new one.</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              role={msg.role}
              content={msg.content}
              sources={msg.sources}
              onSourceClick={(src) => setSelectedSource(src)}
            />
          ))}

          {loading && (
            <div className="flex gap-4 max-w-3xl mx-auto animate-pulse">
              <div className="w-8 h-8 rounded-full bg-emerald-600/50"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area (New Design) */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="max-w-3xl mx-auto flex items-end gap-2 bg-slate-50 p-2 rounded-xl border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            {/* Hidden File Input */}
            <input
              type="file"
              multiple
              ref={fileInputRef}
              className="hidden"
              onChange={handleUpload}
              accept=".pdf,.md,.txt"
            />

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || loading}
              className="p-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
              title="Upload Document"
            >
              {uploading ? (
                <Loader2 size={20} className="animate-spin text-blue-600" />
              ) : (
                <Paperclip size={20} />
              )}
            </button>

            {/* Text Input */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask a question about your documents..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 resize-none py-3 max-h-32 min-h-[44px]"
              rows={1}
              disabled={loading}
            />

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-sm"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </main>

      <CitationModal
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
      />
    </div>
  );
}
