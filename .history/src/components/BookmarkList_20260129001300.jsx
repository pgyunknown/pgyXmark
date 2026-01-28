import BookmarkCard from "./BookmarkCard";

export default function BookmarkList({ bookmarks, onDelete }) {
  return (
    <div className="space-y-3">
      {bookmarks.map((b) => (
        <BookmarkCard key={b.id} bookmark={b} onDelete={onDelete} />
      ))}
    </div>
  );
}
