import * as React from "react";

// Utils
import { cn } from "@/shared/utils/cn.js";

/**
 * TimeInput — 24 soatlik vaqt kiritish (soat : daqiqa).
 *
 * - Faqat raqam qabul qiladi, soat 0–23, daqiqa 0–59 oralig'ida cheklanadi.
 * - Soat to'lganda (2 ta raqam yoki 2-dan katta raqam) fokus avtomatik daqiqaga o'tadi.
 * - Daqiqa to'lganda fokus `onComplete` orqali keyingi maydonga uzatiladi.
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
  "h-9 w-11 rounded-[2px] border border-input bg-white px-1 text-center text-sm outline-2 outline-primary outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50";

const TimeInput = React.forwardRef(function TimeInput(
  { value, onChange, disabled = false, onComplete, className },
  ref,
) {
  const minuteRef = React.useRef(null);

  const parts = (value || "").split(":");
  const h = parts[0] ? Number(parts[0]) : "";
  const m = parts[1] ? Number(parts[1]) : "";

  const compose = (hh, mm) =>
    `${pad2(hh === "" ? 0 : hh)}:${pad2(mm === "" ? 0 : mm)}`;

  const onH = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 2);
    const hh = clampNum(raw, 23);
    onChange(compose(hh, m));
    // 2 ta raqam kiritildi yoki birinchi raqamning o'zi 2-dan katta (masalan 5 → 05) —
    // soatni boshqa raqam to'ldira olmaydi, shuning uchun fokusni daqiqaga o'tkazamiz.
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

  // Daqiqada Backspace bo'sh maydonda bosilsa — soatga qaytamiz.
  const onMKeyDown = (e) => {
    if (e.key === "Backspace" && (m === "" || e.target.value === "")) {
      e.currentTarget.previousElementSibling?.previousElementSibling?.focus?.();
    }
  };

  return (
    <div ref={ref} className={cn("flex items-center gap-1", className)}>
      <input
        inputMode="numeric"
        maxLength={2}
        placeholder="00"
        aria-label="Soat"
        value={h}
        onChange={onH}
        onFocus={(e) => e.target.select()}
        disabled={disabled}
        className={cellClasses}
      />
      <span className="text-sm text-muted-foreground">:</span>
      <input
        ref={minuteRef}
        inputMode="numeric"
        maxLength={2}
        placeholder="00"
        aria-label="Daqiqa"
        value={m}
        onChange={onM}
        onKeyDown={onMKeyDown}
        onFocus={(e) => e.target.select()}
        disabled={disabled}
        className={cellClasses}
      />
    </div>
  );
});

export default TimeInput;
