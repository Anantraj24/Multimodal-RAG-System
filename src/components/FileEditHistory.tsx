import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  FileEdit,
  Clock,
  User,
  Calendar,
  Filter,
  FileText,
  Image as ImageIcon,
  Mic,
  File,
  History,
  GitBranch,
  TrendingUp,
  ChevronRight,
  Eye,
  Download,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Save,
  FolderOpen,
  Sparkles,
  Search,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface EditRecord {
  id: string;
  file: {
    name: string;
    type: "document" | "image" | "audio" | "folder";
    path: string;
    size: string;
    version: string;
  };
  editor: {
    name: string;
    id: string;
    role: "Analyst" | "Supervisor" | "Admin";
    department: string;
    avatar: string;
  };
  editType: "created" | "modified" | "deleted" | "restored" | "renamed";
  timestamp: string;
  date: string;
  changes: {
    type: string;
    description: string;
    linesAdded?: number;
    linesRemoved?: number;
    sizeChange?: string;
  }[];
  comment?: string;
  previousVersion?: string;
  status: "saved" | "draft" | "conflict";
  collaborators?: string[];
}

export function FileEditHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterEditor, setFilterEditor] = useState<string>("all");
  const [selectedRecord, setSelectedRecord] = useState<EditRecord | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const editRecords: EditRecord[] = [
    {
      id: "1",
      file: {
        name: "Security Assessment Q4 2024.pdf",
        type: "document",
        path: "/workspace/projects/security",
        size: "2.4 MB",
        version: "v3.2",
      },
      editor: {
        name: "Anant Raj",
        id: "EMP-2024-001",
        role: "Analyst",
        department: "Intelligence Analysis",
        avatar: "AR",
      },
      editType: "modified",
      timestamp: "14:32",
      date: "2024-10-14",
      changes: [
        {
          type: "Content Update",
          description: "Updated threat assessment section with latest intelligence data",
          linesAdded: 45,
          linesRemoved: 12,
        },
        {
          type: "Metadata",
          description: "Changed classification level from Confidential to Secret",
        },
      ],
      comment: "Added Q4 threat analysis based on recent intelligence reports",
      previousVersion: "v3.1",
      status: "saved",
      collaborators: ["Sarah Johnson", "Mike Chen"],
    },
    {
      id: "2",
      file: {
        name: "Project Phoenix Timeline.doc",
        type: "document",
        path: "/workspace/projects/phoenix",
        size: "1.8 MB",
        version: "v2.5",
      },
      editor: {
        name: "Sarah Johnson",
        id: "EMP-2024-015",
        role: "Supervisor",
        department: "Operations",
        avatar: "SJ",
      },
      editType: "modified",
      timestamp: "11:15",
      date: "2024-10-14",
      changes: [
        {
          type: "Timeline Update",
          description: "Adjusted project milestones for Q1 2025",
          linesAdded: 23,
          linesRemoved: 8,
        },
        {
          type: "Resource Allocation",
          description: "Updated team assignments and budget allocation",
        },
      ],
      comment: "Realigned timeline based on resource availability",
      previousVersion: "v2.4",
      status: "saved",
    },
    {
      id: "3",
      file: {
        name: "Satellite Image Analysis Dataset",
        type: "folder",
        path: "/workspace/resources/imagery",
        size: "156 MB",
        version: "v1.0",
      },
      editor: {
        name: "Mike Chen",
        id: "EMP-2024-008",
        role: "Analyst",
        department: "Technical Research",
        avatar: "MC",
      },
      editType: "created",
      timestamp: "09:45",
      date: "2024-10-14",
      changes: [
        {
          type: "New Folder",
          description: "Created new folder structure for satellite imagery analysis",
        },
        {
          type: "Files Added",
          description: "Uploaded 47 high-resolution satellite images",
          sizeChange: "+156 MB",
        },
      ],
      comment: "Initial dataset for Infrastructure surveillance project",
      status: "saved",
    },
    {
      id: "4",
      file: {
        name: "Security Briefing Audio.mp3",
        type: "audio",
        path: "/workspace/briefings/security",
        size: "45.6 MB",
        version: "v1.2",
      },
      editor: {
        name: "Emma Wilson",
        id: "EMP-2024-022",
        role: "Analyst",
        department: "Field Operations",
        avatar: "EW",
      },
      editType: "modified",
      timestamp: "16:20",
      date: "2024-10-13",
      changes: [
        {
          type: "Audio Edit",
          description: "Trimmed silence and added chapter markers",
          sizeChange: "-2.3 MB",
        },
        {
          type: "Metadata",
          description: "Added timestamps and speaker identification",
        },
      ],
      comment: "Enhanced audio quality and added navigation markers",
      previousVersion: "v1.1",
      status: "saved",
    },
    {
      id: "5",
      file: {
        name: "Risk Assessment Framework.pdf",
        type: "document",
        path: "/workspace/drafts",
        size: "3.1 MB",
        version: "v4.1",
      },
      editor: {
        name: "Admin User",
        id: "EMP-2024-999",
        role: "Admin",
        department: "System Administration",
        avatar: "AD",
      },
      editType: "modified",
      timestamp: "13:45",
      date: "2024-10-13",
      changes: [
        {
          type: "Content Update",
          description: "Updated risk assessment methodology section",
          linesAdded: 67,
          linesRemoved: 34,
        },
        {
          type: "Version Control",
          description: "Merged changes from collaborative editing session",
        },
      ],
      comment: "Incorporated feedback from security review board",
      previousVersion: "v4.0",
      status: "saved",
      collaborators: ["Lisa Anderson", "David Lee"],
    },
    {
      id: "6",
      file: {
        name: "Incident Report Draft - Cyber Attack.doc",
        type: "document",
        path: "/workspace/drafts",
        size: "1.2 MB",
        version: "v1.3",
      },
      editor: {
        name: "Anant Raj",
        id: "EMP-2024-001",
        role: "Analyst",
        department: "Intelligence Analysis",
        avatar: "AR",
      },
      editType: "modified",
      timestamp: "10:30",
      date: "2024-10-13",
      changes: [
        {
          type: "Content Addition",
          description: "Added detailed timeline of attack vectors",
          linesAdded: 89,
          linesRemoved: 5,
        },
        {
          type: "Analysis",
          description: "Included mitigation strategies and recommendations",
        },
      ],
      comment: "Draft in progress - awaiting supervisor review",
      previousVersion: "v1.2",
      status: "draft",
    },
    {
      id: "7",
      file: {
        name: "Old Training Materials",
        type: "folder",
        path: "/workspace/trash",
        size: "89 MB",
        version: "v2.1",
      },
      editor: {
        name: "Sarah Johnson",
        id: "EMP-2024-015",
        role: "Supervisor",
        department: "Operations",
        avatar: "SJ",
      },
      editType: "deleted",
      timestamp: "15:00",
      date: "2024-10-12",
      changes: [
        {
          type: "Deletion",
          description: "Moved to trash - outdated training content",
          sizeChange: "-89 MB",
        },
      ],
      comment: "Archived obsolete training materials from 2022",
      status: "saved",
    },
    {
      id: "8",
      file: {
        name: "Budget Analysis Report.pdf",
        type: "document",
        path: "/workspace/resources/reports",
        size: "2.8 MB",
        version: "v2.0",
      },
      editor: {
        name: "David Kumar",
        id: "EMP-2024-033",
        role: "Analyst",
        department: "Financial Analysis",
        avatar: "DK",
      },
      editType: "renamed",
      timestamp: "12:15",
      date: "2024-10-12",
      changes: [
        {
          type: "Rename",
          description: "Renamed from 'Q3 Budget.pdf' to current name",
        },
        {
          type: "Content Update",
          description: "Updated with Q4 projections",
          linesAdded: 34,
          linesRemoved: 12,
        },
      ],
      comment: "Renamed for better organization and added Q4 data",
      previousVersion: "v1.9",
      status: "saved",
    },
  ];

  // Filter records
  const filteredRecords = editRecords.filter((record) => {
    const matchesSearch =
      searchQuery === "" ||
      record.file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.editor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.comment?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      filterType === "all" || record.editType === filterType;
    const matchesEditor =
      filterEditor === "all" || record.editor.id === filterEditor;

    return matchesSearch && matchesType && matchesEditor;
  });

  // Get unique editors for filter
  const uniqueEditors = Array.from(
    new Set(editRecords.map((r) => r.editor.id))
  ).map((id) => editRecords.find((r) => r.editor.id === id)!.editor);

  // Get file type icon
  const getFileIcon = (type: string) => {
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

  // Get file type color
  const getFileColor = (type: string) => {
    switch (type) {
      case "document":
        return "text-blue-500 bg-blue-500/10";
      case "image":
        return "text-purple-500 bg-purple-500/10";
      case "audio":
        return "text-green-500 bg-green-500/10";
      case "folder":
        return "text-orange-500 bg-orange-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  // Get edit type badge
  const getEditTypeBadge = (type: string) => {
    switch (type) {
      case "created":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/50">
            Created
          </Badge>
        );
      case "modified":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/50">
            Modified
          </Badge>
        );
      case "deleted":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/50">
            Deleted
          </Badge>
        );
      case "restored":
        return (
          <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/50">
            Restored
          </Badge>
        );
      case "renamed":
        return (
          <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/50">
            Renamed
          </Badge>
        );
      default:
        return null;
    }
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Analyst":
        return "bg-green-500/10 text-green-600 border-green-500/50";
      case "Supervisor":
        return "bg-blue-500/10 text-blue-600 border-blue-500/50";
      case "Admin":
        return "bg-red-500/10 text-red-600 border-red-500/50";
      default:
        return "";
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "saved":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/50">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Saved
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/50">
            <Save className="w-3 h-3 mr-1" />
            Draft
          </Badge>
        );
      case "conflict":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/50">
            <AlertCircle className="w-3 h-3 mr-1" />
            Conflict
          </Badge>
        );
      default:
        return null;
    }
  };

  // Handle opening detail view
  const handleOpenDetail = (record: EditRecord) => {
    setSelectedRecord(record);
    setIsDetailOpen(true);
  };

  // Calculate statistics
  const totalEdits = editRecords.length;
  const todayEdits = editRecords.filter((r) => r.date === "2024-10-14").length;
  const activeEditors = uniqueEditors.length;
  const modifications = editRecords.filter((r) => r.editType === "modified")
    .length;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-muted/10">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <History className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="mb-0">File Edit History</h2>
                <p className="text-sm text-muted-foreground">
                  Track all file modifications, creations, and deletions across the system
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-4 gap-3 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-3 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Edits</p>
                <p className="text-xl">{totalEdits}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileEdit className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Today</p>
                <p className="text-xl">{todayEdits}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Active Editors</p>
                <p className="text-xl">{activeEditors}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-orange-500/5 to-transparent border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Modifications</p>
                <p className="text-xl">{modifications}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files, editors, or comments..."
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="modified">Modified</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
              <SelectItem value="renamed">Renamed</SelectItem>
              <SelectItem value="restored">Restored</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterEditor} onValueChange={setFilterEditor}>
            <SelectTrigger className="w-[200px]">
              <User className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by Editor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Editors</SelectItem>
              {uniqueEditors.map((editor) => (
                <SelectItem key={editor.id} value={editor.id}>
                  {editor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Edit Records */}
      <div className="flex-1 overflow-auto p-6">
        <AnimatePresence mode="wait">
          {filteredRecords.length === 0 ? (
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
                  <History className="w-10 h-10 text-primary" />
                </motion.div>
                <h3 className="mb-2">No Edit History Found</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {searchQuery
                    ? `No edits match "${searchQuery}"`
                    : "No file edits to display"}
                </p>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredRecords.map((record, index) => {
                const FileIcon = getFileIcon(record.file.type);
                const fileColorClass = getFileColor(record.file.type);

                return (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className="p-5 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/20"
                      onClick={() => handleOpenDetail(record)}
                    >
                      <div className="flex gap-4">
                        {/* File Icon */}
                        <div
                          className={`w-14 h-14 rounded-xl ${fileColorClass} flex items-center justify-center flex-shrink-0`}
                        >
                          <FileIcon className="w-7 h-7" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h4 className="text-sm">{record.file.name}</h4>
                                {getEditTypeBadge(record.editType)}
                                {getStatusBadge(record.status)}
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                {record.file.path}
                              </p>
                            </div>
                          </div>

                          {/* Editor Info */}
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="w-8 h-8 border-2 border-border">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {record.editor.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex items-center gap-2 flex-wrap text-sm">
                              <span>{record.editor.name}</span>
                              <Badge
                                variant="outline"
                                className={getRoleBadgeColor(record.editor.role)}
                              >
                                {record.editor.role}
                              </Badge>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">
                                {record.editor.department}
                              </span>
                            </div>
                          </div>

                          {/* Changes Summary */}
                          {record.changes.length > 0 && (
                            <div className="mb-3 space-y-1">
                              {record.changes.slice(0, 2).map((change, idx) => (
                                <div
                                  key={idx}
                                  className="text-xs text-muted-foreground flex items-start gap-2"
                                >
                                  <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>{change.description}</span>
                                </div>
                              ))}
                              {record.changes.length > 2 && (
                                <span className="text-xs text-muted-foreground">
                                  +{record.changes.length - 2} more changes
                                </span>
                              )}
                            </div>
                          )}

                          {/* Comment */}
                          {record.comment && (
                            <div className="bg-muted/50 border border-border rounded-lg p-2 mb-3">
                              <p className="text-xs text-muted-foreground">
                                {record.comment}
                              </p>
                            </div>
                          )}

                          {/* Meta Information */}
                          <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {record.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {record.timestamp}
                            </div>
                            <div className="flex items-center gap-1">
                              <GitBranch className="w-3 h-3" />
                              {record.file.version}
                            </div>
                            <div className="flex items-center gap-1">
                              <File className="w-3 h-3" />
                              {record.file.size}
                            </div>
                            {record.collaborators && (
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {record.collaborators.length} collaborators
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit History Details</DialogTitle>
            <DialogDescription>
              Complete information about this file edit including all changes and metadata.
            </DialogDescription>
          </DialogHeader>

          {selectedRecord && (
            <ScrollArea className="max-h-[calc(90vh-100px)]">
              <div className="space-y-6 pr-4">
                {/* File Information */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <File className="w-5 h-5" />
                    File Information
                  </h4>
                  <Card className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-16 h-16 rounded-xl ${getFileColor(
                          selectedRecord.file.type
                        )} flex items-center justify-center`}
                      >
                        {(() => {
                          const Icon = getFileIcon(selectedRecord.file.type);
                          return <Icon className="w-8 h-8" />;
                        })()}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg">
                            {selectedRecord.file.name}
                          </span>
                          {getEditTypeBadge(selectedRecord.editType)}
                          {getStatusBadge(selectedRecord.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <FolderOpen className="w-4 h-4" />
                            {selectedRecord.file.path}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <File className="w-4 h-4" />
                            {selectedRecord.file.size}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <GitBranch className="w-4 h-4" />
                            Version: {selectedRecord.file.version}
                          </div>
                          {selectedRecord.previousVersion && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <History className="w-4 h-4" />
                              Previous: {selectedRecord.previousVersion}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <Separator />

                {/* Editor Information */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Editor Information
                  </h4>
                  <Card className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16 border-2 border-border">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {selectedRecord.editor.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg">
                            {selectedRecord.editor.name}
                          </span>
                          <Badge
                            variant="outline"
                            className={getRoleBadgeColor(
                              selectedRecord.editor.role
                            )}
                          >
                            {selectedRecord.editor.role}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-muted-foreground">
                            ID: {selectedRecord.editor.id}
                          </div>
                          <div className="text-muted-foreground">
                            {selectedRecord.editor.department}
                          </div>
                        </div>
                        {selectedRecord.collaborators && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Collaborators:
                            </p>
                            <div className="flex gap-2 flex-wrap">
                              {selectedRecord.collaborators.map((collab, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {collab}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>

                <Separator />

                {/* Changes Details */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Changes Made ({selectedRecord.changes.length})
                  </h4>
                  <div className="space-y-3">
                    {selectedRecord.changes.map((change, idx) => (
                      <Card key={idx} className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">{change.type}</Badge>
                            {(change.linesAdded || change.linesRemoved) && (
                              <div className="flex gap-2 text-xs">
                                {change.linesAdded && (
                                  <span className="text-green-600">
                                    +{change.linesAdded} lines
                                  </span>
                                )}
                                {change.linesRemoved && (
                                  <span className="text-red-600">
                                    -{change.linesRemoved} lines
                                  </span>
                                )}
                              </div>
                            )}
                            {change.sizeChange && (
                              <Badge variant="secondary">
                                {change.sizeChange}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {change.description}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {selectedRecord.comment && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="mb-3">Comment</h4>
                      <Card className="p-4 bg-muted/50">
                        <p className="text-sm">{selectedRecord.comment}</p>
                      </Card>
                    </div>
                  </>
                )}

                <Separator />

                {/* Timestamp */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Timestamp
                  </h4>
                  <Card className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedRecord.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedRecord.timestamp}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View File
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Version
                  </Button>
                  {selectedRecord.previousVersion && (
                    <Button variant="outline" className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Restore Previous
                    </Button>
                  )}
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
