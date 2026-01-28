import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const colRef = collection(db, "bookmarks");

export const firebaseStorageService = {
  async getBookmarks() {
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  },

  async addBookmark(bookmark) {
    await addDoc(colRef, bookmark);
    return this.getBookmarks();
  },

  async deleteBookmark(id) {
    await deleteDoc(doc(db, "bookmarks", id));
    return this.getBookmarks();
  },
};
