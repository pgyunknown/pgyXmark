import { useState } from "react";

export default function Sidebar({
  categories,
  activeCategory,
  onSelectCategory,
  onAddCategory,
  onDeleteCategory,
  isOpen,
  onClose,
}) {
  const [newCategory, setNewCategory] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    onAddCategory(newCategory.trim());
    setNewCategory("");
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static z-50 h-full w-64 bg-slate-900 border-r border-slate-800
        transform transition-transform duration-200
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <h1 className="text-xl font-semibold px-6 py-4 text-blue-500">
          X Bookmarker
        </h1>

        {/* Add category */}
        <form onSubmit={handleAdd} className="px-4 mb-3">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
            className="w-full px-2 py-1 rounded bg-slate-800 text-sm outline-none"
          />
        </form>

        {/* Category list */}
        <ul className="px-3 space-y-1">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`group flex justify-between items-center px-3 py-2 rounded-md cursor-pointer
                ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-blue-400"
                }`}
            >
              <span
                onClick={() => {
                  onSelectCategory(cat);
                  onClose();
                }}
                className="flex-1"
              >
                {cat}
              </span>

              <button
                onClick={() => {
                  const ok = window.confirm(
                    `Are you sure you want to delete the category "${cat}"?
This will hide all its bookmarks.`
                  );
                  if (ok) onDeleteCategory(cat);
                }}
                className="opacity-0 group-hover:opacity-100 text-red-400 text-sm"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
