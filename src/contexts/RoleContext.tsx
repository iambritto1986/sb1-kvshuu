import React, { createContext, useContext, useState } from 'react';
import { Role } from '../types';

interface CustomRole {
  id: string;
  name: string;
  permissions: string[];
  level: number;
}

interface RoleContextType {
  roles: CustomRole[];
  setRoles: React.Dispatch<React.SetStateAction<CustomRole[]>>;
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
}

interface Department {
  id: string;
  name: string;
  description: string;
  managerId?: string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<CustomRole[]>([
    { id: '1', name: 'ADMIN', permissions: ['all'], level: 3 },
    { id: '2', name: 'MANAGER', permissions: ['view_team', 'manage_goals', 'give_feedback'], level: 2 },
    { id: '3', name: 'EMPLOYEE', permissions: ['view_self', 'submit_goals'], level: 1 }
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    {
      id: '1',
      name: 'Engineering',
      description: 'Software development and technical operations',
      managerId: '1'
    },
    {
      id: '2',
      name: 'Product',
      description: 'Product management and strategy',
      managerId: '2'
    },
    {
      id: '3',
      name: 'Design',
      description: 'UI/UX and graphic design',
      managerId: '3'
    },
    {
      id: '4',
      name: 'Marketing',
      description: 'Marketing and communications',
      managerId: '4'
    }
  ]);

  return (
    <RoleContext.Provider value={{ roles, setRoles, departments, setDepartments }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRoles = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRoles must be used within a RoleProvider');
  }
  return context;
};