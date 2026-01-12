import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  // Fetch all bookmarks once on load
  useEffect(() => {
    fetchBookmarks();
  }, []);

  async function fetchBookmarks() {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
      return;
    }

    setBookmarks(data);
  }

  async function addBookmark({ title, url, category }) {
    if (!url || !category) return;

    const { error } = await supabase.from("bookmarks").insert({
      title: title?.trim() || url,
      url,
      category,
    });

    if (error) {
      console.error("Insert error:", error);
      return;
    }

    fetchBookmarks();
  }

  async function removeBookmark(id) {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return;
    }

    fetchBookmarks();
  }

  function getByCategory(category) {
    return bookmarks.filter((b) => b.category === category);
  }

  return {
    addBookmark,
    getByCategory,
    removeBookmark,
  };
}
