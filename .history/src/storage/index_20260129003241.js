import { storage } from "./storage";
import { firebaseStorageService } from "./firebaseStorage";

// 🔁 SWITCH HERE
storage.getBookmarks = firebaseStorageService.getBookmarks;
storage.addBookmark = firebaseStorageService.addBookmark;
storage.deleteBookmark = firebaseStorageService.deleteBookmark;

export default storage;
