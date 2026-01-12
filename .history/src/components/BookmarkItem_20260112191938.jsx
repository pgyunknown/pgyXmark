import { useState } from "react";

export default function BookmarkItem({ bookmark, onDelete, onUpdateNotes }) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(bookmark.notes || "");

  function handleSave() {
    onUpdateNotes(bookmark.id, notes);
    setIsEditing(false);
  }

  function handleDelete() {
    const ok = window.confirm("Are you sure you want to delete this bookmark?");
    if (ok) onDelete(bookmark.id);
  }

  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-md">
      {/* Top row */}
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <p className="font-medium truncate">{bookmark.title}</p>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-400 hover:underline break-all"
          >
            {bookmark.url}
          </a>
        </div>

        {/* Delete button – ALWAYS visible */}
        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-300 text-sm"
          title="Delete bookmark"
        >
          ✕
        </button>
      </div>

      {/* Notes */}
      <div className="mt-3">
        {isEditing ? (
          <>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes..."
              rows={3}
              className="w-full p-2 bg-slate-800 rounded text-sm outline-none"
            />

            <div className="mt-2 flex gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-blue-600 rounded text-sm"
              >
                Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-slate-700 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {bookmark.notes && (
              <p className="text-sm text-slate-400 mb-2">📝 {bookmark.notes}</p>
            )}

            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-400 hover:underline"
            >
              {bookmark.notes ? "Edit notes" : "Add notes"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
