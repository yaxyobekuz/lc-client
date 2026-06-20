import { useCallback, useState } from "react";

// So'nggi qidiruv natijalari localStorage'da saqlanadi (faqat ochilgan yozuvlar).
const STORAGE_KEY = "owner:recent-searches";
const MAX_RECENT = 5;

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
};

const write = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // localStorage mavjud emas yoki to'lgan - jim o'tib ketamiz
  }
};

// type: "page" | "student" | "teacher" | "group"
// har bir yozuv: { id, type, title, subtitle, url }
const useRecentSearches = () => {
  const [recent, setRecent] = useState(read);

  const addRecent = useCallback((entry) => {
    if (!entry || !entry.id || !entry.url) return;
    setRecent((prev) => {
      const next = [
        entry,
        ...prev.filter((it) => it.id !== entry.id),
      ].slice(0, MAX_RECENT);
      write(next);
      return next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    write([]);
    setRecent([]);
  }, []);

  return { recent, addRecent, clearRecent };
};

export default useRecentSearches;
