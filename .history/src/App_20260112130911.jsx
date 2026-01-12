import { useState } from "react";
import Sidebar from "./components/Sidebar";

const categories = ["Java", "Vim", "Backend", "Exams"];

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="h-screen flex bg-slate-950 text-slate-100">
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <main className="flex-1 p-6 bg-slate-950">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{activeCategory}</h2>

          <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500">
            + Add Bookmark
          </button>
        </div>

        <div className="text-slate-400">
          No bookmarks yet in{" "}
          <span className="text-blue-400">{activeCategory}</span>.
        </div>
      </main>
    </div>
  );
}
