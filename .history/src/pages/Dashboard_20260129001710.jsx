import { useEffect, useState } from "react";
import storage from "../storage";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkList from "../components/BookmarkList";
import { authService } from "../auth/authService";

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    setBookmarks(storage.getBookmarks());
  }, []);

  const remove = (id) => setBookmarks(storage.deleteBookmark(id));

  const categories = ["all", ...new Set(bookmarks.map((b) => b.category))];

  const visibleBookmarks =
    categoryFilter === "all"
      ? bookmarks
      : bookmarks.filter((b) => b.category === categoryFilter);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">X Bookmarker</h1>
        <button
          onClick={() => {
            authService.logout();
            location.reload();
          }}
          className="text-sm text-red-500"
        >
          Logout
        </button>
      </div>

      {/* Category Filter */}
      <select
        className="w-full border p-2 rounded"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <BookmarkForm onAdd={setBookmarks} />
      <BookmarkList bookmarks={visibleBookmarks} onDelete={remove} />
    </div>
  );
}
