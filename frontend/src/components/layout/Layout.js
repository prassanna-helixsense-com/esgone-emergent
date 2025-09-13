import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Bell, ChevronDown } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/dashboard', active: location.pathname === '/dashboard' },
    { name: 'Planning', path: '/planning', active: location.pathname === '/planning' },
    { name: 'Implementation', path: '/implementation', active: location.pathname === '/implementation' },
    { name: 'Monitoring', path: '/monitoring', active: location.pathname === '/monitoring' },
    { name: 'Asset Management', path: '/asset-management', active: location.pathname === '/asset-management' },
    { name: 'Reporting', path: '/reporting', active: location.pathname === '/reporting' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ESG</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">ESGone</h1>
                  <p className="text-xs text-gray-500">ESG Excellence Platform</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    item.active
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-700">{user?.name || 'Admin User'}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">admin</p>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <nav className="text-sm">
            <Link to="/dashboard" className="text-teal-600 hover:text-teal-800">
              Home
            </Link>
            {location.pathname !== '/dashboard' && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-600 capitalize">
                  {location.pathname.replace('/', '').replace('-', ' ')}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;