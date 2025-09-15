import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ModernPatientDashboard } from "@/components/patient/ModernPatientDashboard";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  const renderDashboardByRole = () => {
    switch (user.role) {
      case 'patient':
        return <ModernPatientDashboard />;
      case 'doctor':
        return (
          <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
              <p className="text-muted-foreground">Welcome, {user.name}! Doctor features coming soon.</p>
            </div>
          </div>
        );
      case 'pharmacy':
        return (
          <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-3xl font-bold">Pharmacy Dashboard</h1>
              <p className="text-muted-foreground">Welcome, {user.name}! Pharmacy features coming soon.</p>
            </div>
          </div>
        );
      case 'lab':
        return (
          <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-3xl font-bold">Lab Dashboard</h1>
              <p className="text-muted-foreground">Welcome, {user.name}! Lab features coming soon.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      
      {/* Top Navigation */}
      <nav className="relative z-10 bg-gradient-glass backdrop-blur-glass border-b border-glass-border shadow-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent font-inter">
                Digital Health Locker
              </h1>
              <span className="px-3 py-1 rounded-full bg-primary-glow text-primary text-sm font-medium capitalize border border-primary/20">
                {user.role} Portal
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-glass backdrop-blur-xs border border-glass-border">
                <User className="h-5 w-5 text-primary" />
                <span className="font-medium font-inter">{user.name}</span>
              </div>
              
              <Button variant="glass" size="sm" onClick={handleLogout} className="hover:shadow-medium">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="relative z-10">
        {renderDashboardByRole()}
      </div>
    </div>
  );
};

export default Dashboard;