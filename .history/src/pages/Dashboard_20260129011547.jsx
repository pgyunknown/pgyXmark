import { useEffect, useState } from "react";
import storage from "../storage";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkCard from "../components/BookmarkCard";
import { firebaseAuth } from "../auth/firebaseAuth";

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    storage.getBookmarks().then((data) => {
      setBookmarks(data);
      if (data.length) setActiveCategory(data[0].category);
    });
  }, []);

  const categories = [...new Set(bookmarks.map((b) => b.category))];

  const visible = bookmarks.filter((b) => b.category === activeCategory);

  const remove = async (id) => {
    const updated = await storage.deleteBookmark(id);
    setBookmarks(updated);
    if (!updated.some((b) => b.category === activeCategory)) {
      setActiveCategory(updated[0]?.category || null);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 border-r p-4">
        <h2 className="font-semibold mb-4">Categories</h2>
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
        <BookmarkForm
          activeCategory={activeCategory}
          onAdd={(data) => {
            setBookmarks(data);
            if (!activeCategory && data.length) {
              setActiveCategory(data[0].category);
            }
          }}
        />
      </main>
    </div>
  );
}
