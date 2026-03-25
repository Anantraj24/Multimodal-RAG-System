import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { GitCompare, FileText, ArrowLeftRight, CheckCircle2, XCircle, AlertTriangle, Download } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface DocumentSummary {
  id: string;
  title: string;
  type: string;
  summary: string;
  keyPoints: string[];
  confidence: number;
  wordCount: number;
  lastModified: string;
}

export function SummaryComparison() {
  // Mock document summaries for comparison
  const summaries: DocumentSummary[] = [
    {
      id: "DOC-A",
      title: "Cybersecurity_Assessment_Q3_2024.pdf",
      type: "PDF",
      summary: "Comprehensive cybersecurity assessment for Q3 2024 identifying 23 security incidents in the northern sector. Report details mitigation strategies with 85% success rate, though 3 critical vulnerabilities remain under active investigation. Infrastructure vulnerabilities were detected through satellite surveillance and ground reconnaissance. The assessment recommends immediate protocol activation and enhanced monitoring for remaining threats.",
      keyPoints: [
        "23 security incidents identified",
        "85% mitigation success rate",
        "3 critical vulnerabilities under investigation",
        "Northern sector primary concern",
        "Enhanced monitoring recommended"
      ],
      confidence: 0.92,
      wordCount: 5420,
      lastModified: "2024-10-05"
    },
    {
      id: "DOC-B",
      title: "Threat_Analysis_Report_October.pdf",
      type: "PDF",
      summary: "Detailed threat analysis for October 2024 focusing on infrastructure security in northern regions. Analysis reveals coordinated activity patterns requiring elevated security protocols. Critical vulnerabilities have been identified and partially addressed, with ongoing investigation into 3 major threat vectors. Cross-referencing with surveillance data confirms infrastructure modifications that warrant continuous monitoring.",
      keyPoints: [
        "Infrastructure security focus",
        "Coordinated activity patterns detected",
        "3 major threat vectors identified",
        "Partial mitigation completed",
        "Continuous monitoring required"
      ],
      confidence: 0.88,
      wordCount: 4850,
      lastModified: "2024-10-08"
    }
  ];

  // Compare key points
  const comparison = {
    common: [
      "Northern sector/region security concerns",
      "3 critical/major threats identified",
      "Infrastructure vulnerabilities detected",
      "Enhanced/continuous monitoring recommended"
    ],
    uniqueToA: [
      "Specific count: 23 security incidents",
      "85% mitigation success rate metric"
    ],
    uniqueToB: [
      "Coordinated activity pattern analysis",
      "Cross-reference with surveillance data"
    ],
    conflicts: [
      {
        aspect: "Mitigation status",
        docA: "85% success rate with clear metrics",
        docB: "Partial mitigation without specific percentage"
      }
    ]
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <GitCompare className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4>Summary Comparison</h4>
            <p className="text-sm text-muted-foreground">
              Side-by-side analysis of document summaries for verification
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export Comparison
          </Button>
        </div>
      </Card>

      {/* Document Summaries Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        {summaries.map((doc, idx) => (
          <Card key={doc.id} className="p-4">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2">
                    Document {String.fromCharCode(65 + idx)}
                  </Badge>
                  <h4 className="text-sm mb-1">{doc.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {doc.type} • {doc.wordCount} words • Updated {doc.lastModified}
                  </p>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/50">
                  {Math.round(doc.confidence * 100)}%
                </Badge>
              </div>

              <Separator />

              {/* Summary */}
              <ScrollArea className="h-[200px]">
                <div className="pr-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {doc.summary}
                  </p>
                </div>
              </ScrollArea>

              <Separator />

              {/* Key Points */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Key Points:</p>
                <div className="space-y-1">
                  {doc.keyPoints.map((point, pidx) => (
                    <div key={pidx} className="flex gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Comparison Analysis */}
      <Card className="p-6">
        <h4 className="mb-4 flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4" />
          Comparative Analysis
        </h4>

        <div className="space-y-4">
          {/* Common Elements */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <p className="text-sm">Common Elements ({comparison.common.length})</p>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 space-y-2">
              {comparison.common.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/50 flex-shrink-0">
                    ✓
                  </Badge>
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Unique to Document A */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-blue-500" />
              <p className="text-sm">Unique to Document A ({comparison.uniqueToA.length})</p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 space-y-2">
              {comparison.uniqueToA.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/50 flex-shrink-0">
                    A
                  </Badge>
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Unique to Document B */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-purple-500" />
              <p className="text-sm">Unique to Document B ({comparison.uniqueToB.length})</p>
            </div>
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 space-y-2">
              {comparison.uniqueToB.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/50 flex-shrink-0">
                    B
                  </Badge>
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conflicts/Differences */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <p className="text-sm">Potential Conflicts ({comparison.conflicts.length})</p>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3 space-y-3">
              {comparison.conflicts.map((conflict, idx) => (
                <div key={idx} className="space-y-2">
                  <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/50">
                    {conflict.aspect}
                  </Badge>
                  <div className="grid grid-cols-2 gap-3 pl-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Doc A:</span>
                      <p className="text-xs mt-1">{conflict.docA}</p>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Doc B:</span>
                      <p className="text-xs mt-1">{conflict.docB}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Comparison Stats */}
      <div className="grid grid-cols-4 gap-3">
        <Card className="p-3 text-center">
          <p className="text-2xl text-green-600 mb-1">{comparison.common.length}</p>
          <p className="text-xs text-muted-foreground">Common</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl text-blue-600 mb-1">{comparison.uniqueToA.length}</p>
          <p className="text-xs text-muted-foreground">Unique A</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl text-purple-600 mb-1">{comparison.uniqueToB.length}</p>
          <p className="text-xs text-muted-foreground">Unique B</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl text-orange-600 mb-1">{comparison.conflicts.length}</p>
          <p className="text-xs text-muted-foreground">Conflicts</p>
        </Card>
      </div>
    </div>
  );
}
