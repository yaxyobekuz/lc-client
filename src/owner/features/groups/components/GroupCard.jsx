// Router
import { Link } from "react-router-dom";

// Icons
import { Trash2 } from "lucide-react";

// Components
import Card from "@/shared/components/ui/card/Card";
import Badge from "@/shared/components/ui/badge/Badge";

// Hooks
import useModal from "@/shared/hooks/useModal";

// Constants
import { MODAL } from "@/shared/constants/modals";

// Utils
import { sortSchedule, DAY_LABELS_UZ } from "@/shared/utils/formatSchedule";
import { formatMoney } from "@/shared/utils/formatMoney";

const GroupCard = ({ group }) => {
  const { openModal } = useModal();

  const teachers = (group.teachers || [])
    .map((t) => `${t.firstName} ${t.lastName || ""}`.trim())
    .join(", ");

  const schedule = sortSchedule(group.schedule);

  // Link ichidagi tugma — kartani ochmasligi uchun navigatsiyani to'xtatamiz
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(MODAL.GROUP_DELETE, { group });
  };

  return (
    <Link to={`/owner/groups/${group._id}`} className="block group">
      <Card className="h-full flex flex-col gap-3 transition-colors group-hover:border-primary">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base">{group.name}</h3>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="secondary">{group.studentsCount || 0} talaba</Badge>
            <button
              type="button"
              onClick={handleDelete}
              title="O'chirish"
              aria-label="Guruhni o'chirish"
              className="flex items-center justify-center size-8 rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <div className="space-y-1.5">
            <span className="font-medium text-foreground">Dars jadvali:</span>
            {schedule.length ? (
              <div className="flex flex-wrap gap-1.5">
                {schedule.map((s, i) => (
                  <span
                    key={`${s.day}-${i}`}
                    className="inline-flex items-center gap-1 rounded-md border bg-muted/40 px-2 py-0.5 text-xs"
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
            <span className="font-medium text-foreground">O'qituvchilar:</span>{" "}
            {teachers || "-"}
          </div>
          <div>
            <span className="font-medium text-foreground">Oylik narx:</span>{" "}
            {formatMoney(group.monthlyPrice)}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default GroupCard;
