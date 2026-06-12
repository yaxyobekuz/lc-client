import * as React from "react";

// Utils
import { cn } from "@/shared/utils/cn.js";

/**
 * TimeInput - bitta maydonda 24 soatlik vaqt kiritish ("HH:mm").
 *
 * - Foydalanuvchi shunchaki raqam yozadi: "1400" -> "14:00" (":" avtomatik qo'yiladi).
 * - Faqat raqam qabul qiladi, eng ko'pi 4 ta (HHmm).
 * - Maydondan chiqilganda ("blur") qiymat to'g'rilanadi: soat 0–23, daqiqa 0–59
 *   chegarasiga keltiriladi va "HH:mm" ko'rinishida to'ldiriladi (masalan "9:5" -> "09:05").
 * - ↑ / ↓ strelkalar bilan daqiqani 5 ga oshirish/kamaytirish mumkin.
 * - 4 ta raqam to'lganda fokus `onComplete` orqali keyingi maydonga uzatiladi.
 * - "HH:mm" matn ko'rinishida qiymat chiqaradi (masalan "14:00").
 *
 * @param {string}   value       "HH:mm" ko'rinishidagi qiymat
 * @param {Function} onChange    (next: "HH:mm") => void
 * @param {boolean}  disabled
 * @param {Function} onComplete  vaqt to'liq kiritilganda chaqiriladi (keyingi inputga focus berish uchun)
 */

const pad2 = (n) => String(n).padStart(2, "0");

// Xom raqamlardan ("1400") ko'rsatiladigan matn yasaydi ("14:00").
// Hali yozilayotgan bo'lsa, qisman ko'rinadi: "1" -> "1", "14" -> "14:", "143" -> "14:3".
const formatDigits = (digits) => {
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
};

// "HH:mm" qiymatdan xom raqamlarni ajratib oladi ("14:00" -> "1400").
const valueToDigits = (val) => (val || "").replace(/\D/g, "").slice(0, 4);

// Xom raqamlarni to'g'rilab "HH:mm" ga keltiradi (soat 0–23, daqiqa 0–59).
const normalize = (digits) => {
  if (!digits) return "";
  let h;
  let m;
  if (digits.length <= 2) {
    h = Number(digits);
    m = 0;
  } else {
    h = Number(digits.slice(0, 2));
    m = Number(digits.slice(2, 4));
  }
  if (h > 23) h = 23;
  if (m > 59) m = 59;
  return `${pad2(h)}:${pad2(m)}`;
};

const inputClasses =
  "h-9 w-full rounded-md border border-input bg-white px-2 text-center text-sm tabular-nums outline-2 outline-primary outline-offset-0 focus:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50";

const TimeInput = React.forwardRef(function TimeInput(
  { value, onChange, disabled = false, onComplete, className },
  ref,
) {
  // Fokuslangan paytda foydalanuvchi yozayotgan xom raqamlar; aks holda null
  // bo'lib, ko'rsatiladigan matn `value` dan olinadi.
  const [draft, setDraft] = React.useState(null);

  const display =
    draft != null ? formatDigits(draft) : formatDigits(valueToDigits(value));

  const commit = (digits) => onChange(normalize(digits));

  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    setDraft(digits);
    commit(digits);
    if (digits.length === 4) onComplete?.();
  };

  // ↑/↓ - daqiqani 5 ga o'zgartiradi (qiymatni umumiy daqiqaga aylantirib).
  const step = (delta) => {
    const digits = draft != null ? draft : valueToDigits(value);
    let h = 0;
    let m = 0;
    if (digits.length <= 2) h = Number(digits || 0);
    else {
      h = Number(digits.slice(0, 2));
      m = Number(digits.slice(2, 4));
    }
    let total = (((h * 60 + m) + delta) % 1440 + 1440) % 1440;
    const next = `${pad2(Math.floor(total / 60))}:${pad2(total % 60)}`;
    setDraft(valueToDigits(next));
    onChange(next);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      step(5);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      step(-5);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const digits = draft != null ? draft : valueToDigits(value);
      commit(digits);
      onComplete?.();
    }
  };

  return (
    <input
      ref={ref}
      inputMode="numeric"
      maxLength={5}
      placeholder="00:00"
      aria-label="Vaqt"
      value={display}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={(e) => {
        setDraft(valueToDigits(value));
        e.target.select();
      }}
      onBlur={() => {
        const digits = draft != null ? draft : valueToDigits(value);
        commit(digits);
        setDraft(null);
      }}
      disabled={disabled}
      className={cn(inputClasses, className)}
    />
  );
});

export default TimeInput;
