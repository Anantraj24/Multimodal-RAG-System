import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Search,
  Clock,
  User,
  Calendar,
  Filter,
  FileText,
  Image,
  Mic,
  ChevronRight,
  TrendingUp,
  MapPin,
  Monitor,
  Globe,
  Activity,
  CheckCircle2,
  AlertCircle,
  X,
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
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";

interface SearchRecord {
  id: string;
  employee: {
    name: string;
    id: string;
    role: "Analyst" | "Supervisor" | "Admin";
    department: string;
    email: string;
    location: string;
  };
  query: string;
  timestamp: string;
  date: string;
  resultCount: number;
  searchType: "text" | "image" | "audio" | "multimodal";
  duration: string;
  modalities: string[];
  ipAddress: string;
  device: string;
  browser: string;
  status: "success" | "partial" | "failed";
  filters?: string[];
  results?: {
    id: string;
    title: string;
    type: string;
    relevance: number;
    snippet: string;
  }[];
}

export function SearchHistory() {
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<SearchRecord | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const searchRecords: SearchRecord[] = [
    {
      id: "1",
      employee: {
        name: "Anant Raj",
        id: "EMP-2024-001",
        role: "Analyst",
        department: "Intelligence Analysis",
        email: "anant.raj@ntro.gov.in",
        location: "New Delhi, India",
      },
      query: "cyber security threats October 2024",
      timestamp: "10:45 AM",
      date: "2024-10-13",
      resultCount: 47,
      searchType: "multimodal",
      duration: "0.42s",
      modalities: ["PDF", "Images", "Audio"],
      ipAddress: "192.168.1.45",
      device: "Desktop",
      browser: "Chrome 118.0",
      status: "success",
      filters: ["Date: Oct 2024", "Relevance > 0.7", "Security Category"],
      results: [
        {
          id: "r1",
          title: "Cybersecurity Threat Assessment Q4 2024",
          type: "PDF",
          relevance: 0.95,
          snippet: "Comprehensive analysis of emerging cyber threats including ransomware campaigns, APT activities, and zero-day vulnerabilities...",
        },
        {
          id: "r2",
          title: "Security Incident Response Log",
          type: "PDF",
          relevance: 0.89,
          snippet: "Detailed logs of security incidents from October 2024 with mitigation strategies and response times...",
        },
        {
          id: "r3",
          title: "Network Security Diagram",
          type: "Image",
          relevance: 0.82,
          snippet: "Visual representation of network architecture highlighting vulnerable endpoints and security measures...",
        },
      ],
    },
    {
      id: "2",
      employee: {
        name: "Sarah Johnson",
        id: "EMP-2024-015",
        role: "Supervisor",
        department: "Operations",
        email: "sarah.johnson@ntro.gov.in",
        location: "Mumbai, India",
      },
      query: "Project Phoenix timeline analysis",
      timestamp: "09:32 AM",
      date: "2024-10-13",
      resultCount: 23,
      searchType: "text",
      duration: "0.28s",
      modalities: ["PDF", "DOC"],
      ipAddress: "192.168.1.82",
      device: "Laptop",
      browser: "Firefox 119.0",
      status: "success",
      filters: ["Project: Phoenix", "Timeline View"],
      results: [
        {
          id: "r4",
          title: "Project Phoenix Implementation Timeline",
          type: "PDF",
          relevance: 0.94,
          snippet: "Detailed project timeline showing milestones from Q1 2024 to Q4 2024 with resource allocation...",
        },
        {
          id: "r5",
          title: "Phoenix Project Status Report",
          type: "DOC",
          relevance: 0.87,
          snippet: "Current status of Project Phoenix including completed phases, ongoing activities, and risks...",
        },
      ],
    },
    {
      id: "3",
      employee: {
        name: "Mike Chen",
        id: "EMP-2024-008",
        role: "Analyst",
        department: "Technical Research",
        email: "mike.chen@ntro.gov.in",
        location: "Bangalore, India",
      },
      query: "infrastructure security assessment",
      timestamp: "08:15 AM",
      date: "2024-10-13",
      resultCount: 62,
      searchType: "multimodal",
      duration: "0.51s",
      modalities: ["PDF", "Images"],
      ipAddress: "192.168.1.123",
      device: "Desktop",
      browser: "Edge 118.0",
      status: "success",
      filters: ["Category: Infrastructure", "Security Level: High"],
      results: [
        {
          id: "r6",
          title: "Infrastructure Security Audit 2024",
          type: "PDF",
          relevance: 0.91,
          snippet: "Comprehensive security assessment of critical infrastructure including power grids, communication networks...",
        },
      ],
    },
    {
      id: "4",
      employee: {
        name: "Admin User",
        id: "EMP-2024-999",
        role: "Admin",
        department: "System Administration",
        email: "admin@ntro.gov.in",
        location: "New Delhi, India",
      },
      query: "user access logs September",
      timestamp: "03:20 PM",
      date: "2024-10-12",
      resultCount: 156,
      searchType: "text",
      duration: "0.35s",
      modalities: ["PDF"],
      ipAddress: "192.168.1.1",
      device: "Desktop",
      browser: "Chrome 118.0",
      status: "success",
      filters: ["Date: September 2024", "Log Type: Access"],
    },
    {
      id: "5",
      employee: {
        name: "Emma Wilson",
        id: "EMP-2024-022",
        role: "Analyst",
        department: "Field Operations",
        email: "emma.wilson@ntro.gov.in",
        location: "Chennai, India",
      },
      query: "threat intelligence briefing",
      timestamp: "02:45 PM",
      date: "2024-10-12",
      resultCount: 34,
      searchType: "audio",
      duration: "0.67s",
      modalities: ["Audio"],
      ipAddress: "192.168.1.67",
      device: "Laptop",
      browser: "Safari 17.0",
      status: "success",
      filters: ["Content Type: Audio", "Topic: Intelligence"],
    },
    {
      id: "6",
      employee: {
        name: "Supervisor Team Lead",
        id: "EMP-2024-012",
        role: "Supervisor",
        department: "Intelligence Analysis",
        email: "supervisor@ntro.gov.in",
        location: "Hyderabad, India",
      },
      query: "quarterly performance review documents",
      timestamp: "01:15 PM",
      date: "2024-10-12",
      resultCount: 18,
      searchType: "text",
      duration: "0.21s",
      modalities: ["PDF", "DOC"],
      ipAddress: "192.168.1.55",
      device: "Laptop",
      browser: "Chrome 118.0",
      status: "success",
      filters: ["Quarter: Q3 2024", "Document Type: Review"],
    },
    {
      id: "7",
      employee: {
        name: "Anant Raj",
        id: "EMP-2024-001",
        role: "Analyst",
        department: "Intelligence Analysis",
        email: "anant.raj@ntro.gov.in",
        location: "New Delhi, India",
      },
      query: "satellite imagery analysis tools",
      timestamp: "11:30 AM",
      date: "2024-10-12",
      resultCount: 41,
      searchType: "image",
      duration: "0.58s",
      modalities: ["Images"],
      ipAddress: "192.168.1.45",
      device: "Desktop",
      browser: "Chrome 118.0",
      status: "partial",
      filters: ["Image Type: Satellite", "Resolution: High"],
    },
    {
      id: "8",
      employee: {
        name: "David Kumar",
        id: "EMP-2024-033",
        role: "Analyst",
        department: "Cyber Security",
        email: "david.kumar@ntro.gov.in",
        location: "Pune, India",
      },
      query: "malware detection patterns",
      timestamp: "10:00 AM",
      date: "2024-10-12",
      resultCount: 89,
      searchType: "multimodal",
      duration: "0.73s",
      modalities: ["PDF", "Images", "Audio"],
      ipAddress: "192.168.1.98",
      device: "Desktop",
      browser: "Firefox 119.0",
      status: "success",
      filters: ["Threat Level: High", "Category: Malware"],
    },
  ];

  // Filter records
  const filteredRecords = searchRecords.filter((record) => {
    const matchesRole = filterRole === "all" || record.employee.role === filterRole;
    const matchesType = filterType === "all" || record.searchType === filterType;
    const matchesSearch =
      searchFilter === "" ||
      record.query.toLowerCase().includes(searchFilter.toLowerCase()) ||
      record.employee.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      record.employee.id.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesRole && matchesType && matchesSearch;
  });

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

  // Get search type icon
  const getSearchTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="w-4 h-4" />;
      case "image":
        return <Image className="w-4 h-4" />;
      case "audio":
        return <Mic className="w-4 h-4" />;
      case "multimodal":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/50">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Success
          </Badge>
        );
      case "partial":
        return (
          <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/50">
            <AlertCircle className="w-3 h-3 mr-1" />
            Partial
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/50">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  // Handle opening detail view
  const handleOpenDetail = (record: SearchRecord) => {
    setSelectedRecord(record);
    setIsDetailOpen(true);
  };

  // Calculate statistics
  const totalSearches = searchRecords.length;
  const todaySearches = searchRecords.filter(
    (r) => r.date === "2024-10-13"
  ).length;
  const avgDuration =
    searchRecords.reduce((acc, r) => acc + parseFloat(r.duration), 0) /
    searchRecords.length;
  const uniqueUsers = new Set(searchRecords.map((r) => r.employee.id)).size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="mb-2">Search History & Analytics</h3>
        <p className="text-sm text-muted-foreground">
          Track and monitor all search activities performed by team members with
          detailed employee information and timestamps.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl">{totalSearches}</p>
              <p className="text-xs text-muted-foreground">Total Searches</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl">{todaySearches}</p>
              <p className="text-xs text-muted-foreground">Today's Searches</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl">{avgDuration.toFixed(2)}s</p>
              <p className="text-xs text-muted-foreground">Avg. Duration</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <User className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl">{uniqueUsers}</p>
              <p className="text-xs text-muted-foreground">Active Users</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by query, employee name, or ID..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Analyst">Analyst</SelectItem>
              <SelectItem value="Supervisor">Supervisor</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="text">Text Search</SelectItem>
              <SelectItem value="image">Image Search</SelectItem>
              <SelectItem value="audio">Audio Search</SelectItem>
              <SelectItem value="multimodal">Multimodal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Search Records */}
      <Card>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h4>Search Records ({filteredRecords.length})</h4>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border">
          {filteredRecords.length === 0 ? (
            <div className="p-12 text-center">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No search records match your filters
              </p>
            </div>
          ) : (
            filteredRecords.map((record) => (
              <div
                key={record.id}
                className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleOpenDetail(record)}
              >
                <div className="flex items-start gap-4">
                  {/* Employee Avatar */}
                  <Avatar className="w-12 h-12 border-2 border-border">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {record.employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Employee Info */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-medium">{record.employee.name}</span>
                      <Badge
                        variant="outline"
                        className={getRoleBadgeColor(record.employee.role)}
                      >
                        {record.employee.role}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {record.employee.id}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {record.employee.department}
                      </span>
                    </div>

                    {/* Search Query */}
                    <div className="mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        {getSearchTypeIcon(record.searchType)}
                        <p className="text-sm">
                          <span className="text-muted-foreground">
                            Searched for:
                          </span>{" "}
                          <span className="font-medium">"{record.query}"</span>
                        </p>
                      </div>
                    </div>

                    {/* Metadata */}
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
                        <TrendingUp className="w-3 h-3" />
                        {record.resultCount} results
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {record.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        {record.modalities.map((mod, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs px-1.5 py-0"
                          >
                            {mod}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(record);
                    }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Search Activity Details</DialogTitle>
            <DialogDescription>
              Complete information about this search activity including employee details, search parameters, and results.
            </DialogDescription>
          </DialogHeader>

          {selectedRecord && (
            <ScrollArea className="max-h-[calc(90vh-100px)]">
              <div className="space-y-6 pr-4">
                {/* Employee Information */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Employee Information
                  </h4>
                  <Card className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16 border-2 border-border">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {selectedRecord.employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-lg">
                            {selectedRecord.employee.name}
                          </span>
                          <Badge
                            variant="outline"
                            className={getRoleBadgeColor(
                              selectedRecord.employee.role
                            )}
                          >
                            {selectedRecord.employee.role}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4" />
                            {selectedRecord.employee.id}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <FileText className="w-4 h-4" />
                            {selectedRecord.employee.department}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Globe className="w-4 h-4" />
                            {selectedRecord.employee.email}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {selectedRecord.employee.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <Separator />

                {/* Search Details */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Search Details
                  </h4>
                  <Card className="p-4 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Search Query
                      </p>
                      <div className="bg-muted/50 border border-border rounded-lg p-3">
                        <p className="font-medium">"{selectedRecord.query}"</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Search Type
                        </p>
                        <div className="flex items-center gap-2">
                          {getSearchTypeIcon(selectedRecord.searchType)}
                          <span className="capitalize">
                            {selectedRecord.searchType}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Results Found
                        </p>
                        <p className="font-medium">
                          {selectedRecord.resultCount} items
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Duration
                        </p>
                        <p className="font-medium">{selectedRecord.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Date & Time
                        </p>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="w-3 h-3" />
                          {selectedRecord.date} at {selectedRecord.timestamp}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Status
                        </p>
                        {getStatusBadge(selectedRecord.status)}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Modalities
                        </p>
                        <div className="flex gap-1 flex-wrap">
                          {selectedRecord.modalities.map((mod, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {mod}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {selectedRecord.filters && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Applied Filters
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {selectedRecord.filters.map((filter, idx) => (
                            <Badge key={idx} variant="outline">
                              <Filter className="w-3 h-3 mr-1" />
                              {filter}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                </div>

                <Separator />

                {/* System Information */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    System Information
                  </h4>
                  <Card className="p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          IP Address
                        </p>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span className="font-mono text-sm">
                            {selectedRecord.ipAddress}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Device
                        </p>
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4" />
                          <span>{selectedRecord.device}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Browser
                        </p>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>{selectedRecord.browser}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Search Results Preview */}
                {selectedRecord.results && selectedRecord.results.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Top Search Results
                      </h4>
                      <div className="space-y-3">
                        {selectedRecord.results.map((result) => (
                          <Card key={result.id} className="p-4">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  {result.type === "PDF" && (
                                    <FileText className="w-5 h-5 text-red-500" />
                                  )}
                                  {result.type === "Image" && (
                                    <Image className="w-5 h-5 text-blue-500" />
                                  )}
                                  {result.type === "DOC" && (
                                    <FileText className="w-5 h-5 text-blue-600" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="mb-1">{result.title}</h5>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {result.snippet}
                                  </p>
                                  <div className="flex items-center gap-3 mt-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {result.type}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <TrendingUp className="w-3 h-3" />
                                      {(result.relevance * 100).toFixed(0)}%
                                      relevance
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Details
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Search className="w-4 h-4 mr-2" />
                    Repeat Search
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailOpen(false)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Close
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
