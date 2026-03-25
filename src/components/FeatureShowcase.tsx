import { useState } from "react";
import { Database, History, Clock, Mic, Tag, GitCompare, Crop, Link2, Sparkles, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { TimelineView } from "./TimelineView";
import { CrossModalSearch } from "./CrossModalSearch";
import { RegionImageSearch } from "./RegionImageSearch";
import { SummaryComparison } from "./SummaryComparison";

interface FeatureShowcaseProps {
  onNavigate?: (view: string, featureId?: string) => void;
}

export function FeatureShowcase({ onNavigate }: FeatureShowcaseProps) {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [demoQuery, setDemoQuery] = useState("security threats");

  const securityFeatures = [
    {
      icon: Database,
      title: "Auto Backup System",
      description: "Automatic restore points for every edit, delete, or manipulation",
      category: "Security",
      navigateTo: "database",
    },
    {
      icon: History,
      title: "Audit Logs",
      description: "Complete traceability of all searches, uploads, and edits",
      category: "Security",
      navigateTo: "auditlog",
    },
  ];

  const intelligenceFeatures = [
    {
      icon: Link2,
      title: "Cross-Modal Reasoning",
      description: "Find related content across text, images, and audio files",
      category: "Intelligence",
      demoKey: "cross-modal",
      navigateTo: "advanced",
      featureId: "crossmodal",
    },
    {
      icon: Clock,
      title: "Event Timeline Generator",
      description: "Chronological organization of events across all files",
      category: "Intelligence",
      demoKey: "timeline",
      navigateTo: "advanced",
      featureId: "timeline",
    },
  ];

  const usabilityFeatures = [
    {
      icon: Mic,
      title: "Voice Query & Answer",
      description: "Speak your question and receive audio responses offline",
      category: "Usability",
      navigateTo: "chat",
    },
    {
      icon: Tag,
      title: "Auto-Tagging",
      description: "Automatic categorization of all uploaded files by type",
      category: "Usability",
      navigateTo: "search",
    },
    {
      icon: Crop,
      title: "Region-Based Image Search",
      description: "Match cropped or highlighted areas across all images",
      category: "Usability",
      demoKey: "region-search",
      navigateTo: "advanced",
      featureId: "region",
    },
    {
      icon: GitCompare,
      title: "Summary Comparison",
      description: "Side-by-side comparison of multiple document summaries",
      category: "Usability",
      demoKey: "summary-comparison",
      navigateTo: "advanced",
      featureId: "comparison",
    },
  ];

  const allFeatures = [...securityFeatures, ...intelligenceFeatures, ...usabilityFeatures];

  // Mock search results for demos
  const mockSearchResults = [
    {
      id: "1",
      type: "pdf",
      title: "Cybersecurity Assessment Q3 2024",
      snippet: "Comprehensive analysis of security threats...",
      timestamp: "2024-10-05 14:30",
      relevance: 0.95,
      citations: 12,
      tags: ["Security", "Q3", "2024"],
    },
    {
      id: "2",
      type: "image",
      title: "Northern Sector Surveillance",
      snippet: "Satellite imagery showing infrastructure...",
      timestamp: "2024-10-05 10:15",
      relevance: 0.88,
      citations: 5,
      tags: ["Surveillance", "Northern"],
    },
    {
      id: "3",
      type: "audio",
      title: "Security Briefing Audio",
      snippet: "Audio recording of security briefing...",
      timestamp: "2024-10-05 16:00",
      relevance: 0.82,
      citations: 8,
      tags: ["Briefing", "Audio"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3>Advanced RAG Features</h3>
        <p className="text-sm text-muted-foreground">
          Cutting-edge capabilities for intelligence analysis and security
        </p>
      </div>

      {/* Feature Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          <TabsTrigger value="search">Advanced Search</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              const hasdemo = 'demoKey' in feature;
              const hasNavigation = 'navigateTo' in feature;
              return (
                <Card 
                  key={idx} 
                  className={`p-4 transition-all group ${(hasdemo || hasNavigation) ? 'hover:shadow-lg cursor-pointer hover:border-primary/50' : 'hover:shadow-md'}`}
                  onClick={() => {
                    if (hasdemo) {
                      setActiveDemo((feature as any).demoKey);
                    } else if (hasNavigation && onNavigate) {
                      onNavigate((feature as any).navigateTo, (feature as any).featureId);
                    }
                  }}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm">{feature.title}</h4>
                        <div className="flex gap-1">
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            {feature.category}
                          </Badge>
                          {hasdemo && (
                            <Badge variant="outline" className="text-xs flex-shrink-0 gap-1">
                              <Sparkles className="w-3 h-3" />
                              Demo
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Feature Categories Summary */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl mb-1">{securityFeatures.length}</div>
              <p className="text-sm text-muted-foreground">Security Features</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl mb-1">{intelligenceFeatures.length}</div>
              <p className="text-sm text-muted-foreground">Intelligence Features</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl mb-1">{usabilityFeatures.length}</div>
              <p className="text-sm text-muted-foreground">Usability Features</p>
            </Card>
          </div>
        </TabsContent>

        {/* Intelligence Tab */}
        <TabsContent value="intelligence" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card 
              className="p-4 cursor-pointer hover:shadow-lg transition-all hover:border-primary/50 group"
              onClick={() => setActiveDemo('cross-modal')}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Link2 className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h4 className="flex items-center gap-2">
                    Cross-Modal Reasoning
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </h4>
                  <p className="text-xs text-muted-foreground">Click to see demo</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Finds related content across text documents, images, and audio files using advanced AI matching.
              </p>
              {onNavigate && (
                <Button 
                  size="sm" 
                  className="w-full gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate("advanced", "crossmodal");
                  }}
                >
                  Open Full Feature
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:shadow-lg transition-all hover:border-primary/50 group"
              onClick={() => setActiveDemo('timeline')}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h4 className="flex items-center gap-2">
                    Event Timeline
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </h4>
                  <p className="text-xs text-muted-foreground">Click to see demo</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Auto-generates chronological maps of events and incidents across all file types for temporal analysis.
              </p>
              {onNavigate && (
                <Button 
                  size="sm" 
                  className="w-full gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate("advanced", "timeline");
                  }}
                >
                  Open Full Feature
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Advanced Search Tab */}
        <TabsContent value="search" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card 
              className="p-4 cursor-pointer hover:shadow-lg transition-all hover:border-primary/50 group"
              onClick={() => setActiveDemo('region-search')}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center">
                  <Crop className="w-6 h-6 text-pink-500" />
                </div>
                <div className="flex-1">
                  <h4 className="flex items-center gap-2">
                    Region-Based Image Search
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </h4>
                  <p className="text-xs text-muted-foreground">Click to see demo</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Crop specific regions in images and find similar visual patterns across entire database with AI-powered matching.
              </p>
              {onNavigate && (
                <Button 
                  size="sm" 
                  className="w-full gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate("advanced", "region");
                  }}
                >
                  Open Full Feature
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:shadow-lg transition-all hover:border-primary/50 group"
              onClick={() => setActiveDemo('timeline')}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h4 className="flex items-center gap-2">
                    Event Timeline
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </h4>
                  <p className="text-xs text-muted-foreground">Click to see demo</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Auto-generates chronological maps of events and incidents across all file types for temporal analysis.
              </p>
              {onNavigate && (
                <Button 
                  size="sm" 
                  className="w-full gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate("advanced", "timeline");
                  }}
                >
                  Open Full Feature
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-4">
          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-all hover:border-primary/50 group"
            onClick={() => setActiveDemo('summary-comparison')}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <GitCompare className="w-6 h-6 text-cyan-500" />
              </div>
              <div className="flex-1">
                <h4 className="flex items-center gap-2">
                  Summary Comparison
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </h4>
                <p className="text-xs text-muted-foreground">Click to see demo</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Compare multiple document summaries side-by-side to identify commonalities, unique insights, and potential conflicts for verification.
            </p>
            {onNavigate && (
              <Button 
                size="sm" 
                className="w-full gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("advanced", "comparison");
                }}
              >
                Open Full Feature
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Active Demo Modal/Section */}
      {activeDemo && (
        <Card className="p-6 border-primary/50 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3>Live Demo</h3>
            <Button variant="ghost" onClick={() => setActiveDemo(null)}>
              Close Demo
            </Button>
          </div>

          {activeDemo === 'timeline' && (
            <TimelineView results={mockSearchResults} />
          )}

          {activeDemo === 'cross-modal' && (
            <CrossModalSearch />
          )}

          {activeDemo === 'region-search' && (
            <RegionImageSearch />
          )}

          {activeDemo === 'summary-comparison' && (
            <SummaryComparison />
          )}
        </Card>
      )}
    </div>
  );
}
