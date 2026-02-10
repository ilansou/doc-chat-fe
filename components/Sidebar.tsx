import { MessageSquare, Trash2, Plus, X } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  chats: any[];
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onNewChat: () => void;
  onCloseMobile: () => void;
};

export default function Sidebar({
  isOpen,
  chats,
  currentChatId,
  onSelectChat,
  onDeleteChat,
  onNewChat,
  onCloseMobile,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay (Only visible on small screens when open) */}
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobile}
      />

      {/* Sidebar Container */}
      <aside
        className={`
    fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-200 
    transition-all duration-300 ease-in-out flex flex-col
    ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"}
    md:relative md:translate-x-0 ${isOpen ? "md:w-64" : "md:w-0"}
  `}
      >
        <div
          className={`${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-200 h-full flex flex-col min-w-[16rem]`}
        >
          {/* Header: New Chat Button */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <button
              onClick={onNewChat}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-sm font-medium text-sm"
            >
              <Plus size={16} /> New Chat
            </button>
            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="md:hidden p-2 text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat History List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
              History
            </h3>

            {chats.length === 0 ? (
              <div className="text-center text-gray-400 mt-10 text-sm italic">
                No previous chats.
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    onSelectChat(chat.id);
                    // Optional: Close sidebar on mobile when chat selected
                    if (window.innerWidth < 768) onCloseMobile();
                  }}
                  className={`group flex items-center justify-between p-3 rounded-lg text-sm cursor-pointer transition-colors ${
                    currentChatId === chat.id
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-slate-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <MessageSquare
                      size={14}
                      className={
                        currentChatId === chat.id
                          ? "text-blue-500"
                          : "text-gray-400"
                      }
                    />
                    <span className="truncate max-w-[140px]">{chat.title}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-100 hover:text-red-600 rounded-md transition-all"
                    title="Delete Chat"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
