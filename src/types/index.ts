
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  followers?: number;
  following?: number;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
  likes: number;
}

export interface Post {
  id: string;
  imageUrl: string;
  caption?: string;
  createdAt: string;
  user: User;
  likes: number;
  comments: Comment[];
}
