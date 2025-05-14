import { User } from '../types';

// Mock data for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    isActive: true,
    joinDate: '2023-09-15T10:30:00Z',
    waterGoal: 2500,
    streak: 15,
    totalWaterIntake: 42.5,
    recentActivity: [
      { date: '2023-10-10T08:30:00Z', action: 'Logged water intake', amount: 350 },
      { date: '2023-10-09T12:15:00Z', action: 'Logged water intake', amount: 250 },
      { date: '2023-10-09T07:45:00Z', action: 'Logged water intake', amount: 300 },
    ]
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    isActive: true,
    joinDate: '2023-07-22T14:45:00Z',
    waterGoal: 2000,
    streak: 30,
    totalWaterIntake: 65.2,
    recentActivity: [
      { date: '2023-10-10T09:20:00Z', action: 'Logged water intake', amount: 400 },
      { date: '2023-10-10T13:30:00Z', action: 'Logged water intake', amount: 300 },
      { date: '2023-10-09T18:15:00Z', action: 'Updated water goal', amount: 2000 },
    ]
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    isActive: false,
    joinDate: '2023-08-05T09:15:00Z',
    waterGoal: 3000,
    streak: 0,
    totalWaterIntake: 28.7,
    recentActivity: [
      { date: '2023-09-28T10:45:00Z', action: 'Logged water intake', amount: 500 },
      { date: '2023-09-28T16:30:00Z', action: 'Logged water intake', amount: 350 },
      { date: '2023-09-27T08:20:00Z', action: 'Logged water intake', amount: 400 },
    ]
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    isActive: true,
    joinDate: '2023-06-18T16:20:00Z',
    waterGoal: 2200,
    streak: 45,
    totalWaterIntake: 89.3,
    recentActivity: [
      { date: '2023-10-10T07:15:00Z', action: 'Logged water intake', amount: 300 },
      { date: '2023-10-10T12:40:00Z', action: 'Logged water intake', amount: 350 },
      { date: '2023-10-10T17:50:00Z', action: 'Logged water intake', amount: 250 },
    ]
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david.lee@example.com',
    isActive: true,
    joinDate: '2023-09-02T11:30:00Z',
    waterGoal: 2800,
    streak: 8,
    totalWaterIntake: 18.6,
    recentActivity: [
      { date: '2023-10-10T09:10:00Z', action: 'Logged water intake', amount: 400 },
      { date: '2023-10-09T14:25:00Z', action: 'Logged water intake', amount: 350 },
      { date: '2023-10-09T19:30:00Z', action: 'Updated water goal', amount: 2800 },
    ]
  },
  {
    id: '6',
    name: 'Jessica Chen',
    email: 'jessica.chen@example.com',
    isActive: false,
    joinDate: '2023-05-12T13:45:00Z',
    waterGoal: 1800,
    streak: 0,
    totalWaterIntake: 42.1,
    recentActivity: [
      { date: '2023-09-15T08:30:00Z', action: 'Logged water intake', amount: 250 },
      { date: '2023-09-15T13:15:00Z', action: 'Logged water intake', amount: 200 },
      { date: '2023-09-14T09:40:00Z', action: 'Logged water intake', amount: 300 },
    ]
  }
];

export function useMockData() {
  const getUserById = (id: string): User | undefined => {
    return mockUsers.find(user => user.id === id);
  };

  return {
    users: mockUsers,
    getUserById
  };
}