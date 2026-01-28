import { useState } from "react";
import storage from "../storage";

export default function BookmarkForm({ activeCategory, onAdd }) {
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState(activeCategory || "");

  const submit = async () => {
    if (!url || !category) return;

    const bookmark = {
      url,
      note,
      category: category.trim().toLowerCase(),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      createdAt: new Date(),
    };

    const updated = await storage.addBookmark(bookmark);
    onAdd(updated);

    setUrl("");
    setNote("");
    setTags("");
  };

  return (
    <div className="space-y-2 mb-6">
      <input
        className="w-full border p-2 rounded"
        placeholder="X post URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save Bookmark
      </button>
    </div>
  );
}
