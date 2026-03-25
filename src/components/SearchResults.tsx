import { useState } from "react";
import { FileText, Image as ImageIcon, Mic, Video, ExternalLink, Calendar, Network, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { KnowledgeGraph } from "./KnowledgeGraph";
import { TimelineView } from "./TimelineView";

interface SearchResult {
  id: string;
  type: "pdf" | "image" | "audio" | "doc";
  title: string;
  snippet: string;
  timestamp: string;
  relevance: number;
  citations: number;
  tags: string[];
  thumbnail?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  const [view, setView] = useState("list");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "doc":
        return <FileText className="w-5 h-5" />;
      case "image":
        return <ImageIcon className="w-5 h-5" />;
      case "audio":
        return <Mic className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      case "doc":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "image":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
      case "audio":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3>Search Results</h3>
          <p className="text-sm text-muted-foreground">
            Found {results.length} results for "{query}"
          </p>
        </div>

        <Tabs value={view} onValueChange={setView}>
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="graph">
              <Network className="w-4 h-4 mr-2" />
              Graph
            </TabsTrigger>
            <TabsTrigger value="timeline">
              <Calendar className="w-4 h-4 mr-2" />
              Timeline
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Advanced Features Suggestion Banner */}
      <Card className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm mb-1">💡 Explore Advanced RAG Features</h4>
            <p className="text-xs text-muted-foreground">
              Navigate to "Advanced RAG" in the sidebar for AI-powered analysis: Adaptive Queries, Cross-Modal Search, Region-based Image Search, and more!
            </p>
          </div>
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-600 border-yellow-500/50">
            New
          </Badge>
        </div>
      </Card>

      {/* Results Content */}
      {view === "list" && (
        <div className="space-y-3">
          {results.map((result) => (
            <Card key={result.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                {/* Thumbnail/Icon */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center ${getTypeColor(result.type)}`}>
                  {result.thumbnail ? (
                    <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    getTypeIcon(result.type)
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="truncate">{result.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {result.snippet}
                      </p>
                    </div>
                    <Badge variant="secondary" className="flex-shrink-0">
                      {(result.relevance * 100).toFixed(0)}% match
                    </Badge>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">
                      {result.timestamp} • {result.citations} citations
                    </span>
                    <Button variant="ghost" size="sm" className="gap-2">
                      View Source
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {view === "graph" && <KnowledgeGraph results={results} />}

      {view === "timeline" && <TimelineView results={results} />}
    </div>
  );
}
