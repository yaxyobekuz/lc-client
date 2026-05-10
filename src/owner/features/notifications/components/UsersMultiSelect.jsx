import { useState } from "react";
import useUsersListQuery from "@/owner/features/users/hooks/useUsersListQuery";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import { ROLES } from "@/shared/constants/roles";
import { cn } from "@/shared/utils/cn";

const ROLE_OPTIONS = [
  { value: ROLES.STUDENT, label: "Talabalar" },
  { value: ROLES.TEACHER, label: "O'qituvchilar" },
];

const UsersMultiSelect = ({
  value = [],
  onChange,
  disabled = false,
  defaultRole = ROLES.STUDENT,
}) => {
  const [role, setRole] = useState(defaultRole);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useUsersListQuery({
    role,
    search: search || undefined,
    limit: 100,
  });
  const list = data?.data || [];

  const toggle = (id) => {
    const set = new Set(value);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    onChange([...set]);
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <SelectField
          label="Rol"
          value={role}
          onChange={setRole}
          options={ROLE_OPTIONS}
          disabled={disabled}
        />
        <InputField
          name="search"
          label="Qidirish"
          placeholder="Ism yoki telefon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={disabled}
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Yuklanmoqda...</p>
      ) : list.length === 0 ? (
        <p className="text-sm text-muted-foreground">Foydalanuvchi topilmadi</p>
      ) : (
        <div className="space-y-1 max-h-60 overflow-y-auto border rounded-md p-2">
          {list.map((u) => {
            const checked = value.includes(u._id);
            return (
              <label
                key={u._id}
                className={cn(
                  "flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-muted",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => !disabled && toggle(u._id)}
                  disabled={disabled}
                />
                <span className="text-sm">
                  {u.firstName} {u.lastName}
                  {u.phone && (
                    <span className="text-xs text-muted-foreground ml-1">
                      {u.phone}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      )}

      {value.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Tanlangan: {value.length} ta
        </p>
      )}
    </div>
  );
};

export default UsersMultiSelect;
