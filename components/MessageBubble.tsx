import ReactMarkdown from "react-markdown";
import { Bot, User, FileText } from "lucide-react";

// Define types here or in a separate types file
type Source = {
  file_name: string;
  page_label: string;
  text_snippet: string;
};

type MessageProps = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

export default function MessageBubble({
  role,
  content,
  sources,
}: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-4 max-w-4xl mx-auto ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
          isUser ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Content */}
      <div
        className={`flex flex-col gap-2 max-w-[85%] ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-none"
              : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            /* FIX: We apply the 'prose' class to the wrapper div, not the component directly */
            <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-100 prose-pre:p-2 prose-pre:rounded-lg">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Sources (The Killer Feature) */}
        {sources && sources.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-1">
            {sources.map((source, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-blue-100 text-blue-700 p-1 rounded text-xs">
                    <FileText size={10} />
                  </span>
                  <span className="text-xs font-semibold text-gray-700 truncate">
                    {source.file_name}
                  </span>
                  <span className="text-[10px] text-gray-500 bg-gray-100 px-1 rounded">
                    Pg {source.page_label}
                  </span>
                </div>
                <p className="text-xs text-gray-500 italic line-clamp-2 border-l-2 border-blue-200 pl-2">
                  "{source.text_snippet}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
