import { useEffect, useState } from "react";

const KEY = "xbookmarker_categories";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(JSON.parse(localStorage.getItem(KEY) || "[]"));
  }, []);

  function persist(list) {
    setCategories(list);
    localStorage.setItem(KEY, JSON.stringify(list));
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
