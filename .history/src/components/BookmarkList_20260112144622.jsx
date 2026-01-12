export default function BookmarkList({ bookmarks, onDelete }) {
  if (!bookmarks.length) {
    return <p className="text-slate-400">No bookmarks in this category.</p>;
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((b) => (
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
            onClick={() => onDelete(b.id)}
            className="text-slate-500 hover:text-red-400 opacity-0
                       group-hover:opacity-100 transition"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
