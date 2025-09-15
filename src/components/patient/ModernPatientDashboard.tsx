import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Pill,
  Sparkles,
  Star,
  Heart,
  Shield
} from "lucide-react";

export const ModernPatientDashboard = () => {
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
        return <Pill className="h-5 w-5" />;
      case "lab_report":
        return <Activity className="h-5 w-5" />;
      case "consultation":
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getRecordStyle = (type: string) => {
    switch (type) {
      case "prescription":
        return "bg-primary-glow border-primary/20 text-primary";
      case "lab_report":
        return "bg-success-glow border-success/20 text-success";
      case "consultation":
        return "bg-teal-glow border-teal/20 text-teal";
      default:
        return "bg-muted border-border text-muted-foreground";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-secondary relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-teal/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
          <motion.div variants={itemVariants}>
            <Card variant="glow" className="overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-90" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
              <CardContent className="relative z-10 p-8 md:p-12 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div 
                    className="p-3 bg-white/20 rounded-2xl backdrop-blur-xs"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Heart className="h-8 w-8" />
                  </motion.div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-inter">
                      Welcome back, {user?.name}!
                    </h1>
                    <p className="text-white/80 text-lg font-inter font-light mt-2">
                      Your health records are secure and always accessible
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-white/90">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Protected by end-to-end encryption</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: QrCode,
                title: "Generate QR Code",
                description: "Share your records securely",
                variant: "glass" as const,
                buttonText: "Generate & Share",
                color: "primary"
              },
              {
                icon: Upload,
                title: "Upload Records",
                description: "Add new documents",
                variant: "glass" as const,
                buttonText: "Upload Files",
                color: "success"
              },
              {
                icon: Bell,
                title: "Set Reminder",
                description: "Never miss medication",
                variant: "glass" as const,
                buttonText: "Add Reminder",
                color: "teal"
              }
            ].map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card variant="interactive" className="h-full group">
                  <CardContent className="p-8 text-center space-y-6">
                    <motion.div 
                      className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
                        action.color === 'primary' ? 'bg-primary-glow' :
                        action.color === 'success' ? 'bg-success-glow' :
                        'bg-teal-glow'
                      } group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 10 }}
                    >
                      <action.icon className={`h-8 w-8 ${
                        action.color === 'primary' ? 'text-primary' :
                        action.color === 'success' ? 'text-success' :
                        'text-teal'
                      }`} />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg font-inter">{action.title}</h3>
                      <p className="text-sm text-muted-foreground font-inter font-light">
                        {action.description}
                      </p>
                    </div>
                    <Button 
                      variant={action.color === 'primary' ? 'default' : action.color === 'success' ? 'success' : 'teal'} 
                      className="w-full group-hover:scale-105 transition-transform duration-200"
                    >
                      {action.buttonText}
                      <Sparkles className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 bg-glass backdrop-blur-glass border border-glass-border p-2 rounded-2xl h-14">
                {[
                  { value: "records", icon: FileText, label: "My Records" },
                  { value: "timeline", icon: Activity, label: "Timeline" },
                  { value: "reminders", icon: Clock, label: "Reminders" }
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className="space-x-3 h-10 rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="records" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-3xl font-bold font-inter">My Health Records</h2>
                      <Button variant="medical" className="group">
                        <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                        Add Record
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {mockRecords.map((record, index) => (
                        <motion.div
                          key={record.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <Card variant="glass" className="hover:shadow-glow transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`p-3 rounded-xl border ${getRecordStyle(record.type)}`}>
                                    {getRecordIcon(record.type)}
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-lg font-inter">{record.title}</h3>
                                    <p className="text-muted-foreground font-inter font-light">
                                      {record.doctor || record.lab} • {record.date}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Badge 
                                    variant={record.status === "active" ? "default" : "secondary"}
                                    className="capitalize"
                                  >
                                    {record.status}
                                  </Badge>
                                  <Button variant="ghost" size="sm" className="hover:scale-105">
                                    View
                                    <Star className="h-3 w-3 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="timeline" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-bold font-inter mb-6">Health Timeline</h2>
                    
                    <div className="space-y-6">
                      {mockRecords.map((record, index) => (
                        <motion.div 
                          key={record.id} 
                          className="flex items-start space-x-6"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15, duration: 0.5 }}
                        >
                          <div className="flex flex-col items-center">
                            <motion.div 
                              className={`p-3 rounded-xl border ${getRecordStyle(record.type)}`}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              {getRecordIcon(record.type)}
                            </motion.div>
                            {index < mockRecords.length - 1 && (
                              <div className="w-px h-12 bg-gradient-to-b from-border to-transparent mt-4" />
                            )}
                          </div>
                          <Card variant="glass" className="flex-1 hover:shadow-medium transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-lg font-inter">{record.title}</h3>
                                  <p className="text-muted-foreground font-inter font-light mt-1">
                                    {record.doctor || record.lab}
                                  </p>
                                </div>
                                <Badge variant="secondary" className="ml-4">{record.date}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="reminders" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-3xl font-bold font-inter">My Reminders</h2>
                      <Button variant="medical" className="group">
                        <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                        Add Reminder
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {mockReminders.map((reminder, index) => (
                        <motion.div
                          key={reminder.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <Card variant="glass" className="hover:shadow-glow transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <motion.div 
                                    className={`p-3 rounded-xl border ${
                                      reminder.type === "medication" 
                                        ? "bg-primary-glow border-primary/20 text-primary" 
                                        : "bg-teal-glow border-teal/20 text-teal"
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                  >
                                    {reminder.type === "medication" ? (
                                      <Pill className="h-5 w-5" />
                                    ) : (
                                      <Calendar className="h-5 w-5" />
                                    )}
                                  </motion.div>
                                  <div>
                                    <h3 className="font-semibold text-lg font-inter">{reminder.title}</h3>
                                    <p className="text-muted-foreground font-inter font-light">
                                      {reminder.time} {reminder.date && `• ${reminder.date}`}
                                      {reminder.isRecurring && " • Daily"}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Button variant="ghost" size="sm" className="hover:scale-105">
                                    Edit
                                  </Button>
                                  <Button variant="success" size="sm" className="hover:scale-105">
                                    Mark Done
                                    <Star className="h-3 w-3 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};