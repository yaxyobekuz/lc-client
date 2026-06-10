// React
import { useState } from "react";

// Icons
import { Check } from "lucide-react";

// Components
import InputSearch from "@/shared/components/ui/input/InputSearch";

// Hooks
import useUsersListQuery from "@/owner/features/users/hooks/useUsersListQuery";

// Constants
import { ROLES } from "@/shared/constants/roles";

// Utils
import { cn } from "@/shared/utils/cn";

// Guruh uchun BITTA o'qituvchi tanlash. Guruhda ko'pi bilan 1ta o'qituvchi bo'ladi -
// o'qituvchini keyinchalik faqat "Almashtirish" orqali o'zgartirish mumkin.
// `value` - tanlangan o'qituvchi id (string yoki ""), `onChange(id)` - id qaytaradi.
const TeacherSinglePicker = ({ value = "", onChange, disabled = false }) => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useUsersListQuery({
    role: ROLES.TEACHER,
    limit: 100,
  });
  const teachers = data?.data || [];

  const q = search.trim().toLowerCase();
  const filteredTeachers = q
    ? teachers.filter((t) =>
        `${t.firstName} ${t.lastName || ""} ${t.username || ""}`
          .toLowerCase()
          .includes(q),
      )
    : teachers;

  const select = (id) => {
    if (disabled) return;
    // Qayta bosilsa - tanlovni bekor qiladi
    onChange(value === id ? "" : id);
  };

  return (
    <div className="space-y-2">
      {/* Header - schedule paneli bilan bir xil balandlikda */}
      <div className="flex items-center justify-between h-6">
        <label className="text-sm font-medium">
          O'qituvchi <span className="text-red-500">*</span>
        </label>
        <span className="text-xs text-muted-foreground">
          {value ? "1 ta tanlandi" : "Tanlanmagan"}
        </span>
      </div>
      <InputSearch
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="O'qituvchi qidirish..."
        disabled={disabled}
      />
      <div className="border rounded-md overflow-y-auto bg-white min-h-56 max-h-80">
        {isLoading && (
          <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>
        )}
        {!isLoading && teachers.length === 0 && (
          <div className="p-4 text-sm text-muted-foreground">
            O'qituvchilar topilmadi. Avval "Foydalanuvchilar" sahifasida o'qituvchi yarating.
          </div>
        )}
        {!isLoading && teachers.length > 0 && filteredTeachers.length === 0 && (
          <div className="p-4 text-sm text-muted-foreground">
            "{search}" bo'yicha o'qituvchi topilmadi.
          </div>
        )}
        {!isLoading &&
          filteredTeachers.map((t) => {
            const selected = value === t._id;
            return (
              <button
                type="button"
                key={t._id}
                onClick={() => select(t._id)}
                disabled={disabled}
                className={cn(
                  "w-full flex items-center justify-between gap-2 px-3 py-1.5 text-left text-sm border-b last:border-b-0",
                  selected ? "bg-blue-50" : "hover:bg-gray-50",
                )}
              >
                <span>
                  {t.firstName} {t.lastName}
                  <span className="text-muted-foreground ml-2">@{t.username}</span>
                </span>
                {selected && <Check className="size-4 text-blue-600" />}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default TeacherSinglePicker;
