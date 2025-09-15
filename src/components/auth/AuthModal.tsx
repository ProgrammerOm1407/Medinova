import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { User, Stethoscope, Building2, FlaskConical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    licenseNumber: '',
    specialization: '',
    address: '',
  });

  const { login, register, isLoading } = useAuth();
  const { toast } = useToast();

  const roleOptions = [
    { 
      value: 'patient', 
      label: 'Patient', 
      icon: User, 
      description: 'Store and manage your health records' 
    },
    { 
      value: 'doctor', 
      label: 'Doctor', 
      icon: Stethoscope, 
      description: 'Access patient records and add clinical notes' 
    },
    { 
      value: 'pharmacy', 
      label: 'Pharmacy', 
      icon: Building2, 
      description: 'Receive and manage prescriptions' 
    },
    { 
      value: 'lab', 
      label: 'Lab', 
      icon: FlaskConical, 
      description: 'Upload and deliver test results' 
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password, selectedRole);
      } else {
        await register({ ...formData, role: selectedRole });
      }
      
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "You have successfully signed in." : "Your account has been created successfully.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      licenseNumber: '',
      specialization: '',
      address: '',
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isLogin ? 'Sign In' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Select Your Role</Label>
            <div className="grid grid-cols-2 gap-3">
              {roleOptions.map((role) => {
                const IconComponent = role.icon;
                return (
                  <Card
                    key={role.value}
                    variant={selectedRole === role.value ? "trust" : "default"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedRole === role.value 
                        ? "border-primary bg-primary-glow/30" 
                        : "hover:shadow-soft"
                    }`}
                    onClick={() => setSelectedRole(role.value as UserRole)}
                  >
                    <CardContent className="p-4 text-center space-y-2">
                      <IconComponent className={`h-6 w-6 mx-auto ${
                        selectedRole === role.value ? "text-primary" : "text-muted-foreground"
                      }`} />
                      <div className="text-sm font-medium">{role.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {selectedRole !== 'patient' && (
                  <div>
                    <Label htmlFor="licenseNumber">
                      {selectedRole === 'doctor' ? 'Medical License' : 
                       selectedRole === 'pharmacy' ? 'Pharmacy License' : 'Lab License'}
                    </Label>
                    <Input
                      id="licenseNumber"
                      type="text"
                      placeholder="Enter license number"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    />
                  </div>
                )}

                {selectedRole === 'doctor' && (
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      type="text"
                      placeholder="e.g., General Medicine, Cardiology"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    />
                  </div>
                )}

                {(selectedRole === 'pharmacy' || selectedRole === 'lab') && (
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Enter business address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <Button 
            type="submit" 
            variant="medical" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
          </Button>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary hover:underline text-sm"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};