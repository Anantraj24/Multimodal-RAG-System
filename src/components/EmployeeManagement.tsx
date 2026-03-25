import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Users,
  Search,
  Filter,
  Clock,
  LogIn,
  LogOut,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Calendar,
  Briefcase,
  Activity,
  BarChart3,
  ClipboardList,
  User,
  MapPin,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";

interface WorkAssignment {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high" | "critical";
  dueDate: string;
  progress: number;
}

interface LoginSession {
  date: string;
  loginTime: string;
  logoutTime: string | null;
  duration: string;
  ipAddress: string;
  location: string;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  department: string;
  status: "online" | "offline" | "away";
  lastActive: string;
  todayLoginTime: string | null;
  todayLogoutTime: string | null;
  workingHours: string;
  assignments: WorkAssignment[];
  loginHistory: LoginSession[];
  productivity: number;
  tasksCompleted: number;
  tasksInProgress: number;
  tasksPending: number;
}

export function EmployeeManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const employees: Employee[] = [
    {
      id: "EMP-001",
      name: "Anant Raj",
      role: "Senior Analyst",
      email: "anantraj@ntro.gov.in",
      department: "Intelligence",
      status: "online",
      lastActive: "Just now",
      todayLoginTime: "09:15 AM",
      todayLogoutTime: null,
      workingHours: "5h 45m",
      productivity: 87,
      tasksCompleted: 12,
      tasksInProgress: 3,
      tasksPending: 2,
      assignments: [
        {
          id: "T001",
          title: "Review Security Assessment Q4 2024",
          status: "in-progress",
          priority: "critical",
          dueDate: "2024-10-16",
          progress: 65,
        },
        {
          id: "T002",
          title: "Analyze Satellite Imagery Dataset",
          status: "in-progress",
          priority: "medium",
          dueDate: "2024-10-18",
          progress: 45,
        },
        {
          id: "T003",
          title: "Database Backup Verification",
          status: "completed",
          priority: "medium",
          dueDate: "2024-10-13",
          progress: 100,
        },
      ],
      loginHistory: [
        {
          date: "2024-10-14",
          loginTime: "09:15 AM",
          logoutTime: null,
          duration: "5h 45m (ongoing)",
          ipAddress: "192.168.1.45",
          location: "New Delhi",
        },
        {
          date: "2024-10-13",
          loginTime: "09:05 AM",
          logoutTime: "06:30 PM",
          duration: "9h 25m",
          ipAddress: "192.168.1.45",
          location: "New Delhi",
        },
        {
          date: "2024-10-12",
          loginTime: "08:50 AM",
          logoutTime: "05:45 PM",
          duration: "8h 55m",
          ipAddress: "192.168.1.45",
          location: "New Delhi",
        },
        {
          date: "2024-10-11",
          loginTime: "09:30 AM",
          logoutTime: "06:15 PM",
          duration: "8h 45m",
          ipAddress: "192.168.1.45",
          location: "New Delhi",
        },
        {
          date: "2024-10-10",
          loginTime: "09:00 AM",
          logoutTime: "06:00 PM",
          duration: "9h 0m",
          ipAddress: "192.168.1.45",
          location: "New Delhi",
        },
      ],
    },
    {
      id: "EMP-002",
      name: "Priya Sharma",
      role: "Intelligence Analyst",
      email: "priya.sharma@ntro.gov.in",
      department: "Intelligence",
      status: "online",
      lastActive: "2 minutes ago",
      todayLoginTime: "08:45 AM",
      todayLogoutTime: null,
      workingHours: "6h 15m",
      productivity: 92,
      tasksCompleted: 15,
      tasksInProgress: 2,
      tasksPending: 1,
      assignments: [
        {
          id: "T004",
          title: "Threat Analysis Report",
          status: "in-progress",
          priority: "high",
          dueDate: "2024-10-15",
          progress: 80,
        },
        {
          id: "T005",
          title: "Intelligence Briefing Preparation",
          status: "completed",
          priority: "high",
          dueDate: "2024-10-14",
          progress: 100,
        },
      ],
      loginHistory: [
        {
          date: "2024-10-14",
          loginTime: "08:45 AM",
          logoutTime: null,
          duration: "6h 15m (ongoing)",
          ipAddress: "192.168.1.52",
          location: "New Delhi",
        },
        {
          date: "2024-10-13",
          loginTime: "08:30 AM",
          logoutTime: "05:45 PM",
          duration: "9h 15m",
          ipAddress: "192.168.1.52",
          location: "New Delhi",
        },
      ],
    },
    {
      id: "EMP-003",
      name: "Rahul Verma",
      role: "Junior Analyst",
      email: "rahul.verma@ntro.gov.in",
      department: "Security",
      status: "away",
      lastActive: "15 minutes ago",
      todayLoginTime: "09:30 AM",
      todayLogoutTime: null,
      workingHours: "5h 30m",
      productivity: 78,
      tasksCompleted: 8,
      tasksInProgress: 4,
      tasksPending: 3,
      assignments: [
        {
          id: "T006",
          title: "Security Alert Investigation",
          status: "in-progress",
          priority: "critical",
          dueDate: "2024-10-15",
          progress: 30,
        },
        {
          id: "T007",
          title: "Document API Integration",
          status: "pending",
          priority: "low",
          dueDate: "2024-10-20",
          progress: 0,
        },
      ],
      loginHistory: [
        {
          date: "2024-10-14",
          loginTime: "09:30 AM",
          logoutTime: null,
          duration: "5h 30m (ongoing)",
          ipAddress: "192.168.1.67",
          location: "New Delhi",
        },
        {
          date: "2024-10-13",
          loginTime: "09:45 AM",
          logoutTime: "06:00 PM",
          duration: "8h 15m",
          ipAddress: "192.168.1.67",
          location: "New Delhi",
        },
      ],
    },
    {
      id: "EMP-004",
      name: "Sneha Patel",
      role: "Data Analyst",
      email: "sneha.patel@ntro.gov.in",
      department: "Analysis",
      status: "offline",
      lastActive: "Yesterday at 6:00 PM",
      todayLoginTime: null,
      todayLogoutTime: null,
      workingHours: "0h 0m",
      productivity: 85,
      tasksCompleted: 10,
      tasksInProgress: 2,
      tasksPending: 2,
      assignments: [
        {
          id: "T008",
          title: "Data Processing Pipeline",
          status: "in-progress",
          priority: "medium",
          dueDate: "2024-10-17",
          progress: 55,
        },
      ],
      loginHistory: [
        {
          date: "2024-10-13",
          loginTime: "09:00 AM",
          logoutTime: "06:00 PM",
          duration: "9h 0m",
          ipAddress: "192.168.1.78",
          location: "Mumbai",
        },
        {
          date: "2024-10-12",
          loginTime: "08:45 AM",
          logoutTime: "05:30 PM",
          duration: "8h 45m",
          ipAddress: "192.168.1.78",
          location: "Mumbai",
        },
      ],
    },
    {
      id: "EMP-005",
      name: "Arjun Singh",
      role: "Security Analyst",
      email: "arjun.singh@ntro.gov.in",
      department: "Security",
      status: "online",
      lastActive: "Just now",
      todayLoginTime: "08:30 AM",
      todayLogoutTime: null,
      workingHours: "6h 30m",
      productivity: 90,
      tasksCompleted: 14,
      tasksInProgress: 3,
      tasksPending: 1,
      assignments: [
        {
          id: "T009",
          title: "Vulnerability Assessment",
          status: "in-progress",
          priority: "high",
          dueDate: "2024-10-16",
          progress: 70,
        },
        {
          id: "T010",
          title: "Security Patch Deployment",
          status: "completed",
          priority: "critical",
          dueDate: "2024-10-14",
          progress: 100,
        },
      ],
      loginHistory: [
        {
          date: "2024-10-14",
          loginTime: "08:30 AM",
          logoutTime: null,
          duration: "6h 30m (ongoing)",
          ipAddress: "192.168.1.89",
          location: "Bangalore",
        },
        {
          date: "2024-10-13",
          loginTime: "08:15 AM",
          logoutTime: "05:45 PM",
          duration: "9h 30m",
          ipAddress: "192.168.1.89",
          location: "Bangalore",
        },
      ],
    },
  ];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      searchQuery === "" ||
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || emp.status === filterStatus;
    const matchesDepartment = filterDepartment === "all" || emp.department === filterDepartment;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
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

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/50";
      case "in-progress":
        return "bg-blue-500/10 text-blue-600 border-blue-500/50";
      case "pending":
        return "bg-gray-500/10 text-gray-600 border-gray-500/50";
    }
  };

  const totalEmployees = employees.length;
  const onlineEmployees = employees.filter((e) => e.status === "online").length;
  const awayEmployees = employees.filter((e) => e.status === "away").length;
  const avgProductivity = Math.round(
    employees.reduce((acc, e) => acc + e.productivity, 0) / employees.length
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-muted/10">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="mb-0">Employee Management</h2>
                <p className="text-sm text-muted-foreground">
                  Monitor team activity and assignments
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
                <p className="text-xs text-muted-foreground mb-1">Total Employees</p>
                <p className="text-xl">{totalEmployees}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Online Now</p>
                <p className="text-xl">{onlineEmployees}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-yellow-500/5 to-transparent border-yellow-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Away</p>
                <p className="text-xl">{awayEmployees}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-purple-500/5 to-transparent border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Avg Productivity</p>
                <p className="text-xl">{avgProductivity}%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-500" />
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
              placeholder="Search employees..."
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
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="away">Away</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-[180px]">
              <Briefcase className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Intelligence">Intelligence</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
              <SelectItem value="Analysis">Analysis</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Employee List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-5 hover:shadow-lg transition-all border-2 hover:border-primary/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 border-2 border-border">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(
                          employee.status
                        )}`}
                      />
                    </div>
                    <div>
                      <h4 className="text-sm mb-1">{employee.name}</h4>
                      <p className="text-xs text-muted-foreground">{employee.role}</p>
                      <p className="text-xs text-muted-foreground">{employee.email}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedEmployee(employee)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Full History</DropdownMenuItem>
                      <DropdownMenuItem>Assign Task</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Today's Activity */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <LogIn className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-xs text-muted-foreground">Login</span>
                    </div>
                    <p className="text-sm">
                      {employee.todayLoginTime || "Not logged in"}
                    </p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs text-muted-foreground">Logout</span>
                    </div>
                    <p className="text-sm">
                      {employee.todayLogoutTime || "Active"}
                    </p>
                  </div>
                </div>

                {/* Working Hours & Productivity */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Working Hours Today</span>
                    <span>{employee.workingHours}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Productivity</span>
                    <span>{employee.productivity}%</span>
                  </div>
                  <Progress value={employee.productivity} className="h-2" />
                </div>

                {/* Task Summary */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-green-500/10 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Completed</p>
                    <p className="text-sm">{employee.tasksCompleted}</p>
                  </div>
                  <div className="text-center p-2 bg-blue-500/10 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">In Progress</p>
                    <p className="text-sm">{employee.tasksInProgress}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-500/10 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Pending</p>
                    <p className="text-sm">{employee.tasksPending}</p>
                  </div>
                </div>

                {/* Current Assignments */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Current Assignments</p>
                  <div className="space-y-2">
                    {employee.assignments
                      .filter((a) => a.status !== "completed")
                      .slice(0, 2)
                      .map((assignment) => (
                        <div
                          key={assignment.id}
                          className="p-2 bg-muted/30 rounded-lg text-xs"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="truncate flex-1">{assignment.title}</span>
                            <Badge
                              variant="secondary"
                              className={getPriorityColor(assignment.priority)}
                            >
                              {assignment.priority}
                            </Badge>
                          </div>
                          {assignment.status === "in-progress" && (
                            <Progress value={assignment.progress} className="h-1" />
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  View Full Details
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Employee Details Dialog */}
      {selectedEmployee && (
        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12 border-2 border-border">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedEmployee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(
                      selectedEmployee.status
                    )}`}
                  />
                </div>
                <div>
                  <DialogTitle>{selectedEmployee.name}</DialogTitle>
                  <DialogDescription>
                    {selectedEmployee.role} • {selectedEmployee.department}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <Tabs defaultValue="assignments" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="assignments">Work Assignments</TabsTrigger>
                <TabsTrigger value="login-history">Login History</TabsTrigger>
              </TabsList>

              <TabsContent value="assignments" className="space-y-3 mt-4">
                {selectedEmployee.assignments.map((assignment) => (
                  <Card key={assignment.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-sm mb-2">{assignment.title}</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="secondary"
                            className={getTaskStatusColor(assignment.status)}
                          >
                            {assignment.status.replace("-", " ")}
                          </Badge>
                          <Badge variant="secondary" className={getPriorityColor(assignment.priority)}>
                            {assignment.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Due: {assignment.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    {assignment.status === "in-progress" && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs">{assignment.progress}%</span>
                        </div>
                        <Progress value={assignment.progress} className="h-2" />
                      </div>
                    )}
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="login-history" className="space-y-3 mt-4">
                {selectedEmployee.loginHistory.map((session, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-sm">{session.date}</span>
                          {!session.logoutTime && (
                            <Badge
                              variant="secondary"
                              className="bg-green-500/10 text-green-600 border-green-500/50"
                            >
                              Active
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <LogIn className="w-3.5 h-3.5 text-green-500" />
                            Login: {session.loginTime}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <LogOut className="w-3.5 h-3.5 text-red-500" />
                            Logout: {session.logoutTime || "Active"}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            Duration: {session.duration}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            {session.location}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          IP: {session.ipAddress}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function Dialog({ open, onOpenChange, children }: any) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onOpenChange} />
      <div className="relative z-50">{children}</div>
    </div>
  );
}

function DialogContent({ className, children }: any) {
  return (
    <Card className={`p-6 ${className}`}>
      {children}
    </Card>
  );
}

function DialogHeader({ children }: any) {
  return <div className="mb-4">{children}</div>;
}

function DialogTitle({ children }: any) {
  return <h3 className="mb-1">{children}</h3>;
}

function DialogDescription({ children }: any) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
