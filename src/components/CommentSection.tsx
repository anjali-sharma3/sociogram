import { useState } from 'react';
import { Send } from 'lucide-react';
import { Comment } from '../types';
import { Avatar } from './Avatar';
import { timeAgo } from '../utils/timeAgo';
import { mockUsers, CURRENT_USER_ID } from '../mockData';

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
  onAddComment: (postId: string, text: string, username: string, avatarUrl: string) => void;
}

export function CommentSection({ comments, postId, onAddComment }: CommentSectionProps) {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUser = mockUsers[CURRENT_USER_ID];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    onAddComment(postId, commentText.trim(), currentUser.username, currentUser.avatarUrl);
    setCommentText('');

    setTimeout(() => {
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
      <div className="space-y-3 mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 animate-fade-in">
            <Avatar src={comment.avatarUrl} alt={comment.username} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl px-4 py-2">
                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{comment.username}</p>
                <p className="text-sm text-gray-800 dark:text-gray-200">{comment.text}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-4">{timeAgo(comment.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <Avatar src={currentUser.avatarUrl} alt={currentUser.username} size="sm" />
        <div className="flex-1 relative">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            disabled={isSubmitting}
            className="w-full px-4 py-2 pr-12 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-all"
          />
          <button
            type="submit"
            disabled={!commentText.trim() || isSubmitting}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:hover:text-gray-300 dark:disabled:hover:text-gray-600 transition-colors"
            aria-label="Submit comment"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
