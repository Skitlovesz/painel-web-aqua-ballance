import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { admin } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-800">Painel Administrativo</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
            <Bell size={20} />
          </button>
          
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline-block">
              {admin?.username || 'Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header