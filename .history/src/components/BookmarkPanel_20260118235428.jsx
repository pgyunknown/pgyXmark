import { useState } from "react";
import BookmarkItem from "./BookmarkItem";

export default function BookmarkPanel({
  activeCategory,
  addBookmark,
  getByCategory,
  removeBookmark,
  updateNotes,
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const list = getByCategory(activeCategory);

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addBookmark({ title, url, category: activeCategory });
          setTitle("");
          setUrl("");
        }}
        className="mb-6"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full mb-2 p-2 bg-slate-800 rounded"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          className="w-full p-2 bg-slate-800 rounded"
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
