export interface CommunityPost {
  id: number;
  user: {
    id: number;
    name: string;
    verified: boolean;
  };
  content: string;
  image: string | null;
  date: string;
  likes: number;
  task: {
    id: number;
    title: string;
  };
  comments: {
    user: string;
    text: string;
    date: string;
  }[];
  chainCount: number;
}

export interface LeaderboardUser {
  id: number;
  name: string;
  points: number;
  level: number;
  streak: number;
  avatar: string | null;
  joinedAt: string;
}