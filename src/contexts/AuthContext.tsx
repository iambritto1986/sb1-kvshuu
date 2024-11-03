import React, { createContext, useContext, useState, useCallback } from 'react';
import { Role, User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (requiredRole: Role[]) => boolean;
  canAccessUserData: (userId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const roleHierarchy: Record<Role, number> = {
  'ADMIN': 3,
  'MANAGER': 2,
  'EMPLOYEE': 1
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    // Simulated login with role assignment
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      role: email.includes('admin') ? 'ADMIN' : 
            email.includes('manager') ? 'MANAGER' : 'EMPLOYEE',
      department: 'Engineering',
      reportsTo: email.includes('employee') ? '2' : undefined
    };
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const hasPermission = useCallback((requiredRoles: Role[]) => {
    if (!user) return false;
    const userRoleLevel = roleHierarchy[user.role];
    return requiredRoles.some(role => userRoleLevel >= roleHierarchy[role]);
  }, [user]);

  const canAccessUserData = useCallback((userId: string) => {
    if (!user) return false;
    
    // Admins can access all user data
    if (user.role === 'ADMIN') return true;
    
    // Managers can access their team members' data
    if (user.role === 'MANAGER') {
      // In a real app, we would check if userId belongs to manager's team
      return true;
    }
    
    // Employees can only access their own data
    return user.id === userId;
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      hasPermission,
      canAccessUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};