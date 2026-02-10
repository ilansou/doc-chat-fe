import ReactMarkdown from "react-markdown";
import { Bot, User, FileText } from "lucide-react";

type Source = {
  file_name: string;
  page_label: string;
  text_snippet: string;
};

type MessageProps = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  onSourceClick?: (source: Source) => void;
};

export default function MessageBubble({
  role,
  content,
  sources,
  onSourceClick,
}: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-4 max-w-3xl mx-auto ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
          isUser ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Bubble */}
      <div
        className={`flex flex-col gap-2 max-w-[85%] ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-none" // User: White text
              : "bg-white border border-gray-200 text-slate-800 rounded-tl-none" // AI: Dark text
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <div className="prose prose-sm max-w-none text-slate-800 prose-p:text-slate-800 prose-headings:text-slate-900 prose-strong:text-slate-900 prose-code:text-pink-600 prose-pre:bg-gray-100 prose-pre:text-slate-900">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Sources */}
        {sources && sources.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-1">
            {sources.map((source, idx) => (
              <button
                key={idx}
                onClick={() => onSourceClick && onSourceClick(source)}
                className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-left group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-blue-50 text-blue-600 p-1 rounded text-xs">
                    <FileText size={12} />
                  </span>
                  <span className="text-xs font-semibold text-slate-700 truncate flex-1">
                    {source.file_name}
                  </span>
                  <span className="text-[10px] text-slate-500 bg-gray-100 px-1.5 py-0.5 rounded">
                    Pg {source.page_label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 italic line-clamp-2 border-l-2 border-gray-200 pl-2 group-hover:border-blue-400">
                  "{source.text_snippet}"
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
