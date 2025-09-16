import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  Database, 
  Settings, 
  FileText,
  Trash2,
  Edit,
  Plus,
  UserCheck,
  Lock
} from "lucide-react";

const AdminSection = () => {
  const [users] = useState([
    { id: 1, name: "John Smith", email: "john.smith@company.com", role: "Technician", status: "Active" },
    { id: 2, name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "Supervisor", status: "Active" },
    { id: 3, name: "Mike Wilson", email: "mike.wilson@company.com", role: "Technician", status: "Inactive" },
    { id: 4, name: "Lisa Brown", email: "lisa.brown@company.com", role: "Quality", status: "Active" }
  ]);

  const [setupSheets] = useState([
    { id: 1, machine: "Haitian MA1200", mold: "Mold-001", material: "ABS", lastModified: "2024-01-15" },
    { id: 2, machine: "Engel e-motion 440", mold: "Mold-002", material: "PP", lastModified: "2024-01-14" },
    { id: 3, machine: "Arburg 270S", mold: "Mold-003", material: "PC", lastModified: "2024-01-13" }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold gradient-text-primary">Administrator Panel</h2>
          <p className="text-muted-foreground">System management and user administration</p>
        </div>
        <Badge variant="outline" className="border-accent text-accent">
          <Shield className="h-3 w-3 mr-1" />
          Admin Access
        </Badge>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
          <TabsTrigger value="backup">Backup & Export</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage user accounts, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Input placeholder="Search users..." className="w-64" />
                  <Button variant="outline">Search</Button>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>

              <div className="space-y-3">
                {users.map((user) => (
                  <Card key={user.id} className="border-l-4 border-l-primary">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline">{user.role}</Badge>
                            <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Lock className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>
                Manage setup sheets, notes, and system data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center p-4">
                  <CardContent className="pt-0">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium">Setup Sheets</h3>
                    <p className="text-2xl font-bold text-primary">24</p>
                    <p className="text-xs text-muted-foreground">Total sheets</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-4">
                  <CardContent className="pt-0">
                    <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
                    <h3 className="font-medium">Public Notes</h3>
                    <p className="text-2xl font-bold text-accent">12</p>
                    <p className="text-xs text-muted-foreground">Shared insights</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-4">
                  <CardContent className="pt-0">
                    <Database className="h-8 w-8 mx-auto mb-2 text-success" />
                    <h3 className="font-medium">Active Users</h3>
                    <p className="text-2xl font-bold text-success">8</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Setup Sheets</h3>
                <div className="space-y-3">
                  {setupSheets.map((sheet) => (
                    <Card key={sheet.id} className="border-l-4 border-l-accent">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{sheet.machine} - {sheet.mold}</h4>
                            <p className="text-sm text-muted-foreground">
                              Material: {sheet.material} • Last modified: {sheet.lastModified}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Settings
              </CardTitle>
              <CardDescription>
                Configure system-wide settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Password Requirements</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Session Timeout</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Two-Factor Auth</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">System Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Default Units</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Temperature Scale</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Notification Settings</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup & Export
              </CardTitle>
              <CardDescription>
                Data backup, export, and system maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Data Export</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Export All Setup Sheets
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Export User Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="h-4 w-4 mr-2" />
                      Export Public Notes
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">System Backup</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Last Backup</span>
                        <Badge variant="outline">Success</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">January 15, 2024 at 2:00 AM</p>
                    </div>
                    <Button className="w-full">
                      Create System Backup
                    </Button>
                    <Button variant="outline" className="w-full">
                      Schedule Automatic Backups
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSection;