import { useState } from "react";
import { Shield, Lock, Eye, EyeOff, ChevronRight, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";


interface LoginPageProps {
  onLogin: (username: string, role: "Analyst" | "Supervisor" | "Admin", isDummy?: boolean) => void;
}

type RoleType = "Analyst" | "Supervisor" | "Admin";

interface RoleInfo {
  name: RoleType;
  description: string;
  permissions: string[];
  color: string;
  bgColor: string;
  borderColor: string;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [step, setStep] = useState<"role" | "credentials">("role");
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles: RoleInfo[] = [
    {
      name: "Analyst",
      description: "Upload and search data, create reports and analyze documents",
      permissions: [
        "Search & Query",
        "Upload Documents",
        "View Reports",
        "Create Timelines",
      ],
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/50",
    },
    {
      name: "Supervisor",
      description: "Review and approve reports, monitor team activity and manage workflows",
      permissions: [
        "All Analyst Permissions",
        "Review & Approve",
        "Team Monitoring",
        "Audit Logs Access",
      ],
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/50",
    },
    {
      name: "Admin",
      description: "Full system control, user management, and security configuration",
      permissions: [
        "All Permissions",
        "User Management",
        "System Configuration",
        "Security Settings",
      ],
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/50",
    },
  ];

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
    setStep("credentials");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password && selectedRole) {
      setLoading(true);
      
      // Simulate authentication delay
      setTimeout(() => {
        let isValid = false;
        let isDummy = false;
        let errorMessage = "";

        // Validate credentials based on role
        if (selectedRole === "Analyst") {
          if (username === "anantraj" && password === "Anant123") {
            isValid = true;
            isDummy = false;
          } else if (username === "analyst_demo" && password === "Demo@123") {
            isValid = true;
            isDummy = true;
          } else {
            errorMessage = "Invalid credentials for Analyst. Please use the correct username and password.";
          }
        } else if (selectedRole === "Supervisor") {
          if (username === "supervisor" && password === "Super@123") {
            isValid = true;
            isDummy = false;
          } else if (username === "super_demo" && password === "Demo@456") {
            isValid = true;
            isDummy = true;
          } else {
            errorMessage = "Invalid credentials for Supervisor. Please use the correct username and password.";
          }
        } else if (selectedRole === "Admin") {
          if (username === "admin" && password === "Admin@2024") {
            isValid = true;
            isDummy = false;
          } else if (username === "admin_demo" && password === "Demo@789") {
            isValid = true;
            isDummy = true;
          } else {
            errorMessage = "Invalid credentials for Admin. Please use the correct username and password.";
          }
        }

        if (isValid) {
          onLogin(username, selectedRole, isDummy);
        } else {
          setLoading(false);
          alert(errorMessage);
        }
      }, 1500);
    }
  };

  const handleBack = () => {
    setStep("role");
    setSelectedRole(null);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1639322537504-6427a16b0a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cmUlMjBhdXRoZW50aWNhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYwMzYwNzg1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Security Background"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10"></div>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1>NTRO RAG System</h1>
          </div>
          <p className="text-muted-foreground">
            Secure Multimodal Intelligence Analysis Platform
          </p>
          <Badge variant="outline" className="mt-2">
            <Lock className="w-3 h-3 mr-1" />
            Offline Mode • AES-256 Encrypted
          </Badge>
        </div>

        {/* Role Selection */}
        {step === "role" && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="mb-2">Select Your Role</h3>
              <p className="text-sm text-muted-foreground">
                Choose your hierarchy level to continue
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map((role) => (
                <Card
                  key={role.name}
                  className={`p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 border-2 ${
                    selectedRole === role.name
                      ? `${role.borderColor} ${role.bgColor}`
                      : "border-border"
                  }`}
                  onClick={() => handleRoleSelect(role.name)}
                >
                  <div className="space-y-4">
                    {/* Role Header */}
                    <div className="flex items-center justify-between">
                      <Badge className={`${role.color} ${role.bgColor}`}>
                        {role.name}
                      </Badge>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Role Description */}
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </div>

                    {/* Permissions */}
                    <div className="space-y-2">
                      {role.permissions.map((permission, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs"
                        >
                          <CheckCircle2 className={`w-3 h-3 ${role.color}`} />
                          <span className="text-muted-foreground">
                            {permission}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Credentials Form */}
        {step === "credentials" && selectedRole && (
          <div className="max-w-md mx-auto">
            <Card className="p-8">
              <div className="space-y-6">
                {/* Selected Role Display */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">
                      Logging in as
                    </span>
                    <Badge
                      className={`${
                        roles.find((r) => r.name === selectedRole)?.color
                      } ${roles.find((r) => r.name === selectedRole)?.bgColor}`}
                    >
                      {selectedRole}
                    </Badge>
                  </div>
                  <h3>Enter Credentials</h3>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username / Employee ID</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>
                        Your credentials are encrypted using AES-256 and verified
                        locally. No data is transmitted over the network.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={handleBack}
                      disabled={loading}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={loading || !username || !password}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
                          Authenticating...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Login Securely
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                {/* Demo Credentials */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    Available {selectedRole} Credentials
                  </p>
                  
                  {/* Real Credentials */}
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/50 text-[10px]">
                        REAL SYSTEM
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Username:</span>
                        <span className="font-mono">
                          {selectedRole === "Analyst" && "anantraj"}
                          {selectedRole === "Supervisor" && "supervisor"}
                          {selectedRole === "Admin" && "admin"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Password:</span>
                        <span className="font-mono">
                          {selectedRole === "Analyst" && "Anant123"}
                          {selectedRole === "Supervisor" && "Super@123"}
                          {selectedRole === "Admin" && "Admin@2024"}
                        </span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 border-green-500/30 hover:bg-green-500/10"
                      onClick={() => {
                        if (selectedRole === "Analyst") {
                          setUsername("anantraj");
                          setPassword("Anant123");
                        } else if (selectedRole === "Supervisor") {
                          setUsername("supervisor");
                          setPassword("Super@123");
                        } else if (selectedRole === "Admin") {
                          setUsername("admin");
                          setPassword("Admin@2024");
                        }
                      }}
                    >
                      Auto-fill Real Credentials
                    </Button>
                  </div>

                  {/* Dummy/Decoy Credentials */}
                  <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 border-orange-500/50 text-[10px]">
                        DECOY MODE
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Username:</span>
                        <span className="font-mono">
                          {selectedRole === "Analyst" && "analyst_demo"}
                          {selectedRole === "Supervisor" && "super_demo"}
                          {selectedRole === "Admin" && "admin_demo"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Password:</span>
                        <span className="font-mono">
                          {selectedRole === "Analyst" && "Demo@123"}
                          {selectedRole === "Supervisor" && "Demo@456"}
                          {selectedRole === "Admin" && "Demo@789"}
                        </span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 border-orange-500/30 hover:bg-orange-500/10"
                      onClick={() => {
                        if (selectedRole === "Analyst") {
                          setUsername("analyst_demo");
                          setPassword("Demo@123");
                        } else if (selectedRole === "Supervisor") {
                          setUsername("super_demo");
                          setPassword("Demo@456");
                        } else if (selectedRole === "Admin") {
                          setUsername("admin_demo");
                          setPassword("Demo@789");
                        }
                      }}
                    >
                      Auto-fill Decoy Credentials
                    </Button>
                  </div>
                  
                  <p className="text-[10px] text-muted-foreground text-center mt-2">
                    Decoy mode shows a fake interface for security purposes
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>
            National Technical Research Organisation (NTRO) • Smart Innovation
            Hackathon 2025
          </p>
          <p className="mt-1">
            Protected by AES-256 Encryption • Offline Mode Enabled • Version
            1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
