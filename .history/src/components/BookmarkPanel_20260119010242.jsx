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
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  let list = getByCategory(activeCategory);

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.url.toLowerCase().includes(q) ||
        b.notes?.toLowerCase().includes(q),
    );
  }

  if (sort === "oldest") list = [...list].reverse();
  if (sort === "title")
    list = [...list].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addBookmark({ title, url, category: activeCategory });
          setTitle("");
          setUrl("");
        }}
        className="mb-4"
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

      <div className="flex gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search…"
          className="flex-1 p-2 bg-slate-800 rounded"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-slate-800 p-2 rounded"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

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
