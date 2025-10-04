import { useState, useEffect, useCallback } from 'react';
import { Post, Comment } from '../types';
import { initialPosts, CURRENT_USER_ID } from '../mockData';

const STORAGE_KEY = 'ugc_feed_posts';

function loadPostsFromStorage(): Post[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load posts from storage:', error);
  }
  return initialPosts;
}

function savePostsToStorage(posts: Post[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Failed to save posts to storage:', error);
  }
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(() => loadPostsFromStorage());

  useEffect(() => {
    savePostsToStorage(posts);
  }, [posts]);

  const toggleLike = useCallback((postId: string) => {
    setPosts(currentPosts => {
      return currentPosts.map(post => {
        if (post.id === postId) {
          const hasLiked = post.likes.includes(CURRENT_USER_ID);
          const newLikes = hasLiked
            ? post.likes.filter(userId => userId !== CURRENT_USER_ID)
            : [...post.likes, CURRENT_USER_ID];

          return { ...post, likes: newLikes };
        }
        return post;
      });
    });
  }, []);

  const addComment = useCallback((postId: string, text: string, username: string, avatarUrl: string) => {
    setPosts(currentPosts => {
      return currentPosts.map(post => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: `c${Date.now()}`,
            postId,
            userId: CURRENT_USER_ID,
            username,
            avatarUrl,
            text,
            createdAt: new Date().toISOString(),
          };

          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      });
    });
  }, []);

  return {
    posts,
    currentUserId: CURRENT_USER_ID,
    toggleLike,
    addComment,
  };
}
