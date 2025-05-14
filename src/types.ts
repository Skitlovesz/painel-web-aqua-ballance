export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  joinDate: string;
  waterGoal: number;
  streak: number;
  totalWaterIntake: number;
  recentActivity: Activity[];
}

export interface Activity {
  date: string;
  action: string;
  amount: number;
}