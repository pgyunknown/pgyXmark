import { useEffect, useState } from "react";

const STORAGE_KEY = "x-bookmarker-bookmarks";

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // persist whenever bookmarks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  function addBookmark({ title, url, category }) {
    if (!url?.trim()) return;

    setBookmarks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title || url,
        url,
        category,
        createdAt: new Date().toISOString(),
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
