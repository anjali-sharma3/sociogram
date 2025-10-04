import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { Post } from '../types';
import { Avatar } from './Avatar';
import { CommentSection } from './CommentSection';
import { timeAgo } from '../utils/timeAgo';

interface PostCardProps {
  post: Post;
  currentUserId: string;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, text: string, username: string, avatarUrl: string) => void;
}

export function PostCard({ post, currentUserId, onToggleLike, onAddComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const hasLiked = post.likes.includes(currentUserId);
  const likesCount = post.likes.length;
  const commentsCount = post.comments.length;

  const handleLikeClick = async () => {
    setIsLiking(true);
    onToggleLike(post.id);

    setTimeout(() => {
      setIsLiking(false);
    }, 300);
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-4 flex items-center gap-3">
        <Avatar src={post.avatarUrl} alt={post.username} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{post.username}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(post.createdAt)}</p>
        </div>
      </div>

      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={handleLikeClick}
            disabled={isLiking}
            className={`flex items-center gap-2 transition-all duration-300 ${
              isLiking ? 'scale-125' : 'scale-100'
            } ${
              hasLiked
                ? 'text-red-500'
                : 'text-gray-700 dark:text-gray-300 hover:text-red-500'
            }`}
            aria-label={hasLiked ? 'Unlike post' : 'Like post'}
          >
            <Heart
              className={`w-6 h-6 transition-all duration-300 ${
                hasLiked ? 'fill-current' : ''
              }`}
            />
            <span className="font-semibold text-sm">{likesCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
            aria-label="Toggle comments"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="font-semibold text-sm">{commentsCount}</span>
          </button>
        </div>

        {post.caption && (
          <div className="mb-3">
            <p className="text-gray-900 dark:text-gray-100">
              <span className="font-semibold mr-2">{post.username}</span>
              {post.caption}
            </p>
          </div>
        )}

        {commentsCount > 0 && !showComments && (
          <button
            onClick={() => setShowComments(true)}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            View all {commentsCount} comment{commentsCount !== 1 ? 's' : ''}
          </button>
        )}

        {showComments && (
          <CommentSection
            comments={post.comments}
            postId={post.id}
            onAddComment={onAddComment}
          />
        )}
      </div>
    </article>
  );
}
