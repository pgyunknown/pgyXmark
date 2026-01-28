import { useState } from "react";
import storage from "../storage";

export default function BookmarkForm({ onAdd }) {
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState("");

  const submit = () => {
    if (!url) return;

    const bookmark = {
      id: crypto.randomUUID(),
      url,
      note,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    onAdd(storage.addBookmark(bookmark));
    setUrl("");
    setNote("");
    setTags("");
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
