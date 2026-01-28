import { useState } from "react";

export default function BookmarkItem({ bookmark, onDelete, onUpdateNotes }) {
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState(bookmark.notes || "");

  return (
    <div className="p-4 bg-slate-900 rounded border border-slate-800">
      <div className="flex justify-between">
        <div>
          <p className="font-medium">{bookmark.title}</p>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-400"
          >
            {bookmark.url}
          </a>
        </div>

        <button onClick={() => onDelete(bookmark.id)} className="text-red-400">
          ✕
        </button>
      </div>

      {editing ? (
        <>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full mt-2 bg-slate-800 p-2 rounded"
          />
          <button
            onClick={() => {
              onUpdateNotes(bookmark.id, notes);
              setEditing(false);
            }}
            className="text-blue-400 mt-2"
          >
            Save
          </button>
        </>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="text-sm text-blue-400 mt-2"
        >
          {bookmark.notes ? "Edit notes" : "Add notes"}
        </button>
      )}
    </div>
  );
}
