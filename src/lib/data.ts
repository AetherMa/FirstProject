
import { User, Post, Comment } from "@/types";

export const users: User[] = [
  {
    id: "1",
    username: "alexsmith",
    displayName: "Alex Smith",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&auto=format&fit=crop&q=80",
    bio: "Photographer and travel enthusiast",
    followers: 2345,
    following: 521
  },
  {
    id: "2",
    username: "sophiawilson",
    displayName: "Sophia Wilson",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80",
    bio: "Coffee addict, book lover",
    followers: 5432,
    following: 231
  },
  {
    id: "3",
    username: "michaeljohnson",
    displayName: "Michael Johnson",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop&q=80",
    bio: "Designer by day, chef by night",
    followers: 1234,
    following: 432
  }
];

export const comments: Comment[] = [
  {
    id: "c1",
    content: "This looks amazing! Where was this taken?",
    createdAt: "2023-10-15T14:32:00Z",
    user: users[1],
    likes: 12
  },
  {
    id: "c2",
    content: "Love the composition and colors in this shot!",
    createdAt: "2023-10-15T15:47:00Z",
    user: users[2],
    likes: 8
  },
  {
    id: "c3",
    content: "Incredible view, I need to visit this place!",
    createdAt: "2023-10-16T09:21:00Z",
    user: users[0],
    likes: 15
  },
  {
    id: "c4",
    content: "The lighting is perfect ✨",
    createdAt: "2023-10-16T11:05:00Z",
    user: users[1],
    likes: 7
  }
];

export const posts: Post[] = [
  {
    id: "p1",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    caption: "Found this amazing view during my hike yesterday. Nature never ceases to amaze me.",
    createdAt: "2023-10-14T10:23:00Z",
    user: users[0],
    likes: 234,
    comments: [comments[0], comments[1]]
  },
  {
    id: "p2",
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&auto=format&fit=crop&q=80",
    caption: "Beach day! Nothing beats the sound of waves and the feeling of sand between your toes.",
    createdAt: "2023-10-13T16:45:00Z",
    user: users[1],
    likes: 452,
    comments: [comments[2]]
  },
  {
    id: "p3",
    imageUrl: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1200&auto=format&fit=crop&q=80",
    caption: "Just a bird enjoying the sunset. Sometimes it's the little moments that matter most.",
    createdAt: "2023-10-12T19:12:00Z",
    user: users[2],
    likes: 187,
    comments: [comments[3]]
  },
  {
    id: "p4",
    imageUrl: "https://images.unsplash.com/photo-1517822306183-bb6170fc9444?w=1200&auto=format&fit=crop&q=80",
    caption: "Urban exploration at its finest. The city has so many hidden gems.",
    createdAt: "2023-10-11T12:30:00Z",
    user: users[0],
    likes: 326,
    comments: []
  }
];

// Current user for demo purposes
export const currentUser = users[0];
