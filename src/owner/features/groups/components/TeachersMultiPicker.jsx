// Icons
import { Check } from "lucide-react";

// Hooks
import useUsersListQuery from "@/owner/features/users/hooks/useUsersListQuery";

// Constants
import { ROLES } from "@/shared/constants/roles";

// Utils
import { cn } from "@/shared/utils/cn";

const TeachersMultiPicker = ({ value = [], onChange, disabled = false }) => {
  const { data, isLoading } = useUsersListQuery({
    role: ROLES.TEACHER,
    limit: 100,
  });
  const teachers = data?.data || [];

  const toggle = (id) => {
    if (disabled) return;
    const exists = value.includes(id);
    onChange(exists ? value.filter((v) => v !== id) : [...value, id]);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">O'qituvchilar</label>
      <div className="border rounded-lg max-h-48 overflow-y-auto bg-white">
        {isLoading && (
          <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>
        )}
        {!isLoading && teachers.length === 0 && (
          <div className="p-4 text-sm text-muted-foreground">
            O'qituvchilar topilmadi. Avval "Foydalanuvchilar" sahifasida o'qituvchi yarating.
          </div>
        )}
        {!isLoading &&
          teachers.map((t) => {
            const selected = value.includes(t._id);
            return (
              <button
                type="button"
                key={t._id}
                onClick={() => toggle(t._id)}
                disabled={disabled}
                className={cn(
                  "w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-sm border-b last:border-b-0",
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

export default TeachersMultiPicker;
