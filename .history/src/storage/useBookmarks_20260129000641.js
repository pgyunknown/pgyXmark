import { useEffect, useState } from "react";
import { supabase } from "../auth/supabase";

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

    console.log("FETCHED:", data); // 👈 ADD THIS

    if (error) {
      console.error(error);
      return;
    }

    setBookmarks(data);
  }

  async function addBookmark({ url, category, notes }) {
    if (!user || !url || !category) return;

    const cleanCategory = category.trim(); // 🔒 FIX
    const autoTitle = url.replace(/^https?:\/\//, "").split("/")[0];

    const { error } = await supabase.from("bookmarks").insert({
      title: autoTitle,
      url: url.trim(),
      notes: notes?.trim() || null,
      category: cleanCategory,
      user_id: user.id,
    });

    if (error) {
      console.error("Insert error:", error);
      return;
    }

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
