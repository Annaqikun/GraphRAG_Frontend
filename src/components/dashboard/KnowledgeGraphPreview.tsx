import { Network } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  color: string;
  vx: number;
  vy: number;
}

export function KnowledgeGraphPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    // Initialize nodes in a circular pattern
    const nodeCount = 18;
    const centerX = 300;
    const centerY = 200;
    const radius = 100;

    const colors = ["#6366f1", "#a855f7", "#3b82f6", "#8b5cf6", "#ec4899"];

    const initialNodes: Node[] = Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      return {
        id: i,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      };
    });

    setNodes(initialNodes);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      setNodes((prevNodes) => {
        const updatedNodes = prevNodes.map((node) => {
          // Apply gentle drift
          let newX = node.x + node.vx;
          let newY = node.y + node.vy;

          // Bounce off edges
          if (newX < 20 || newX > canvas.width - 20) {
            node.vx *= -1;
            newX = node.x + node.vx;
          }
          if (newY < 20 || newY > canvas.height - 20) {
            node.vy *= -1;
            newY = node.y + node.vy;
          }

          return { ...node, x: newX, y: newY };
        });

        // Draw connections
        ctx.strokeStyle = "rgba(200, 200, 220, 0.15)";
        ctx.lineWidth = 1;
        updatedNodes.forEach((node, i) => {
          updatedNodes.slice(i + 1).forEach((otherNode) => {
            const dx = otherNode.x - node.x;
            const dy = otherNode.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          });
        });

        // Draw nodes
        updatedNodes.forEach((node) => {
          // Outer glow
          ctx.beginPath();
          ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = node.color + "20";
          ctx.fill();

          // Inner circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();
        });

        return updatedNodes;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-gray-900 mb-0.5">Knowledge Graph Preview</h3>
          <p className="text-xs text-gray-500">
            Interactive visualization of your research connections
          </p>
        </div>
        <Button
          variant="ghost"
          className="text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          <Network size={14} className="mr-1.5" />
          Full View
        </Button>
      </div>

      {/* Canvas */}
      <div className="p-6 bg-gradient-to-br from-gray-50 to-white flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full h-full"
        >
          <canvas
            ref={canvasRef}
            width={600}
            height={380}
            className="w-full h-full rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
}
