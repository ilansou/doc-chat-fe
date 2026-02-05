import { Upload, FileText, Database, Loader2 } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  uploading: boolean;
  files: { name: string; size: string }[];
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Sidebar({
  isOpen,
  uploading,
  files,
  onUpload,
}: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 ${!isOpen && "md:hidden"}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700 flex items-center gap-2">
            <Database size={18} className="text-blue-600" />
            Knowledge Base
          </h2>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {files.length === 0 ? (
            <div className="text-center text-gray-400 mt-10 text-sm">
              <p>No documents yet.</p>
            </div>
          ) : (
            files.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm"
              >
                <div className="bg-red-50 p-2 rounded text-red-500">
                  <FileText size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium truncate text-gray-700">{f.name}</p>
                  <p className="text-xs text-gray-400">{f.size}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Upload Button */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-gray-300 hover:border-blue-400 hover:text-blue-600 rounded-xl cursor-pointer transition-all shadow-sm text-sm font-medium text-gray-600">
            {uploading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Upload size={16} />
            )}
            {uploading ? "Indexing..." : "Upload PDF/MD"}
            <input
              type="file"
              multiple
              className="hidden"
              onChange={onUpload}
              accept=".pdf,.md,.txt"
              disabled={uploading}
            />
          </label>
        </div>
      </div>
    </aside>
  );
}
