import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  MessageSquare, 
  BarChart3, 
  Settings,
  LogOut,
  Sun,
  Moon,
  FileDown,
  ClipboardCheck
} from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
      { icon: Target, label: 'Goals', path: '/goals' },
      { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
      { icon: Settings, label: 'Settings', path: '/settings' }
    ];

    // Add role-specific menu items
    if (user?.role === 'EMPLOYEE') {
      baseItems.push({ icon: BarChart3, label: 'My Analytics', path: '/analytics/personal' });
    } else if (['MANAGER', 'ADMIN'].includes(user?.role || '')) {
      baseItems.splice(1, 0, { icon: Users, label: 'Team', path: '/team' });
      baseItems.push({ icon: BarChart3, label: 'Analytics', path: '/analytics' });
      baseItems.push({ icon: FileDown, label: 'Reports', path: '/reports' });
      baseItems.push({ icon: ClipboardCheck, label: 'Assessment', path: '/assessment' });
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 ${
        theme === 'dark' ? 'bg-gray-800 shadow-gray-900' : 'bg-white shadow-lg'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`flex items-center justify-between h-16 px-4 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          } border-b`}>
            <h1 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
              PerformancePro
            </h1>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-indigo-900/50 text-indigo-400'
                        : 'bg-indigo-50 text-indigo-600'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:bg-gray-800'
                        : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className={`p-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border-t`}>
            <button
              onClick={logout}
              className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
                theme === 'dark'
                  ? 'text-red-400 hover:bg-red-900/50'
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`ml-64 p-8 ${
        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
      }`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;