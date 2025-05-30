export interface User {
  id: number;
  name: string;
  email: string;
  points: number;
  level: number;
  streak: number;
  bio: string;
  joinedAt: string;
  avatar: string | null;
}