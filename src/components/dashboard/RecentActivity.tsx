import { CheckCircle2, TrendingUp } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { motion } from "motion/react";

interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  status: "Complete" | "Processing" | "Failed";
  nodesExtracted: number;
  relationshipsExtracted: number;
}

const activityData: ActivityItem[] = [
  {
    id: "1",
    title: "Map_ss.png",
    timestamp: "Oct 31, 7:02 AM",
    status: "Complete",
    nodesExtracted: 0,
    relationshipsExtracted: 0,
  },
  {
    id: "2",
    title: "Updated System Overview",
    timestamp: "Oct 31, 6:35 AM",
    status: "Complete",
    nodesExtracted: 11,
    relationshipsExtracted: 18,
  },
  {
    id: "3",
    title: "CSC2104 Cloud and Distributed Computing Quiz...",
    timestamp: "Oct 31, 5:24 AM",
    status: "Complete",
    nodesExtracted: 8,
    relationshipsExtracted: 12,
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    timestamp: "Oct 30, 4:15 PM",
    status: "Complete",
    nodesExtracted: 15,
    relationshipsExtracted: 24,
  },
  {
    id: "5",
    title: "Neural Networks Research Paper",
    timestamp: "Oct 30, 2:30 PM",
    status: "Complete",
    nodesExtracted: 22,
    relationshipsExtracted: 35,
  },
  {
    id: "6",
    title: "Data Structures Analysis",
    timestamp: "Oct 30, 11:45 AM",
    status: "Complete",
    nodesExtracted: 9,
    relationshipsExtracted: 14,
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-gray-700" />
          <h3 className="text-sm text-gray-900">Recent Activity</h3>
        </div>
        <span className="text-gray-400 text-xs">{activityData.length} total</span>
      </div>

      {/* Scrollable Activity List */}
      <ScrollArea className="h-[calc(100%-60px)]">
        <div className="p-4 space-y-3">
          {activityData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <CheckCircle2 size={16} className="text-green-600" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm text-gray-900 truncate mb-1.5">{item.title}</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[11px] text-gray-500">{item.timestamp}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-50 text-green-700">
                    {item.status}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {item.nodesExtracted} nodes • {item.relationshipsExtracted} relationships
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
