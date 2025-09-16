import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Lock, 
  FileText, 
  Settings, 
  Fingerprint,
  Mail,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";

const ProfileSection = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Smith", 
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    department: "Injection Molding",
    position: "Senior Technician",
    employeeId: "IM-001",
    facility: "Plant A - Building 2",
    startDate: "2020-03-15"
  });

  const [privateNote, setPrivateNote] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold gradient-text-primary">User Profile</h2>
        <p className="text-muted-foreground">Manage your personal information and private notes</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notes">Private Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your profile details and work information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile(prev => ({...prev, firstName: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile(prev => ({...prev, lastName: e.target.value}))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({...prev, email: e.target.value}))}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({...prev, phone: e.target.value}))}
                    className="pl-9"
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    onChange={(e) => setProfile(prev => ({...prev, department: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={profile.position}
                    onChange={(e) => setProfile(prev => ({...prev, position: e.target.value}))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    value={profile.employeeId}
                    onChange={(e) => setProfile(prev => ({...prev, employeeId: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startDate"
                      type="date"
                      value={profile.startDate}
                      onChange={(e) => setProfile(prev => ({...prev, startDate: e.target.value}))}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="facility">Facility Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="facility"
                    value={profile.facility}
                    onChange={(e) => setProfile(prev => ({...prev, facility: e.target.value}))}
                    className="pl-9"
                  />
                </div>
              </div>

              <Button className="w-full">Save Profile Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your authentication and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Password</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button variant="outline">Update Password</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Biometric Authentication</h3>
                <Card className="border-accent/20 bg-accent/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Fingerprint className="h-8 w-8 text-accent" />
                        <div>
                          <h4 className="font-medium">Fingerprint Login</h4>
                          <p className="text-sm text-muted-foreground">
                            Quick and secure access using your fingerprint
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">Not Configured</Badge>
                    </div>
                    <Button variant="industrial" className="w-full mt-4">
                      Setup Fingerprint Authentication
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Session Management</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Current Session</p>
                      <p className="text-xs text-muted-foreground">Chrome on Windows • Active now</p>
                    </div>
                    <Badge variant="outline">Current</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Mobile App</p>
                      <p className="text-xs text-muted-foreground">iPhone • 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">Revoke</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Private Notes
              </CardTitle>
              <CardDescription>
                Personal notes visible only to you and administrators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="privateNotes">Your Private Notes</Label>
                <Textarea
                  id="privateNotes"
                  value={privateNote}
                  onChange={(e) => setPrivateNote(e.target.value)}
                  placeholder="Add your personal observations, reminders, or insights here..."
                  rows={8}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  Only you and facility administrators can view these notes
                </p>
                <Button>Save Notes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSection;