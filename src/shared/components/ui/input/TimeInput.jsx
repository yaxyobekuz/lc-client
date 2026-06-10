import * as React from "react";

// Utils
import { cn } from "@/shared/utils/cn.js";

/**
 * TimeInput - 24 soatlik vaqt kiritish (soat : daqiqa).
 *
 * - Faqat raqam qabul qiladi, soat 0–23, daqiqa 0–59 oralig'ida cheklanadi.
 * - Soat to'lganda (2 ta raqam, 2-dan katta raqam yoki ":" bosilganda) fokus daqiqaga o'tadi.
 * - Daqiqa to'lganda fokus `onComplete` orqali keyingi maydonga uzatiladi.
 * - Maydondan chiqilganda qiymat "00" kabi 2 xonaga to'ldirib ko'rsatiladi (14 : 00).
 * - ↑ / ↓ strelkalar bilan qiymatni 1 ga oshirish/kamaytirish mumkin.
 * - "HH:mm" matn ko'rinishida qiymat chiqaradi (masalan "14:00").
 *
 * @param {string}   value       "HH:mm" ko'rinishidagi qiymat
 * @param {Function} onChange    (next: "HH:mm") => void
 * @param {boolean}  disabled
 * @param {Function} onComplete  daqiqa to'liq kiritilganda chaqiriladi (keyingi inputga focus berish uchun)
 */

const pad2 = (n) => String(n).padStart(2, "0");

const clampNum = (raw, max) => {
  if (raw === "") return "";
  let n = Number(raw);
  if (Number.isNaN(n)) return "";
  if (n < 0) n = 0;
  if (n > max) n = max;
  return n;
};

const cellClasses =
  "h-9 w-12 rounded-[2px] border border-input bg-white px-1 text-center text-sm tabular-nums outline-2 outline-primary outline-offset-0 focus:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50";

const TimeInput = React.forwardRef(function TimeInput(
  { value, onChange, disabled = false, onComplete, className },
  ref,
) {
  const hourRef = React.useRef(null);
  const minuteRef = React.useRef(null);
  // Qaysi maydon hozir tahrirlanmoqda - fokuslangan maydon xom (nol bilan
  // to'ldirilmagan) ko'rinadi, qolganlari "00" kabi 2 xonali ko'rsatiladi.
  const [editing, setEditing] = React.useState(null);

  const parts = (value || "").split(":");
  const h = parts[0] === "" || parts[0] == null ? "" : Number(parts[0]);
  const m = parts[1] === "" || parts[1] == null ? "" : Number(parts[1]);

  const compose = (hh, mm) =>
    `${pad2(hh === "" ? 0 : hh)}:${pad2(mm === "" ? 0 : mm)}`;

  // Ko'rsatiladigan matn: tahrirlanayotgan maydon xom, aks holda 2 xonali.
  const display = (val, field) => {
    if (val === "") return "";
    return editing === field ? String(val) : pad2(val);
  };

  const onH = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 2);
    const hh = clampNum(raw, 23);
    onChange(compose(hh, m));
    const filled = raw.length >= 2 || (raw.length === 1 && Number(raw) > 2);
    if (filled) minuteRef.current?.focus();
  };

  const onM = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 2);
    const mm = clampNum(raw, 59);
    onChange(compose(h, mm));
    const filled = raw.length >= 2 || (raw.length === 1 && Number(raw) > 5);
    if (filled) onComplete?.();
  };

  // ↑/↓ bilan qiymatni o'zgartirish; ":" yoki "Enter" bosilsa daqiqaga o'tish.
  const step = (field, delta) => {
    if (field === "h") {
      const next = (((h === "" ? 0 : h) + delta) + 24) % 24;
      onChange(compose(next, m));
    } else {
      const next = (((m === "" ? 0 : m) + delta) + 60) % 60;
      onChange(compose(h, next));
    }
  };

  const onHKeyDown = (e) => {
    if (e.key === "ArrowUp") { e.preventDefault(); step("h", 1); }
    else if (e.key === "ArrowDown") { e.preventDefault(); step("h", -1); }
    else if (e.key === ":" || e.key === "Enter") {
      e.preventDefault();
      minuteRef.current?.focus();
    }
  };

  const onMKeyDown = (e) => {
    if (e.key === "ArrowUp") { e.preventDefault(); step("m", 1); }
    else if (e.key === "ArrowDown") { e.preventDefault(); step("m", -1); }
    // Bo'sh maydonda Backspace - soatga qaytish.
    else if (e.key === "Backspace" && e.target.value === "") {
      hourRef.current?.focus();
    }
  };

  return (
    <div ref={ref} className={cn("flex items-center gap-1", className)}>
      <input
        ref={hourRef}
        inputMode="numeric"
        maxLength={2}
        placeholder="00"
        aria-label="Soat"
        value={display(h, "h")}
        onChange={onH}
        onKeyDown={onHKeyDown}
        onFocus={(e) => { setEditing("h"); e.target.select(); }}
        onBlur={() => setEditing(null)}
        disabled={disabled}
        className={cellClasses}
      />
      <span className="text-sm font-medium text-muted-foreground">:</span>
      <input
        ref={minuteRef}
        inputMode="numeric"
        maxLength={2}
        placeholder="00"
        aria-label="Daqiqa"
        value={display(m, "m")}
        onChange={onM}
        onKeyDown={onMKeyDown}
        onFocus={(e) => { setEditing("m"); e.target.select(); }}
        onBlur={() => setEditing(null)}
        disabled={disabled}
        className={cellClasses}
      />
    </div>
  );
});

export default TimeInput;
