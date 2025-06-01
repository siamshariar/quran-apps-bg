// utils/scroll.js
export function restoreScrollPosition(key) {
  if (typeof window !== 'undefined') {
    const savedPosition = sessionStorage.getItem(key);
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }
  }
}

export function saveScrollPosition(key) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, window.scrollY.toString());
  }
}