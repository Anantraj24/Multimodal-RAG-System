import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Brain, Sparkles, ChevronRight, Lightbulb, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface AdaptiveQueryProps {
  query: string;
  onRefinedQuery?: (refinedQuery: string) => void;
}

export function AdaptiveQuery({ query, onRefinedQuery }: AdaptiveQueryProps) {
  const [clarifications, setClarifications] = useState<string[]>([]);
  const [selectedClarifications, setSelectedClarifications] = useState<string[]>([]);

  // Generate smart clarification questions based on the query
  const generateClarifications = (query: string): string[] => {
    const lowerQuery = query.toLowerCase();
    const suggestions: string[] = [];

    if (lowerQuery.includes("security") || lowerQuery.includes("threat")) {
      suggestions.push("Which time period? (Last week, month, quarter, or year)");
      suggestions.push("Which security level? (Critical, High, Medium, or Low)");
      suggestions.push("Include related incidents?");
    }

    if (lowerQuery.includes("report") || lowerQuery.includes("document")) {
      suggestions.push("Which format? (PDF, DOC, or both)");
      suggestions.push("From which department or operation?");
      suggestions.push("Include draft versions?");
    }

    if (lowerQuery.includes("person") || lowerQuery.includes("subject")) {
      suggestions.push("Include surveillance data?");
      suggestions.push("Include communication logs?");
      suggestions.push("Show timeline of activities?");
    }

    if (lowerQuery.includes("image") || lowerQuery.includes("photo")) {
      suggestions.push("Include satellite imagery?");
      suggestions.push("Filter by location?");
      suggestions.push("Include facial recognition data?");
    }

    if (lowerQuery.includes("audio") || lowerQuery.includes("recording")) {
      suggestions.push("Include transcripts?");
      suggestions.push("Filter by speaker?");
      suggestions.push("Show sentiment analysis?");
    }

    // Generic suggestions if query is vague
    if (suggestions.length === 0 || query.split(" ").length < 3) {
      suggestions.push("Specify date range for results");
      suggestions.push("Which file types to search? (Documents, Images, Audio, or All)");
      suggestions.push("Include archived data?");
      suggestions.push("Sort by relevance or date?");
    }

    return suggestions;
  };

  // Toggle clarification selection
  const toggleClarification = (clarification: string) => {
    if (selectedClarifications.includes(clarification)) {
      setSelectedClarifications(selectedClarifications.filter(c => c !== clarification));
    } else {
      setSelectedClarifications([...selectedClarifications, clarification]);
    }
  };

  // Apply clarifications
  const applyClarifications = () => {
    const refinedQuery = `${query} [${selectedClarifications.join(", ")}]`;
    if (onRefinedQuery) {
      onRefinedQuery(refinedQuery);
    }
  };

  // Auto-generate clarifications when query changes
  useState(() => {
    if (query) {
      const newClarifications = generateClarifications(query);
      setClarifications(newClarifications);
    }
  });

  if (!query) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground py-8">
          <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Enter a query to see adaptive clarifications</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4>Adaptive Query Clarification</h4>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              The system detected your query could be refined for better results
            </p>
          </div>
        </div>

        {/* Original Query */}
        <Alert className="bg-muted/50">
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            <span className="text-xs text-muted-foreground">Original Query:</span>
            <p className="text-sm mt-1 font-medium">"{query}"</p>
          </AlertDescription>
        </Alert>

        {/* Clarification Questions */}
        <div>
          <p className="text-sm mb-3">
            Please clarify to improve search accuracy:
          </p>
          <div className="space-y-2">
            {clarifications.map((clarification, idx) => (
              <button
                key={idx}
                onClick={() => toggleClarification(clarification)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedClarifications.includes(clarification)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    selectedClarifications.includes(clarification)
                      ? "border-primary bg-primary"
                      : "border-border"
                  }`}>
                    {selectedClarifications.includes(clarification) && (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm flex-1">{clarification}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Refined Query Preview */}
        {selectedClarifications.length > 0 && (
          <Alert className="bg-green-500/10 border-green-500/50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <span className="text-xs text-muted-foreground">Refined Query:</span>
              <p className="text-sm mt-1 font-medium">
                "{query}" with {selectedClarifications.length} clarification{selectedClarifications.length > 1 ? 's' : ''}
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={applyClarifications}
            disabled={selectedClarifications.length === 0}
            className="gap-2"
          >
            Apply Clarifications
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (onRefinedQuery) onRefinedQuery(query);
            }}
          >
            Search Without Clarifications
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Suggested Clarifications</p>
            <p className="text-lg">{clarifications.length}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Selected</p>
            <p className="text-lg">{selectedClarifications.length}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Accuracy Boost</p>
            <p className="text-lg text-green-600">+{selectedClarifications.length * 15}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
