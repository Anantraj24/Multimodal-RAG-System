import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Brain, Network, Clock, Quote, Link2, Crop, GitCompare, Sparkles, Search, Upload } from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { AdaptiveQuery } from "./AdaptiveQuery";
import { KnowledgeGraph } from "./KnowledgeGraph";
import { TimelineView } from "./TimelineView";
import { ContextualSummary } from "./ContextualSummary";
import { CrossModalSearch } from "./CrossModalSearch";
import { RegionImageSearch } from "./RegionImageSearch";
import { SummaryComparison } from "./SummaryComparison";

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

interface AdvancedFeaturesProps {
  initialFeature?: string;
}

export function AdvancedFeatures({ initialFeature }: AdvancedFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<string>(initialFeature || "adaptive");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search results for demonstrations
  const performSearch = (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);

    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: "RES-001",
          type: "pdf",
          title: "Cybersecurity_Assessment_Q3_2024.pdf",
          snippet: "Comprehensive cybersecurity assessment for Q3 2024 identifying 23 security incidents in the northern sector with 85% mitigation success rate...",
          timestamp: "2024-10-05 14:30",
          relevance: 0.95,
          citations: 12,
          tags: ["Security", "Q3", "Assessment", "Critical"]
        },
        {
          id: "RES-002",
          type: "image",
          title: "Northern_Sector_Surveillance.jpg",
          snippet: "Satellite imagery showing infrastructure changes in northern sector coordinates 45.2N, 122.8W",
          timestamp: "2024-10-05 10:15",
          relevance: 0.88,
          citations: 5,
          tags: ["Surveillance", "Northern", "Satellite"]
        },
        {
          id: "RES-003",
          type: "audio",
          title: "Security_Briefing_Oct.mp3",
          snippet: "Audio recording of security briefing discussing northern sector threat assessment and elevated activity levels...",
          timestamp: "2024-10-05 16:00",
          relevance: 0.91,
          citations: 8,
          tags: ["Briefing", "Audio", "Security"]
        },
        {
          id: "RES-004",
          type: "pdf",
          title: "Threat_Analysis_Report_October.pdf",
          snippet: "Detailed threat analysis for October 2024 focusing on infrastructure security in northern regions with coordinated activity patterns...",
          timestamp: "2024-10-08 09:45",
          relevance: 0.85,
          citations: 10,
          tags: ["Threat", "Analysis", "October"]
        },
        {
          id: "RES-005",
          type: "doc",
          title: "Field_Report_Northern_Region.docx",
          snippet: "Ground-level reconnaissance report corroborating satellite observations of infrastructure modifications...",
          timestamp: "2024-10-03 11:20",
          relevance: 0.79,
          citations: 6,
          tags: ["Field", "Report", "Northern"]
        },
        {
          id: "RES-006",
          type: "image",
          title: "Infrastructure_Changes_Photo.jpg",
          snippet: "Photographic evidence of infrastructure modifications detected during surveillance operations",
          timestamp: "2024-09-28 14:15",
          relevance: 0.82,
          citations: 4,
          tags: ["Infrastructure", "Photo", "Evidence"]
        }
      ];

      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1200);
  };

  const handleRefinedQuery = (refinedQuery: string) => {
    performSearch(refinedQuery);
  };

  const features = [
    {
      id: "adaptive",
      name: "Adaptive Query",
      icon: Brain,
      color: "from-blue-500 to-indigo-500",
      description: "Refine vague queries automatically"
    },
    {
      id: "knowledge",
      name: "Knowledge Graph",
      icon: Network,
      color: "from-purple-500 to-pink-500",
      description: "Visualize connections"
    },
    {
      id: "timeline",
      name: "Event Timeline",
      icon: Clock,
      color: "from-orange-500 to-red-500",
      description: "Chronological view"
    },
    {
      id: "summary",
      name: "Contextual Summary",
      icon: Quote,
      color: "from-indigo-500 to-purple-500",
      description: "Multi-source synthesis"
    },
    {
      id: "crossmodal",
      name: "Cross-Modal Search",
      icon: Link2,
      color: "from-green-500 to-teal-500",
      description: "Link across media types"
    },
    {
      id: "region",
      name: "Region Search",
      icon: Crop,
      color: "from-pink-500 to-rose-500",
      description: "Match image regions"
    },
    {
      id: "comparison",
      name: "Document Comparison",
      icon: GitCompare,
      color: "from-cyan-500 to-blue-500",
      description: "Side-by-side analysis"
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                Advanced RAG Features
              </h2>
              <p className="text-sm text-muted-foreground">
                Cutting-edge intelligence analysis and multi-modal search capabilities
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {features.length} Features
            </Badge>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter query to test advanced features (e.g., 'security threats Q3 2024')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && performSearch(searchQuery)}
              className="flex-1"
            />
            <Button 
              onClick={() => performSearch(searchQuery)} 
              disabled={!searchQuery.trim() || isSearching}
              className="gap-2"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Selection */}
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeFeature === feature.id;
              return (
                <Button
                  key={feature.id}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`flex flex-col gap-2 h-auto py-4 ${
                    isActive ? `bg-gradient-to-br ${feature.color} text-white hover:opacity-90` : ""
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-center">
                    <div className="text-xs font-medium">{feature.name}</div>
                    <div className="text-[10px] mt-2 not-italic bg-muted/50 border border-border rounded px-2 py-1 line-clamp-2 max-w-[110px] mx-auto leading-tight">{feature.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feature Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {activeFeature === "adaptive" && (
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20">
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-blue-500" />
                  <div>
                    <h3 className="text-lg">Adaptive Query Refinement</h3>
                    <p className="text-sm text-muted-foreground">
                      AI-powered query clarification for precise results
                    </p>
                  </div>
                </div>
              </Card>
              {searchQuery ? (
                <AdaptiveQuery query={searchQuery} onRefinedQuery={handleRefinedQuery} />
              ) : (
                <Card className="p-12 text-center">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h4 className="mb-2">Enter a Query to Start</h4>
                  <p className="text-sm text-muted-foreground">
                    Type a search query above to see how adaptive refinement works
                  </p>
                </Card>
              )}
            </div>
          )}

          {activeFeature === "knowledge" && (
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <div className="flex items-center gap-3">
                  <Network className="w-6 h-6 text-purple-500" />
                  <div>
                    <h3 className="text-lg">Knowledge Graph Visualization</h3>
                    <p className="text-sm text-muted-foreground">
                      Interactive network of relationships across documents and entities
                    </p>
                  </div>
                </div>
              </Card>
              {searchResults.length > 0 ? (
                <KnowledgeGraph results={searchResults} />
              ) : (
                <Card className="p-12 text-center">
                  <Network className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h4 className="mb-2">No Results Yet</h4>
                  <p className="text-sm text-muted-foreground">
                    Perform a search to generate knowledge graph visualization
                  </p>
                </Card>
              )}
            </div>
          )}

          {activeFeature === "timeline" && (
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-orange-500" />
                  <div>
                    <h3 className="text-lg">Event Timeline Generator</h3>
                    <p className="text-sm text-muted-foreground">
                      Chronological mapping of events and incidents
                    </p>
                  </div>
                </div>
              </Card>
              {searchResults.length > 0 ? (
                <TimelineView results={searchResults} />
              ) : (
                <Card className="p-12 text-center">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h4 className="mb-2">No Events to Display</h4>
                  <p className="text-sm text-muted-foreground">
                    Search for documents to generate event timeline
                  </p>
                </Card>
              )}
            </div>
          )}

          {activeFeature === "summary" && (
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
                <div className="flex items-center gap-3">
                  <Quote className="w-6 h-6 text-indigo-500" />
                  <div>
                    <h3 className="text-lg">Contextual Summary with Citations</h3>
                    <p className="text-sm text-muted-foreground">
                      Multi-source synthesis with transparent references
                    </p>
                  </div>
                </div>
              </Card>
              <ContextualSummary />
            </div>
          )}

          {activeFeature === "crossmodal" && (
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 border-green-500/20">
                <div className="flex items-center gap-3">
                  <Link2 className="w-6 h-6 text-green-500" />
                  <div>
                    <h3 className="text-lg">Cross-Modal Reasoning</h3>
                    <p className="text-sm text-muted-foreground">
                      Find related content across text, images, and audio
                    </p>
                  </div>
                </div>
              </Card>
              <CrossModalSearch />
            </div>
          )}

          {activeFeature === "region" && (
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-pink-500/10 to-rose-500/10 border-pink-500/20">
                <div className="flex items-center gap-3">
                  <Crop className="w-6 h-6 text-pink-500" />
                  <div>
                    <h3 className="text-lg">Region-Based Image Search</h3>
                    <p className="text-sm text-muted-foreground">
                      Match specific image regions with AI-powered similarity
                    </p>
                  </div>
                </div>
              </Card>
              <RegionImageSearch />
            </div>
          )}

          {activeFeature === "comparison" && (
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <GitCompare className="w-6 h-6 text-cyan-500" />
                  <div>
                    <h3 className="text-lg">Document Summary Comparison</h3>
                    <p className="text-sm text-muted-foreground">
                      Side-by-side verification of multiple sources
                    </p>
                  </div>
                </div>
              </Card>
              <SummaryComparison />
            </div>
          )}
        </div>
      </div>

      {/* Stats Footer */}
      {searchResults.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Results Found:</span>
                <span className="ml-2 font-medium">{searchResults.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Avg Relevance:</span>
                <span className="ml-2 font-medium">
                  {Math.round((searchResults.reduce((sum, r) => sum + r.relevance, 0) / searchResults.length) * 100)}%
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Citations:</span>
                <span className="ml-2 font-medium">
                  {searchResults.reduce((sum, r) => sum + r.citations, 0)}
                </span>
              </div>
            </div>
            <Badge variant="secondary">
              Query: "{searchQuery}"
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}
