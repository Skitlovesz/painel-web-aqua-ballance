import React from 'react';
import { FirebaseUser } from '../hooks/useFirebaseUsers';

interface RecentUsersProps {
  users: FirebaseUser[];
}

const RecentUsers: React.FC<RecentUsersProps> = ({ users }) => {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div 
          key={user.id}
          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium flex-shrink-0">
            {user.nome?.charAt(0) || '?'}
          </div>
          
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {`${user.nome || ''} ${user.sobrenome || ''}`}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      ))}
      
      {users.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          Nenhum usuário encontrado
        </div>
      )}
    </div>
  );
};

export default RecentUsers;