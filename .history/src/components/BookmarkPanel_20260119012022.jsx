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

  const list = getByCategory(activeCategory);

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!activeCategory) {
            alert("Please select a category first");
            return;
          }

          addBookmark({ url, category: activeCategory });
          setUrl("");
        }}
        className="mb-4"
      >
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste URL and press Enter"
          className="w-full p-2 bg-slate-800 rounded"
          required
        />
      </form>

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
