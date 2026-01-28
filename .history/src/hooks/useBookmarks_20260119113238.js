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
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setBookmarks(data);
  }

  async function addBookmark({ url, category, notes }) {
    if (!user || !url || !category) return;

    const autoTitle = url.replace(/^https?:\/\//, "").split("/")[0];

    await supabase.from("bookmarks").insert({
      title: autoTitle,
      url,
      notes: notes || null,
      category,
      user_id: user.id,
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
