import { useState, useEffect, createContext } from "react";

var defaultBookmarks = {
  favorites: {
    name: "Favorites",
    entry: [],
  },
};

export const BookmarkContext = createContext();

const BookmarkContextProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(defaultBookmarks);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    const newBookmarks =
      savedBookmarks === null ? defaultBookmarks : JSON.parse(savedBookmarks);
    setBookmarks(newBookmarks);
    saveToLocalStorage(newBookmarks);
  }, []);

  // helper functions
  const saveToLocalStorage = (bookmarks) => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  const changeBookmarks = (bookmarks) => {
    saveToLocalStorage(bookmarks);
    setBookmarks(bookmarks);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        changeBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContextProvider;
