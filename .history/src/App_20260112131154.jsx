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

      import { useState } from "react";
import Sidebar from "./components/Sidebar";
import BookmarkPanel from "./components/BookmarkPanel";

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

      <BookmarkPanel activeCategory={activeCategory} />
    </div>
  );
}

    </div>
  );
}
