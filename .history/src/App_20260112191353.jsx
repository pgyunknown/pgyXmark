import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import BookmarkPanel from "./components/BookmarkPanel";
import useBookmarks from "./hooks/useBookmarks";
import useCategories from "./hooks/useCategories";
import useAuth from "./hooks/useAuth";
import Auth from "./components/Auth";

export default function App() {
  // 🔐 Auth (ALWAYS called)
  const { user, loading, signIn, signOut } = useAuth();

  // 📂 Categories (ALWAYS called)
  const { categories, addCategory, removeCategory } = useCategories();

  // 🔖 Bookmarks (ALWAYS called)
  // user can be null — hook must still run
  const {
    addBookmark,
    getByCategory,
    removeBookmark,
    updateNotes,
    removeBookmarksByCategory,
  } = useBookmarks(user);

  // UI state (ALWAYS called)
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auto-select first category
  useEffect(() => {
    if (user && !activeCategory && categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [user, categories, activeCategory]);

  // 🔴 NOW we can return conditionally (safe)

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={signIn} />;
  }

  async function handleDeleteCategory(category) {
    const ok = window.confirm(
      `Delete category "${category}"?\n\nAll bookmarks inside it will be permanently deleted.`
    );
    if (!ok) return;

    await removeBookmarksByCategory(category);
    removeCategory(category);
    setActiveCategory(null);
  }

  return (
    <div className="h-screen flex bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onAddCategory={addCategory}
        onDeleteCategory={handleDeleteCategory}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center px-4 py-3 border-b border-slate-800">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-blue-400 text-xl"
          >
            ☰
          </button>

          <span className="ml-4 font-semibold">
            {activeCategory || "No category"}
          </span>

          <button onClick={signOut} className="ml-auto text-sm text-red-400">
            Logout
          </button>
        </div>

        {activeCategory ? (
          <BookmarkPanel
            activeCategory={activeCategory}
            addBookmark={addBookmark}
            getByCategory={getByCategory}
            removeBookmark={removeBookmark}
            updateNotes={updateNotes}
          />
        ) : (
          <div className="p-6 text-slate-400">
            Add a category to get started.
          </div>
        )}
      </div>
    </div>
  );
}
