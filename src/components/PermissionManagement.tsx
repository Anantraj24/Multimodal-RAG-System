import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Shield,
  Search,
  Filter,
  FileText,
  Image as ImageIcon,
  FileAudio,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Download,
  Edit,
  Trash2,
  MoreVertical,
  Check,
  X,
  Clock,
  User,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";

type AccessLevel = "no-access" | "view-only" | "download" | "edit" | "full";
type FileType = "pdf" | "image" | "audio" | "doc";

interface FilePermission {
  id: string;
  fileName: string;
  fileType: FileType;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  category: string;
  users: {
    userId: string;
    userName: string;
    userRole: string;
    accessLevel: AccessLevel;
    grantedBy: string;
    grantedDate: string;
  }[];
}

export function PermissionManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterAccess, setFilterAccess] = useState<string>("all");
  const [selectedFile, setSelectedFile] = useState<FilePermission | null>(null);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<AccessLevel>("view-only");

  const files: FilePermission[] = [
    {
      id: "FILE-001",
      fileName: "Cybersecurity_Assessment_Q4_2024.pdf",
      fileType: "pdf",
      uploadedBy: "Admin User",
      uploadDate: "2024-10-05",
      size: "2.4 MB",
      category: "Security",
      users: [
        {
          userId: "U001",
          userName: "Anant Raj",
          userRole: "Analyst",
          accessLevel: "view-only",
          grantedBy: "Sarah Johnson",
          grantedDate: "2024-10-06",
        },
        {
          userId: "U002",
          userName: "Priya Sharma",
          userRole: "Analyst",
          accessLevel: "download",
          grantedBy: "Sarah Johnson",
          grantedDate: "2024-10-07",
        },
      ],
    },
    {
      id: "FILE-002",
      fileName: "Project_Phoenix_Timeline.doc",
      fileType: "doc",
      uploadedBy: "Sarah Johnson",
      uploadDate: "2024-10-10",
      size: "850 KB",
      category: "Project Management",
      users: [
        {
          userId: "U001",
          userName: "Anant Raj",
          userRole: "Analyst",
          accessLevel: "edit",
          grantedBy: "Sarah Johnson",
          grantedDate: "2024-10-10",
        },
        {
          userId: "U003",
          userName: "Rahul Verma",
          userRole: "Analyst",
          accessLevel: "view-only",
          grantedBy: "Sarah Johnson",
          grantedDate: "2024-10-11",
        },
      ],
    },
    {
      id: "FILE-003",
      fileName: "Satellite_Imagery_Dataset.jpg",
      fileType: "image",
      uploadedBy: "Mike Chen",
      uploadDate: "2024-10-08",
      size: "15.2 MB",
      category: "Analysis",
      users: [
        {
          userId: "U001",
          userName: "Anant Raj",
          userRole: "Analyst",
          accessLevel: "full",
          grantedBy: "Mike Chen",
          grantedDate: "2024-10-08",
        },
      ],
    },
    {
      id: "FILE-004",
      fileName: "Security_Briefing_Oct.mp3",
      fileType: "audio",
      uploadedBy: "Security Team",
      uploadDate: "2024-10-05",
      size: "45.6 MB",
      category: "Intelligence",
      users: [
        {
          userId: "U002",
          userName: "Priya Sharma",
          userRole: "Analyst",
          accessLevel: "view-only",
          grantedBy: "Sarah Johnson",
          grantedDate: "2024-10-06",
        },
        {
          userId: "U003",
          userName: "Rahul Verma",
          userRole: "Analyst",
          accessLevel: "view-only",
          grantedBy: "Sarah Johnson",
          grantedDate: "2024-10-06",
        },
      ],
    },
    {
      id: "FILE-005",
      fileName: "Threat_Analysis_Report.pdf",
      fileType: "pdf",
      uploadedBy: "Admin User",
      uploadDate: "2024-10-12",
      size: "3.8 MB",
      category: "Security",
      users: [],
    },
  ];

  const allUsers = [
    { id: "U001", name: "Anant Raj", role: "Analyst" },
    { id: "U002", name: "Priya Sharma", role: "Analyst" },
    { id: "U003", name: "Rahul Verma", role: "Analyst" },
    { id: "U004", name: "Sneha Patel", role: "Analyst" },
    { id: "U005", name: "Arjun Singh", role: "Analyst" },
  ];

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      searchQuery === "" ||
      file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || file.fileType === filterType;
    const matchesAccess =
      filterAccess === "all" ||
      (filterAccess === "restricted" && file.users.length === 0) ||
      (filterAccess === "shared" && file.users.length > 0);

    return matchesSearch && matchesType && matchesAccess;
  });

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case "pdf":
      case "doc":
        return FileText;
      case "image":
        return ImageIcon;
      case "audio":
        return FileAudio;
    }
  };

  const getAccessLevelColor = (level: AccessLevel) => {
    switch (level) {
      case "no-access":
        return "bg-gray-500/10 text-gray-600 border-gray-500/50";
      case "view-only":
        return "bg-blue-500/10 text-blue-600 border-blue-500/50";
      case "download":
        return "bg-green-500/10 text-green-600 border-green-500/50";
      case "edit":
        return "bg-orange-500/10 text-orange-600 border-orange-500/50";
      case "full":
        return "bg-purple-500/10 text-purple-600 border-purple-500/50";
    }
  };

  const getAccessLevelIcon = (level: AccessLevel) => {
    switch (level) {
      case "no-access":
        return Lock;
      case "view-only":
        return Eye;
      case "download":
        return Download;
      case "edit":
        return Edit;
      case "full":
        return Unlock;
    }
  };

  const handleGrantPermission = () => {
    // In a real app, this would update the backend
    console.log("Granting permission:", {
      file: selectedFile?.id,
      user: selectedUser,
      accessLevel: selectedAccessLevel,
    });
    setShowPermissionDialog(false);
    setSelectedUser("");
    setSelectedAccessLevel("view-only");
  };

  const totalFiles = files.length;
  const restrictedFiles = files.filter((f) => f.users.length === 0).length;
  const sharedFiles = files.filter((f) => f.users.length > 0).length;
  const totalPermissions = files.reduce((acc, f) => acc + f.users.length, 0);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-muted/10">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="mb-0">Permission Management</h2>
                <p className="text-sm text-muted-foreground">
                  Control access to files and documents
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
                <p className="text-xs text-muted-foreground mb-1">Total Files</p>
                <p className="text-xl">{totalFiles}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-orange-500/5 to-transparent border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Restricted</p>
                <p className="text-xl">{restrictedFiles}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Shared</p>
                <p className="text-xl">{sharedFiles}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Unlock className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-purple-500/5 to-transparent border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Permissions</p>
                <p className="text-xl">{totalPermissions}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-purple-500" />
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
              placeholder="Search files..."
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
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="doc">Document</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterAccess} onValueChange={setFilterAccess}>
            <SelectTrigger className="w-[180px]">
              <Shield className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by Access" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Files</SelectItem>
              <SelectItem value="shared">Shared</SelectItem>
              <SelectItem value="restricted">Restricted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {filteredFiles.map((file, index) => {
            const FileIcon = getFileIcon(file.fileType);

            return (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-5 hover:shadow-lg transition-all border-2 hover:border-primary/20">
                  <div className="flex gap-4">
                    {/* File Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FileIcon className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h4 className="text-sm">{file.fileName}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {file.category}
                            </Badge>
                            {file.users.length === 0 ? (
                              <Badge
                                variant="secondary"
                                className="bg-orange-500/10 text-orange-600 border-orange-500/50"
                              >
                                <Lock className="w-3 h-3 mr-1" />
                                Restricted
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="bg-green-500/10 text-green-600 border-green-500/50"
                              >
                                <Unlock className="w-3 h-3 mr-1" />
                                {file.users.length} users
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedFile(file);
                            setShowPermissionDialog(true);
                          }}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Manage Access
                        </Button>
                      </div>

                      {/* File Meta */}
                      <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          Uploaded by {file.uploadedBy}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {file.uploadDate}
                        </div>
                        <div>{file.size}</div>
                      </div>

                      {/* User Permissions */}
                      {file.users.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">Access Granted To:</p>
                          <div className="space-y-2">
                            {file.users.map((user) => {
                              const AccessIcon = getAccessLevelIcon(user.accessLevel);
                              return (
                                <div
                                  key={user.userId}
                                  className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    <Avatar className="w-7 h-7 border border-border">
                                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                        {user.userName
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="text-sm">{user.userName}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {user.userRole}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant="secondary"
                                      className={getAccessLevelColor(user.accessLevel)}
                                    >
                                      <AccessIcon className="w-3 h-3 mr-1" />
                                      {user.accessLevel.replace("-", " ")}
                                    </Badge>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-7 w-7">
                                          <MoreVertical className="w-4 h-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Change Access Level</DropdownMenuItem>
                                        <DropdownMenuItem>View Activity</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">
                                          Revoke Access
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Permission Dialog */}
      <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage File Permissions</DialogTitle>
            <DialogDescription>
              Grant or modify access permissions for {selectedFile?.fileName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Current Permissions */}
            {selectedFile && selectedFile.users.length > 0 && (
              <div>
                <Label className="text-sm mb-2 block">Current Permissions</Label>
                <div className="space-y-2 max-h-40 overflow-auto">
                  {selectedFile.users.map((user) => {
                    const AccessIcon = getAccessLevelIcon(user.accessLevel);
                    return (
                      <div
                        key={user.userId}
                        className="flex items-center justify-between p-2 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {user.userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{user.userName}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={getAccessLevelColor(user.accessLevel)}
                        >
                          <AccessIcon className="w-3 h-3 mr-1" />
                          {user.accessLevel.replace("-", " ")}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Grant New Permission */}
            <div className="space-y-3">
              <Label>Grant Permission To</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user..." />
                </SelectTrigger>
                <SelectContent>
                  {allUsers
                    .filter(
                      (u) => !selectedFile?.users.some((fu) => fu.userId === u.id)
                    )
                    .map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} - {user.role}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Access Level</Label>
              <Select
                value={selectedAccessLevel}
                onValueChange={(v) => setSelectedAccessLevel(v as AccessLevel)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view-only">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Only - Can view but not download
                    </div>
                  </SelectItem>
                  <SelectItem value="download">
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download - Can view and download
                    </div>
                  </SelectItem>
                  <SelectItem value="edit">
                    <div className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit - Can view, download, and edit
                    </div>
                  </SelectItem>
                  <SelectItem value="full">
                    <div className="flex items-center gap-2">
                      <Unlock className="w-4 h-4" />
                      Full Access - Complete control
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Permission Options */}
            <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
              <Label className="text-sm">Additional Options</Label>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">Time-limited Access</Label>
                  <p className="text-xs text-muted-foreground">
                    Auto-revoke after specified time
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">Notify User</Label>
                  <p className="text-xs text-muted-foreground">
                    Send notification about access grant
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPermissionDialog(false);
                setSelectedUser("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleGrantPermission} disabled={!selectedUser}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Grant Permission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
