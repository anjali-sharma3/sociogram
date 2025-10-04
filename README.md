# UGC Media Feed - Community Content Platform

A production-ready user-generated content feed named as "Sociogram"  built with React, TypeScript, and Tailwind CSS. This application showcases a modern social media feed where users can view posts, like content, and engage through comments.

## Overview

This project demonstrates a lightweight Instagram-style feed with proper data modeling, state management, and responsive UI design. The application focuses on clean architecture, type safety, and optimal user experience with features like optimistic updates and localStorage persistence.

## Features

### Core Functionality
- **Feed View**: Vertically scrollable list of posts with images, captions, and author information
- **Like System**:
  - One-click like/unlike functionality
  - Duplicate prevention (users cannot like the same post twice)
  - Real-time like count updates with optimistic UI
  - Visual feedback with heart icon animation
- **Comment System**:
  - Expandable/collapsible comment threads
  - Real-time comment posting
  - Timestamp display with relative time formatting
  - Optimistic UI updates
- **Persistence**: All likes and comments persist across page refreshes using localStorage
- **Dark Mode**: Toggle between light and dark themes with smooth transitions

### Technical Highlights
- **Type-Safe Data Models**: Well-defined TypeScript interfaces for Post, Comment, and User
- **Custom Hook**: `usePosts` hook manages all feed state and localStorage sync
- **Modular Components**: Clean separation of concerns with reusable components
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Performance Optimized**: Uses React hooks efficiently with `useCallback` for memoization

## Architecture

### Data Modeling

```typescript
User {
  id: string
  username: string
  avatarUrl: string
}

Post {
  id: string
  userId: string
  username: string
  avatarUrl: string
  imageUrl: string
  caption: string
  likes: string[]        
  comments: Comment[]
  createdAt: string
}

Comment {
  id: string
  postId: string
  userId: string
  username: string
  avatarUrl: string
  text: string
  createdAt: string
}
```

### Project Structure

```
src/
├── components/
│   ├── Avatar.tsx           # Reusable avatar component
│   ├── PostCard.tsx         # Individual post with like/comment UI
│   ├── CommentSection.tsx   # Comment thread and input
│   └── Feed.tsx             # Main feed container
├── hooks/
│   ├── usePosts.ts          # State management for posts
│   └── useDarkMode.ts       # Dark mode state and persistence
├── utils/
│   └── timeAgo.ts           # Relative time formatting
├── types.ts                 # TypeScript interfaces
├── mockData.ts              # Initial seed data
├── App.tsx                  # Root component
└── index.css                # Global styles and animations
```

## How It Works

### State Management
The application uses a custom `usePosts` hook that manages all feed state:
- Loads initial data from localStorage or falls back to mock data
- Provides `toggleLike` and `addComment` functions for mutations
- Automatically syncs state changes to localStorage
- Ensures data consistency (no duplicate likes)

### Like System Implementation
```typescript
const hasLiked = post.likes.includes(CURRENT_USER_ID);
const newLikes = hasLiked
  ? post.likes.filter(userId => userId !== CURRENT_USER_ID)
  : [...post.likes, CURRENT_USER_ID];
```

This ensures:
- Each user ID appears only once in the likes array
- Like count accurately reflects unique users
- Toggle behavior (like → unlike → like)

### Comment System Implementation
```typescript
const newComment: Comment = {
  id: `c${Date.now()}`,
  postId,
  userId: CURRENT_USER_ID,
  username,
  avatarUrl,
  text,
  createdAt: new Date().toISOString(),
};
```

Comments are:
- Added with unique IDs and timestamps
- Immediately visible (optimistic updates)
- Persisted to localStorage automatically

### Dark Mode Implementation
Dark mode uses a custom hook with localStorage persistence and applies classes throughout the component tree. The theme is toggleable via a button in the header.

## Setup and Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Clone or download the project**
   ```bash
   cd ugc-media-feed
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   Output will be in the `dist/` directory

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Testing

### Manual Testing Checklist

**Like Functionality:**
- [ ] Click heart icon to like a post
- [ ] Click again to unlike
- [ ] Verify like count updates correctly
- [ ] Refresh page and verify likes persist
- [ ] Check heart icon changes color when liked

**Comment Functionality:**
- [ ] Click comment icon to expand thread
- [ ] Type a comment and submit
- [ ] Verify comment appears immediately
- [ ] Check timestamp is displayed
- [ ] Refresh page and verify comments persist
- [ ] Collapse comments by clicking icon again

**Dark Mode:**
- [ ] Click theme toggle in header
- [ ] Verify all components switch to dark theme
- [ ] Refresh page and verify theme persists
- [ ] Toggle back to light mode

**Responsive Design:**
- [ ] Test on mobile viewport (320px+)
- [ ] Test on tablet viewport (768px+)
- [ ] Test on desktop viewport (1024px+)
- [ ] Verify header stays sticky on scroll

### Current User
The app simulates being logged in as:
- **Username**: johndoe
- **User ID**: u123

All likes and comments are created by this user.

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **localStorage** - Client-side data persistence

## Design Decisions

### Why localStorage instead of a backend?
- Focuses on frontend skills (data modeling, state management, UI/UX)
- Zero setup required - works immediately
- Demonstrates proper state management patterns
- Easy to upgrade to a backend later

### Why custom hook instead of Context/Redux?
- Simpler for this scope
- Demonstrates hooks proficiency
- Easier to test and maintain
- No prop drilling issues with current structure

### Why optimistic updates?
- Better user experience (instant feedback)
- Makes the app feel faster
- Industry standard for social media apps

## Performance Considerations

- Uses `useCallback` to memoize functions and prevent unnecessary re-renders
- Lazy loads images via browser's native lazy loading
- Efficient state updates with immutable patterns
- Minimal re-renders by updating only affected posts

## Future Enhancements

- Add user authentication
- Implement backend API with database
- Add image upload functionality
- Implement infinite scroll pagination
- Add post creation UI
- Support for video posts
- Notifications system
- User profiles
- Search and filtering

## Author

Anjali Sharma
