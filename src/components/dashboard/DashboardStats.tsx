import {
  BookOpen,
  Network,
  Link2,
  TrendingUp,
  Upload,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface StatCardProps {
  label: string;
  value: number;
  change: string;
  icon: React.ReactNode;
  iconBgColor: string;
  blobColor: string;
  index: number;
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue}</>;
}

function StatCard({
  label,
  value,
  change,
  icon,
  iconBgColor,
  blobColor,
  index,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ 
        y: -4, 
        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.18)',
        transition: { duration: 0.2 }
      }}
      className="bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-md relative overflow-hidden cursor-pointer"
    >
      {/* Decorative blob circle in top right */}
      <motion.div
        className={`absolute -top-3 -right-3 w-20 h-20 rounded-full ${blobColor} opacity-20`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1 + 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-1">
          <div className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">
            {label}
          </div>
          <motion.div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBgColor}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.2,
              type: "spring",
              stiffness: 200,
            }}
          >
            {icon}
          </motion.div>
        </div>
        <div className="text-[32px] leading-none font-bold text-gray-900 mb-1">
          <AnimatedNumber value={value} />
        </div>
        <motion.div
          className="text-[11px] text-green-600 flex items-center gap-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <ArrowUpRight size={11} strokeWidth={2.5} />
          <span>{change}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function DashboardStats() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Research Dashboard
        </h1>
        <Button className="bg-[#6366f1] hover:bg-[#5558e3] text-white rounded-lg px-4 py-2.5 text-sm">
          <Upload size={16} className="mr-2" />
          Upload Paper
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="RESEARCH PAPERS"
          value={20}
          change="+12% this month"
          icon={
            <BookOpen size={18} className="text-[#3b82f6]" />
          }
          iconBgColor="bg-blue-50"
          blobColor="bg-blue-200"
          index={0}
        />
        <StatCard
          label="KNOWLEDGE NODES"
          value={115}
          change="+8% this week"
          icon={
            <Network size={18} className="text-[#a855f7]" />
          }
          iconBgColor="bg-purple-50"
          blobColor="bg-purple-200"
          index={1}
        />
        <StatCard
          label="RELATIONSHIPS"
          value={92}
          change="+15% this week"
          icon={<Link2 size={18} className="text-[#10b981]" />}
          iconBgColor="bg-green-50"
          blobColor="bg-green-200"
          index={2}
        />
        <StatCard
          label="RECENT ACTIVITY"
          value={7}
          change="Past 7 days"
          icon={
            <TrendingUp size={18} className="text-[#f97316]" />
          }
          iconBgColor="bg-orange-50"
          blobColor="bg-orange-200"
          index={3}
        />
      </div>
    </div>
  );
}