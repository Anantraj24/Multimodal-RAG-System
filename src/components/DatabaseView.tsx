import { useState } from "react";
import { Search, Filter, Download, Eye, Trash2, FileText, Image as ImageIcon, Music, Video, File, Grid3x3, List, Calendar, Tag, FolderOpen, Plus, MoreVertical, Star, Folder, ChevronRight, Home as HomeIcon, FolderPlus, Clock, History } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { VersionHistory } from "./VersionHistory";

interface DatabaseFolder {
  id: string;
  name: string;
  type: "operation" | "topic" | "person" | "location";
  description: string;
  fileCount: number;
  color: string;
  icon: string;
  createdDate: Date;
  classification: "Public" | "Confidential" | "Secret" | "Top Secret";
}

interface DatabaseFile {
  id: string;
  name: string;
  type: "pdf" | "image" | "audio" | "video" | "document";
  folderId: string | null;
  size: string;
  uploadDate: Date;
  lastModified: Date;
  tags: string[];
  thumbnail?: string;
  description?: string;
  classification: "Public" | "Confidential" | "Secret" | "Top Secret";
  uploadedBy: string;
}

// Mock folders
const generateFolders = (): DatabaseFolder[] => {
  return [
    {
      id: "F-001",
      name: "Operation Phoenix",
      type: "operation",
      description: "Strategic implementation and phase 2 development",
      fileCount: 8,
      color: "text-orange-500",
      icon: "🔥",
      createdDate: new Date(2024, 6, 1),
      classification: "Secret"
    },
    {
      id: "F-002",
      name: "Cyber Threat Analysis 2024",
      type: "topic",
      description: "Ongoing cybersecurity threats and mitigation strategies",
      fileCount: 12,
      color: "text-red-500",
      icon: "🛡️",
      createdDate: new Date(2024, 7, 15),
      classification: "Top Secret"
    },
    {
      id: "F-003",
      name: "Surveillance - Northern Sector",
      type: "location",
      description: "Field operations and reconnaissance in northern region",
      fileCount: 15,
      color: "text-blue-500",
      icon: "📍",
      createdDate: new Date(2024, 8, 1),
      classification: "Secret"
    },
    {
      id: "F-004",
      name: "Subject: Dr. Viktor Chen",
      type: "person",
      description: "Intelligence dossier and related surveillance",
      fileCount: 6,
      color: "text-purple-500",
      icon: "👤",
      createdDate: new Date(2024, 8, 10),
      classification: "Top Secret"
    },
    {
      id: "F-005",
      name: "Infrastructure Security",
      type: "topic",
      description: "Critical infrastructure protection and assessment",
      fileCount: 9,
      color: "text-green-500",
      icon: "🏗️",
      createdDate: new Date(2024, 7, 20),
      classification: "Confidential"
    },
    {
      id: "F-006",
      name: "Operation Dark Shield",
      type: "operation",
      description: "Counter-intelligence and defensive operations",
      fileCount: 11,
      color: "text-indigo-500",
      icon: "🛡️",
      createdDate: new Date(2024, 6, 15),
      classification: "Top Secret"
    },
    {
      id: "F-007",
      name: "Strategic Planning Q3-Q4",
      type: "topic",
      description: "Quarterly strategic initiatives and roadmap",
      fileCount: 7,
      color: "text-cyan-500",
      icon: "📊",
      createdDate: new Date(2024, 7, 1),
      classification: "Confidential"
    },
    {
      id: "F-008",
      name: "Subject: Sarah Martinez",
      type: "person",
      description: "Personnel file and security clearance documentation",
      fileCount: 4,
      color: "text-pink-500",
      icon: "👤",
      createdDate: new Date(2024, 8, 5),
      classification: "Confidential"
    }
  ];
};

