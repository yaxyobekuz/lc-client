import { PRESET_COLORS } from "@/shared/constants/lead";
import { cn } from "@/shared/utils/cn";

const ColorPicker = ({ value, onChange, disabled = false }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">Rang</label>
    <div className="flex flex-wrap items-center gap-2">
      {PRESET_COLORS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => !disabled && onChange(c)}
          disabled={disabled}
          className={cn(
            "size-8 rounded-md border-2 transition",
            value === c ? "border-foreground scale-110" : "border-transparent",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          style={{ backgroundColor: c }}
          aria-label={c}
        />
      ))}
      <input
        type="color"
        value={value || "#6366f1"}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="size-8 rounded-md border cursor-pointer"
        title="Maxsus rang"
      />
    </div>
  </div>
);

export default ColorPicker;
