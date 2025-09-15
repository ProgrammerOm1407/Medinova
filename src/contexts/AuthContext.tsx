import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'patient' | 'doctor' | 'pharmacy' | 'lab';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  licenseNumber?: string; // For doctors, pharmacies, labs
  specialization?: string; // For doctors
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on mount
    const storedUser = localStorage.getItem('healthLocker_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Mock authentication - in real app, this would call your backend
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on role
      const mockUser: User = {
        id: Date.now().toString(),
        name: role === 'patient' ? 'Rahul Sharma' : 
              role === 'doctor' ? 'Dr. Priya Patel' :
              role === 'pharmacy' ? 'MedPlus Pharmacy' : 'LifeLab Diagnostics',
        email,
        role,
        phone: '+91 98765 43210',
        ...(role === 'doctor' && { 
          licenseNumber: 'MH12345', 
          specialization: 'General Medicine' 
        }),
        ...(role === 'pharmacy' && { 
          licenseNumber: 'PHM98765',
          address: 'Shop 12, Medical Complex, Mumbai' 
        }),
        ...(role === 'lab' && { 
          licenseNumber: 'LAB54321',
          address: 'Lab Center, Health Plaza, Delhi' 
        }),
      };

      setUser(mockUser);
      localStorage.setItem('healthLocker_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'patient',
        phone: userData.phone,
        licenseNumber: userData.licenseNumber,
        specialization: userData.specialization,
        address: userData.address,
      };

      setUser(newUser);
      localStorage.setItem('healthLocker_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthLocker_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};