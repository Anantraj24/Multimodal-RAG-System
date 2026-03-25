import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Info,
  Megaphone,
  Search,
  X,
  Calendar,
  Clock,
  Filter,
  ChevronRight,
  Wrench,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

type NoticeType = "announcement" | "alert" | "update" | "maintenance" | "security";
type NoticePriority = "low" | "medium" | "high" | "critical";

interface Notice {
  id: string;
  type: NoticeType;
  priority: NoticePriority;
  title: string;
  message: string;
  timestamp: string;
  author: string;
  isRead: boolean;
  actionRequired?: boolean;
  expiresAt?: string;
}

export function Notice() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<NoticeType | "all">("all");
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: "1",
      type: "security",
      priority: "critical",
      title: "Critical Security Update Required",
      message: "A critical security patch is available for the RAG system. Please update your system immediately to ensure data protection and compliance with NTRO security protocols.",
      timestamp: "2024-10-14 09:30",
      author: "Security Team",
      isRead: false,
      actionRequired: true,
      expiresAt: "2024-10-16",
    },
    {
      id: "2",
      type: "announcement",
      priority: "high",
      title: "New Advanced RAG Features Released",
      message: "We're excited to announce the release of new advanced RAG features including Timeline View and Image Region Search. Check out the Advanced RAG section to explore these capabilities.",
      timestamp: "2024-10-14 08:00",
      author: "Product Team",
      isRead: false,
      actionRequired: false,
    },
    {
      id: "3",
      type: "maintenance",
      priority: "medium",
      title: "Scheduled System Maintenance",
      message: "The system will undergo routine maintenance on October 15, 2024, from 02:00 to 04:00 AM. Offline mode will remain available during this period.",
      timestamp: "2024-10-13 16:45",
      author: "Operations Team",
      isRead: true,
      actionRequired: false,
      expiresAt: "2024-10-15",
    },
    {
      id: "4",
      type: "update",
      priority: "low",
      title: "Database Performance Improvements",
      message: "We've optimized the database query performance, resulting in 40% faster search results across all data types. No action required from your end.",
      timestamp: "2024-10-13 10:20",
      author: "Engineering Team",
      isRead: true,
      actionRequired: false,
    },
    {
      id: "5",
      type: "alert",
      priority: "high",
      title: "Unusual Activity Detected",
      message: "Our monitoring system detected unusual activity in your account on October 12. Please review your recent audit logs and contact the security team if you notice any unauthorized access.",
      timestamp: "2024-10-12 14:15",
      author: "Security Monitoring",
      isRead: false,
      actionRequired: true,
      expiresAt: "2024-10-20",
    },
    {
      id: "6",
      type: "announcement",
      priority: "medium",
      title: "Weekly Intelligence Briefing Available",
      message: "The weekly intelligence briefing for Week 41 is now available in the Resources section. This briefing includes key updates on ongoing operations and threat assessments.",
      timestamp: "2024-10-11 09:00",
      author: "Intelligence Division",
      isRead: true,
      actionRequired: false,
    },
    {
      id: "7",
      type: "update",
      priority: "low",
      title: "UI/UX Enhancements",
      message: "We've made several improvements to the user interface including better dark mode support, smoother animations, and enhanced accessibility features.",
      timestamp: "2024-10-10 11:30",
      author: "Design Team",
      isRead: true,
      actionRequired: false,
    },
  ]);

  const getNoticeIcon = (type: NoticeType) => {
    switch (type) {
      case "announcement":
        return Megaphone;
      case "alert":
        return AlertTriangle;
      case "update":
        return TrendingUp;
      case "maintenance":
        return Wrench;
      case "security":
        return Shield;
      default:
        return Info;
    }
  };

  const getNoticeColor = (type: NoticeType) => {
    switch (type) {
      case "announcement":
        return "text-blue-500 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20";
      case "alert":
        return "text-red-500 bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20";
      case "update":
        return "text-green-500 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20";
      case "maintenance":
        return "text-orange-500 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20";
      case "security":
        return "text-purple-500 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20";
      default:
        return "text-gray-500 bg-gradient-to-br from-gray-500/10 to-gray-600/5 border-gray-500/20";
    }
  };

  const getPriorityColor = (priority: NoticePriority) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-600 border-red-500/50";
      case "high":
        return "bg-orange-500/20 text-orange-600 border-orange-500/50";
      case "medium":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/50";
      case "low":
        return "bg-blue-500/20 text-blue-600 border-blue-500/50";
      default:
        return "bg-gray-500/20 text-gray-600 border-gray-500/50";
    }
  };

  const getPriorityBadgeColor = (priority: NoticePriority) => {
    switch (priority) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id ? { ...notice, isRead: true } : notice
      )
    );
  };

  const handleDismiss = (id: string) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  };

  const filteredNotices = notices
    .filter((notice) => filterType === "all" || notice.type === filterType)
    .filter((notice) =>
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const unreadCount = notices.filter((n) => !n.isRead).length;
  const actionRequiredCount = notices.filter((n) => n.actionRequired && !n.isRead).length;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-muted/10">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="mb-0">Notices & Announcements</h2>
                <p className="text-sm text-muted-foreground">
                  Stay updated with system notifications and important announcements
                </p>
              </div>
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
                <p className="text-xs text-muted-foreground mb-1">Total Notices</p>
                <p className="text-xl">{notices.length}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-orange-500/5 to-transparent border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Unread</p>
                <p className="text-xl">{unreadCount}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Action Required</p>
                <p className="text-xl">{actionRequiredCount}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notices..."
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                {filterType === "all" ? "All Types" : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterType("all")}>
                All Types
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterType("announcement")}>
                <Megaphone className="w-4 h-4 mr-2" />
                Announcements
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("alert")}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Alerts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("update")}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Updates
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("maintenance")}>
                <Wrench className="w-4 h-4 mr-2" />
                Maintenance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("security")}>
                <Shield className="w-4 h-4 mr-2" />
                Security
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Notices List */}
      <div className="flex-1 overflow-auto p-6">
        <AnimatePresence mode="wait">
          {filteredNotices.length === 0 ? (
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
                  <Bell className="w-10 h-10 text-primary" />
                </motion.div>
                <h3 className="mb-2">No Notices Found</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {searchQuery
                    ? `No notices match "${searchQuery}"`
                    : "You're all caught up! No notices to display."}
                </p>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredNotices.map((notice, index) => {
                const Icon = getNoticeIcon(notice.type);
                const colorClass = getNoticeColor(notice.type);
                const priorityColor = getPriorityColor(notice.priority);

                return (
                  <motion.div
                    key={notice.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`p-5 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden border-2 ${
                        !notice.isRead ? "border-primary/30 bg-primary/5" : "border-border"
                      }`}
                    >
                      {/* Priority Indicator */}
                      {!notice.isRead && (
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${getPriorityBadgeColor(notice.priority)}`} />
                      )}

                      <div className="flex gap-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0 border`}>
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm">{notice.title}</h4>
                                {!notice.isRead && (
                                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {notice.message}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 flex-shrink-0"
                              onClick={() => handleDismiss(notice.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Meta Information */}
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5" />
                              {notice.timestamp}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <span>by {notice.author}</span>
                            </div>
                            {notice.expiresAt && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="w-3.5 h-3.5" />
                                Expires: {notice.expiresAt}
                              </div>
                            )}
                          </div>

                          {/* Badges and Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" className={priorityColor}>
                                {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                              </Badge>
                              {notice.actionRequired && (
                                <Badge variant="secondary" className="bg-red-500/20 text-red-600 border-red-500/50">
                                  Action Required
                                </Badge>
                              )}
                            </div>

                            <div className="flex gap-2">
                              {!notice.isRead && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(notice.id)}
                                >
                                  <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                  Mark as Read
                                </Button>
                              )}
                              {notice.actionRequired && (
                                <Button size="sm" className="gap-1.5">
                                  Take Action
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
