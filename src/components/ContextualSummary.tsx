import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FileText, Quote, ExternalLink, Copy, Download } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface Citation {
  id: string;
  source: string;
  type: "pdf" | "image" | "audio";
  page?: number;
  timestamp?: string;
  excerpt: string;
}

export function ContextualSummary() {
  // Mock contextual summary with citations
  const summary = {
    query: "What security threats were identified in Q3 2024?",
    synthesizedSummary: "Based on comprehensive analysis of multiple intelligence sources from Q3 2024, several critical security threats were identified in the northern sector. The primary concern involves infrastructure vulnerabilities detected through both satellite surveillance and ground-level reconnaissance. Cross-referencing document analysis with audio briefings reveals a coordinated pattern of activities that triggered elevated security protocols. The cybersecurity assessment highlights 23 incidents with an 85% successful mitigation rate, though 3 critical vulnerabilities remain under active investigation. Field reports corroborate satellite imagery showing unexpected infrastructure changes, while intercepted communications provide context for the timing and nature of these developments.",
    keyFindings: [
      "23 security incidents reported in Q3 2024",
      "Northern sector identified as primary area of concern",
      "Infrastructure vulnerabilities detected via satellite and ground surveillance",
      "85% mitigation success rate for identified threats",
      "3 critical vulnerabilities remain under investigation",
      "Coordinated activity patterns observed across multiple data sources"
    ],
    confidenceScore: 0.92,
    sourcesAnalyzed: 12
  };

  const citations: Citation[] = [
    {
      id: "C-001",
      source: "Cybersecurity_Assessment_Q3_2024.pdf",
      type: "pdf",
      page: 5,
      excerpt: "23 security incidents reported in the last quarter with mitigation strategies implemented at an 85% success rate..."
    },
    {
      id: "C-002",
      source: "Northern_Sector_Surveillance.jpg",
      type: "image",
      timestamp: "Oct 5, 2024 10:15",
      excerpt: "Satellite imagery revealing infrastructure changes in northern sector coordinates 45.2N, 122.8W"
    },
    {
      id: "C-003",
      source: "Security_Briefing_Oct.mp3",
      type: "audio",
      timestamp: "Oct 5, 2024 16:00",
      excerpt: "Audio transcript: 'Northern sector threat assessment indicates elevated activity levels requiring immediate protocol activation...'"
    },
    {
      id: "C-004",
      source: "Threat_Analysis_Report_October.pdf",
      type: "pdf",
      page: 12,
      excerpt: "Critical vulnerabilities identified and patched, with 3 remaining under active investigation and monitoring..."
    },
    {
      id: "C-005",
      source: "Field_Report_Northern_Region.jpg",
      type: "image",
      timestamp: "Oct 8, 2024",
      excerpt: "Ground-level reconnaissance corroborating satellite observations of infrastructure modifications"
    }
  ];

  const getCitationIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-3 h-3 text-red-500" />;
      case "image":
        return <FileText className="w-3 h-3 text-blue-500" />;
      case "audio":
        return <FileText className="w-3 h-3 text-purple-500" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary.synthesizedSummary);
    alert("Summary copied to clipboard!");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Quote className="w-5 h-5 text-indigo-500" />
              <h4>Contextual Summary</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Query: <span className="font-medium text-foreground italic">"{summary.query}"</span>
            </p>
            <div className="flex gap-3">
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/50">
                {Math.round(summary.confidenceScore * 100)}% Confidence
              </Badge>
              <Badge variant="outline">
                {summary.sourcesAnalyzed} Sources
              </Badge>
              <Badge variant="outline">
                {citations.length} Citations
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copySummary} className="gap-2">
              <Copy className="w-4 h-4" />
              Copy
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Summary Content */}
      <Card className="p-6">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {/* Synthesized Summary */}
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Synthesized Analysis
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {summary.synthesizedSummary}
              </p>
            </div>

            <Separator />

            {/* Key Findings */}
            <div>
              <h4 className="mb-3">Key Findings</h4>
              <div className="space-y-2">
                {summary.keyFindings.map((finding, idx) => (
                  <div key={idx} className="flex gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground flex-1">{finding}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Citations */}
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                <Quote className="w-4 h-4" />
                Citations & References
              </h4>
              <div className="space-y-3">
                {citations.map((citation, idx) => (
                  <Card key={citation.id} className="p-3 bg-muted/30">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="flex-shrink-0">
                        [{idx + 1}]
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getCitationIcon(citation.type)}
                          <span className="text-sm font-medium truncate">{citation.source}</span>
                        </div>
                        {citation.page && (
                          <p className="text-xs text-muted-foreground mb-1">Page {citation.page}</p>
                        )}
                        {citation.timestamp && (
                          <p className="text-xs text-muted-foreground mb-1">{citation.timestamp}</p>
                        )}
                        <p className="text-xs text-muted-foreground italic mt-2">
                          "{citation.excerpt}"
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3">
        <Card className="p-3 text-center">
          <p className="text-2xl mb-1">{summary.sourcesAnalyzed}</p>
          <p className="text-xs text-muted-foreground">Sources</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl mb-1">{citations.length}</p>
          <p className="text-xs text-muted-foreground">Citations</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl mb-1">{summary.keyFindings.length}</p>
          <p className="text-xs text-muted-foreground">Findings</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl mb-1 text-green-600">{Math.round(summary.confidenceScore * 100)}%</p>
          <p className="text-xs text-muted-foreground">Confidence</p>
        </Card>
      </div>
    </div>
  );
}
