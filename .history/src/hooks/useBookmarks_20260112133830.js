import { useEffect, useState } from "react";

const STORAGE_KEY = "x-bookmarker-bookmarks";

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load bookmarks", e);
      return [];
    }
  });

  // persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  function addBookmark({ title, url, category }) {
    if (!url || !category) return;

    setBookmarks((prev) => [
      ...prev,
      {
        id: Date.now(), // later → uuid
        title: title?.trim() || url,
        url,
        category,
        created_at: new Date().toISOString(),
      },
    ]);
  }

  function getByCategory(category) {
    return bookmarks.filter((b) => b.category === category);
  }

  function removeBookmark(id) {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }

  return {
    bookmarks,
    addBookmark,
    getByCategory,
    removeBookmark,
  };
}
