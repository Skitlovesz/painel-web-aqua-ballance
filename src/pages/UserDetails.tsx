import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, Target, Droplets, Activity } from 'lucide-react';
import { useMockData } from '../hooks/useMockData';
import { format } from 'date-fns';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getUserById } = useMockData();
  const user = getUserById(id || '');

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Not Found</h2>
        <p className="text-gray-600 mb-6">The user you are looking for doesn't exist or has been removed.</p>
        <Link to="/users" className="text-blue-600 flex items-center justify-center">
          <ArrowLeft size={16} className="mr-2" />
          Back to Users List
        </Link>
      </div>
    );
  }

  const userStats = [
    {
      label: 'Daily Goal',
      value: `${user.waterGoal}ml`,
      icon: <Target className="text-purple-500" />,
    },
    {
      label: 'Streak',
      value: `${user.streak} days`,
      icon: <Activity className="text-green-500" />,
    },
    {
      label: 'Total Tracked',
      value: `${user.totalWaterIntake}L`,
      icon: <Droplets className="text-blue-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Link to="/users" className="p-1 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h2 className="text-2xl font-semibold text-gray-800">User Details</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-medium mb-4 sm:mb-0 sm:mr-6">
              {user.name.charAt(0)}
            </div>
            
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-gray-600">
                <div className="flex items-center justify-center sm:justify-start mb-2 sm:mb-0">
                  <Mail size={16} className="mr-1" />
                  <span>{user.email}</span>
                </div>
                <span className="hidden sm:block mx-3">•</span>
                <div className="flex items-center justify-center sm:justify-start">
                  <Calendar size={16} className="mr-1" />
                  <span>Joined {format(new Date(user.joinDate), 'MMM d, yyyy')}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                  ${user.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Water Tracking Stats</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {userStats.map((stat, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4 flex items-center">
                <div className="p-3 rounded-full bg-white mr-4">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h4 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h4>
          
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
            {user.recentActivity.map((activity, index) => (
              <div key={index} className="p-4 flex items-start">
                <div className="p-2 rounded-full bg-blue-100 mr-4">
                  <Droplets size={16} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{format(new Date(activity.date), 'MMM d, yyyy • h:mm a')}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-gray-800">{activity.amount}ml</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;