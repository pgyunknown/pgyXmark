import { useState } from "react";
import BookmarkItem from "./BookmarkItem";

export default function BookmarkPanel({
  activeCategory,
  addBookmark,
  getByCategory,
  removeBookmark,
  updateNotes,
}) {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  const list = getByCategory(activeCategory);

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      {/* Add bookmark */}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!activeCategory) {
            alert("Please select a category first");
            return;
          }

          addBookmark({
            url,
            category: activeCategory,
            notes,
          });

          setUrl("");
          setNotes("");
        }}
        className="mb-6"
      >
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste URL"
          className="w-full p-2 bg-slate-800 rounded mb-2"
          required
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes (optional)"
          className="w-full p-2 bg-slate-800 rounded mb-2"
          rows={3}
        />

        <button type="submit" className="bg-blue-600 px-4 py-2 rounded">
          Add Bookmark
        </button>
      </form>

      {/* Empty state */}
      {list.length === 0 && (
        <p className="text-slate-400">No bookmarks in this category yet.</p>
      )}

      {/* Bookmark list */}
      <div className="space-y-3">
        {list.map((b) => (
          <BookmarkItem
            key={b.id}
            bookmark={b}
            onDelete={removeBookmark}
            onUpdateNotes={updateNotes}
          />
        ))}
      </div>
    </div>
  );
}
