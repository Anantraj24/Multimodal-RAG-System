import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Home,
  FileText,
  Users,
  Settings,
  Bell,
  Search,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Activity,
} from "lucide-react";

interface FakeWebsiteProps {
  userRole: "Analyst" | "Supervisor" | "Admin";
  userName: string;
  onLogout: () => void;
}

export function FakeWebsite({ userRole, userName, onLogout }: FakeWebsiteProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="mb-0">Document Management System</h2>
              <p className="text-xs text-muted-foreground">Enterprise Edition</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm">{userName}</p>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card p-4">
          <nav className="space-y-2">
            <Button variant="secondary" className="w-full justify-start gap-3">
              <Home className="w-5 h-5" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <FileText className="w-5 h-5" />
              Documents
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Users className="w-5 h-5" />
              Contacts
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Calendar className="w-5 h-5" />
              Calendar
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Mail className="w-5 h-5" />
              Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <BarChart3 className="w-5 h-5" />
              Reports
            </Button>
            <div className="pt-4 border-t border-border mt-4">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Bell className="w-5 h-5" />
                Notifications
                <Badge variant="secondary" className="ml-auto">3</Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Settings className="w-5 h-5" />
                Settings
              </Button>
            </div>
          </nav>

          {/* Status Card */}
          <Card className="mt-6 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-green-500" />
              <span className="text-sm">System Status</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Server</span>
                <span className="text-green-600">Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Database</span>
                <span className="text-green-600">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Storage</span>
                <span className="text-green-600">Active</span>
              </div>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-muted/20">
          <div className="container max-w-7xl mx-auto p-6">
            {/* Welcome Section */}
            <div className="mb-6">
              <h3 className="mb-2">Welcome back, {userName}</h3>
              <p className="text-sm text-muted-foreground">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" • "}
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search documents, contacts, or messages..."
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Documents</span>
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl">1,247</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Active Users</span>
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl">34</p>
                <p className="text-xs text-blue-600 mt-1">5 online now</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Pending Tasks</span>
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-2xl">18</p>
                <p className="text-xs text-orange-600 mt-1">3 due today</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl">892</p>
                <p className="text-xs text-green-600 mt-1">98% completion rate</p>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="mb-4">Recent Documents</h4>
                <div className="space-y-3">
                  {[
                    { name: "Quarterly Report Q3.pdf", date: "2 hours ago", size: "2.4 MB" },
                    { name: "Meeting Notes.docx", date: "5 hours ago", size: "156 KB" },
                    { name: "Budget Analysis.xlsx", date: "Yesterday", size: "890 KB" },
                    { name: "Project Timeline.pdf", date: "2 days ago", size: "1.2 MB" },
                    { name: "Client Proposal.pptx", date: "3 days ago", size: "5.7 MB" },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.date}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{doc.size}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="mb-4">Notifications</h4>
                <div className="space-y-3">
                  {[
                    {
                      icon: Mail,
                      title: "New message from John Smith",
                      time: "10 minutes ago",
                      type: "info",
                    },
                    {
                      icon: AlertCircle,
                      title: "Document approval required",
                      time: "1 hour ago",
                      type: "warning",
                    },
                    {
                      icon: CheckCircle2,
                      title: "Task completed successfully",
                      time: "3 hours ago",
                      type: "success",
                    },
                    {
                      icon: Calendar,
                      title: "Meeting scheduled for tomorrow",
                      time: "5 hours ago",
                      type: "info",
                    },
                    {
                      icon: TrendingUp,
                      title: "Monthly report generated",
                      time: "Yesterday",
                      type: "success",
                    },
                  ].map((notification, idx) => {
                    const Icon = notification.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            notification.type === "success"
                              ? "bg-green-500/10"
                              : notification.type === "warning"
                              ? "bg-orange-500/10"
                              : "bg-blue-500/10"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              notification.type === "success"
                                ? "text-green-500"
                                : notification.type === "warning"
                                ? "text-orange-500"
                                : "text-blue-500"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mt-6 p-6">
              <h4 className="mb-4">Quick Actions</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm">New Document</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm">Schedule Meeting</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                  <Mail className="w-6 h-6" />
                  <span className="text-sm">Send Message</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                  <BarChart3 className="w-6 h-6" />
                  <span className="text-sm">Generate Report</span>
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
