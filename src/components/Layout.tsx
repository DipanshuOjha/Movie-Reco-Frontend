import React, { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Film, LogOut, User, Home, Brain } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { token, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/20">
      {token && (
        <nav className="bg-white/80 backdrop-blur-lg border-b border-neutral-200/50 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Link to="/dashboard" className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-xl">
                    <Film className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-neutral-900">MovieHub</span>
                </Link>
                
                <div className="hidden sm:flex space-x-4">
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/dashboard')
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/movies"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/movies')
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Film className="h-4 w-4" />
                    <span>Movies</span>
                  </Link>
                  <Link
                    to="/smart-recommendations"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/smart-recommendations')
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Brain className="h-4 w-4" />
                    <span>Smart Recs</span>
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-neutral-600">
                  <User className="h-4 w-4" />
                  <span>{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-secondary-600 hover:bg-secondary-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;