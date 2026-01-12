export default function Sidebar({
  categories,
  activeCategory,
  onSelectCategory,
  isOpen,
  onClose,
}) {
  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          h-full w-64
          bg-slate-900 border-r border-slate-800
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h1 className="text-xl font-semibold px-6 py-4 text-blue-500">
          X Bookmarker
        </h1>

        <ul className="px-3 space-y-1">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                onClose();
              }}
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
    </>
  );
}
