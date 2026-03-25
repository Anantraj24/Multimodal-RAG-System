import { useEffect, useRef } from "react";
import { Card } from "./ui/card";

interface SearchResult {
  id: string;
  type: string;
  title: string;
  snippet: string;
  timestamp: string;
  relevance: number;
  citations: number;
  tags: string[];
}

interface KnowledgeGraphProps {
  results: SearchResult[];
}

export function KnowledgeGraph({ results }: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 500;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create nodes from results
    const nodes = results.map((result, idx) => ({
      id: result.id,
      x: Math.random() * (canvas.width - 100) + 50,
      y: Math.random() * (canvas.height - 100) + 50,
      radius: 30 + result.relevance * 20,
      type: result.type,
      title: result.title,
    }));

    // Draw connections
    ctx.strokeStyle = "rgba(100, 100, 150, 0.2)";
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.5) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach((node) => {
      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
      
      // Color based on type
      switch (node.type) {
        case "pdf":
          ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
          ctx.strokeStyle = "rgb(239, 68, 68)";
          break;
        case "doc":
          ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
          ctx.strokeStyle = "rgb(59, 130, 246)";
          break;
        case "image":
          ctx.fillStyle = "rgba(168, 85, 247, 0.2)";
          ctx.strokeStyle = "rgb(168, 85, 247)";
          break;
        case "audio":
          ctx.fillStyle = "rgba(34, 197, 94, 0.2)";
          ctx.strokeStyle = "rgb(34, 197, 94)";
          break;
        default:
          ctx.fillStyle = "rgba(156, 163, 175, 0.2)";
          ctx.strokeStyle = "rgb(156, 163, 175)";
      }
      
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Label
      ctx.fillStyle = "#333";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      const truncatedTitle = node.title.length > 15 ? node.title.substring(0, 15) + "..." : node.title;
      ctx.fillText(truncatedTitle, node.x, node.y + node.radius + 15);
    });

  }, [results]);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h4>Knowledge Graph View</h4>
          <p className="text-sm text-muted-foreground">
            Visual representation of connections between search results
          </p>
        </div>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full border border-border rounded-lg bg-card"
            style={{ height: "500px" }}
          />
        </div>

        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500/20 border-2 border-red-500"></div>
            <span>PDF Documents</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500/20 border-2 border-blue-500"></div>
            <span>Word Documents</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500/20 border-2 border-purple-500"></div>
            <span>Images</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500/20 border-2 border-green-500"></div>
            <span>Audio Files</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
