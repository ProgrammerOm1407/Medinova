import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, QrCode, Clock, Users } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-secondary flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        {/* Compliance Banner */}
        <div className="bg-primary-glow/50 border border-primary/20 rounded-lg p-3 text-sm text-primary">
          🔒 Compliant with India's Digital Personal Data Protection Act (DPDP) 2023
        </div>

        {/* Main Hero Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            The Digital Health Locker:
            <span className="block text-primary">Transforming Indian Healthcare</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Securely store, share, and manage your health records with QR code technology. 
            Built for patients, doctors, pharmacies, and labs across India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              variant="hero" 
              size="lg"
              onClick={onGetStarted}
              className="text-lg px-8 py-6 animate-scale-in"
            >
              Get Started Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 animate-scale-in"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 animate-slide-up">
          <Card variant="interactive" className="text-center p-6">
            <CardContent className="space-y-4 p-0">
              <div className="bg-primary-glow rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Secure & Private</h3>
              <p className="text-muted-foreground text-sm">
                End-to-end encryption with explicit consent for every share
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive" className="text-center p-6">
            <CardContent className="space-y-4 p-0">
              <div className="bg-primary-glow rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">QR Code Sharing</h3>
              <p className="text-muted-foreground text-sm">
                Instant, secure sharing of health records with just a scan
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive" className="text-center p-6">
            <CardContent className="space-y-4 p-0">
              <div className="bg-primary-glow rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Smart Reminders</h3>
              <p className="text-muted-foreground text-sm">
                Never miss medications or appointments with intelligent alerts
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive" className="text-center p-6">
            <CardContent className="space-y-4 p-0">
              <div className="bg-primary-glow rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Multi-Role Support</h3>
              <p className="text-muted-foreground text-sm">
                Designed for patients, doctors, pharmacies, and labs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-xl p-8 shadow-medical mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">1M+</div>
              <div className="text-muted-foreground">Health Records Secured</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50,000+</div>
              <div className="text-muted-foreground">Healthcare Professionals</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-muted-foreground">Data Security Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};