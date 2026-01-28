import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import BookmarkPanel from "./components/BookmarkPanel";
import useBookmarks from "./hooks/useBookmarks";
import useCategories from "./hooks/useCategories";
import useAuth from "./hooks/useAuth";
import Auth from "./components/Auth";

export default function App() {
  const { user, loading, signIn, signOut } = useAuth();
  const { categories, addCategory, removeCategory } = useCategories();
  const {
    addBookmark,
    getByCategory,
    removeBookmark,
    updateNotes,
    removeBookmarksByCategory,
  } = useBookmarks(user);

  const [activeCategory, setActiveCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (user && !activeCategory && categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [user, categories, activeCategory]);

  if (loading) return null;
  if (!user) return <Auth onLogin={signIn} />;

  async function deleteCategory(cat) {
    if (!window.confirm("Delete category and all bookmarks?")) return;
    await removeBookmarksByCategory(cat);
    removeCategory(cat);
    setActiveCategory(null);
  }

  return (
    <div className="h-screen flex bg-slate-950 text-slate-100">
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onAddCategory={addCategory}
        onDeleteCategory={deleteCategory}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <div className="md:hidden p-3 border-b border-slate-800 flex">
          <button onClick={() => setIsSidebarOpen(true)}>☰</button>
          <button onClick={signOut} className="ml-auto text-red-400">
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
            Select a category to view its bookmarks
          </div>
        )}
      </div>
    </div>
  );
}
