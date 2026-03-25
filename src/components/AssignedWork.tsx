import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  ClipboardList,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Circle,
  Search,
  Filter,
  User,
  Flag,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Folder,
  ChevronRight,
  MoreVertical,
  MessageSquare,
  Paperclip,
  Sparkles,
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
import { Progress } from "./ui/progress";

type TaskPriority = "low" | "medium" | "high" | "critical";
type TaskStatus = "pending" | "in-progress" | "review" | "completed" | "blocked";

interface Task {
  id: string;
  title: string;
  description: string;
  assignedBy: {
    name: string;
    role: string;
    avatar: string;
  };
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdDate: string;
  progress: number;
  category: string;
  attachments: number;
  comments: number;
  tags: string[];
  relatedFiles?: string[];
}

export function AssignedWork() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const tasks: Task[] = [
    {
      id: "1",
      title: "Review Security Assessment Q4 2024",
      description: "Conduct thorough review of the quarterly security assessment document and provide feedback on threat analysis section",
      assignedBy: {
        name: "Sarah Johnson",
        role: "Supervisor",
        avatar: "SJ",
      },
      priority: "critical",
      status: "in-progress",
      dueDate: "2024-10-16",
      createdDate: "2024-10-12",
      progress: 65,
      category: "Security",
      attachments: 3,
      comments: 5,
      tags: ["Security", "Review", "Q4"],
      relatedFiles: ["Security Assessment Q4 2024.pdf", "Threat Analysis Data.xlsx"],
    },
    {
      id: "2",
      title: "Update Project Phoenix Timeline",
      description: "Realign project milestones based on recent resource allocation changes and submit updated timeline by EOD",
      assignedBy: {
        name: "Admin User",
        role: "Admin",
        avatar: "AD",
      },
      priority: "high",
      status: "pending",
      dueDate: "2024-10-15",
      createdDate: "2024-10-13",
      progress: 0,
      category: "Project Management",
      attachments: 2,
      comments: 3,
      tags: ["Project Phoenix", "Timeline", "Urgent"],
      relatedFiles: ["Project Phoenix Timeline.doc"],
    },
    {
      id: "3",
      title: "Analyze Satellite Imagery Dataset",
      description: "Process and analyze the new batch of satellite images for infrastructure monitoring project",
      assignedBy: {
        name: "Mike Chen",
        role: "Team Lead",
        avatar: "MC",
      },
      priority: "medium",
      status: "in-progress",
      dueDate: "2024-10-18",
      createdDate: "2024-10-10",
      progress: 45,
      category: "Analysis",
      attachments: 15,
      comments: 8,
      tags: ["Satellite", "Infrastructure", "Analysis"],
      relatedFiles: ["Satellite Image Dataset"],
    },
    {
      id: "4",
      title: "Prepare Weekly Intelligence Briefing",
      description: "Compile and summarize key intelligence updates for the weekly team briefing presentation",
      assignedBy: {
        name: "Sarah Johnson",
        role: "Supervisor",
        avatar: "SJ",
      },
      priority: "high",
      status: "review",
      dueDate: "2024-10-14",
      createdDate: "2024-10-11",
      progress: 90,
      category: "Intelligence",
      attachments: 4,
      comments: 2,
      tags: ["Briefing", "Weekly", "Intelligence"],
    },
    {
      id: "5",
      title: "Database Backup Verification",
      description: "Verify integrity of recent database backups and document any anomalies found during the process",
      assignedBy: {
        name: "Admin User",
        role: "Admin",
        avatar: "AD",
      },
      priority: "medium",
      status: "completed",
      dueDate: "2024-10-13",
      createdDate: "2024-10-09",
      progress: 100,
      category: "Maintenance",
      attachments: 1,
      comments: 1,
      tags: ["Database", "Backup", "Verification"],
    },
    {
      id: "6",
      title: "Investigate Security Alert",
      description: "Investigate unusual activity detected in system logs and prepare incident report with recommendations",
      assignedBy: {
        name: "Security Team",
        role: "Security",
        avatar: "ST",
      },
      priority: "critical",
      status: "blocked",
      dueDate: "2024-10-15",
      createdDate: "2024-10-12",
      progress: 30,
      category: "Security",
      attachments: 6,
      comments: 12,
      tags: ["Security", "Investigation", "Incident"],
    },
    {
      id: "7",
      title: "Document API Integration Process",
      description: "Create comprehensive documentation for the new API integration workflow for future reference",
      assignedBy: {
        name: "Mike Chen",
        role: "Team Lead",
        avatar: "MC",
      },
      priority: "low",
      status: "pending",
      dueDate: "2024-10-20",
      createdDate: "2024-10-13",
      progress: 0,
      category: "Documentation",
      attachments: 0,
      comments: 1,
      tags: ["API", "Documentation", "Integration"],
    },
  ];

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      searchQuery === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Get priority color
  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/10 text-red-600 border-red-500/50";
      case "high":
        return "bg-orange-500/10 text-orange-600 border-orange-500/50";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/50";
      case "low":
        return "bg-blue-500/10 text-blue-600 border-blue-500/50";
    }
  };

  // Get priority icon
  const getPriorityIcon = (priority: TaskPriority) => {
    return <Flag className="w-3 h-3" />;
  };

  // Get status color
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/50";
      case "in-progress":
        return "bg-blue-500/10 text-blue-600 border-blue-500/50";
      case "review":
        return "bg-purple-500/10 text-purple-600 border-purple-500/50";
      case "blocked":
        return "bg-red-500/10 text-red-600 border-red-500/50";
      case "pending":
        return "bg-gray-500/10 text-gray-600 border-gray-500/50";
    }
  };

  // Get status icon
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-3 h-3" />;
      case "in-progress":
        return <TrendingUp className="w-3 h-3" />;
      case "review":
        return <AlertCircle className="w-3 h-3" />;
      case "blocked":
        return <AlertCircle className="w-3 h-3" />;
      case "pending":
        return <Circle className="w-3 h-3" />;
    }
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === "pending" || t.status === "in-progress").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const overdueCount = tasks.filter((t) => {
    const dueDate = new Date(t.dueDate);
    const today = new Date();
    return dueDate < today && t.status !== "completed";
  }).length;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-muted/10">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="mb-0">Assigned Work</h2>
                <p className="text-sm text-muted-foreground">
                  Track and manage tasks assigned to you
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
                <p className="text-xs text-muted-foreground mb-1">Total Tasks</p>
                <p className="text-xl">{totalTasks}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-orange-500/5 to-transparent border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Pending</p>
                <p className="text-xl">{pendingTasks}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Completed</p>
                <p className="text-xl">{completedTasks}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Overdue</p>
                <p className="text-xl">{overdueCount}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
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
              placeholder="Search tasks..."
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">In Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[180px]">
              <Flag className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-auto p-6">
        <AnimatePresence mode="wait">
          {filteredTasks.length === 0 ? (
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
                  <ClipboardList className="w-10 h-10 text-primary" />
                </motion.div>
                <h3 className="mb-2">No Tasks Found</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {searchQuery
                    ? `No tasks match "${searchQuery}"`
                    : "You're all caught up! No tasks assigned."}
                </p>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task, index) => {
                const dueDate = new Date(task.dueDate);
                const today = new Date();
                const isOverdue = dueDate < today && task.status !== "completed";
                const daysUntilDue = Math.ceil(
                  (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                );

                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`p-5 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/20 ${
                        isOverdue ? "border-red-500/30 bg-red-500/5" : ""
                      }`}
                    >
                      <div className="flex gap-4">
                        {/* Status Indicator */}
                        <div className="flex flex-col items-center gap-2 pt-1">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              task.status === "completed"
                                ? "bg-green-500"
                                : task.status === "blocked"
                                ? "bg-red-500"
                                : task.status === "in-progress"
                                ? "bg-blue-500"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h4 className="text-sm">{task.title}</h4>
                                <Badge
                                  variant="secondary"
                                  className={getPriorityColor(task.priority)}
                                >
                                  {getPriorityIcon(task.priority)}
                                  <span className="ml-1 capitalize">{task.priority}</span>
                                </Badge>
                                <Badge
                                  variant="secondary"
                                  className={getStatusColor(task.status)}
                                >
                                  {getStatusIcon(task.status)}
                                  <span className="ml-1 capitalize">
                                    {task.status.replace("-", " ")}
                                  </span>
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {task.description}
                              </p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="flex-shrink-0">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                <DropdownMenuItem>Add Comment</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Progress Bar */}
                          {task.status !== "completed" && task.progress > 0 && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Progress</span>
                                <span className="text-xs">{task.progress}%</span>
                              </div>
                              <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-primary rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${task.progress}%` }}
                                  transition={{ duration: 1, delay: index * 0.05 }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Assigned By */}
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="w-7 h-7 border border-border">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {task.assignedBy.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-xs text-muted-foreground">
                              Assigned by <span className="text-foreground">{task.assignedBy.name}</span>
                              <span className="mx-1">•</span>
                              <span>{task.assignedBy.role}</span>
                            </div>
                          </div>

                          {/* Meta Information */}
                          <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>Due: {task.dueDate}</span>
                              {isOverdue && (
                                <Badge variant="secondary" className="ml-1 bg-red-500/20 text-red-600 border-red-500/50 text-[10px] px-1">
                                  Overdue
                                </Badge>
                              )}
                              {!isOverdue && daysUntilDue <= 2 && task.status !== "completed" && (
                                <Badge variant="secondary" className="ml-1 bg-orange-500/20 text-orange-600 border-orange-500/50 text-[10px] px-1">
                                  {daysUntilDue} days left
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Folder className="w-3.5 h-3.5" />
                              {task.category}
                            </div>
                            {task.attachments > 0 && (
                              <div className="flex items-center gap-1">
                                <Paperclip className="w-3.5 h-3.5" />
                                {task.attachments} attachments
                              </div>
                            )}
                            {task.comments > 0 && (
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-3.5 h-3.5" />
                                {task.comments} comments
                              </div>
                            )}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {task.tags.map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs px-2 py-0.5 bg-muted/50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
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
    </div>
  );
}
