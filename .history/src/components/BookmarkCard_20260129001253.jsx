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

      <div className="flex flex-wrap gap-2">
        {bookmark.tags.map((tag) => (
          <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded">
            #{tag}
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
