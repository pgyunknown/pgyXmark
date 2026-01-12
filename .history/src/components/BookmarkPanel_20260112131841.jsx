{
  bookmarks.length === 0 ? (
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
  );
}
