import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import BookmarkPanel from "./components/BookmarkPanel";
import useBookmarks from "./hooks/useBookmarks";
import useCategories from "./hooks/useCategories";

export default function App() {
  // categories (localStorage)
  const { categories, addCategory, removeCategory } = useCategories();

  // bookmarks (Supabase)
  const { addBookmark, getByCategory, removeBookmark, updateNotes } =
    useBookmarks();

  const [activeCategory, setActiveCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // auto-select first category
  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  async function handleDeleteCategory(category) {
    const ok = window.confirm(
      `Delete category "${category}"?\n\nAll bookmarks inside it will be permanently deleted.`
    );

    if (!ok) return;

    // delete bookmarks from Supabase
    await removeBookmarksByCategory(category);

    // delete category from localStorage
    removeCategory(category);

    // reset active category if needed
    setActiveCategory((prev) => (prev === category ? null : prev));
  }

  return (
    <div className="h-screen flex bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onAddCategory={addCategory}
        onDeleteCategory={removeCategory}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
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
        </div>

        {/* Content */}
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
