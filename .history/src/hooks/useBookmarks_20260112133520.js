import { useState } from "react";

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  function addBookmark({ title, url, category }) {
    if (!url.trim()) return;

    setBookmarks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title || url,
        url,
        category,
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
