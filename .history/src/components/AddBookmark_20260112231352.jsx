import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useBookmarks(user) {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks when user logs in
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

    if (error) {
      console.error("Fetch error:", error);
      return;
    }

    setBookmarks(data);
  }

  async function addBookmark({ title, url, category }) {
    if (!user) {
      console.error("No user, cannot add bookmark");
      return;
    }

    const { error } = await supabase.from("bookmarks").insert({
      title,
      url,
      category,
      user_id: user.id, // 🔴 REQUIRED
    });

    if (error) {
      console.error("Insert error:", error);
      return;
    }

    fetchBookmarks(); // 🔁 refresh UI
  }

  async function removeBookmark(id) {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  }

  async function updateNotes(id, notes) {
    await supabase.from("bookmarks").update({ notes }).eq("id", id);

    fetchBookmarks();
  }

  function getByCategory(category) {
    return bookmarks.filter((b) => b.category === category);
  }

  async function removeBookmarksByCategory(category) {
    await supabase.from("bookmarks").delete().eq("category", category);

    fetchBookmarks();
  }

  return {
    addBookmark,
    removeBookmark,
    updateNotes,
    removeBookmarksByCategory,
    getByCategory,
  };
}
