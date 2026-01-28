import { useEffect, useState } from "react";
import storage from "../storage";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkCard from "../components/BookmarkCard";
import { firebaseAuth } from "../auth/firebaseAuth";

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  // Load bookmarks once
  useEffect(() => {
    storage.getBookmarks().then((data) => {
      setBookmarks(data);
      if (data.length > 0) {
        setActiveCategory(data[0].category);
      }
    });
  }, []);

  // Derive categories from bookmarks
  const categories = Array.from(new Set(bookmarks.map((b) => b.category)));

  // Derive visible bookmarks SAFELY
  const visibleBookmarks = bookmarks.filter(
    (b) => b.category === activeCategory,
  );

  const handleAdd = (updated) => {
    setBookmarks(updated);
    if (!activeCategory && updated.length > 0) {
      setActiveCategory(updated[0].category);
    }
  };

  const handleDelete = async (id) => {
    const updated = await storage.deleteBookmark(id);
    setBookmarks(updated);

    if (activeCategory && !updated.some((b) => b.category === activeCategory)) {
      setActiveCategory(updated[0]?.category || "");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 border-r p-4">
        <h2 className="font-semibold mb-4">Categories</h2>

        {categories.length === 0 && (
          <p className="text-sm text-gray-500">No categories yet</p>
        )}

        <div className="space-y-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`block w-full text-left px-2 py-1 rounded ${
                c === activeCategory ? "bg-gray-200" : ""
              }`}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={() => firebaseAuth.logout()}
          className="text-sm text-red-500 mt-8"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <BookmarkForm activeCategory={activeCategory} onAdd={handleAdd} />

        {activeCategory && (
          <>
            <h1 className="text-xl font-semibold mb-4">
              {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
            </h1>

            {visibleBookmarks.length === 0 ? (
              <p className="text-gray-500">No bookmarks in this category</p>
            ) : (
              <div className="space-y-3">
                {visibleBookmarks.map((b) => (
                  <BookmarkCard
                    key={b.id}
                    bookmark={b}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
