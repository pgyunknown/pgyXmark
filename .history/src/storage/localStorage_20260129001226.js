const KEY = "x_bookmarks";

const load = () => JSON.parse(localStorage.getItem(KEY)) || [];

const save = (data) => localStorage.setItem(KEY, JSON.stringify(data));

export const localStorageService = {
  getBookmarks() {
    return load();
  },

  addBookmark(bookmark) {
    const data = load();
    data.unshift(bookmark);
    save(data);
    return data;
  },

  deleteBookmark(id) {
    const data = load().filter((b) => b.id !== id);
    save(data);
    return data;
  },
};
