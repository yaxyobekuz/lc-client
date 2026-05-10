import { useQuery } from "@tanstack/react-query";
import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { qk } from "@/shared/lib/query/keys";
import useAuth from "@/shared/hooks/useAuth";
import { ROLES } from "@/shared/constants/roles";
import { cn } from "@/shared/utils/cn";

const GroupsMultiSelect = ({ value = [], onChange, disabled = false }) => {
  const { role } = useAuth();
  const isTeacher = role === ROLES.TEACHER;

  // Owner: barcha guruhlar; Teacher: faqat o'z guruhlari (myTeach)
  const ownerQ = useQuery({
    queryKey: qk.groups.list({ limit: 200 }),
    queryFn: () =>
      http
        .get(ENDPOINTS.groups.base, { params: { limit: 200 } })
        .then((r) => r.data?.data || []),
    enabled: !isTeacher,
  });
  const teacherQ = useQuery({
    queryKey: qk.groups.myTeach(),
    queryFn: () =>
      http.get(ENDPOINTS.groups.myTeach).then((r) => r.data?.data || []),
    enabled: isTeacher,
  });

  const list = isTeacher ? teacherQ.data || [] : ownerQ.data || [];
  const isLoading = isTeacher ? teacherQ.isLoading : ownerQ.isLoading;

  const toggle = (id) => {
    const set = new Set(value);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    onChange([...set]);
  };

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">Guruhlar yuklanmoqda...</p>
    );
  }
  if (!list.length) {
    return <p className="text-sm text-muted-foreground">Guruhlar topilmadi</p>;
  }

  return (
    <div className="space-y-1 max-h-60 overflow-y-auto border rounded-md p-2">
      {list.map((g) => {
        const checked = value.includes(g._id);
        return (
          <label
            key={g._id}
            className={cn(
              "flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-muted",
              disabled && "opacity-50 cursor-not-allowed",
            )}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => !disabled && toggle(g._id)}
              disabled={disabled}
            />
            <span className="text-sm">{g.name}</span>
          </label>
        );
      })}
    </div>
  );
};

export default GroupsMultiSelect;
