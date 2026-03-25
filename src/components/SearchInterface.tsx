import { useState } from "react";
import { Search, Mic, Upload, Image as ImageIcon, FileText, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface SearchInterfaceProps {
  onSearch: (query: string, mode: string) => void;
  onFileUpload: () => void;
}

export function SearchInterface({ onSearch, onFileUpload }: SearchInterfaceProps) {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState("text");
  const [isListening, setIsListening] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, searchMode);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleVoiceSearch = () => {
    setIsListening(!isListening);
    // Mock voice input
    if (!isListening) {
      setTimeout(() => {
        setQuery("Show me documents about project Phoenix");
        setIsListening(false);
      }, 2000);
    }
  };

  const suggestedQueries = [
    "Show me the 2024 international development report",
    "Find email screenshots from last week",
    "Search for audio recordings mentioning cyber attack",
    "Display all reports with charts and graphs"
  ];

  return (
    <div className="space-y-4">
      {/* Search Mode Tabs */}
      <Tabs value={searchMode} onValueChange={setSearchMode} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="text" className="gap-2">
            <FileText className="w-4 h-4" />
            Text
          </TabsTrigger>
          <TabsTrigger value="image" className="gap-2">
            <ImageIcon className="w-4 h-4" />
            Image
          </TabsTrigger>
          <TabsTrigger value="audio" className="gap-2">
            <Mic className="w-4 h-4" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="semantic" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Cross-Modal
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Main Search Bar */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything... Type your question, upload a file, or speak your query"
            className="pl-10 pr-12 py-6 bg-input-background border-0"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-2 top-1/2 -translate-y-1/2 ${isListening ? "text-red-500 animate-pulse" : ""}`}
            onClick={toggleVoiceSearch}
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>

        <Button onClick={handleSearch} size="lg" className="gap-2">
          <Search className="w-5 h-5" />
          Search
        </Button>

        <Button onClick={onFileUpload} size="lg" variant="outline" className="gap-2">
          <Upload className="w-5 h-5" />
          Upload
        </Button>
      </div>

      {/* Suggested Queries */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Suggested:</span>
        {suggestedQueries.map((sq, idx) => (
          <Button
            key={idx}
            variant="secondary"
            size="sm"
            onClick={() => {
              setQuery(sq);
              onSearch(sq, searchMode);
            }}
            className="text-xs"
          >
            {sq}
          </Button>
        ))}
      </div>

      {isListening && (
        <div className="flex items-center gap-2 text-sm text-red-500 animate-pulse">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          Listening... Speak now
        </div>
      )}
    </div>
  );
}