// Mock database files with folder assignments
const generateDatabaseFiles = (): DatabaseFile[] => {
  return [
    {
      id: "DB-001",
      name: "Cybersecurity_Assessment_Q3_2024.pdf",
      type: "pdf",
      folderId: "F-002",
      size: "4.2 MB",
      uploadDate: new Date(2024, 9, 1),
      lastModified: new Date(2024, 9, 1),
      tags: ["Security", "Q3", "Assessment", "2024"],
      description: "Comprehensive cybersecurity assessment for Q3 2024",
      classification: "Confidential",
      uploadedBy: "supervisor"
    },
    {
      id: "DB-002",
      name: "Surveillance_Location_A_14Oct.jpg",
      type: "image",
      folderId: "F-003",
      size: "2.8 MB",
      uploadDate: new Date(2024, 9, 14),
      lastModified: new Date(2024, 9, 14),
      tags: ["Surveillance", "Location A", "October"],
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
      description: "Surveillance image from Location A captured on October 14",
      classification: "Secret",
      uploadedBy: "anantraj"
    },
    {
      id: "DB-003",
      name: "Strategic_Implementation_Plan_2024.pdf",
      type: "pdf",
      folderId: "F-001",
      size: "6.5 MB",
      uploadDate: new Date(2024, 7, 15),
      lastModified: new Date(2024, 8, 22),
      tags: ["Strategy", "Planning", "2024", "Implementation"],
      description: "Strategic implementation plan for Operation Phoenix",
      classification: "Confidential",
      uploadedBy: "admin"
    },
    {
      id: "DB-004",
      name: "Intelligence_Briefing_Audio_Sept24.mp3",
      type: "audio",
      folderId: "F-002",
      size: "15.3 MB",
      uploadDate: new Date(2024, 8, 24),
      lastModified: new Date(2024, 8, 24),
      tags: ["Audio", "Briefing", "Intelligence", "September"],
      description: "Audio recording of cyber threat intelligence briefing",
      classification: "Secret",
      uploadedBy: "supervisor"
    },
    {
      id: "DB-005",
      name: "Infrastructure_Diagram_v2.png",
      type: "image",
      folderId: "F-001",
      size: "1.9 MB",
      uploadDate: new Date(2024, 9, 10),
      lastModified: new Date(2024, 9, 12),
      tags: ["Infrastructure", "Diagram", "Technical"],
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      description: "Phoenix operation infrastructure architecture diagram",
      classification: "Confidential",
      uploadedBy: "anantraj"
    },
    {
      id: "DB-006",
      name: "Threat_Analysis_Report_October.pdf",
      type: "pdf",
      folderId: "F-002",
      size: "3.7 MB",
      uploadDate: new Date(2024, 9, 5),
      lastModified: new Date(2024, 9, 8),
      tags: ["Threat", "Analysis", "October", "Intelligence"],
      description: "Detailed threat analysis and assessment report",
      classification: "Top Secret",
      uploadedBy: "supervisor"
    },
    {
      id: "DB-007",
      name: "Meeting_Recording_Q3_Review.mp4",
      type: "video",
      folderId: "F-007",
      size: "245 MB",
      uploadDate: new Date(2024, 8, 30),
      lastModified: new Date(2024, 8, 30),
      tags: ["Meeting", "Video", "Q3", "Review"],
      description: "Video recording of Q3 strategic planning review",
      classification: "Confidential",
      uploadedBy: "admin"
    },
    {
      id: "DB-008",
      name: "Field_Report_Northern_Region.jpg",
      type: "image",
      folderId: "F-003",
      size: "3.1 MB",
      uploadDate: new Date(2024, 9, 8),
      lastModified: new Date(2024, 9, 8),
      tags: ["Field Report", "Northern Region", "Reconnaissance"],
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      description: "Field reconnaissance report from northern region",
      classification: "Secret",
      uploadedBy: "anantraj"
    },
    {
      id: "DB-009",
      name: "Budget_Allocation_FY2024.pdf",
      type: "pdf",
      folderId: "F-007",
      size: "2.1 MB",
      uploadDate: new Date(2024, 6, 10),
      lastModified: new Date(2024, 8, 15),
      tags: ["Budget", "Finance", "FY2024"],
      description: "Fiscal year 2024 budget allocation document",
      classification: "Confidential",
      uploadedBy: "admin"
    },
    {
      id: "DB-010",
      name: "Encrypted_Communications_Log.pdf",
      type: "pdf",
      folderId: "F-006",
      size: "5.4 MB",
      uploadDate: new Date(2024, 9, 12),
      lastModified: new Date(2024, 9, 13),
      tags: ["Communications", "Encrypted", "Log"],
      description: "Operation Dark Shield encrypted communications log",
      classification: "Top Secret",
      uploadedBy: "supervisor"
    },
    {
      id: "DB-011",
      name: "Satellite_Imagery_Sector_7.jpg",
      type: "image",
      folderId: "F-003",
      size: "8.7 MB",
      uploadDate: new Date(2024, 9, 13),
      lastModified: new Date(2024, 9, 13),
      tags: ["Satellite", "Imagery", "Sector 7"],
      thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
      description: "High-resolution satellite imagery of northern sector",
      classification: "Top Secret",
      uploadedBy: "supervisor"
    },
    {
      id: "DB-012",
      name: "Training_Module_Security_Protocols.pdf",
      type: "pdf",
      folderId: "F-005",
      size: "3.9 MB",
      uploadDate: new Date(2024, 8, 5),
      lastModified: new Date(2024, 8, 5),
      tags: ["Training", "Security", "Protocols"],
      description: "Infrastructure security protocols training module",
      classification: "Confidential",
      uploadedBy: "admin"
    },
    {
      id: "DB-013",
      name: "Data_Center_Surveillance.jpg",
      type: "image",
      folderId: "F-005",
      size: "4.2 MB",
      uploadDate: new Date(2024, 9, 11),
      lastModified: new Date(2024, 9, 11),
      tags: ["Data Center", "Surveillance", "Security"],
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      description: "Security surveillance of critical infrastructure",
      classification: "Secret",
      uploadedBy: "anantraj"
    },
    {
      id: "DB-014",
      name: "Risk_Assessment_Framework.pdf",
      type: "pdf",
      folderId: "F-005",
      size: "4.8 MB",
      uploadDate: new Date(2024, 8, 18),
      lastModified: new Date(2024, 9, 2),
      tags: ["Risk", "Assessment", "Framework"],
      description: "Infrastructure risk assessment framework",
      classification: "Confidential",
      uploadedBy: "supervisor"
    },
    {
      id: "DB-015",
      name: "Emergency_Response_Protocol.mp3",
      type: "audio",
      folderId: "F-006",
      size: "8.9 MB",
      uploadDate: new Date(2024, 9, 6),
      lastModified: new Date(2024, 9, 6),
      tags: ["Emergency", "Response", "Protocol"],
      description: "Dark Shield operation emergency protocols",
      classification: "Confidential",
      uploadedBy: "admin"
    },
    {
      id: "DB-016",
      name: "Network_Topology_Map.png",
      type: "image",
      folderId: "F-005",
      size: "2.3 MB",
      uploadDate: new Date(2024, 9, 9),
      lastModified: new Date(2024, 9, 10),
      tags: ["Network", "Topology", "Infrastructure"],
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      description: "Complete network topology and infrastructure map",
      classification: "Secret",
      uploadedBy: "anantraj"
    },
    {
      id: "DB-017",
      name: "Subject_Profile_Viktor_Chen.pdf",
      type: "pdf",
      folderId: "F-004",
      size: "3.2 MB",
      uploadDate: new Date(2024, 8, 10),
      lastModified: new Date(2024, 9, 5),
      tags: ["Profile", "Intelligence", "Subject"],
      description: "Comprehensive intelligence profile of Dr. Viktor Chen",
      classification: "Top Secret",
      uploadedBy: "supervisor"
    },
    {
      id: "DB-018",
      name: "Chen_Surveillance_Sept15.jpg",
      type: "image",
      folderId: "F-004",
      size: "2.6 MB",
      uploadDate: new Date(2024, 8, 15),
      lastModified: new Date(2024, 8, 15),
      tags: ["Surveillance", "Viktor Chen", "September"],
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      description: "Surveillance image of subject Viktor Chen",
      classification: "Top Secret",
      uploadedBy: "anantraj"
    },
    {
      id: "DB-019",
      name: "Martinez_Personnel_File.pdf",
      type: "pdf",
      folderId: "F-008",
      size: "1.8 MB",
      uploadDate: new Date(2024, 8, 5),
      lastModified: new Date(2024, 8, 5),
      tags: ["Personnel", "HR", "Clearance"],
      description: "Personnel and clearance file for Sarah Martinez",
      classification: "Confidential",
      uploadedBy: "admin"
    },
    {
      id: "DB-020",
      name: "Phoenix_Timeline_Visual.png",
      type: "image",
      folderId: "F-001",
      size: "1.5 MB",
      uploadDate: new Date(2024, 9, 1),
      lastModified: new Date(2024, 9, 1),
      tags: ["Timeline", "Operation", "Phoenix"],
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      description: "Operation Phoenix project timeline visualization",
      classification: "Secret",
      uploadedBy: "supervisor"
    }
  ];
};

