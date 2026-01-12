import { useEffect, useRef, useState } from "react";
import BookmarkList from "./BookmarkList";

export default function BookmarkPanel({
  activeCategory,
  addBookmark,
  getByCategory,
  removeBookmark,
}) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const urlInputRef = useRef(null);

  const bookmarks = getByCategory(activeCategory);

  function handleAdd(e) {
    e.preventDefault();

    addBookmark({ title, url, category: activeCategory });

    setTitle("");
    setUrl("");
    setShowForm(false);
  }

  useEffect(() => {
    if (showForm && urlInputRef.current) {
      urlInputRef.current.focus();
    }
  }, [showForm]);

  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") setShowForm(false);
    }

    if (showForm) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [showForm]);

  return (
    <main className="flex-1 p-6 bg-slate-950">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{activeCategory}</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          + Add Bookmark
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="mb-6 p-4 bg-slate-900 border border-slate-800 rounded space-y-3"
        >
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded bg-slate-800"
          />

          <input
            ref={urlInputRef}
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-3 py-2 rounded bg-slate-800"
          />

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 rounded">Save</button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-700 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <BookmarkList bookmarks={bookmarks} onDelete={removeBookmark} />
    </main>
  );
}
