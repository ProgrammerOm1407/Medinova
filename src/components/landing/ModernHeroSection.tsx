import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, QrCode, Clock, Users, Sparkles, Star } from "lucide-react";

interface ModernHeroSectionProps {
  onGetStarted: () => void;
}

export const ModernHeroSection = ({ onGetStarted }: ModernHeroSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Secure & Private",
      description: "End-to-end encryption with explicit consent for every share",
      color: "primary"
    },
    {
      icon: QrCode,
      title: "QR Code Sharing",
      description: "Instant, secure sharing of health records with just a scan",
      color: "teal"
    },
    {
      icon: Clock,
      title: "Smart Reminders",
      description: "Never miss medications or appointments with intelligent alerts",
      color: "success"
    },
    {
      icon: Users,
      title: "Multi-Role Support",
      description: "Designed for patients, doctors, pharmacies, and labs",
      color: "primary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto text-center space-y-12">
          {/* Compliance Banner */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-gradient-glass backdrop-blur-glass border border-glass-border rounded-full px-6 py-3 text-sm font-medium shadow-glass"
          >
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-foreground">Compliant with India's DPDP Act 2023</span>
            <Sparkles className="h-4 w-4 text-teal" />
          </motion.div>

          {/* Main Hero Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight font-inter">
              The Digital Health Locker:
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Transforming Healthcare
              </span>
            </h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter font-light"
            >
              Securely store, share, and manage your health records with cutting-edge QR technology. 
              Built for the modern Indian healthcare ecosystem.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
            >
              <Button 
                variant="hero" 
                size="lg"
                onClick={onGetStarted}
                className="text-lg px-10 py-4 h-14 min-w-[200px] group"
              >
                <span className="relative z-10">Get Started Today</span>
                <Sparkles className="h-5 w-5 ml-2 group-hover:animate-spin" />
              </Button>
              <Button 
                variant="glass" 
                size="lg"
                className="text-lg px-10 py-4 h-14 min-w-[180px]"
              >
                Watch Demo
                <Star className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card variant="glass" className="text-center p-8 h-full hover:shadow-glow transition-all duration-500">
                  <CardContent className="space-y-6 p-0">
                    <motion.div 
                      className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center ${
                        feature.color === 'primary' ? 'bg-primary-glow' :
                        feature.color === 'teal' ? 'bg-teal-glow' :
                        feature.color === 'success' ? 'bg-success-glow' :
                        'bg-primary-glow'
                      } group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <feature.icon className={`h-10 w-10 ${
                        feature.color === 'primary' ? 'text-primary' :
                        feature.color === 'teal' ? 'text-teal' :
                        feature.color === 'success' ? 'text-success' :
                        'text-primary'
                      }`} />
                    </motion.div>
                    <h3 className="font-semibold text-xl font-inter">{feature.title}</h3>
                    <p className="text-muted-foreground font-inter font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-24"
          >
            <Card variant="glow" className="p-12 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {[
                  { value: "1M+", label: "Health Records Secured" },
                  { value: "50K+", label: "Healthcare Professionals" },
                  { value: "99.9%", label: "Data Security Score" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                    className="space-y-2"
                  >
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent font-inter">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground font-inter font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};