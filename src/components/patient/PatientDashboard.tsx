import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  FileText, 
  QrCode, 
  Upload, 
  Clock, 
  Bell, 
  Plus,
  Calendar,
  Activity,
  Pill
} from "lucide-react";

export const PatientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("records");

  const mockRecords = [
    {
      id: 1,
      type: "prescription",
      title: "Blood Pressure Medication",
      doctor: "Dr. Priya Patel",
      date: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      type: "lab_report",
      title: "Complete Blood Count",
      lab: "LifeLab Diagnostics",
      date: "2024-01-10",
      status: "completed"
    },
    {
      id: 3,
      type: "consultation",
      title: "General Checkup",
      doctor: "Dr. Amit Kumar",
      date: "2024-01-05",
      status: "completed"
    }
  ];

  const mockReminders = [
    {
      id: 1,
      title: "Take Blood Pressure Medication",
      time: "09:00 AM",
      type: "medication",
      isRecurring: true
    },
    {
      id: 2,
      title: "Follow-up with Dr. Patel",
      time: "03:00 PM",
      date: "2024-01-20",
      type: "appointment",
      isRecurring: false
    }
  ];

  const getRecordIcon = (type: string) => {
    switch (type) {
      case "prescription":
        return <Pill className="h-4 w-4" />;
      case "lab_report":
        return <Activity className="h-4 w-4" />;
      case "consultation":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getRecordColor = (type: string) => {
    switch (type) {
      case "prescription":
        return "bg-blue-100 text-blue-800";
      case "lab_report":
        return "bg-green-100 text-green-800";
      case "consultation":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-primary rounded-xl p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-primary-foreground/80 mt-2">
            Your health records are secure and always accessible
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="interactive">
            <CardContent className="p-6 text-center space-y-4">
              <div className="bg-primary-glow rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Generate QR Code</h3>
                <p className="text-sm text-muted-foreground">Share your records securely</p>
              </div>
              <Button variant="qr" className="w-full">
                Generate & Share
              </Button>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardContent className="p-6 text-center space-y-4">
              <div className="bg-success/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Upload className="h-8 w-8 text-success" />
              </div>
              <div>
                <h3 className="font-semibold">Upload Records</h3>
                <p className="text-sm text-muted-foreground">Add new documents</p>
              </div>
              <Button variant="success" className="w-full">
                Upload Files
              </Button>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardContent className="p-6 text-center space-y-4">
              <div className="bg-warning/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Bell className="h-8 w-8 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold">Set Reminder</h3>
                <p className="text-sm text-muted-foreground">Never miss medication</p>
              </div>
              <Button variant="outline" className="w-full">
                Add Reminder
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="records" className="space-x-2">
              <FileText className="h-4 w-4" />
              <span>My Records</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="space-x-2">
              <Activity className="h-4 w-4" />
              <span>Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="reminders" className="space-x-2">
              <Clock className="h-4 w-4" />
              <span>Reminders</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Health Records</h2>
              <Button variant="medical">
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </div>

            <div className="grid gap-4">
              {mockRecords.map((record) => (
                <Card key={record.id} variant="interactive">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${getRecordColor(record.type)}`}>
                          {getRecordIcon(record.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{record.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {record.doctor || record.lab} • {record.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={record.status === "active" ? "default" : "secondary"}
                        >
                          {record.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <h2 className="text-2xl font-bold">Health Timeline</h2>
            
            <div className="space-y-4">
              {mockRecords.map((record, index) => (
                <div key={record.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-full ${getRecordColor(record.type)}`}>
                      {getRecordIcon(record.type)}
                    </div>
                    {index < mockRecords.length - 1 && (
                      <div className="w-px h-8 bg-border mt-2" />
                    )}
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{record.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {record.doctor || record.lab}
                          </p>
                        </div>
                        <Badge variant="secondary">{record.date}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Reminders</h2>
              <Button variant="medical">
                <Plus className="h-4 w-4 mr-2" />
                Add Reminder
              </Button>
            </div>

            <div className="grid gap-4">
              {mockReminders.map((reminder) => (
                <Card key={reminder.id} variant="interactive">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          reminder.type === "medication" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-green-100 text-green-800"
                        }`}>
                          {reminder.type === "medication" ? (
                            <Pill className="h-4 w-4" />
                          ) : (
                            <Calendar className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{reminder.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {reminder.time} {reminder.date && `• ${reminder.date}`}
                            {reminder.isRecurring && " • Daily"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="success" size="sm">
                          Mark Done
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};