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
  const [name, setName] = useState("");

  return (
    <aside
      className={`bg-slate-900 w-64 p-4 border-r border-slate-800
      ${isOpen ? "block" : "hidden"} md:block`}
    >
      <h2 className="font-semibold mb-4">Categories</h2>

      {categories.map((cat) => (
        <div
          key={cat}
          className={`flex justify-between items-center mb-2 ${
            cat === activeCategory ? "text-blue-400" : ""
          }`}
        >
          <button onClick={() => onSelectCategory(cat)}>{cat}</button>
          <button
            onClick={() => onDeleteCategory(cat)}
            className="text-red-400"
          >
            ✕
          </button>
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAddCategory(name);
          setName("");
        }}
        className="mt-4"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category"
          className="w-full p-2 bg-slate-800 rounded"
        />
      </form>

      <button
        onClick={onClose}
        className="md:hidden mt-4 text-sm text-slate-400"
      >
        Close
      </button>
    </aside>
  );
}
