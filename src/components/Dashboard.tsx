import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { FileText, Image as ImageIcon, Mic, Folder, TrendingUp, Clock, Sparkles, Brain, Network, Quote, Link2, Crop, GitCompare, Send, MessageSquare, Zap, FileSearch, BarChart, X } from "lucide-react";

import { SearchHistory } from "./SearchHistory";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Dashboard() {
  const [chatExpanded, setChatExpanded] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when chat history updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    // Add user message
    const newHistory = [...chatHistory, { role: "user" as const, content: chatMessage }];
    setChatHistory(newHistory);
    setChatMessage("");
    setChatExpanded(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I found 23 documents related to your query. The most relevant include the Security Assessment Report from Q3 2024 and Project Phoenix documentation.",
        "Based on the analysis, there are 3 key incidents that occurred in the specified timeframe. Would you like me to generate a detailed timeline?",
        "I've searched across all documents, images, and audio files. Here are the top 5 matches with relevance scores above 85%.",
        "The knowledge graph shows strong connections between these entities. I can visualize the relationships for better understanding.",
        "I've compared the documents and found 7 significant differences in policy changes. Would you like a detailed comparison report?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory([...newHistory, { role: "assistant", content: randomResponse }]);
    }, 1000);
  };

  const handleQuickAction = (query: string) => {
    setChatMessage(query);
    handleSendMessage();
  };
  const stats = [
    {
      icon: FileText,
      label: "Documents",
      value: "2,847",
      trend: "+12%",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: ImageIcon,
      label: "Images",
      value: "1,523",
      trend: "+8%",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Mic,
      label: "Audio Files",
      value: "342",
      trend: "+5%",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Folder,
      label: "Total Items",
      value: "4,712",
      trend: "+10%",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const recentActivity = [
    {
      user: "John Smith",
      action: "uploaded 3 documents",
      file: "Project Phoenix Report",
      time: "2 minutes ago",
    },
    {
      user: "Sarah Johnson",
      action: "searched for",
      file: "cyber attack 2024",
      time: "15 minutes ago",
    },
    {
      user: "Mike Chen",
      action: "downloaded",
      file: "Security Assessment.pdf",
      time: "1 hour ago",
    },
    {
      user: "Emma Wilson",
      action: "created timeline for",
      file: "Infrastructure Project",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjAzMjY1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="AI Technology"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50"></div>
        </div>
        <div className="relative p-8 text-primary-foreground">
          <h2 className="mb-2">Multimodal RAG System</h2>
          <p className="text-primary-foreground/90 max-w-2xl">
            Advanced intelligence analysis platform with semantic search across documents, images, and audio. 
            Built for NTRO with offline-first security and AI-powered insights.
          </p>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  {stat.trend}
                </div>
              </div>
              <div className="text-2xl mb-1">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4>Recent Activity</h4>
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">
                    {activity.user.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                    <span className="text-muted-foreground">"{activity.file}"</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6">
          <h4 className="mb-4">System Health</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Storage Used</span>
                <span>67%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[67%]"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Indexing Progress</span>
                <span>89%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[89%]"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Query Performance</span>
                <span>94%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[94%]"></div>
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span>Average Query Time</span>
                <span className="font-medium">0.3s</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span>Total Queries Today</span>
                <span className="font-medium">1,247</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Advanced RAG Features Promo */}
      <Card className="p-6 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 border-yellow-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="flex items-center gap-2">
              Advanced RAG Features
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-600 border-yellow-500/50">
                New
              </Badge>
            </h3>
            <p className="text-sm text-muted-foreground">
              Unlock powerful AI-powered analysis and intelligence capabilities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm">Adaptive Query</h4>
            </div>
            <p className="text-xs text-muted-foreground">Auto-refine vague questions</p>
          </div>

          <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-2 mb-2">
              <Network className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm">Knowledge Graph</h4>
            </div>
            <p className="text-xs text-muted-foreground">Visualize relationships</p>
          </div>

          <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-2 mb-2">
              <Quote className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm">Contextual Summary</h4>
            </div>
            <p className="text-xs text-muted-foreground">Multi-source synthesis</p>
          </div>

          <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-2 mb-2">
              <Link2 className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm">Cross-Modal Search</h4>
            </div>
            <p className="text-xs text-muted-foreground">Link across media types</p>
          </div>

          <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-2 mb-2">
              <Crop className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm">Region Search</h4>
            </div>
            <p className="text-xs text-muted-foreground">Match image regions</p>
          </div>

          <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-2 mb-2">
              <GitCompare className="w-5 h-5 text-cyan-500 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm">Doc Comparison</h4>
            </div>
            <p className="text-xs text-muted-foreground">Side-by-side analysis</p>
          </div>
        </div>

        <Button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
          <Sparkles className="w-4 h-4 mr-2" />
          Explore Advanced Features
        </Button>
      </Card>

      {/* Search History Section */}
      <SearchHistory />

      {/* Chat Assistant Bar - Fixed at bottom */}
      <div className="fixed bottom-0 left-64 right-0 z-50 pointer-events-none">
        <div className="container max-w-7xl mx-auto px-6 pb-6 pointer-events-auto">
          {/* Expanded Chat Window */}
          {chatExpanded && (
            <Card className="mb-4 shadow-2xl border-2 animate-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h4>Chat Assistant</h4>
                  <Badge variant="secondary" className="text-xs">AI Powered</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setChatExpanded(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Chat History */}
              <div 
                ref={chatContainerRef}
                className="h-[400px] overflow-y-auto p-4 space-y-4"
              >
                {chatHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <MessageSquare className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                    <h3 className="mb-2">Ask me anything</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Search documents, analyze data, generate timelines, or ask questions about your intelligence database.
                    </p>
                  </div>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      {msg.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs">U</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </Card>
          )}

          {/* Search Bar */}
          <Card className="shadow-2xl border-2 overflow-hidden">
            <div className="p-4">
              {/* Quick Actions */}
              {!chatExpanded && (
                <div className="flex gap-2 mb-3 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setChatMessage("Show me recent security incidents");
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="text-xs"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Recent Incidents
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setChatMessage("Generate knowledge graph for Project Phoenix");
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="text-xs"
                  >
                    <Network className="w-3 h-3 mr-1" />
                    Knowledge Graph
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setChatMessage("Search for documents uploaded today");
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="text-xs"
                  >
                    <FileSearch className="w-3 h-3 mr-1" />
                    Today's Docs
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setChatMessage("Show analytics dashboard");
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="text-xs"
                  >
                    <BarChart className="w-3 h-3 mr-1" />
                    Analytics
                  </Button>
                </div>
              )}

              {/* Input Area */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    onFocus={() => setChatExpanded(true)}
                    placeholder="Ask me anything... (e.g., 'Show documents about Project Phoenix' or 'Generate timeline for recent incidents')"
                    className="pr-10"
                  />
                  <MessageSquare className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    AI Assistant Online
                  </span>
                  <span>4,712 documents indexed</span>
                </div>
                <span>Press Enter to send</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom padding to prevent content from being hidden behind chat bar */}
      <div className="h-32"></div>
    </div>
  );
}
