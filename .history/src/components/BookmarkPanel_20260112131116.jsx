export default function BookmarkPanel({ activeCategory }) {
  return (
    <main className="flex-1 p-6 bg-slate-950">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{activeCategory}</h2>

        <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500">
          + Add Bookmark
        </button>
      </div>

      {/* Bookmark List (mock) */}
      <div className="space-y-3">
        <div className="p-4 bg-slate-900 rounded-md border border-slate-800">
          <p className="font-medium">Official Java Documentation</p>
          <a href="#" className="text-sm text-blue-400 hover:underline">
            https://docs.oracle.com
          </a>
        </div>

        <div className="p-4 bg-slate-900 rounded-md border border-slate-800">
          <p className="font-medium">Java Collections Cheat Sheet</p>
          <a href="#" className="text-sm text-blue-400 hover:underline">
            https://example.com
          </a>
        </div>
      </div>
    </main>
  );
}
