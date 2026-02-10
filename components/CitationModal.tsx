import { X, FileText } from "lucide-react";

type Source = {
  file_name: string;
  page_label: string;
  text_snippet: string;
};

type Props = {
  source: Source | null;
  onClose: () => void;
};

export default function CitationModal({ source, onClose }: Props) {
  if (!source) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
          <h3 className="font-semibold flex items-center gap-2 text-gray-700">
            <FileText size={18} className="text-blue-600" />
            Source Context
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Document
            </span>
            <p className="text-gray-800 font-medium">{source.file_name}</p>
          </div>
          <div className="mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Page
            </span>
            <p className="text-gray-800 font-medium">{source.page_label}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Excerpt
            </span>
            <div className="mt-2 p-4 bg-blue-50 text-blue-900 rounded-lg text-sm leading-relaxed border border-blue-100">
              "{source.text_snippet}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
