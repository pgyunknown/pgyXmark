import { useEffect, useState } from "react";
import storage from "../storage";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkList from "../components/BookmarkList";
import { firebaseAuth } from "../auth/firebaseAuth";

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Load bookmarks from Firestore
  useEffect(() => {
    const load = async () => {
      try {
        const data = await storage.getBookmarks();
        setBookmarks(data);
      } catch (e) {
        console.error("Failed to load bookmarks", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Delete bookmark
  const removeBookmark = async (id) => {
    const updated = await storage.deleteBookmark(id);
    setBookmarks(updated);
  };

  // Extract unique categories
  const categories = ["all", ...new Set(bookmarks.map((b) => b.category))];

  // Apply category filter
  const visibleBookmarks =
    categoryFilter === "all"
      ? bookmarks
      : bookmarks.filter((b) => b.category === categoryFilter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading bookmarks…</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">X Bookmarker</h1>
        <button
          onClick={() => firebaseAuth.logout()}
          className="text-sm text-red-500"
        >
          Logout
        </button>
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
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
      )}

      {/* Add Bookmark */}
      <BookmarkForm onAdd={setBookmarks} />

      {/* Bookmark List */}
      <BookmarkList bookmarks={visibleBookmarks} onDelete={removeBookmark} />
    </div>
  );
}
