export interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  avatarUrl: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  caption: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface FeedState {
  posts: Post[];
  currentUserId: string;
}
