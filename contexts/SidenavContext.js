import { useState, useEffect, createContext } from "react";

export const SidenavContext = createContext();

const SidenavContextProvider = ({ children }) => {
  const [bookmarkOpen, setBookmarkOpen] = useState(false);

  useEffect(() => {
    const savedBookmarkOpen = localStorage.getItem("bookmarkOpen");
    const newBookmarkOpen =
      savedBookmarkOpen === null ? false : JSON.parse(savedBookmarkOpen);
    setBookmarkOpen(newBookmarkOpen);
    saveToLocalStorage(newBookmarkOpen);
  }, []);

  // helper functions
  const saveToLocalStorage = (bookmarkOpen) => {
    localStorage.setItem("bookmarkOpen", JSON.stringify(bookmarkOpen));
  };

  const changeBookmarkOpen = (bookmarkOpen) => {
    setBookmarkOpen(bookmarkOpen);
    saveToLocalStorage(bookmarkOpen);
  };

  return (
    <SidenavContext.Provider
      value={{
        bookmarkOpen,
        changeBookmarkOpen,
      }}
    >
      {children}
    </SidenavContext.Provider>
  );
};

export default SidenavContextProvider;
