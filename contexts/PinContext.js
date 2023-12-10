import { useState, useEffect, createContext } from "react";
var defaultPin = [];
var defaultLastRead = [];

export const PinContext = createContext();

const PinContextProvider = ({ children }) => {
  // state declare
  const [pin, setPin] = useState(defaultPin);
  const [lastRead, setLastRead] = useState(defaultLastRead);

  // first render
  useEffect(() => {
    const savedPin = localStorage.getItem("pin");
    const newPin = savedPin === null ? defaultPin : JSON.parse(savedPin);
    setPin(newPin);
    saveToLocalStorage(newPin);

    // last read
    const savedLastRead = localStorage.getItem("lastRead");
    const newLastRead = savedLastRead === null ? defaultLastRead : JSON.parse(savedLastRead);
    setLastRead(newLastRead);
    saveLastReadToLocalStorage(newLastRead);
  }, []);

  // helper functions
  const saveToLocalStorage = (pin) => {
    localStorage.setItem("pin", JSON.stringify(pin));
  };

  const saveLastReadToLocalStorage = (lastRead) => {
    localStorage.setItem("lastRead", JSON.stringify(lastRead));
  };

  const checkPinnedAnyVerseOfThisChapter = (arr, chapter) => {
    return arr.some((el) => el.chapter == chapter);
  };

  // change pin functions
  const addPin = (chapter, name, slug, verse) => {
    if (checkPinnedAnyVerseOfThisChapter(pin, chapter)) {
      let newPin = [{
        chapter: chapter,
        name: name,
        slug: slug,
        verse: verse
      }];

      pin.forEach((el) => {
        if (el.chapter != chapter) newPin.push(el)
      });
      saveToLocalStorage(newPin);
      setPin(newPin);
    } else {
      let newPin = pin.slice(); // assign pin to newPin
      newPin.unshift({
        chapter: chapter,
        name: name,
        slug: slug,
        verse: verse,
      });
      saveToLocalStorage(newPin);
      setPin(newPin);
    }
  };

  const removePin = (chapter, verse) => {
    let newPin = [];
    pin.forEach((el) => {
      if (!(el.chapter == chapter && el.verse == verse)) {
        newPin.push(el);
      }
    });
    saveToLocalStorage(newPin);
    setPin(newPin);
  };

  // last read functions
  const checkIfLastReadAnyVerseOfThisChapter = (arr, chapter) => {
    return arr.some((el) => el.chapter == chapter);
  };

  const addLastRead = (chapter, name, slug, verse) => {
    if (checkIfLastReadAnyVerseOfThisChapter(lastRead, chapter)) {
      let newLastRead = [{
        chapter: chapter,
        name: name,
        slug: slug,
        verse: verse,
        date: Date.now()
      }];

      lastRead.forEach((el) => {
        if (el.chapter != chapter) newLastRead.push(el)
      });
      saveLastReadToLocalStorage(newLastRead);
      setLastRead(newLastRead);
    } else {
      let newLastRead = lastRead.slice(); // assign lastRead to newLastRead
      newLastRead.unshift({
        chapter: chapter,
        name: name,
        slug: slug,
        verse: verse,
        date: Date.now()
      });
      saveLastReadToLocalStorage(newLastRead);
      setLastRead(newLastRead);
    }
  };

  return (
    <PinContext.Provider
      value={{
        pin,
        addPin,
        removePin,
        lastRead,
        addLastRead
      }}
    >
      {children}
    </PinContext.Provider>
  );
};

export default PinContextProvider;
