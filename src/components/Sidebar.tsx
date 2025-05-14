import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplets, Users, Home, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Painel' },
    { path: '/users', icon: <Users size={20} />, label: 'Usuários' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <button 
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`bg-white shadow-md w-64 flex-shrink-0 border-r border-gray-200 transition-all duration-300 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 h-full`}>
        
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <Droplets className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-semibold text-gray-800">AquaBalance</span>
          </div>

          <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
            <ul className="px-2 space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-gray-200 p-4">
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 w-full"
            >
              <LogOut size={20} className="mr-3" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;