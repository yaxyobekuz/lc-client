// Router
import { Link } from "react-router-dom";

// Components
import Card from "@/shared/components/ui/card/Card";
import Badge from "@/shared/components/ui/badge/Badge";

// Utils
import { sortSchedule, DAY_LABELS_UZ } from "@/shared/utils/formatSchedule";
import { formatMoney } from "@/shared/utils/formatMoney";

const GroupCard = ({ group }) => {
  const teachers = (group.teachers || [])
    .map((t) => `${t.firstName} ${t.lastName || ""}`.trim())
    .join(", ");

  const schedule = sortSchedule(group.schedule);

  return (
    <Link to={`/owner/groups/${group._id}`} className="block group">
      <Card className="h-full flex flex-col gap-3 transition-colors group-hover:border-primary">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base">{group.name}</h3>
          <Badge variant="secondary">{group.studentsCount || 0} talaba</Badge>
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
