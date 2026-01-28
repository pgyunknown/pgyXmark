import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  async function fetchBookmarks() {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setBookmarks(data);
  }

  async function addBookmark({ title, url, category }) {
    if (!url || !category) return;

    await supabase.from("bookmarks").insert({
      title: title?.trim() || url,
      url,
      category,
    });

    fetchBookmarks();
  }

  async function removeBookmark(id) {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  }

  async function updateNotes(id, notes) {
    await supabase.from("bookmarks").update({ notes }).eq("id", id);

    fetchBookmarks();
  }

  async function removeBookmarksByCategory(category) {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("category", category);

    if (error) {
      console.error("Bulk delete error:", error);
      return;
    }

    fetchBookmarks();
  }

  function getByCategory(category) {
    return bookmarks.filter((b) => b.category === category);
  }

  return {
    addBookmark,
    removeBookmark,
    updateNotes,
    getByCategory,
    removeBookmarksByCategory,
  };
}
