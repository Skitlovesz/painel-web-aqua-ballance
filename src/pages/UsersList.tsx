import React, { useState } from 'react';
import { Search } from 'lucide-react';
import UserTable from '../components/UserTable';
import { useMockData } from '../hooks/useMockData';

const UsersList: React.FC = () => {
  const { users } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => {
    return searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDeleteUser = (id: string) => {
    // Aqui você implementaria a lógica de deleção
    console.log('Deletar usuário:', id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Gerenciamento de Usuários</h2>
        <p className="mt-1 text-sm text-gray-600">Visualize e gerencie todos os usuários do seu aplicativo</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Pesquisar usuários por nome ou email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <UserTable users={filteredUsers} onDeleteUser={handleDeleteUser} />
      </div>
    </div>
  );
};

export default UsersList;