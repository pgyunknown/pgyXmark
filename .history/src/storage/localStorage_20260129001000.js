// src/storage/localStorage.js

const STORAGE_KEY = "x_bookmarks";

function load() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function save(bookmarks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export const localStorageService = {
  getBookmarks() {
    return load();
  },

  addBookmark(bookmark) {
    const bookmarks = load();
    bookmarks.unshift(bookmark); // newest first
    save(bookmarks);
    return bookmarks;
  },

  deleteBookmark(id) {
    const bookmarks = load().filter((b) => b.id !== id);
    save(bookmarks);
    return bookmarks;
  },
};
