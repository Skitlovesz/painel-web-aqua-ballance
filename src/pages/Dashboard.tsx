import React from 'react';
import { Users, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import RecentUsers from '../components/RecentUsers';
import { useMockData } from '../hooks/useMockData';

const Dashboard: React.FC = () => {
  const { users } = useMockData();

  const stats = [
    {
      title: 'Total de Usuários',
      value: users.length,
      icon: <Users className="text-blue-500" />,
      change: '+12%',
      timeFrame: 'desde o mês passado',
      positive: true,
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Painel de Controle</h2>
        <p className="mt-1 text-sm text-gray-600">Visão geral do seu aplicativo de controle de água</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 flex items-center justify-center">
          <div className="flex items-center">
            <Droplets className="h-32 w-32 text-blue-500" />
            <span className="text-4xl font-bold text-gray-800 ml-4">AquaBalance</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-800">Usuários Recentes</h3>
            <Link to="/users" className="text-sm text-blue-600 hover:text-blue-800">
              Ver todos
            </Link>
          </div>
          
          <RecentUsers users={users.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;