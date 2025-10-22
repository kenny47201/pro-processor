import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Mail, MailOpen, Trash2, Save, ClipboardList, Users, Lock } from "lucide-react";

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    from: "Process Manager",
    subject: "Process Department Meeting",
    content: "Process department Meeting Friday morning at 7am. Attendance is manditory",
    isPrivate: false,
    isRead: false,
    timestamp: "2024-01-15 14:30",
    type: "public",
  },
  {
    id: 2,
    from: "Jim Bob A Shift",
    subject: "Trade days",
    content: "I need to take  Tuesday off, if you work my Tuesday I will work one of your days this week.",
    isPrivate: true,
    isRead: true,
    timestamp: "2024-01-15 13:15",
    type: "private",
  },
  {
    id: 3,
    from: "Maintenance Manager",
    subject: "Maintenance Notice",
    content: "Press 2 will be down for maintenance from 3-5 PM. Plan accordingly.",
    isPrivate: false,
    isRead: false,
    timestamp: "2024-01-15 12:00",
    type: "public",
  },
];

// Mock data for shift notes
const mockShiftNotes = [
  {
    id: 1,
    task: "Complete SABA",
    priority: "high",
    assignedBy: "Admin",
    dueTime: "ASAP",
    completed: false,
  },
  {
    id: 2,
    task: "Pull stripper plates on Press 4&5 as time permits",
    priority: "medium",
    assignedBy: "Process Manager",
    dueTime: "End of shift",
    completed: true,
  },
  {
    id: 3,
    task: "Press 11 plate change from pict to text. Complete and have ready for 7am S/U",
    priority: "high",
    assignedBy: "Process Manager",
    dueTime: "7:30",
    completed: false,
  },
];

const MainSection = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [shiftNotes, setShiftNotes] = useState(mockShiftNotes);
  const [savedMessages, setSavedMessages] = useState<number[]>([]);

  const handleDeleteMessage = (messageId: number) => {
    setMessages(messages.filter((msg) => msg.id !== messageId));
    setSavedMessages(savedMessages.filter((id) => id !== messageId));
  };

  const handleSaveMessage = (messageId: number) => {
    if (savedMessages.includes(messageId)) {
      setSavedMessages(savedMessages.filter((id) => id !== messageId));
    } else {
      setSavedMessages([...savedMessages, messageId]);
    }
  };

  const handleMarkAsRead = (messageId: number) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, isRead: true } : msg)));
  };

  const handleToggleTask = (taskId: number) => {
    setShiftNotes(shiftNotes.map((note) => (note.id === taskId ? { ...note, completed: !note.completed } : note)));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold gradient-text-primary">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Check your messages and shift tasks.</p>
      </div>

      {/* Messages Section */}
      <Card className="industrial-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Messages
            <Badge variant="secondary" className="ml-auto">
              {messages.filter((msg) => !msg.isRead).length} unread
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No messages available</p>
          ) : (
            messages.map((message) => (
              <Card
                key={message.id}
                className={`transition-all hover:shadow-md ${!message.isRead ? "border-primary/50" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {message.isPrivate ? (
                          <Lock className="h-4 w-4 text-primary" />
                        ) : (
                          <Users className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="font-semibold">{message.from}</span>
                        <Badge variant={message.isPrivate ? "default" : "secondary"}>
                          {message.isPrivate ? "Private" : "Public"}
                        </Badge>
                        {!message.isRead && (
                          <Badge variant="destructive" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-medium">{message.subject}</h4>
                      <p className="text-sm text-muted-foreground">{message.content}</p>
                      <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {!message.isRead && (
                        <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(message.id)}>
                          <MailOpen className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant={savedMessages.includes(message.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSaveMessage(message.id)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteMessage(message.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Shift Notes Section */}
      <Card className="industrial-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Shift Notes & Tasks
            <Badge variant="secondary" className="ml-auto">
              {shiftNotes.filter((note) => !note.completed).length} pending
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {shiftNotes.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No shift tasks available</p>
          ) : (
            shiftNotes.map((note) => (
              <Card key={note.id} className={`transition-all hover:shadow-md ${note.completed ? "opacity-60" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(note.priority)}>{note.priority.toUpperCase()}</Badge>
                        {note.completed && <Badge variant="secondary">Completed</Badge>}
                      </div>
                      <h4 className={`font-medium ${note.completed ? "line-through" : ""}`}>{note.task}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Assigned by: {note.assignedBy}</span>
                        <span>Due: {note.dueTime}</span>
                      </div>
                    </div>
                    <Button
                      variant={note.completed ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleToggleTask(note.id)}
                    >
                      {note.completed ? "Undo" : "Complete"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MainSection;
