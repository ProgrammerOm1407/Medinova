import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { HeroSection } from "@/components/landing/HeroSection";
import { AuthModal } from "@/components/auth/AuthModal";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuth = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <HeroSection onGetStarted={handleGetStarted} />
      <AuthModal isOpen={showAuthModal} onClose={handleCloseAuth} />
    </>
  );
};

export default Index;
