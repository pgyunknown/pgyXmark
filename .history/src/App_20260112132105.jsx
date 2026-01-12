import { useState } from "react";
import Sidebar from "./components/Sidebar";
import BookmarkPanel from "./components/BookmarkPanel";
import useBookmarks from "./hooks/useBookmarks";

const categories = ["Java", "Vim", "Backend", "Exams"];

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const { addBookmark, getByCategory, removeBookmark } = useBookmarks();

  return (
    <div className="h-screen flex bg-slate-950 text-slate-100">
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <BookmarkPanel
        activeCategory={activeCategory}
        addBookmark={addBookmark}
        getByCategory={getByCategory}
        removeBookmark={removeBookmark}
      />
    </div>
  );
}
