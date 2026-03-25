import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FileText, Image as ImageIcon, Music, Link2, Eye, ArrowRight } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface CrossModalMatch {
  id: string;
  type: "pdf" | "image" | "audio";
  name: string;
  matchType: "text-match" | "visual-similarity" | "audio-transcript" | "metadata-link";
  confidence: number;
  excerpt: string;
  relatedTo: string[];
  timestamp: string;
}

export function CrossModalSearch() {
  // Mock cross-modal search results
  const crossModalResults: CrossModalMatch[] = [
    {
      id: "CM-001",
      type: "pdf",
      name: "Cybersecurity_Assessment_Q3_2024.pdf",
      matchType: "text-match",
      confidence: 0.95,
      excerpt: "Security threat identified in northern sector during October surveillance...",
      relatedTo: ["Image: Northern_Sector_Surveillance.jpg", "Audio: Security_Briefing_Oct.mp3"],
      timestamp: "2024-10-05 14:30"
    },
    {
      id: "CM-002",
      type: "image",
      name: "Northern_Sector_Surveillance.jpg",
      matchType: "visual-similarity",
      confidence: 0.88,
      excerpt: "Satellite imagery showing infrastructure changes mentioned in cybersecurity report",
      relatedTo: ["PDF: Cybersecurity_Assessment_Q3_2024.pdf", "PDF: Infrastructure_Report.pdf"],
      timestamp: "2024-10-05 10:15"
    },
    {
      id: "CM-003",
      type: "audio",
      name: "Security_Briefing_Oct.mp3",
      matchType: "audio-transcript",
      confidence: 0.91,
      excerpt: "Transcript mentions 'northern sector threat assessment' aligning with report findings",
      relatedTo: ["PDF: Cybersecurity_Assessment_Q3_2024.pdf", "Image: Northern_Sector_Surveillance.jpg"],
      timestamp: "2024-10-05 16:00"
    },
    {
      id: "CM-004",
      type: "pdf",
      name: "Infrastructure_Report.pdf",
      matchType: "metadata-link",
      confidence: 0.82,
      excerpt: "Infrastructure changes documented, cross-referenced with surveillance imagery",
      relatedTo: ["Image: Northern_Sector_Surveillance.jpg"],
      timestamp: "2024-10-03 09:45"
    },
    {
      id: "CM-005",
      type: "image",
      name: "Viktor_Chen_Profile.jpg",
      matchType: "visual-similarity",
      confidence: 0.93,
      excerpt: "Subject appears in surveillance footage, linked to audio intercept",
      relatedTo: ["Audio: Intercept_Recording_Sept.mp3", "PDF: Subject_Profile_Chen.pdf"],
      timestamp: "2024-09-28 11:20"
    }
  ];

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-4 h-4 text-red-500" />;
      case "image":
        return <ImageIcon className="w-4 h-4 text-blue-500" />;
      case "audio":
        return <Music className="w-4 h-4 text-purple-500" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Get match type badge
  const getMatchTypeBadge = (matchType: string) => {
    const colors: Record<string, string> = {
      "text-match": "bg-green-500/10 text-green-600 border-green-500/50",
      "visual-similarity": "bg-blue-500/10 text-blue-600 border-blue-500/50",
      "audio-transcript": "bg-purple-500/10 text-purple-600 border-purple-500/50",
      "metadata-link": "bg-orange-500/10 text-orange-600 border-orange-500/50"
    };

    const labels: Record<string, string> = {
      "text-match": "Text Match",
      "visual-similarity": "Visual Match",
      "audio-transcript": "Audio Transcript",
      "metadata-link": "Metadata Link"
    };

    return (
      <Badge variant="outline" className={colors[matchType] || ""}>
        {labels[matchType] || matchType}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Link2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4>Cross-Modal Reasoning Results</h4>
            <p className="text-sm text-muted-foreground">
              Intelligent connections across text, images, and audio files
            </p>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {crossModalResults.length} matches
          </Badge>
        </div>
      </Card>

      {/* Results */}
      <ScrollArea className="h-[600px]">
        <div className="space-y-3 pr-4">
          {crossModalResults.map((result) => (
            <Card key={result.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    {getTypeIcon(result.type)}
                    <h4 className="text-sm truncate">{result.name}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {getMatchTypeBadge(result.matchType)}
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/50">
                      {Math.round(result.confidence * 100)}% match
                    </Badge>
                  </div>
                </div>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground italic">
                  "{result.excerpt}"
                </p>

                {/* Related Items */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <Link2 className="w-3 h-3" />
                    Related Items:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.relatedTo.map((related, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs gap-1">
                        <ArrowRight className="w-3 h-3" />
                        {related}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">{result.timestamp}</span>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Eye className="w-3 h-3" />
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Match Type Legend */}
      <Card className="p-4">
        <p className="text-sm mb-3">Match Types:</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Text Content Match</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Visual Similarity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-xs">Audio Transcript</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs">Metadata Link</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
