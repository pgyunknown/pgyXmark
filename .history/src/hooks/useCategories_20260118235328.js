import { useEffect, useState } from "react";

const STORAGE_KEY = "xbookmarker_categories";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setCategories(stored);
  }, []);

  function persist(list) {
    setCategories(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function addCategory(name) {
    if (!name || categories.includes(name)) return;
    persist([...categories, name]);
  }

  function removeCategory(name) {
    persist(categories.filter((c) => c !== name));
  }

  return { categories, addCategory, removeCategory };
}
