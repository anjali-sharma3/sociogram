import { Moon, Sun } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import { useDarkMode } from '../hooks/useDarkMode';
import { PostCard } from './PostCard';
import { mockUsers } from '../mockData';

export function Feed() {
  const { posts, currentUserId, toggleLike, addComment } = usePosts();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
             Sociogram Feed
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">
                {mockUsers[currentUserId].username}
              </span>
              <img
                src={mockUsers[currentUserId].avatarUrl}
                alt={mockUsers[currentUserId].username}
                className="w-9 h-9 rounded-full ring-2 ring-blue-500 object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUserId={currentUserId}
              onToggleLike={toggleLike}
              onAddComment={addComment}
            />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No posts yet. Be the first to share!</p>
          </div>
        )}
      </main>
    </div>
  );
}
