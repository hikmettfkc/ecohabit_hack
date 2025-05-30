import { Task, CompletedTask } from '../types/Task';
import { CommunityPost, LeaderboardUser } from '../types/Community';

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: 'Take a 5-minute shower',
    description: 'Reducing your shower time by just a few minutes can save gallons of water. Try to keep your shower under 5 minutes today.',
    category: 'water',
    points: 30,
    impact: 'Saves 15 gallons of water',
    time: 5,
    image: 'https://images.pexels.com/photos/3641711/pexels-photo-3641711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'Use a reusable water bottle',
    description: 'Avoid single-use plastic bottles by using a reusable water bottle throughout the day. Take a photo of your bottle in use!',
    category: 'waste',
    points: 20,
    impact: 'Prevents plastic waste',
    time: 1,
    image: 'https://images.pexels.com/photos/2479242/pexels-photo-2479242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    title: 'Unplug unused electronics',
    description: 'Electronics still use power when plugged in but not in use. Go through your home and unplug any devices not being used.',
    category: 'energy',
    points: 25,
    impact: 'Reduces phantom energy use',
    time: 10,
    image: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    title: 'Eat a plant-based meal',
    description: 'Plant-based foods generally have a lower carbon footprint than animal products. Enjoy at least one completely plant-based meal today.',
    category: 'food',
    points: 40,
    impact: 'Reduces CO2 emissions',
    time: 30,
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 5,
    title: 'Walk or bike for a short trip',
    description: 'Instead of driving, walk or bike for a trip under 2 miles. Good for the planet and your health!',
    category: 'transport',
    points: 35,
    impact: 'Reduces car emissions',
    time: 20,
    image: 'https://images.pexels.com/photos/1436222/pexels-photo-1436222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 6,
    title: 'Collect and recycle plastic waste',
    description: 'Gather any plastic waste you find throughout the day and make sure it gets properly recycled.',
    category: 'waste',
    points: 30,
    impact: 'Prevents landfill waste',
    time: 15,
    image: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];

export const MOCK_COMPLETED_TASKS: CompletedTask[] = [
  {
    id: 101,
    taskId: 7,
    taskTitle: 'Use reusable grocery bags',
    completedAt: '2023-12-01T14:30:00Z',
    photo: 'https://images.pexels.com/photos/5202975/pexels-photo-5202975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    note: 'Brought my canvas bags to the farmers market today!',
    likes: 12,
    comments: 3
  },
  {
    id: 102,
    taskId: 8,
    taskTitle: 'Turn off lights when leaving a room',
    completedAt: '2023-12-02T09:15:00Z',
    photo: null,
    note: 'Made sure to switch off all unnecessary lights today. Small habit, big impact!',
    likes: 8,
    comments: 1
  },
  {
    id: 103,
    taskId: 9,
    taskTitle: 'Collect rainwater for plants',
    completedAt: '2023-12-03T16:45:00Z',
    photo: 'https://images.pexels.com/photos/6231870/pexels-photo-6231870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    note: 'Set up a simple rain barrel system for my garden. Excited to use it!',
    likes: 15,
    comments: 4
  }
];

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 201,
    user: {
      id: 2,
      name: 'Alex Rivers',
      verified: true
    },
    content: 'Started composting today! It was easier to set up than I thought. Excited to reduce my food waste and create nutrient-rich soil for my garden.',
    image: 'https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2023-12-03T13:20:00Z',
    likes: 24,
    task: {
      id: 12,
      title: 'Start a compost bin'
    },
    comments: [
      {
        user: 'Sarah Green',
        text: 'That looks great! I\'ve been composting for 6 months now and it\'s made such a difference.',
        date: '2023-12-03T14:10:00Z'
      },
      {
        user: 'Miguel Perez',
        text: 'Any tips for someone who lives in an apartment?',
        date: '2023-12-03T15:30:00Z'
      }
    ],
    chainCount: 3
  },
  {
    id: 202,
    user: {
      id: 3,
      name: 'Priya Sharma',
      verified: false
    },
    content: 'Biked to work all week instead of driving! Feeling healthier and happy to reduce my carbon footprint.',
    image: 'https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2023-12-02T08:45:00Z',
    likes: 18,
    task: {
      id: 5,
      title: 'Commute by bike or foot'
    },
    comments: [
      {
        user: 'David Wu',
        text: 'You\'ve inspired me to try this next week!',
        date: '2023-12-02T09:15:00Z'
      }
    ],
    chainCount: 2
  },
  {
    id: 203,
    user: {
      id: 4,
      name: 'Jordan Lee',
      verified: false
    },
    content: 'Made my first zero-waste grocery shopping trip! Brought all my own containers and bags. It took a bit longer but felt so satisfying.',
    image: 'https://images.pexels.com/photos/1161547/pexels-photo-1161547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2023-12-01T11:30:00Z',
    likes: 31,
    task: {
      id: 14,
      title: 'Shop with zero waste'
    },
    comments: [
      {
        user: 'Emily Green',
        text: 'This is awesome! Which store did you go to?',
        date: '2023-12-01T12:05:00Z'
      },
      {
        user: 'Aiden Smith',
        text: 'Great job! It gets easier every time.',
        date: '2023-12-01T13:20:00Z'
      },
      {
        user: 'Olivia Chen',
        text: 'I need to try this! Do they weigh your containers first?',
        date: '2023-12-01T14:45:00Z'
      }
    ],
    chainCount: 5
  }
];

export const MOCK_LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    id: 1,
    name: 'Emily Green',
    points: 785,
    level: 3,
    streak: 12,
    avatar: null,
    joinedAt: '2023-11-15'
  },
  {
    id: 2,
    name: 'Alex Rivers',
    points: 920,
    level: 4,
    streak: 21,
    avatar: null,
    joinedAt: '2023-10-05'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    points: 650,
    level: 3,
    streak: 7,
    avatar: null,
    joinedAt: '2023-11-20'
  },
  {
    id: 4,
    name: 'Jordan Lee',
    points: 810,
    level: 3,
    streak: 14,
    avatar: null,
    joinedAt: '2023-10-30'
  },
  {
    id: 5,
    name: 'Miguel Perez',
    points: 580,
    level: 2,
    streak: 5,
    avatar: null,
    joinedAt: '2023-11-25'
  },
  {
    id: 6,
    name: 'Sarah Green',
    points: 720,
    level: 3,
    streak: 9,
    avatar: null,
    joinedAt: '2023-11-10'
  },
  {
    id: 7,
    name: 'David Wu',
    points: 490,
    level: 2,
    streak: 4,
    avatar: null,
    joinedAt: '2023-12-01'
  },
  {
    id: 8,
    name: 'Olivia Chen',
    points: 630,
    level: 2,
    streak: 8,
    avatar: null,
    joinedAt: '2023-11-18'
  }
];