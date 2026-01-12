import { useState } from "react";
import Sidebar from "./components/Sidebar";
import BookmarkPanel from "./components/BookmarkPanel";
import useBookmarks from "./hooks/useBookmarks";
import categories from "./data/categories";

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { addBookmark, getByCategory, removeBookmark } = useBookmarks();

  return (
    <div className="h-screen flex bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
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
          <span className="ml-4 font-semibold">{activeCategory}</span>
        </div>

        <BookmarkPanel
          activeCategory={activeCategory}
          addBookmark={addBookmark}
          getByCategory={getByCategory}
          removeBookmark={removeBookmark}
        />
      </div>
    </div>
  );
}
