import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import {
  Clock,
  FileEdit,
  FolderOpen,
  BookOpen,
  Trash2,
  Star,
  Search,
  Grid3x3,
  List,
  Filter,
  MoreVertical,
  FileText,
  Image as ImageIcon,
  Mic,
  File,
  Download,
  Share2,
  Archive,
  StarOff,
  Calendar,
  User,
  Tag,
  Eye,
  Copy,
  Move,
  TrendingUp,
  FolderPlus,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type WorkspaceTab = "recent" | "drafts" | "projects" | "resources" | "trash" | "starred";
type ViewMode = "grid" | "list";

interface WorkspaceItem {
  id: string;
  name: string;
  type: "document" | "image" | "audio" | "folder";
  size: string;
  lastModified: string;
  author: string;
  starred: boolean;
  tags: string[];
  thumbnail?: string;
  progress?: number; // For projects/folders
  status?: "active" | "paused" | "completed" | "archived";
}

interface WorkspaceProps {
  activeTab?: WorkspaceTab;
  onTabChange?: (tab: WorkspaceTab) => void;
}

export function Workspace({ activeTab: controlledTab, onTabChange }: WorkspaceProps = {}) {
  const [internalTab, setInternalTab] = useState<WorkspaceTab>("recent");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Use controlled tab if provided, otherwise use internal state
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (tab: WorkspaceTab) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  // Mock data for different workspace sections
  const workspaceData: Record<WorkspaceTab, WorkspaceItem[]> = {
    recent: [
      {
        id: "1",
        name: "Security Assessment Q4 2024",
        type: "document",
        size: "2.4 MB",
        lastModified: "2 hours ago",
        author: "John Smith",
        starred: true,
        tags: ["Security", "Q4", "Priority"],
      },
      {
        id: "2",
        name: "Project Phoenix Timeline",
        type: "document",
        size: "1.8 MB",
        lastModified: "5 hours ago",
        author: "Sarah Johnson",
        starred: false,
        tags: ["Project", "Timeline"],
      },
      {
        id: "3",
        name: "Intelligence Report Images",
        type: "folder",
        size: "15.2 MB",
        lastModified: "1 day ago",
        author: "Mike Chen",
        starred: true,
        tags: ["Intelligence", "Images"],
      },
      {
        id: "4",
        name: "Briefing Audio Recording",
        type: "audio",
        size: "45.6 MB",
        lastModified: "2 days ago",
        author: "Emma Wilson",
        starred: false,
        tags: ["Briefing", "Audio"],
      },
      {
        id: "5",
        name: "Satellite Imagery Analysis",
        type: "image",
        size: "8.3 MB",
        lastModified: "3 days ago",
        author: "David Lee",
        starred: true,
        tags: ["Satellite", "Analysis"],
      },
      {
        id: "6",
        name: "Risk Assessment Framework",
        type: "document",
        size: "3.1 MB",
        lastModified: "4 days ago",
        author: "Lisa Anderson",
        starred: false,
        tags: ["Risk", "Framework"],
      },
    ],
    drafts: [
      {
        id: "7",
        name: "Incident Report Draft - Cyber Attack",
        type: "document",
        size: "1.2 MB",
        lastModified: "1 hour ago",
        author: "John Smith",
        starred: false,
        tags: ["Draft", "Incident", "Cyber"],
      },
      {
        id: "8",
        name: "Budget Proposal Q1 2025",
        type: "document",
        size: "890 KB",
        lastModified: "3 hours ago",
        author: "Sarah Johnson",
        starred: true,
        tags: ["Draft", "Budget"],
      },
      {
        id: "9",
        name: "Infrastructure Analysis Notes",
        type: "document",
        size: "654 KB",
        lastModified: "1 day ago",
        author: "Mike Chen",
        starred: false,
        tags: ["Draft", "Infrastructure"],
      },
    ],
    projects: [
      {
        id: "10",
        name: "Project Phoenix",
        type: "folder",
        size: "125.4 MB",
        lastModified: "1 day ago",
        author: "Team Alpha",
        starred: true,
        tags: ["Active", "Priority"],
        progress: 78,
        status: "active",
      },
      {
        id: "11",
        name: "Operation Nightfall",
        type: "folder",
        size: "89.2 MB",
        lastModified: "3 days ago",
        author: "Team Bravo",
        starred: true,
        tags: ["Active", "Classified"],
        progress: 45,
        status: "active",
      },
      {
        id: "12",
        name: "Infrastructure Review 2024",
        type: "folder",
        size: "67.8 MB",
        lastModified: "1 week ago",
        author: "Team Charlie",
        starred: false,
        tags: ["Review", "Infrastructure"],
        progress: 92,
        status: "active",
      },
      {
        id: "13",
        name: "Cyber Defense Initiative",
        type: "folder",
        size: "143.6 MB",
        lastModified: "2 weeks ago",
        author: "Team Delta",
        starred: true,
        tags: ["Security", "Cyber"],
        progress: 100,
        status: "completed",
      },
    ],
    resources: [
      {
        id: "14",
        name: "Standard Operating Procedures",
        type: "document",
        size: "5.2 MB",
        lastModified: "1 month ago",
        author: "Admin",
        starred: true,
        tags: ["SOP", "Reference"],
      },
      {
        id: "15",
        name: "Training Materials",
        type: "folder",
        size: "234.5 MB",
        lastModified: "2 months ago",
        author: "Training Dept",
        starred: false,
        tags: ["Training", "Resources"],
      },
      {
        id: "16",
        name: "Policy Documents",
        type: "folder",
        size: "45.7 MB",
        lastModified: "3 months ago",
        author: "Admin",
        starred: true,
        tags: ["Policy", "Reference"],
      },
    ],
    trash: [
      {
        id: "17",
        name: "Old Report 2023",
        type: "document",
        size: "2.1 MB",
        lastModified: "1 week ago",
        author: "John Smith",
        starred: false,
        tags: ["Deleted"],
      },
      {
        id: "18",
        name: "Outdated Analysis",
        type: "document",
        size: "1.5 MB",
        lastModified: "2 weeks ago",
        author: "Sarah Johnson",
        starred: false,
        tags: ["Deleted"],
      },
    ],
    starred: [
      {
        id: "1",
        name: "Security Assessment Q4 2024",
        type: "document",
        size: "2.4 MB",
        lastModified: "2 hours ago",
        author: "John Smith",
        starred: true,
        tags: ["Security", "Q4", "Priority"],
      },
      {
        id: "3",
        name: "Intelligence Report Images",
        type: "folder",
        size: "15.2 MB",
        lastModified: "1 day ago",
        author: "Mike Chen",
        starred: true,
        tags: ["Intelligence", "Images"],
      },
      {
        id: "5",
        name: "Satellite Imagery Analysis",
        type: "image",
        size: "8.3 MB",
        lastModified: "3 days ago",
        author: "David Lee",
        starred: true,
        tags: ["Satellite", "Analysis"],
      },
      {
        id: "10",
        name: "Project Phoenix",
        type: "folder",
        size: "125.4 MB",
        lastModified: "1 day ago",
        author: "Team Alpha",
        starred: true,
        tags: ["Active", "Priority"],
      },
    ],
  };

  const tabs = [
    { id: "recent" as WorkspaceTab, label: "Recent", icon: Clock },
    { id: "drafts" as WorkspaceTab, label: "Drafts", icon: FileEdit },
    { id: "projects" as WorkspaceTab, label: "All Projects", icon: FolderOpen },
    { id: "resources" as WorkspaceTab, label: "Resources", icon: BookOpen },
    { id: "starred" as WorkspaceTab, label: "Starred", icon: Star },
    { id: "trash" as WorkspaceTab, label: "Trash", icon: Trash2 },
  ];

  const getItemIcon = (type: string) => {
    switch (type) {
      case "document":
        return FileText;
      case "image":
        return ImageIcon;
      case "audio":
        return Mic;
      case "folder":
        return FolderOpen;
      default:
        return File;
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case "document":
        return "text-blue-500 bg-gradient-to-br from-blue-500/10 to-blue-600/5";
      case "image":
        return "text-purple-500 bg-gradient-to-br from-purple-500/10 to-purple-600/5";
      case "audio":
        return "text-green-500 bg-gradient-to-br from-green-500/10 to-green-600/5";
      case "folder":
        return "text-orange-500 bg-gradient-to-br from-orange-500/10 to-orange-600/5";
      default:
        return "text-gray-500 bg-gradient-to-br from-gray-500/10 to-gray-600/5";
    }
  };

  const getItemGradient = (type: string) => {
    switch (type) {
      case "document":
        return "from-blue-500/5 to-transparent";
      case "image":
        return "from-purple-500/5 to-transparent";
      case "audio":
        return "from-green-500/5 to-transparent";
      case "folder":
        return "from-orange-500/5 to-transparent";
      default:
        return "from-gray-500/5 to-transparent";
    }
  };

  const getProgressColor = (progress?: number, status?: string) => {
    if (status === "completed" || (progress && progress >= 100)) {
      return "bg-green-500";
    } else if (status === "paused") {
      return "bg-yellow-500";
    } else if (progress && progress >= 75) {
      return "bg-blue-500";
    } else if (progress && progress >= 50) {
      return "bg-cyan-500";
    } else if (progress && progress >= 25) {
      return "bg-orange-500";
    }
    return "bg-primary";
  };

  const currentItems = workspaceData[activeTab];
  const filteredItems = currentItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get statistics for current tab
  const getTabStats = () => {
    const total = currentItems.length;
    const starred = currentItems.filter(item => item.starred).length;
    const totalSize = currentItems.reduce((acc, item) => {
      const sizeNum = parseFloat(item.size);
      const unit = item.size.includes('MB') ? 1 : item.size.includes('GB') ? 1024 : 0.001;
      return acc + (sizeNum * unit);
    }, 0);
    return { total, starred, totalSize: totalSize.toFixed(1) };
  };

  const stats = getTabStats();

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-muted/10">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="mb-0">Workspace</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your documents, projects, and resources
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <FolderPlus className="w-4 h-4" />
              New Project
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-3 gap-3 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-3 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Items</p>
                <p className="text-xl">{stats.total}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <File className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-yellow-500/5 to-transparent border-yellow-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Starred</p>
                <p className="text-xl">{stats.starred}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Storage</p>
                <p className="text-xl">{stats.totalSize} MB</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const count = workspaceData[tab.id].length;
            const isActive = activeTab === tab.id;
            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className={`gap-2 relative overflow-hidden transition-all ${
                    isActive ? "shadow-sm" : "hover:shadow-sm"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? "text-primary" : ""}`} />
                  <span className="relative z-10">{tab.label}</span>
                  <Badge 
                    variant="secondary" 
                    className={`ml-1 relative z-10 ${
                      isActive ? "bg-primary/20 text-primary border-primary/30" : ""
                    }`}
                  >
                    {count}
                  </Badge>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in workspace..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="p-12 text-center bg-gradient-to-br from-card to-muted/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6"
                >
                  {tabs.find((t) => t.id === activeTab)?.icon && (
                    <div>
                      {(() => {
                        const Icon = tabs.find((t) => t.id === activeTab)!.icon;
                        return <Icon className="w-10 h-10 text-primary" />;
                      })()}
                    </div>
                  )}
                </motion.div>
                <h3 className="mb-2">No items found</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  {searchQuery
                    ? `No items match "${searchQuery}"`
                    : `Your ${activeTab} section is empty`}
                </p>
                {!searchQuery && (
                  <Button variant="outline" className="gap-2">
                    <FolderPlus className="w-4 h-4" />
                    Create New Item
                  </Button>
                )}
              </Card>
            </motion.div>
          ) : viewMode === "grid" ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredItems.map((item, index) => {
              const Icon = getItemIcon(item.type);
              const colorClass = getItemColor(item.type);
              const gradientClass = getItemGradient(item.type);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="p-4 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden border-2 hover:border-primary/20">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    
                    {/* Quick Actions Bar */}
                    <motion.div 
                      className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      initial={{ x: 20 }}
                      whileHover={{ x: 0 }}
                    >
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Move className="w-4 h-4 mr-2" />
                            Move
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {item.starred ? (
                              <>
                                <StarOff className="w-4 h-4 mr-2" />
                                Remove Star
                              </>
                            ) : (
                              <>
                                <Star className="w-4 h-4 mr-2" />
                                Add Star
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.div>

                    <div className="relative z-[1]">
                      <div className="flex items-start justify-between mb-4">
                        <motion.div 
                          className={`w-14 h-14 rounded-xl ${colorClass} flex items-center justify-center shadow-sm`}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Icon className="w-7 h-7" />
                        </motion.div>
                        {item.starred && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          </motion.div>
                        )}
                      </div>

                      <h4 className="text-sm line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                        {item.name}
                      </h4>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="w-3.5 h-3.5" />
                          <span className="truncate">{item.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {item.lastModified}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <File className="w-3.5 h-3.5" />
                          {item.size}
                        </div>
                      </div>

                      {/* Progress Bar for Projects */}
                      {item.progress !== undefined && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs">{item.progress}%</span>
                          </div>
                          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${getProgressColor(item.progress, item.status)}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
                            />
                          </div>
                          {item.status && (
                            <Badge 
                              variant="secondary" 
                              className={`text-xs mt-2 ${
                                item.status === "completed" 
                                  ? "bg-green-500/10 text-green-600 border-green-500/20" 
                                  : item.status === "active"
                                  ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                  : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                              }`}
                            >
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary" 
                            className="text-xs px-2 py-0.5 bg-muted/50 hover:bg-muted transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 2 && (
                          <Badge 
                            variant="secondary" 
                            className="text-xs px-2 py-0.5 bg-muted/50"
                          >
                            +{item.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-2">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-muted/50 to-muted/30 border-b-2 border-border">
                    <tr>
                      <th className="text-left p-4 text-sm">Name</th>
                      <th className="text-left p-4 text-sm">Author</th>
                      <th className="text-left p-4 text-sm">Modified</th>
                      <th className="text-left p-4 text-sm">Size</th>
                      <th className="text-left p-4 text-sm">Tags</th>
                      <th className="text-right p-4 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredItems.map((item, index) => {
                        const Icon = getItemIcon(item.type);
                        const colorClass = getItemColor(item.type);
                        return (
                          <motion.tr
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.02 }}
                            className="border-b border-border hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all cursor-pointer group"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <motion.div 
                                  className={`w-11 h-11 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0 shadow-sm`}
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <Icon className="w-5 h-5" />
                                </motion.div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm group-hover:text-primary transition-colors">
                                    {item.name}
                                  </span>
                                  {item.starred && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring" }}
                                    >
                                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <User className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{item.author}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{item.lastModified}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <File className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{item.size}</span>
                              </div>
                              {/* Progress in list view */}
                              {item.progress !== undefined && (
                                <div className="mt-2 max-w-[150px]">
                                  <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                      className={`h-full rounded-full ${getProgressColor(item.progress, item.status)}`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${item.progress}%` }}
                                      transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
                                    />
                                  </div>
                                  <span className="text-xs text-muted-foreground mt-1">{item.progress}%</span>
                                </div>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1.5">
                                {item.tags.slice(0, 2).map((tag, idx) => (
                                  <Badge 
                                    key={idx} 
                                    variant="secondary" 
                                    className="text-xs px-2 py-0.5 bg-muted/50 hover:bg-muted transition-colors"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                                {item.tags.length > 2 && (
                                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                    +{item.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex justify-end gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreVertical className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Copy className="w-4 h-4 mr-2" />
                                      Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Move className="w-4 h-4 mr-2" />
                                      Move
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Share2 className="w-4 h-4 mr-2" />
                                      Share
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      {item.starred ? (
                                        <>
                                          <StarOff className="w-4 h-4 mr-2" />
                                          Remove Star
                                        </>
                                      ) : (
                                        <>
                                          <Star className="w-4 h-4 mr-2" />
                                          Add Star
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
