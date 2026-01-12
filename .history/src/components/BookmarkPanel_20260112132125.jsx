import { useState } from "react";

export default function BookmarkPanel({ activeCategory }) {
  const { addBookmark, getByCategory } = useBookmarks();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const bookmarks = getByCategory(activeCategory);

  function handleAdd(e) {
    e.preventDefault();

    addBookmark({
      title,
      url,
      category: activeCategory,
    });

    setTitle("");
    setUrl("");
    setShowForm(false);
  }

  return (
    <main className="flex-1 p-6 bg-slate-950">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{activeCategory}</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500"
        >
          + Add Bookmark
        </button>
      </div>

      {/* Inline Add Form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="mb-6 p-4 bg-slate-900 border border-slate-800 rounded-md space-y-3"
        >
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded bg-slate-800 text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-3 py-2 rounded bg-slate-800 text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Bookmark List */}
      {bookmarks.length === 0 ? (
        <p className="text-slate-400">
          No bookmarks yet in{" "}
          <span className="text-blue-400">{activeCategory}</span>.
        </p>
      ) : (
        bookmarks.map((b) => (
          <div
            key={b.id}
            className="group p-4 bg-slate-900 rounded-md border border-slate-800
                 flex justify-between items-start"
          >
            <div>
              <p className="font-medium">{b.title}</p>
              <a
                href={b.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-400 hover:underline"
              >
                {b.url}
              </a>
            </div>

            <button
              onClick={() => removeBookmark(b.id)}
              className="text-slate-500 hover:text-red-400 opacity-0
                   group-hover:opacity-100 transition"
              title="Delete bookmark"
            >
              ✕
            </button>
          </div>
        ))
      )}
    </main>
  );
}
