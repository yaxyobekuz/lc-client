import { useEffect, useRef, useState } from "react";

const DRAFT_KEY = "onboarding:import:draft:v1";

// Sehrgar holatini localStorage'ga avtosaqlovchi qoramol (draft). Sahifa
// yangilansa - hech narsa yo'qolmaydi. clearDraft() import muvaffaqiyatli
// tugaganda yoki owner "Boshqatdan boshlash" bosganda chaqiriladi.
export const loadDraft = () => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveDraft = (state) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
  } catch {
    /* kvota tugasa - jim o'tamiz */
  }
};

export const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* noop */
  }
};

// state o'zgarganda debounce bilan avtosaqlaydi. hasDraft - boshlang'ich
// yuklashda qoramol bor-yo'qligini bildiradi (owner'ga "tiklash"ni taklif qilish).
export const useImportDraft = (state, { enabled = true } = {}) => {
  const [hasDraft] = useState(() => !!loadDraft());
  const timer = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => saveDraft(state), 400);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [state, enabled]);

  return { hasDraft };
};

export default useImportDraft;
