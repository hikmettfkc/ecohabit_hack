export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  points: number;
  impact: string;
  time: number;
  image: string;
}

export interface CompletedTask {
  id: number;
  taskId: number;
  taskTitle: string;
  completedAt: string;
  photo: string | null;
  note: string;
  likes: number;
  comments: number;
}