import { useEffect, useState } from "react";
import storage from "../storage";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkList from "../components/BookmarkList";
import { authService } from "../auth/authService";

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(storage.getBookmarks());
  }, []);

  const remove = (id) => setBookmarks(storage.deleteBookmark(id));

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">X Bookmarker</h1>
        <button
          onClick={() => {
            authService.logout();
            location.reload();
          }}
          className="text-sm text-red-500"
        >
          Logout
        </button>
      </div>

      <BookmarkForm onAdd={setBookmarks} />
      <BookmarkList bookmarks={bookmarks} onDelete={remove} />
    </div>
  );
}
