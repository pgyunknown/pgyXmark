import { useEffect, useState } from "react";

const STORAGE_KEY = "x-bookmarker-categories";

export default function useCategories() {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  function addCategory(name) {
    if (!name) return;
    if (categories.includes(name)) return;

    setCategories((prev) => [...prev, name]);
  }

  function removeCategory(name) {
    setCategories((prev) => prev.filter((c) => c !== name));
  }

  return {
    categories,
    addCategory,
    removeCategory,
  };
}
