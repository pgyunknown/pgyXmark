import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import BookmarkPanel from "./components/BookmarkPanel";
import useBookmarks from "./hooks/useBookmarks";
import useCategories from "./hooks/useCategories";

export default function App() {
  const { categories, addCategory, removeCategory } = useCategories();
  const { addBookmark, getByCategory, removeBookmark } = useBookmarks();

  const [activeCategory, setActiveCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // auto-select first category
  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  return (
    <div className="h-screen flex bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onAddCategory={addCategory}
        onDeleteCategory={removeCategory}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
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

        {activeCategory ? (
          <BookmarkPanel
            activeCategory={activeCategory}
            addBookmark={addBookmark}
            getByCategory={getByCategory}
            removeBookmark={removeBookmark}
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
