import { useState } from "react";
import { Search, Filter, Download, Eye, Shield, AlertTriangle, CheckCircle, Clock, User, FileText, Lock, Unlock, Upload, Trash2, Edit, Settings, LogIn, LogOut, Database, ChevronDown } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface AuditLogEntry {
  id: string;
  timestamp: Date;
  user: string;
  userRole: "Admin" | "Supervisor" | "Analyst";
  action: string;
  actionType: "Authentication" | "FileOperation" | "Query" | "SystemConfig" | "DataAccess" | "Security";
  severity: "info" | "warning" | "critical" | "success";
  ipAddress: string;
  description: string;
  details?: {
    fileName?: string;
    queryText?: string;
    previousValue?: string;
    newValue?: string;
    affectedRecords?: number;
    sessionDuration?: string;
    errorCode?: string;
  };
  status: "Success" | "Failed" | "Pending";
}

// Mock audit log data
const generateAuditLogs = (): AuditLogEntry[] => {
  return [
    {
      id: "AL-001",
      timestamp: new Date(Date.now() - 5 * 60000),
      user: "admin",
      userRole: "Admin",
      action: "System Configuration Update",
      actionType: "SystemConfig",
      severity: "warning",
      ipAddress: "192.168.1.100",
      description: "Updated encryption settings for data storage",
      details: {
        previousValue: "AES-128",
        newValue: "AES-256",
        affectedRecords: 1250
      },
      status: "Success"
    },
    {
      id: "AL-002",
      timestamp: new Date(Date.now() - 15 * 60000),
      user: "anantraj",
      userRole: "Analyst",
      action: "Document Query",
      actionType: "Query",
      severity: "info",
      ipAddress: "192.168.1.105",
      description: "Executed multimodal search query across PDF and image repositories",
      details: {
        queryText: "security threat assessment Q3 2024",
        affectedRecords: 18
      },
      status: "Success"
    },
    {
      id: "AL-003",
      timestamp: new Date(Date.now() - 25 * 60000),
      user: "supervisor",
      userRole: "Supervisor",
      action: "File Upload",
      actionType: "FileOperation",
      severity: "info",
      ipAddress: "192.168.1.102",
      description: "Uploaded classified document to secure repository",
      details: {
        fileName: "Threat_Analysis_Report_October_2024.pdf",
        affectedRecords: 1
      },
      status: "Success"
    },
    {
      id: "AL-004",
      timestamp: new Date(Date.now() - 45 * 60000),
      user: "anantraj",
      userRole: "Analyst",
      action: "Failed Login Attempt",
      actionType: "Authentication",
      severity: "critical",
      ipAddress: "192.168.1.105",
      description: "Multiple failed login attempts detected",
      details: {
        errorCode: "AUTH_FAILED_003"
      },
      status: "Failed"
    },
    {
      id: "AL-005",
      timestamp: new Date(Date.now() - 60 * 60000),
      user: "supervisor",
      userRole: "Supervisor",
      action: "Data Access",
      actionType: "DataAccess",
      severity: "info",
      ipAddress: "192.168.1.102",
      description: "Accessed restricted intelligence database",
      details: {
        affectedRecords: 45
      },
      status: "Success"
    },
    {
      id: "AL-006",
      timestamp: new Date(Date.now() - 90 * 60000),
      user: "admin",
      userRole: "Admin",
      action: "User Permission Update",
      actionType: "Security",
      severity: "warning",
      ipAddress: "192.168.1.100",
      description: "Modified user access permissions for analyst role",
      details: {
        previousValue: "Read Only",
        newValue: "Read/Write",
        affectedRecords: 3
      },
      status: "Success"
    },
    {
      id: "AL-007",
      timestamp: new Date(Date.now() - 120 * 60000),
      user: "anantraj",
      userRole: "Analyst",
      action: "Session Login",
      actionType: "Authentication",
      severity: "success",
      ipAddress: "192.168.1.105",
      description: "Successful authentication and session initialization",
      details: {
        sessionDuration: "2h 15m"
      },
      status: "Success"
    },
    {
      id: "AL-008",
      timestamp: new Date(Date.now() - 150 * 60000),
      user: "supervisor",
      userRole: "Supervisor",
      action: "Document Deletion",
      actionType: "FileOperation",
      severity: "warning",
      ipAddress: "192.168.1.102",
      description: "Permanently deleted archived document from repository",
      details: {
        fileName: "Legacy_Report_2023_Q1.pdf",
        affectedRecords: 1
      },
      status: "Success"
    },
    {
      id: "AL-009",
      timestamp: new Date(Date.now() - 180 * 60000),
      user: "admin",
      userRole: "Admin",
      action: "Security Audit Initiated",
      actionType: "Security",
      severity: "info",
      ipAddress: "192.168.1.100",
      description: "Automated security compliance audit started",
      details: {
        affectedRecords: 5680
      },
      status: "Success"
    },
    {
      id: "AL-010",
      timestamp: new Date(Date.now() - 210 * 60000),
      user: "anantraj",
      userRole: "Analyst",
      action: "Export Report",
      actionType: "FileOperation",
      severity: "info",
      ipAddress: "192.168.1.105",
      description: "Exported search results to encrypted PDF report",
      details: {
        fileName: "Search_Results_Export_14Oct2024.pdf",
        affectedRecords: 24
      },
      status: "Success"
    },
    {
      id: "AL-011",
      timestamp: new Date(Date.now() - 4 * 3600000),
      user: "supervisor",
      userRole: "Supervisor",
      action: "Knowledge Graph Access",
      actionType: "Query",
      severity: "info",
      ipAddress: "192.168.1.102",
      description: "Accessed knowledge graph visualization for incident analysis",
      details: {
        affectedRecords: 127
      },
      status: "Success"
    },
    {
      id: "AL-012",
      timestamp: new Date(Date.now() - 5 * 3600000),
      user: "admin",
      userRole: "Admin",
      action: "Database Backup",
      actionType: "SystemConfig",
      severity: "success",
      ipAddress: "192.168.1.100",
      description: "Scheduled automated database backup completed successfully",
      details: {
        affectedRecords: 12450
      },
      status: "Success"
    },
    {
      id: "AL-013",
      timestamp: new Date(Date.now() - 6 * 3600000),
      user: "anantraj",
      userRole: "Analyst",
      action: "Image Analysis",
      actionType: "Query",
      severity: "info",
      ipAddress: "192.168.1.105",
      description: "Performed OCR and object detection on uploaded images",
      details: {
        fileName: "Surveillance_Photos_Batch_14.zip",
        affectedRecords: 8
      },
      status: "Success"
    },
    {
      id: "AL-014",
      timestamp: new Date(Date.now() - 8 * 3600000),
      user: "supervisor",
      userRole: "Supervisor",
      action: "Session Logout",
      actionType: "Authentication",
      severity: "info",
      ipAddress: "192.168.1.102",
      description: "User session terminated normally",
      details: {
        sessionDuration: "3h 42m"
      },
      status: "Success"
    },
    {
      id: "AL-015",
      timestamp: new Date(Date.now() - 10 * 3600000),
      user: "admin",
      userRole: "Admin",
      action: "Unauthorized Access Attempt",
      actionType: "Security",
      severity: "critical",
      ipAddress: "203.45.67.89",
      description: "Blocked unauthorized access attempt from external IP",
      details: {
        errorCode: "SEC_BREACH_001"
      },
      status: "Failed"
    }
  ];
};

