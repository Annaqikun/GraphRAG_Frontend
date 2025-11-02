import { FileText, Search, Calendar, Database, Network, CheckCircle2, Eye } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  source: string;
  aiModel: string;
  nodes: number;
  relationships: number;
  uploadedAt: string;
  status: "completed" | "processing" | "failed";
}

const documents: Document[] = [
  {
    id: "1",
    name: "Map_ss.png",
    type: "PNG",
    size: "0.3 MB",
    source: "Local File",
    aiModel: "Gemini Pro",
    nodes: 0,
    relationships: 0,
    uploadedAt: "Oct 31, 2025 at 7:05 AM",
    status: "completed",
  },
  {
    id: "2",
    name: "Updated System Overview",
    type: "PNG",
    size: "0.3 MB",
    source: "Local File",
    aiModel: "Gemini Pro",
    nodes: 11,
    relationships: 10,
    uploadedAt: "Oct 31, 2025 at 6:35 AM",
    status: "completed",
  },
];

export function DocumentsList() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <FileText size={20} className="text-gray-900" />
          <h2 className="text-gray-900">Documents (20)</h2>
        </div>
        <p className="text-sm text-gray-500">Click on a document to view its knowledge graph</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search documents..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Documents List */}
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer"
            >
              {/* Document Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <FileText size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">{doc.name}</h3>
                  </div>
                </div>
                {doc.status === "completed" && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-md">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span className="text-xs text-emerald-600">Completed</span>
                  </div>
                )}
              </div>

              {/* Document Details Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-4">
                {/* Left Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span className="text-gray-900">{doc.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Database size={14} className="text-gray-400" />
                    <span className="text-gray-500">Source:</span>
                    <span className="text-gray-900">{doc.source}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Network size={14} className="text-gray-400" />
                    <span className="text-gray-500">Nodes:</span>
                    <span className="text-gray-900">{doc.nodes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-gray-500">Uploaded:</span>
                    <span className="text-gray-900">{doc.uploadedAt}</span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Size:</span>
                    <span className="text-gray-900">{doc.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Network size={14} className="text-gray-400" />
                    <span className="text-gray-500">AI Model:</span>
                    <span className="text-gray-900">{doc.aiModel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Network size={14} className="text-gray-400" />
                    <span className="text-gray-500">Relationships:</span>
                    <span className="text-gray-900">{doc.relationships}</span>
                  </div>
                </div>
              </div>

              {/* View Knowledge Graph Link */}
              <div className="pt-3 border-t border-gray-100">
                <button className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors">
                  <Eye size={16} />
                  Click to view knowledge graph
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
