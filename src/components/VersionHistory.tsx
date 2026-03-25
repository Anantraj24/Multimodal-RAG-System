import { useState } from "react";
import { Clock, User, Download, RotateCcw, Eye, FileText, Image as ImageIcon, Music, Video, File, Trash2, Upload, Edit, FolderPlus, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";

interface VersionHistoryEntry {
  id: string;
  timestamp: Date;
  user: string;
  userRole: "Admin" | "Supervisor" | "Analyst";
  action: "upload" | "modify" | "delete" | "restore" | "move" | "rename" | "create_folder";
  itemType: "file" | "folder";
  itemName: string;
  itemId: string;
  folderId?: string;
  folderName?: string;
  previousVersion?: {
    name?: string;
    size?: string;
    folderId?: string;
    folderName?: string;
  };
  newVersion?: {
    name?: string;
    size?: string;
    folderId?: string;
    folderName?: string;
  };
  fileType?: "pdf" | "image" | "audio" | "video" | "document";
  changeDescription: string;
}

// Mock version history data
const generateVersionHistory = (): VersionHistoryEntry[] => {
  return [
    {
      id: "VH-001",
      timestamp: new Date(Date.now() - 10 * 60000),
      user: "anantraj",
      userRole: "Analyst",
      action: "upload",
      itemType: "file",
      itemName: "Chen_Surveillance_Oct14.jpg",
      itemId: "DB-021",
      folderId: "F-004",
      folderName: "Subject: Dr. Viktor Chen",
      fileType: "image",
      newVersion: {
        size: "3.2 MB",
        folderId: "F-004",
        folderName: "Subject: Dr. Viktor Chen"
      },
      changeDescription: "New surveillance image uploaded to Viktor Chen folder"
    },
    {
      id: "VH-002",
      timestamp: new Date(Date.now() - 45 * 60000),
      user: "supervisor",
      userRole: "Supervisor",
      action: "modify",
      itemType: "file",
      itemName: "Threat_Analysis_Report_October.pdf",
      itemId: "DB-006",
      folderId: "F-002",
      folderName: "Cyber Threat Analysis 2024",
      fileType: "pdf",
      previousVersion: {
        size: "3.5 MB"
      },
      newVersion: {
        size: "3.7 MB"
      },
      changeDescription: "Updated threat analysis report with latest intelligence data"
    },
    {
      id: "VH-003",
      timestamp: new Date(Date.now() - 90 * 60000),
      user: "admin",
      userRole: "Admin",
      action: "create_folder",
      itemType: "folder",
      itemName: "Operation Nightfall",
      itemId: "F-009",
      changeDescription: "Created new operation folder for classified mission"
    },
    {
      id: "VH-004",
      timestamp: new Date(Date.now() - 2 * 3600000),
      user: "anantraj",
      userRole: "Analyst",
      action: "delete",
      itemType: "file",
      itemName: "Outdated_Security_Report_2023.pdf",
      itemId: "DB-022",
      folderId: "F-002",
      folderName: "Cyber Threat Analysis 2024",
      fileType: "pdf",
      previousVersion: {
        size: "2.1 MB",
        folderId: "F-002",
        folderName: "Cyber Threat Analysis 2024"
      },
      changeDescription: "Deleted outdated security report from 2023"
    },
    {
      id: "VH-005",
      timestamp: new Date(Date.now() - 3 * 3600000),
      user: "supervisor",
      userRole: "Supervisor",
      action: "move",
      itemType: "file",
      itemName: "Infrastructure_Diagram_v2.png",
      itemId: "DB-005",
      fileType: "image",
      previousVersion: {
        folderId: "F-005",
        folderName: "Infrastructure Security"
      },
      newVersion: {
        folderId: "F-001",
        folderName: "Operation Phoenix"
      },
      changeDescription: "Moved infrastructure diagram to Operation Phoenix folder"
    },
    {
      id: "VH-006",
      timestamp: new Date(Date.now() - 4 * 3600000),
      user: "admin",
      userRole: "Admin",
      action: "restore",
      itemType: "file",
      itemName: "Budget_Allocation_FY2024.pdf",
      itemId: "DB-009",
      folderId: "F-007",
      folderName: "Strategic Planning Q3-Q4",
      fileType: "pdf",
      changeDescription: "Restored previous version of budget allocation document"
    },
    {
      id: "VH-007",
      timestamp: new Date(Date.now() - 5 * 3600000),
      user: "supervisor",
      userRole: "Supervisor",
      action: "rename",
      itemType: "file",
      itemName: "Satellite_Imagery_Sector_7.jpg",
      itemId: "DB-011",
      fileType: "image",
      previousVersion: {
        name: "Satellite_Image_Oct.jpg"
      },
      newVersion: {
        name: "Satellite_Imagery_Sector_7.jpg"
      },
      changeDescription: "Renamed satellite imagery file for better identification"
    },
    {
      id: "VH-008",
      timestamp: new Date(Date.now() - 6 * 3600000),
      user: "anantraj",
      userRole: "Analyst",
      action: "upload",
      itemType: "file",
      itemName: "Field_Report_Northern_Region.jpg",
      itemId: "DB-008",
      folderId: "F-003",
      folderName: "Surveillance - Northern Sector",
      fileType: "image",
      newVersion: {
        size: "3.1 MB",
        folderId: "F-003",
        folderName: "Surveillance - Northern Sector"
      },
      changeDescription: "New field reconnaissance report uploaded"
    },
    {
      id: "VH-009",
      timestamp: new Date(Date.now() - 8 * 3600000),
      user: "admin",
      userRole: "Admin",
      action: "modify",
      itemType: "folder",
      itemName: "Operation Phoenix",
      itemId: "F-001",
      previousVersion: {
        name: "Operation Phoenix - Draft"
      },
      newVersion: {
        name: "Operation Phoenix"
      },
      changeDescription: "Updated folder name to reflect active operation status"
    },
    {
      id: "VH-010",
      timestamp: new Date(Date.now() - 10 * 3600000),
      user: "supervisor",
      userRole: "Supervisor",
      action: "upload",
      itemType: "file",
      itemName: "Emergency_Response_Protocol.mp3",
      itemId: "DB-015",
      folderId: "F-006",
      folderName: "Operation Dark Shield",
      fileType: "audio",
      newVersion: {
        size: "8.9 MB",
        folderId: "F-006",
        folderName: "Operation Dark Shield"
      },
      changeDescription: "Emergency protocol audio guide uploaded"
    },
    {
      id: "VH-011",
      timestamp: new Date(Date.now() - 12 * 3600000),
      user: "anantraj",
      userRole: "Analyst",
      action: "delete",
      itemType: "file",
      itemName: "Temp_Analysis_Draft.pdf",
      itemId: "DB-023",
      folderId: "F-002",
      folderName: "Cyber Threat Analysis 2024",
      fileType: "pdf",
      previousVersion: {
        size: "1.5 MB"
      },
      changeDescription: "Removed temporary draft analysis document"
    },
    {
      id: "VH-012",
      timestamp: new Date(Date.now() - 24 * 3600000),
      user: "admin",
      userRole: "Admin",
      action: "create_folder",
      itemType: "folder",
      itemName: "Strategic Planning Q3-Q4",
      itemId: "F-007",
      changeDescription: "Created folder for quarterly strategic planning documents"
    }
  ];
};

interface VersionHistoryProps {
  itemId?: string;
  itemName?: string;
}

export function VersionHistory({ itemId, itemName }: VersionHistoryProps) {
  const [history] = useState<VersionHistoryEntry[]>(generateVersionHistory());
  const [selectedVersion, setSelectedVersion] = useState<VersionHistoryEntry | null>(null);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Filter history if itemId is provided
  const filteredHistory = itemId 
    ? history.filter(h => h.itemId === itemId)
    : history;

  // Get action icon and color
  const getActionDisplay = (action: string) => {
    switch (action) {
      case "upload":
        return { icon: Upload, color: "text-green-500", bg: "bg-green-500/10", label: "Uploaded" };
      case "modify":
        return { icon: Edit, color: "text-blue-500", bg: "bg-blue-500/10", label: "Modified" };
      case "delete":
        return { icon: Trash2, color: "text-red-500", bg: "bg-red-500/10", label: "Deleted" };
      case "restore":
        return { icon: RotateCcw, color: "text-purple-500", bg: "bg-purple-500/10", label: "Restored" };
      case "move":
        return { icon: FolderPlus, color: "text-orange-500", bg: "bg-orange-500/10", label: "Moved" };
      case "rename":
        return { icon: Edit, color: "text-cyan-500", bg: "bg-cyan-500/10", label: "Renamed" };
      case "create_folder":
        return { icon: FolderPlus, color: "text-indigo-500", bg: "bg-indigo-500/10", label: "Created Folder" };
      default:
        return { icon: Clock, color: "text-gray-500", bg: "bg-gray-500/10", label: "Changed" };
    }
  };

  // Get file type icon
  const getFileTypeIcon = (type?: string) => {
    switch (type) {
      case "pdf":
      case "document":
        return <FileText className="w-4 h-4 text-red-500" />;
      case "image":
        return <ImageIcon className="w-4 h-4 text-blue-500" />;
      case "audio":
        return <Music className="w-4 h-4 text-purple-500" />;
      case "video":
        return <Video className="w-4 h-4 text-green-500" />;
      default:
        return <File className="w-4 h-4 text-gray-500" />;
    }
  };

  // Open restore dialog
  const openRestoreDialog = (version: VersionHistoryEntry) => {
    setSelectedVersion(version);
    setIsRestoreDialogOpen(true);
  };

  // Open detail dialog
  const openDetailDialog = (version: VersionHistoryEntry) => {
    setSelectedVersion(version);
    setIsDetailDialogOpen(true);
  };

  // Handle restore
  const handleRestore = () => {
    console.log("Restoring version:", selectedVersion);
    // In a real app, this would trigger the restore API
    setIsRestoreDialogOpen(false);
    alert(`Successfully restored ${selectedVersion?.itemName} to previous version`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Version History
            {itemName && <span className="text-muted-foreground">- {itemName}</span>}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Track all changes and restore previous versions
          </p>
        </div>
        <Badge variant="secondary">
          {filteredHistory.length} {filteredHistory.length === 1 ? 'change' : 'changes'}
        </Badge>
      </div>

      {/* Timeline */}
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {filteredHistory.map((entry, index) => {
            const actionDisplay = getActionDisplay(entry.action);
            const ActionIcon = actionDisplay.icon;

            return (
              <Card key={entry.id} className="p-4 relative">
                {/* Timeline line */}
                {index < filteredHistory.length - 1 && (
                  <div className="absolute left-8 top-14 w-px h-[calc(100%+1rem)] bg-border" />
                )}

                <div className="flex gap-4">
                  {/* Action Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${actionDisplay.bg}`}>
                    <ActionIcon className={`w-4 h-4 ${actionDisplay.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={actionDisplay.color}>
                            {actionDisplay.label}
                          </Badge>
                          {entry.itemType === "file" && entry.fileType && (
                            <div className="flex items-center gap-1">
                              {getFileTypeIcon(entry.fileType)}
                            </div>
                          )}
                        </div>
                        <p className="text-sm">
                          <span className="font-mono">{entry.itemName}</span>
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => openDetailDialog(entry)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        {entry.action !== "delete" && entry.action !== "create_folder" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => openRestoreDialog(entry)}
                          >
                            <RotateCcw className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mb-2">
                      {entry.changeDescription}
                    </p>

                    {/* Version Changes */}
                    {(entry.previousVersion || entry.newVersion) && (
                      <div className="bg-muted rounded p-2 space-y-1 text-xs mb-2">
                        {entry.action === "move" && (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">From:</span>
                              <span className="line-through opacity-70">
                                {entry.previousVersion?.folderName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">To:</span>
                              <span className="text-green-600 dark:text-green-400">
                                {entry.newVersion?.folderName}
                              </span>
                            </div>
                          </>
                        )}
                        {entry.action === "rename" && (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Old:</span>
                              <span className="line-through opacity-70 font-mono">
                                {entry.previousVersion?.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">New:</span>
                              <span className="text-green-600 dark:text-green-400 font-mono">
                                {entry.newVersion?.name}
                              </span>
                            </div>
                          </>
                        )}
                        {entry.action === "modify" && entry.previousVersion?.size && entry.newVersion?.size && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Size:</span>
                            <span className="line-through opacity-70">{entry.previousVersion.size}</span>
                            <span>→</span>
                            <span className="text-green-600 dark:text-green-400">{entry.newVersion.size}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Folder Info */}
                    {entry.folderName && (
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <FolderPlus className="w-3 h-3" />
                        {entry.folderName}
                      </div>
                    )}

                    <Separator className="my-2" />

                    {/* User and Time */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        <span>{entry.user}</span>
                        <Badge variant="secondary" className="text-xs">
                          {entry.userRole}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{entry.timestamp.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* Restore Confirmation Dialog */}
      <Dialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restore Previous Version</DialogTitle>
            <DialogDescription>
              Are you sure you want to restore this item to a previous version?
            </DialogDescription>
          </DialogHeader>

          {selectedVersion && (
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This action will create a new version. The current version will be preserved in history.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Item Name</p>
                  <p className="text-sm font-mono">{selectedVersion.itemName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Restore Point</p>
                  <p className="text-sm">{selectedVersion.timestamp.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Modified By</p>
                  <p className="text-sm">{selectedVersion.user} ({selectedVersion.userRole})</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Change Description</p>
                  <p className="text-sm">{selectedVersion.changeDescription}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRestoreDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRestore} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Restore Version
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Change Details</DialogTitle>
            <DialogDescription>
              Complete information about this version change
            </DialogDescription>
          </DialogHeader>

          {selectedVersion && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4 pr-4">
                {/* Action Info */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Action</p>
                  <Badge variant="outline" className={getActionDisplay(selectedVersion.action).color}>
                    {getActionDisplay(selectedVersion.action).label}
                  </Badge>
                </div>

                <Separator />

                {/* Item Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Item Type</p>
                    <p className="text-sm capitalize">{selectedVersion.itemType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Item Name</p>
                    <p className="text-sm font-mono">{selectedVersion.itemName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Item ID</p>
                    <p className="text-sm font-mono">{selectedVersion.itemId}</p>
                  </div>
                  {selectedVersion.fileType && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">File Type</p>
                      <div className="flex items-center gap-2">
                        {getFileTypeIcon(selectedVersion.fileType)}
                        <span className="text-sm capitalize">{selectedVersion.fileType}</span>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* User Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Modified By</p>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{selectedVersion.user}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">User Role</p>
                    <Badge variant="secondary">{selectedVersion.userRole}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Timestamp</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{selectedVersion.timestamp.toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Version ID</p>
                    <p className="text-sm font-mono">{selectedVersion.id}</p>
                  </div>
                </div>

                <Separator />

                {/* Change Description */}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Change Description</p>
                  <p className="text-sm">{selectedVersion.changeDescription}</p>
                </div>

                {/* Version Changes */}
                {(selectedVersion.previousVersion || selectedVersion.newVersion) && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Version Changes</p>
                      <div className="bg-muted rounded-lg p-3 space-y-2">
                        {selectedVersion.previousVersion && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Previous Version:</p>
                            <div className="text-sm space-y-1">
                              {selectedVersion.previousVersion.name && (
                                <p className="font-mono line-through opacity-70">
                                  {selectedVersion.previousVersion.name}
                                </p>
                              )}
                              {selectedVersion.previousVersion.size && (
                                <p>Size: {selectedVersion.previousVersion.size}</p>
                              )}
                              {selectedVersion.previousVersion.folderName && (
                                <p>Folder: {selectedVersion.previousVersion.folderName}</p>
                              )}
                            </div>
                          </div>
                        )}
                        {selectedVersion.newVersion && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">New Version:</p>
                            <div className="text-sm space-y-1 text-green-600 dark:text-green-400">
                              {selectedVersion.newVersion.name && (
                                <p className="font-mono">
                                  {selectedVersion.newVersion.name}
                                </p>
                              )}
                              {selectedVersion.newVersion.size && (
                                <p>Size: {selectedVersion.newVersion.size}</p>
                              )}
                              {selectedVersion.newVersion.folderName && (
                                <p>Folder: {selectedVersion.newVersion.folderName}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Folder Info */}
                {selectedVersion.folderName && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <div className="flex items-center gap-2">
                        <FolderPlus className="w-4 h-4" />
                        <span className="text-sm">{selectedVersion.folderName}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Close
            </Button>
            {selectedVersion && selectedVersion.action !== "delete" && selectedVersion.action !== "create_folder" && (
              <Button onClick={() => {
                setIsDetailDialogOpen(false);
                openRestoreDialog(selectedVersion);
              }} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Restore This Version
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
