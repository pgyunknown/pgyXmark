export default function Sidebar({
  categories,
  activeCategory,
  onSelectCategory,
}) {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800">
      <h1 className="text-xl font-semibold px-6 py-4 text-blue-500">
        X Bookmarker
      </h1>

      <ul className="px-3 space-y-1">
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3 py-2 rounded-md cursor-pointer transition
              ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-blue-400"
              }`}
          >
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}
