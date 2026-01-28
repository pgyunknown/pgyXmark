import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useBookmarks(user) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!user) {
      setBookmarks([]);
      return;
    }
    fetchBookmarks();
  }, [user]);

  async function fetchBookmarks() {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setBookmarks(data);
  }

  async function addBookmark({ title, url, category }) {
    if (!user || !url || !category) return;

    const { error } = await supabase.from("bookmarks").insert({
      title: title?.trim() || url,
      url,
      category,
      user_id: user.id, // REQUIRED FOR RLS
    });

    if (!error) fetchBookmarks();
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
    await supabase.from("bookmarks").delete().eq("category", category);
    fetchBookmarks();
  }

  function getByCategory(category) {
    return bookmarks.filter((b) => b.category === category);
  }

  return {
    addBookmark,
    removeBookmark,
    updateNotes,
    removeBookmarksByCategory,
    getByCategory,
  };
}
