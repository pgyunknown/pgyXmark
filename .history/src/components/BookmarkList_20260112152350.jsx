import { useState } from "react";

export default function BookmarkList({ bookmarks, onDelete, onUpdateNotes }) {
  const [openId, setOpenId] = useState(null);
  const [draft, setDraft] = useState("");

  function openNotes(b) {
    setOpenId(b.id);
    setDraft(b.notes || "");
  }

  function saveNotes(id) {
    onUpdateNotes(id, draft);
    setOpenId(null);
    setDraft("");
  }

  if (!bookmarks.length) {
    return <p className="text-slate-400">No bookmarks found.</p>;
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((b) => (
        <div
          key={b.id}
          className="p-4 bg-slate-900 border border-slate-800 rounded"
        >
          <div className="flex justify-between items-start">
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

            <div className="flex gap-2">
              <button
                onClick={() => openNotes(b)}
                className="text-slate-400 hover:text-blue-400 text-sm"
              >
                Notes
              </button>
              <button
                onClick={() => onDelete(b.id)}
                className="text-red-400 text-sm"
              >
                ✕
              </button>
            </div>
          </div>

          {openId === b.id && (
            <div className="mt-3">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Add notes..."
                className="w-full p-2 bg-slate-800 rounded text-sm outline-none"
                rows={3}
              />

              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => saveNotes(b.id)}
                  className="px-3 py-1 bg-blue-600 rounded text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setOpenId(null)}
                  className="px-3 py-1 bg-slate-700 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {b.notes && openId !== b.id && (
            <p className="mt-2 text-sm text-slate-400">📝 {b.notes}</p>
          )}
        </div>
      ))}
    </div>
  );
}
