import {
  LayoutDashboard,
  Upload,
  Network,
  ChevronLeft,
  ChevronRight,
  FileText,
  Box,
  Lightbulb,
  Sun,
  CheckCircle2,
} from "lucide-react";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  currentPage,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 60 : 260 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-[#fafafa] border-r border-gray-200 h-screen flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 flex items-start justify-between">
        {!isCollapsed && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-[#6366f1] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 3L13 7L17 7L14 11L17 15H13L10 19L7 15H3L6 11L3 7H7L10 3Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900">GraphRAG</span>
              <span className="text-xs text-gray-500">
                Research Intelligence
              </span>
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md p-1 transition-colors mt-1"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Connection Status */}
      {!isCollapsed && (
        <div className="px-4 pb-4">
          <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-600">
                Database Connection
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Disconnect
              </Button>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-md px-2.5 py-2 mb-2.5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></div>
                <span className="text-xs text-gray-700">
                  Neo4j Database
                </span>
              </div>
              <span className="text-[10px] text-red-600 font-mono block ml-3.5 truncate">
                neo4j://127.0.0.1:7687
              </span>
            </div>

            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-md px-2.5 py-2">
              <CheckCircle2
                size={14}
                className="text-green-600 flex-shrink-0"
              />
              <span className="text-xs text-gray-700">
                Graph Schema configured
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="px-4 pb-4">
        {!isCollapsed && (
          <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
            Navigation
          </div>
        )}
        <div className="space-y-1">
          <button
            onClick={() => onNavigate("dashboard")}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } px-3 py-2 rounded-lg text-sm transition-colors ${
              currentPage === "dashboard"
                ? "bg-[#eff6ff] text-[#2563eb]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            title={isCollapsed ? "Dashboard" : ""}
          >
            <LayoutDashboard size={18} />
            {!isCollapsed && <span>Dashboard</span>}
          </button>
          <button
            onClick={() => onNavigate("upload")}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } px-3 py-2 rounded-lg text-sm transition-colors ${
              currentPage === "upload"
                ? "bg-[#eff6ff] text-[#2563eb]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            title={isCollapsed ? "Upload Paper" : ""}
          >
            <Upload size={18} />
            {!isCollapsed && <span>Upload Paper</span>}
          </button>
          <button
            onClick={() => onNavigate("knowledge-graph")}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } px-3 py-2 rounded-lg text-sm transition-colors ${
              currentPage === "knowledge-graph"
                ? "bg-[#eff6ff] text-[#2563eb]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            title={isCollapsed ? "Knowledge Graph" : ""}
          >
            <Network size={18} />
            {!isCollapsed && <span>Knowledge Graph</span>}
          </button>
        </div>
      </div>

      {/* Quick Insights */}
      {!isCollapsed && (
        <div className="px-4 pb-4">
          <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
            Quick Insights
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <FileText size={16} className="text-gray-400" />
                <span>Papers</span>
              </div>
              <span className="text-[#2563eb]">20</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Box size={16} className="text-gray-400" />
                <span>Entities</span>
              </div>
              <span className="text-[#8b5cf6]">115</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Lightbulb size={16} className="text-gray-400" />
                <span>Insights</span>
              </div>
              <span className="text-[#10b981]">92</span>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Light Mode Toggle */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun size={16} className="text-gray-600" />
              <span className="text-sm text-gray-700">
                Light Mode
              </span>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      )}
    </motion.div>
  );
}