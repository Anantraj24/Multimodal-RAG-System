import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { FileText, Image as ImageIcon, Mic } from "lucide-react";

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

interface TimelineViewProps {
  results: SearchResult[];
}

export function TimelineView({ results }: TimelineViewProps) {
  // Sort results by timestamp
  const sortedResults = [...results].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "doc":
        return <FileText className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "audio":
        return <Mic className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-500";
      case "doc":
        return "bg-blue-500";
      case "image":
        return "bg-purple-500";
      case "audio":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h4>Timeline View</h4>
          <p className="text-sm text-muted-foreground">
            Chronological organization of search results
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

          {/* Timeline items */}
          <div className="space-y-6">
            {sortedResults.map((result, idx) => (
              <div key={result.id} className="relative pl-14">
                {/* Timeline dot */}
                <div className={`absolute left-4 top-2 w-5 h-5 rounded-full ${getTypeColor(result.type)} flex items-center justify-center text-white -translate-x-1/2`}>
                  {getTypeIcon(result.type)}
                </div>

                {/* Content card */}
                <Card className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="flex-1">{result.title}</h4>
                    <Badge variant="outline" className="flex-shrink-0">
                      {result.type.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {result.snippet}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {result.timestamp}
                    </span>
                    <div className="flex gap-2">
                      {result.tags.slice(0, 3).map((tag, tagIdx) => (
                        <Badge key={tagIdx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
