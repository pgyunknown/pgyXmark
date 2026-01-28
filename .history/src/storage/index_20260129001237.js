import { storage } from "./storage";
import { localStorageService } from "./localStorage";

storage.getBookmarks = localStorageService.getBookmarks;
storage.addBookmark = localStorageService.addBookmark;
storage.deleteBookmark = localStorageService.deleteBookmark;

export default storage;
