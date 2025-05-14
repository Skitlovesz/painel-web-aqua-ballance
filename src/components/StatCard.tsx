import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  timeFrame?: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon,
  change,
  timeFrame,
  positive = true
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 rounded-full bg-blue-50">
          {icon}
        </div>
      </div>
      
      <div className="text-2xl font-bold text-gray-800 mb-2">
        {value}
      </div>
      
      {change && (
        <div className="flex items-center">
          <span className={`flex items-center text-xs font-medium mr-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {positive ? (
              <ArrowUp size={14} className="mr-0.5" />
            ) : (
              <ArrowDown size={14} className="mr-0.5" />
            )}
            {change}
          </span>
          {timeFrame && (
            <span className="text-xs text-gray-500">{timeFrame}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;