import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ugc_feed_dark_mode';

function getInitialDarkMode(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load dark mode preference:', error);
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialDarkMode);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isDarkMode));
    } catch (error) {
      console.error('Failed to save dark mode preference:', error);
    }

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return { isDarkMode, toggleDarkMode };
}
