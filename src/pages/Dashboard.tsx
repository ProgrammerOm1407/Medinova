import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PatientDashboard } from "@/components/patient/PatientDashboard";
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
        return <PatientDashboard />;
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
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b bg-card shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-primary">Digital Health Locker</h1>
              <span className="text-sm text-muted-foreground capitalize">
                {user.role} Portal
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4" />
                <span>{user.name}</span>
              </div>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      {renderDashboardByRole()}
    </div>
  );
};

export default Dashboard;