export function DatabaseView() {
  const [folders] = useState<DatabaseFolder[]>(generateFolders());
  const [files] = useState<DatabaseFile[]>(generateDatabaseFiles());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFile, setSelectedFile] = useState<DatabaseFile | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [versionHistoryItem, setVersionHistoryItem] = useState<{ id: string; name: string } | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const currentFolder = currentFolderId ? folders.find(f => f.id === currentFolderId) : null;

  // Filter files based on current folder and search
  const filteredFiles = files.filter((file) => {
    // Filter by current folder
    if (currentFolderId && file.folderId !== currentFolderId) {
      return false;
    }

    // If not in a folder, don't show files that belong to folders
    if (!currentFolderId && file.folderId !== null) {
      return false;
    }

    const matchesSearch = 
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTab = 
      activeTab === "all" || 
      file.type === activeTab ||
      (activeTab === "documents" && (file.type === "pdf" || file.type === "document"));

    return matchesSearch && matchesTab;
  });

  // Filter folders based on search
  const filteredFolders = folders.filter((folder) => {
    if (currentFolderId) return false; // Don't show folders when inside a folder
    
    return folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           folder.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get file icon
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "document":
        return <FileText className="w-8 h-8 text-red-500" />;
      case "image":
        return <ImageIcon className="w-8 h-8 text-blue-500" />;
      case "audio":
        return <Music className="w-8 h-8 text-purple-500" />;
      case "video":
        return <Video className="w-8 h-8 text-green-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  // Get classification badge
  const getClassificationBadge = (classification: string) => {
    const colors = {
      "Public": "bg-green-500/10 text-green-600 dark:text-green-400",
      "Confidential": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
      "Secret": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      "Top Secret": "bg-red-500/10 text-red-600 dark:text-red-400"
    };
    return <Badge className={colors[classification as keyof typeof colors] || ""}>{classification}</Badge>;
  };

  // View file details
  const viewFileDetails = (file: DatabaseFile) => {
    setSelectedFile(file);
    setIsDetailDialogOpen(true);
  };

  // Get file count by type
  const getFileCount = (type: string) => {
    const relevantFiles = currentFolderId 
      ? files.filter(f => f.folderId === currentFolderId)
      : files.filter(f => f.folderId === null);
      
    if (type === "all") return relevantFiles.length;
    if (type === "documents") return relevantFiles.filter(f => f.type === "pdf" || f.type === "document").length;
    return relevantFiles.filter(f => f.type === type).length;
  };

  // Navigate to folder
  const openFolder = (folderId: string) => {
    setCurrentFolderId(folderId);
    setSearchTerm("");
  };

  // Go back to root
  const goToRoot = () => {
    setCurrentFolderId(null);
    setSearchTerm("");
  };

  // Open version history
  const openVersionHistory = (item?: { id: string; name: string }) => {
    if (item) {
      setVersionHistoryItem(item);
    } else {
      setVersionHistoryItem(null);
    }
    setIsVersionHistoryOpen(true);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2>Database Repository</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Organized by operations, topics, and intelligence subjects
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => openVersionHistory()}>
              <History className="w-4 h-4" />
              Version History
            </Button>
            <Button variant="outline" className="gap-2">
              <FolderPlus className="w-4 h-4" />
              New Folder
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Upload Files
            </Button>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        {currentFolder && (
          <Breadcrumb className="mb-3">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={goToRoot} className="cursor-pointer flex items-center gap-1">
                  <HomeIcon className="w-3 h-3" />
                  Database
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-2">
                  <span>{currentFolder.icon}</span>
                  {currentFolder.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={currentFolder ? "Search in this folder..." : "Search folders and files..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "secondary" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* File Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card px-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all" className="gap-2">
              <FolderOpen className="w-4 h-4" />
              All ({getFileCount("all")})
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <FileText className="w-4 h-4" />
              Documents ({getFileCount("documents")})
            </TabsTrigger>
            <TabsTrigger value="image" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              Images ({getFileCount("image")})
            </TabsTrigger>
            <TabsTrigger value="audio" className="gap-2">
              <Music className="w-4 h-4" />
              Audio ({getFileCount("audio")})
            </TabsTrigger>
            <TabsTrigger value="video" className="gap-2">
              <Video className="w-4 h-4" />
              Video ({getFileCount("video")})
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* Folder View - Only shown at root level */}
            {!currentFolderId && filteredFolders.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm mb-3 flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  Folders
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredFolders.map((folder) => (
                    <Card
                      key={folder.id}
                      className="p-4 hover:shadow-lg transition-all cursor-pointer group hover:border-primary/50"
                      onClick={() => openFolder(folder.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{folder.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm truncate mb-1 group-hover:text-primary transition-colors">
                            {folder.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {folder.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs">
                              {folder.fileCount} files
                            </Badge>
                            {getClassificationBadge(folder.classification)}
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs capitalize">
                              {folder.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Files Section */}
            {filteredFiles.length === 0 && filteredFolders.length === 0 ? (
              <Card className="p-12 text-center">
                <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="mb-2">
                  {currentFolder ? "No Files in This Folder" : "No Items Found"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {currentFolder 
                    ? "This folder is empty. Upload files to get started."
                    : "No folders or files match your current search criteria."
                  }
                </p>
              </Card>
            ) : (
              <>
                {filteredFiles.length > 0 && (
                  <>
                    {!currentFolderId && (
                      <h3 className="text-sm mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Files (Not in folders)
                      </h3>
                    )}
                    
                    {/* Grid View */}
                    {viewMode === "grid" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredFiles.map((file) => (
                          <Card 
                            key={file.id} 
                            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                            onClick={() => viewFileDetails(file)}
                          >
                            {/* Thumbnail or Icon */}
                            <div className="aspect-video bg-muted relative overflow-hidden">
                              {file.thumbnail ? (
                                <img
                                  src={file.thumbnail}
                                  alt={file.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  {getFileIcon(file.type)}
                                </div>
                              )}
                              <div className="absolute top-2 right-2">
                                {getClassificationBadge(file.classification)}
                              </div>
                            </div>

                            {/* File Info */}
                            <div className="p-4">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="text-sm truncate flex-1">{file.name}</h4>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                      <MoreVertical className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="w-4 h-4 mr-2" />
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="w-4 h-4 mr-2" />
                                      Download
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => {
                                      e.stopPropagation();
                                      openVersionHistory({ id: file.id, name: file.name });
                                    }}>
                                      <Clock className="w-4 h-4 mr-2" />
                                      Version History
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Star className="w-4 h-4 mr-2" />
                                      Favorite
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              
                              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                {file.description}
                              </p>

                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{file.size}</span>
                                <span>{file.uploadDate.toLocaleDateString()}</span>
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1 mt-3">
                                {file.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {file.tags.length > 2 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{file.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* List View */}
                    {viewMode === "list" && (
                      <div className="space-y-2">
                        {filteredFiles.map((file) => (
                          <Card
                            key={file.id}
                            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => viewFileDetails(file)}
                          >
                            <div className="flex items-center gap-4">
                              {/* Thumbnail or Icon */}
                              <div className="w-16 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {file.thumbnail ? (
                                  <img
                                    src={file.thumbnail}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  getFileIcon(file.type)
                                )}
                              </div>

                              {/* File Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <h4 className="text-sm truncate">{file.name}</h4>
                                  {getClassificationBadge(file.classification)}
                                </div>
                                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                                  {file.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>{file.size}</span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {file.uploadDate.toLocaleDateString()}
                                  </span>
                                  <span>By {file.uploadedBy}</span>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={(e) => {
                                  e.stopPropagation();
                                  viewFileDetails(file);
                                }}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                  <Download className="w-4 h-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={(e) => {
                                      e.stopPropagation();
                                      openVersionHistory({ id: file.id, name: file.name });
                                    }}>
                                      <Clock className="w-4 h-4 mr-2" />
                                      Version History
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Star className="w-4 h-4 mr-2" />
                                      Favorite
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </Tabs>

      {/* File Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about this file
            </DialogDescription>
          </DialogHeader>

          {selectedFile && (
            <ScrollArea className="flex-1">
              <div className="space-y-4 pr-4">
                {/* Preview */}
                {selectedFile.thumbnail && (
                  <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={selectedFile.thumbnail}
                      alt={selectedFile.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Basic Info */}
                <div>
                  <h3 className="text-lg mb-2">{selectedFile.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedFile.description}</p>
                </div>

                {/* Folder Info */}
                {selectedFile.folderId && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Located in Folder</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{folders.find(f => f.id === selectedFile.folderId)?.icon}</span>
                      <span className="text-sm">{folders.find(f => f.id === selectedFile.folderId)?.name}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">File Type</p>
                    <div className="flex items-center gap-2">
                      {getFileIcon(selectedFile.type)}
                      <span className="text-sm capitalize">{selectedFile.type}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Classification</p>
                    {getClassificationBadge(selectedFile.classification)}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">File Size</p>
                    <p className="text-sm">{selectedFile.size}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Upload Date</p>
                    <p className="text-sm">{selectedFile.uploadDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Last Modified</p>
                    <p className="text-sm">{selectedFile.lastModified.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Uploaded By</p>
                    <p className="text-sm">{selectedFile.uploadedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">File ID</p>
                    <p className="text-sm font-mono">{selectedFile.id}</p>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedFile.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button className="gap-2">
                    <Eye className="w-4 h-4" />
                    Open File
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={() => {
                    if (selectedFile) {
                      setIsDetailDialogOpen(false);
                      openVersionHistory({ id: selectedFile.id, name: selectedFile.name });
                    }
                  }}>
                    <Clock className="w-4 h-4" />
                    Version History
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Star className="w-4 h-4" />
                    Favorite
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Version History Dialog */}
      <Dialog open={isVersionHistoryOpen} onOpenChange={setIsVersionHistoryOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Database Version History</DialogTitle>
            <DialogDescription>
              {versionHistoryItem 
                ? `All changes made to ${versionHistoryItem.name}`
                : "Complete history of all database changes"
              }
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1">
            <VersionHistory 
              itemId={versionHistoryItem?.id}
              itemName={versionHistoryItem?.name}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