export function AuditLog() {
  const [logs] = useState<AuditLogEntry[]>(generateAuditLogs());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);

    const matchesType = filterType === "all" || log.actionType === filterType;
    const matchesSeverity = filterSeverity === "all" || log.severity === filterSeverity;

    return matchesSearch && matchesType && matchesSeverity;
  });

  // Get severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" /> Critical</Badge>;
      case "warning":
        return <Badge variant="outline" className="gap-1 border-yellow-500 text-yellow-600 dark:text-yellow-400"><AlertTriangle className="w-3 h-3" /> Warning</Badge>;
      case "success":
        return <Badge variant="outline" className="gap-1 border-green-500 text-green-600 dark:text-green-400"><CheckCircle className="w-3 h-3" /> Success</Badge>;
      default:
        return <Badge variant="secondary" className="gap-1">Info</Badge>;
    }
  };

  // Get action icon
  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "Authentication":
        return <LogIn className="w-4 h-4 text-blue-500" />;
      case "FileOperation":
        return <FileText className="w-4 h-4 text-purple-500" />;
      case "Query":
        return <Search className="w-4 h-4 text-green-500" />;
      case "SystemConfig":
        return <Settings className="w-4 h-4 text-orange-500" />;
      case "DataAccess":
        return <Database className="w-4 h-4 text-indigo-500" />;
      case "Security":
        return <Shield className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Success":
        return <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400">Success</Badge>;
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // View log details
  const viewLogDetails = (log: AuditLogEntry) => {
    setSelectedLog(log);
    setIsDetailDialogOpen(true);
  };

  // Export logs
  const exportLogs = () => {
    console.log("Exporting audit logs...");
    // In a real app, this would generate a CSV/PDF export
    alert("Audit logs exported successfully!");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2>Audit Log</h2>
            <p className="text-sm text-muted-foreground mt-1">
              System activity tracking and security monitoring
            </p>
          </div>
          <Button onClick={exportLogs} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by user, action, IP address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter by Action Type */}
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Action Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="Authentication">Authentication</SelectItem>
              <SelectItem value="FileOperation">File Operation</SelectItem>
              <SelectItem value="Query">Query</SelectItem>
              <SelectItem value="SystemConfig">System Config</SelectItem>
              <SelectItem value="DataAccess">Data Access</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter by Severity */}
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Logs</p>
                <p className="text-lg">{filteredLogs.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Critical</p>
                <p className="text-lg">{filteredLogs.filter(l => l.severity === "critical").length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Warnings</p>
                <p className="text-lg">{filteredLogs.filter(l => l.severity === "warning").length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Success</p>
                <p className="text-lg">{filteredLogs.filter(l => l.status === "Success").length}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Audit Log Table */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="text-xs">
                        {log.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm">{log.user}</p>
                            <p className="text-xs text-muted-foreground">{log.userRole}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm max-w-[200px] truncate">{log.action}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActionIcon(log.actionType)}
                          <span className="text-xs">{log.actionType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getSeverityBadge(log.severity)}
                      </TableCell>
                      <TableCell className="text-xs font-mono">{log.ipAddress}</TableCell>
                      <TableCell>
                        {getStatusBadge(log.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => viewLogDetails(log)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </ScrollArea>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
            <DialogDescription>
              Detailed information about this audit entry
            </DialogDescription>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4">
              {/* Header Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Log ID</p>
                  <p className="text-sm font-mono">{selectedLog.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
                  <p className="text-sm">
                    {selectedLog.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>

              <Separator />

              {/* User Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">User</p>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <p className="text-sm">{selectedLog.user}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Role</p>
                  <Badge variant="outline">{selectedLog.userRole}</Badge>
                </div>
              </div>

              <Separator />

              {/* Action Info */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Action</p>
                  <p className="text-sm">{selectedLog.action}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <p className="text-sm">{selectedLog.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Action Type</p>
                    <div className="flex items-center gap-2">
                      {getActionIcon(selectedLog.actionType)}
                      <span className="text-xs">{selectedLog.actionType}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Severity</p>
                    {getSeverityBadge(selectedLog.severity)}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    {getStatusBadge(selectedLog.status)}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Network Info */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">IP Address</p>
                <p className="text-sm font-mono">{selectedLog.ipAddress}</p>
              </div>

              {/* Additional Details */}
              {selectedLog.details && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Additional Details</p>
                    <div className="bg-muted rounded-lg p-3 space-y-2">
                      {selectedLog.details.fileName && (
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">File Name:</span>
                          <span className="text-xs font-mono">{selectedLog.details.fileName}</span>
                        </div>
                      )}
                      {selectedLog.details.queryText && (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-muted-foreground">Query Text:</span>
                          <span className="text-xs font-mono bg-background p-2 rounded">
                            {selectedLog.details.queryText}
                          </span>
                        </div>
                      )}
                      {selectedLog.details.previousValue && (
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Previous Value:</span>
                          <span className="text-xs">{selectedLog.details.previousValue}</span>
                        </div>
                      )}
                      {selectedLog.details.newValue && (
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">New Value:</span>
                          <span className="text-xs">{selectedLog.details.newValue}</span>
                        </div>
                      )}
                      {selectedLog.details.affectedRecords !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Affected Records:</span>
                          <span className="text-xs">{selectedLog.details.affectedRecords}</span>
                        </div>
                      )}
                      {selectedLog.details.sessionDuration && (
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Session Duration:</span>
                          <span className="text-xs">{selectedLog.details.sessionDuration}</span>
                        </div>
                      )}
                      {selectedLog.details.errorCode && (
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Error Code:</span>
                          <span className="text-xs font-mono text-red-600 dark:text-red-400">
                            {selectedLog.details.errorCode}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
