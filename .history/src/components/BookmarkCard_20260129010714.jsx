export default function BookmarkCard({ bookmark, onDelete }) {
  return (
    <div className="border rounded p-3 space-y-2">
      <a
        href={bookmark.url}
        target="_blank"
        className="text-blue-600 break-all"
      >
        {bookmark.url}
      </a>

      {bookmark.note && <p>{bookmark.note}</p>}

      <div className="flex gap-2 flex-wrap">
        {bookmark.tags.map((t) => (
          <span key={t} className="text-xs bg-gray-200 px-2 py-1 rounded">
            #{t}
          </span>
        ))}
      </div>

      <button
        onClick={() => onDelete(bookmark.id)}
        className="text-sm text-red-500"
      >
        Delete
      </button>
    </div>
  );
}
