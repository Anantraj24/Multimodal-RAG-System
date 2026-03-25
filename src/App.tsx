import { useState, useEffect } from "react";
import { Home, Search, Upload, Settings, FileText, Shield, BarChart3, MessageSquare, Database, Sparkles, Briefcase, Clock, FileEdit, FolderOpen, BookOpen, Trash2, Star, ChevronDown, Bell, History, Users, ClipboardList, UserCog, Lock } from "lucide-react";
import { LoginPage } from "./components/LoginPage";
import { Header } from "./components/Header";
import { SearchInterface } from "./components/SearchInterface";
import { SearchResults } from "./components/SearchResults";
import { UploadZone } from "./components/UploadZone";
import { Dashboard } from "./components/Dashboard";
import { FeatureShowcase } from "./components/FeatureShowcase";
import { ChatInterface } from "./components/ChatInterface";
import { AuditLog } from "./components/AuditLog";
import { DatabaseView } from "./components/DatabaseView";
import { DatabasePasskey } from "./components/DatabasePasskey";
import { AdvancedFeatures } from "./components/AdvancedFeatures";
import { Workspace } from "./components/Workspace";
import { Notice } from "./components/Notice";
import { FileEditHistory } from "./components/FileEditHistory";
import { SearchHistory } from "./components/SearchHistory";
import { AssignedWork } from "./components/AssignedWork";
import { PermissionManagement } from "./components/PermissionManagement";
import { EmployeeManagement } from "./components/EmployeeManagement";
import { FakeWebsite } from "./components/FakeWebsite";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./components/ui/dropdown-menu";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState<"Analyst" | "Supervisor" | "Admin">("Analyst");
  const [isDummyMode, setIsDummyMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<"dashboard" | "workspace" | "search" | "features" | "advanced" | "chat" | "auditlog" | "database" | "notice" | "fileedit" | "peoplesearch" | "assigned" | "permissions" | "employees">("dashboard");
  const [workspaceTab, setWorkspaceTab] = useState<"recent" | "drafts" | "projects" | "resources" | "trash" | "starred">("recent");
  const [showUpload, setShowUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isDatabaseAuthenticated, setIsDatabaseAuthenticated] = useState(false);
  const [advancedFeatureId, setAdvancedFeatureId] = useState<string | undefined>(undefined);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Handle search
  const handleSearch = (query: string, mode: string) => {
    setSearchQuery(query);
    setCurrentView("search");
    
    // Mock search results
    const mockResults = [
      {
        id: "1",
        type: "pdf",
        title: "International Development Report 2024",
        snippet: "Comprehensive analysis of international development initiatives focusing on sustainable infrastructure and economic growth strategies across emerging markets...",
        timestamp: "2024-10-10 14:30",
        relevance: 0.95,
        citations: 12,
        tags: ["Development", "2024", "Infrastructure", "Policy"],
      },
      {
        id: "2",
        type: "image",
        title: "Email Screenshot - Project Phoenix",
        snippet: "Screenshot captured at 14:32 showing email correspondence regarding Project Phoenix timeline and budget allocation...",
        timestamp: "2024-10-12 14:32",
        relevance: 0.88,
        citations: 5,
        tags: ["Email", "Screenshot", "Project Phoenix"],
      },
      {
        id: "3",
        type: "audio",
        title: "Security Briefing - Cyber Attack Discussion",
        snippet: "Audio recording of security briefing discussing recent cyber attack patterns and mitigation strategies. Duration: 45 minutes...",
        timestamp: "2024-10-08 09:15",
        relevance: 0.82,
        citations: 8,
        tags: ["Security", "Cyber", "Briefing", "2024"],
      },
      {
        id: "4",
        type: "doc",
        title: "Meeting Notes - Infrastructure Review",
        snippet: "Detailed notes from quarterly infrastructure review meeting covering budget allocations, project timelines, and resource planning...",
        timestamp: "2024-10-05 11:00",
        relevance: 0.75,
        citations: 3,
        tags: ["Meeting", "Infrastructure", "Q3"],
      },
      {
        id: "5",
        type: "pdf",
        title: "Risk Assessment Report Q3 2024",
        snippet: "Comprehensive risk assessment covering operational, financial, and security risks with mitigation recommendations...",
        timestamp: "2024-09-30 16:45",
        relevance: 0.70,
        citations: 15,
        tags: ["Risk", "Assessment", "Q3", "Security"],
      },
    ];

    setSearchResults(mockResults);
  };

  // Handle file upload
  const handleFileUpload = () => {
    setShowUpload(true);
  };

  // Handle login
  const handleLogin = (username: string, role: "Analyst" | "Supervisor" | "Admin", isDummy?: boolean) => {
    setUserName(username);
    setUserRole(role);
    setIsDummyMode(isDummy || false);
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    setUserRole("Analyst");
    setIsDummyMode(false);
    setCurrentView("dashboard");
    setSearchQuery("");
    setSearchResults([]);
    setIsDatabaseAuthenticated(false);
  };

  // Handle database authentication
  const handleDatabaseAuthenticate = () => {
    setIsDatabaseAuthenticated(true);
  };

  // Handle database view navigation
  const handleDatabaseNavigation = () => {
    setCurrentView("database");
    // Reset authentication when switching away from database
    if (currentView !== "database") {
      setIsDatabaseAuthenticated(false);
    }
  };

  // Sidebar navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "assigned", label: "Assigned Work", icon: ClipboardList, badge: 4 },
    { id: "notice", label: "Notices", icon: Bell, badge: 3 },
    { id: "chat", label: "Chat Assistant", icon: MessageSquare },
    { id: "advanced", label: "Advanced RAG", icon: Sparkles, highlight: true },
    { id: "database", label: "Database", icon: Database, requiresAuth: true },
    { id: "search", label: "Search", icon: Search },
    { id: "features", label: "Features", icon: BarChart3 },
  ];

  // Supervisor-only navigation items
  const supervisorItems = [
    { id: "employees", label: "Employee Management", icon: UserCog },
    { id: "permissions", label: "Permission Control", icon: Lock },
  ];

  // Workspace submenu items
  const workspaceItems = [
    { id: "recent" as const, label: "Recent", icon: Clock },
    { id: "drafts" as const, label: "Drafts", icon: FileEdit },
    { id: "projects" as const, label: "All Projects", icon: FolderOpen },
    { id: "resources" as const, label: "Resources", icon: BookOpen },
    { id: "starred" as const, label: "Starred", icon: Star },
    { id: "trash" as const, label: "Trash", icon: Trash2 },
  ];

  const handleWorkspaceNavigation = (tab: typeof workspaceTab) => {
    setWorkspaceTab(tab);
    setCurrentView("workspace");
  };

  // Handle feature navigation
  const handleFeatureNavigation = (view: string, featureId?: string) => {
    setCurrentView(view as any);
    if (view === "advanced" && featureId) {
      setAdvancedFeatureId(featureId);
    } else {
      setAdvancedFeatureId(undefined);
    }
    if (view === "database") {
      handleDatabaseNavigation();
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={darkMode ? "dark" : ""}>
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  // Show fake website if dummy mode
  if (isDummyMode) {
    return (
      <div className={darkMode ? "dark" : ""}>
        <FakeWebsite userRole={userRole} userName={userName} onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${darkMode ? "dark" : ""}`}>
      <Header
        userRole={userRole}
        userName={userName}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
      />

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card p-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isHighlight = 'highlight' in item && item.highlight;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    isHighlight && currentView !== item.id 
                      ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 hover:from-yellow-500/20 hover:to-orange-500/20" 
                      : ""
                  }`}
                  onClick={() => {
                    if (item.id === "database") {
                      handleDatabaseNavigation();
                    } else {
                      setCurrentView(item.id as any);
                    }
                  }}
                >
                  <Icon className={`w-5 h-5 ${isHighlight && currentView !== item.id ? "text-yellow-500" : ""}`} />
                  {item.label}
                  {item.requiresAuth && (
                    <Shield className="w-3 h-3 ml-auto text-muted-foreground" />
                  )}
                  {'badge' in item && item.badge && item.badge > 0 && (
                    <Badge variant="secondary" className="ml-auto text-xs bg-red-500/20 text-red-600 border-red-500/50">
                      {item.badge}
                    </Badge>
                  )}
                  {isHighlight && currentView !== item.id && (
                    <Badge variant="secondary" className="ml-auto text-xs bg-yellow-500/20 text-yellow-600 border-yellow-500/50">
                      New
                    </Badge>
                  )}
                </Button>
              );
            })}

            {/* Supervisor-Only Section */}
            {userRole === "Supervisor" && (
              <>
                <div className="pt-3 pb-2">
                  <div className="px-3 mb-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Supervisor Tools
                    </p>
                  </div>
                </div>
                {supervisorItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentView === item.id ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3"
                      onClick={() => setCurrentView(item.id as any)}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                      <Shield className="w-3 h-3 ml-auto text-primary" />
                    </Button>
                  );
                })}
              </>
            )}

            {/* Workspace with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={currentView === "workspace" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                >
                  <Briefcase className="w-5 h-5" />
                  Workspace
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {workspaceItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id}>
                      <DropdownMenuItem
                        onClick={() => handleWorkspaceNavigation(item.id)}
                        className="cursor-pointer"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </DropdownMenuItem>
                      {idx === 2 && <DropdownMenuSeparator />}
                    </div>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="pt-4 border-t border-border mt-4">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={handleFileUpload}
              >
                <Upload className="w-5 h-5" />
                Upload Files
              </Button>
              <Button 
                variant={currentView === "fileedit" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => setCurrentView("fileedit")}
              >
                <History className="w-5 h-5" />
                File Edit History
              </Button>
              <Button 
                variant={currentView === "peoplesearch" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => setCurrentView("peoplesearch")}
              >
                <Users className="w-5 h-5" />
                People Search History
              </Button>
              <Button 
                variant={currentView === "auditlog" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => setCurrentView("auditlog")}
              >
                <FileText className="w-5 h-5" />
                Audit Logs
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Settings className="w-5 h-5" />
                Settings
              </Button>
            </div>
          </nav>

          {/* System Status Card */}
          <Card className="mt-6 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm">System Status</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Encryption</span>
                <span className="text-green-600">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Backup</span>
                <span className="text-green-600">Synced</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network</span>
                <span className="text-orange-600">Offline</span>
              </div>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {currentView === "workspace" ? (
            <Workspace activeTab={workspaceTab} onTabChange={setWorkspaceTab} />
          ) : currentView === "assigned" ? (
            <AssignedWork />
          ) : currentView === "employees" ? (
            <EmployeeManagement />
          ) : currentView === "permissions" ? (
            <PermissionManagement />
          ) : currentView === "notice" ? (
            <Notice />
          ) : currentView === "fileedit" ? (
            <FileEditHistory />
          ) : currentView === "peoplesearch" ? (
            <div className="container max-w-7xl mx-auto p-6">
              <SearchHistory />
            </div>
          ) : currentView === "chat" ? (
            <ChatInterface />
          ) : currentView === "advanced" ? (
            <AdvancedFeatures initialFeature={advancedFeatureId} />
          ) : currentView === "auditlog" ? (
            <AuditLog />
          ) : currentView === "database" ? (
            isDatabaseAuthenticated ? (
              <DatabaseView />
            ) : (
              <DatabasePasskey onAuthenticate={handleDatabaseAuthenticate} />
            )
          ) : (
            <div className="container max-w-7xl mx-auto p-6">
              {currentView === "dashboard" && <Dashboard />}

              {currentView === "search" && (
                <div className="space-y-6">
                  <SearchInterface onSearch={handleSearch} onFileUpload={handleFileUpload} />
                  {searchResults.length > 0 && (
                    <SearchResults results={searchResults} query={searchQuery} />
                  )}
                  {searchResults.length === 0 && (
                    <Card className="p-12 text-center">
                      <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="mb-2">Start Your Search</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Use the search interface above to query across all your documents, images, and audio files. 
                        Our AI-powered system will find relevant results and provide contextual insights.
                      </p>
                    </Card>
                  )}
                </div>
              )}

              {currentView === "features" && <FeatureShowcase onNavigate={handleFeatureNavigation} />}
            </div>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      {showUpload && <UploadZone onClose={() => setShowUpload(false)} />}
    </div>
  );
}
