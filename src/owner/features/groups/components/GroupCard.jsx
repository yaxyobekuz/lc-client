// Router
import { Link } from "react-router-dom";

// Icons
import { Trash2, RotateCcw, Archive } from "lucide-react";

// Components
import Card from "@/shared/components/ui/card/Card";
import Badge from "@/shared/components/ui/badge/Badge";

// Hooks
import useModal from "@/shared/hooks/useModal";
import useGroupRestoreMutation from "../hooks/useGroupRestoreMutation";

// Constants
import { MODAL } from "@/shared/constants/modals";

// Utils
import { sortSchedule, DAY_LABELS_UZ } from "@/shared/utils/formatSchedule";

const GroupCard = ({ group, archived = false }) => {
  const { openModal } = useModal();
  const { mutate: restore, isPending: isRestoring } = useGroupRestoreMutation();

  const teachers = (group.teachers || [])
    .map((t) => `${t.firstName} ${t.lastName || ""}`.trim())
    .join(", ");

  const schedule = sortSchedule(group.schedule);

  // Link ichidagi tugma - kartani ochmasligi uchun navigatsiyani to'xtatamiz
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(MODAL.GROUP_DELETE, { group });
  };

  const handleRestore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    restore(group._id);
  };

  return (
    <Link to={`/owner/groups/${group._id}`} className="block group">
      <Card className="h-full flex flex-col gap-3 transition-colors group-hover:border-primary">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base">{group.name}</h3>
          {archived ? (
            <button
              type="button"
              onClick={handleRestore}
              disabled={isRestoring}
              title="Tiklash"
              aria-label="Guruhni tiklash"
              className="flex items-center justify-center size-8 rounded-md text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors disabled:opacity-50"
            >
              <RotateCcw className="size-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDelete}
              title="Arxivlash"
              aria-label="Guruhni arxivlash"
              className="flex items-center justify-center size-8 rounded-md text-gray-400 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
            >
              <Archive className="size-4" />
            </button>
          )}
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <div className="space-y-1.5">
            {schedule.length ? (
              <div className="flex flex-wrap gap-1.5">
                {schedule.map((s, i) => (
                  <span
                    key={`${s.day}-${i}`}
                    className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-0.5 text-xs"
                  >
                    <span className="font-medium text-foreground">
                      {DAY_LABELS_UZ[s.day] || s.day}
                    </span>
                    <span>
                      {s.startTime}–{s.endTime}
                    </span>
                  </span>
                ))}
              </div>
            ) : (
              <span> -</span>
            )}
          </div>

          <div>
            <span className="font-medium text-foreground">O'qituvchi:</span>{" "}
            {teachers || "-"}
          </div>

          <div>
            <span className="font-medium text-foreground">O'quvchilar:</span>{" "}
            {group.studentsCount || 0} ta
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default GroupCard;
