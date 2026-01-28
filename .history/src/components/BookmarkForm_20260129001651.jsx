import { useState } from "react";
import storage from "../storage";

export default function BookmarkForm({ onAdd }) {
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");

  const submit = () => {
    if (!url || !category) return;

    const bookmark = {
      id: crypto.randomUUID(),
      url,
      note,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      category,
      createdAt: new Date().toISOString(),
    };

    onAdd(storage.addBookmark(bookmark));

    setUrl("");
    setNote("");
    setTags("");
    setCategory("");
  };

  return (
    <div className="space-y-2">
      <input
        className="w-full border p-2 rounded"
        placeholder="X post URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Category (e.g. React, Java, Career)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Note"
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
        className="w-full bg-black text-white p-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
