import { Link } from "react-router-dom";
import Card from "@/shared/components/ui/card/Card";

const LowAttendanceList = ({ items = [], threshold }) => (
  <Card>
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold">Past davomatli talabalar</h3>
      <span className="text-xs text-muted-foreground">
        Threshold: {threshold}%
      </span>
    </div>
    {items.length === 0 ? (
      <p className="text-sm text-muted-foreground">
        Past davomatli talabalar yo'q
      </p>
    ) : (
      <ol className="space-y-2">
        {items.map((s, i) => (
          <li
            key={s.student._id}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex items-center gap-2 min-w-0">
              <span className="text-muted-foreground w-5">{i + 1}.</span>
              <Link
                to={`/owner/users/${s.student._id}`}
                className="font-medium hover:underline truncate"
              >
                {s.student.firstName} {s.student.lastName}
              </Link>
            </span>
            <span className="font-medium text-red-600 shrink-0">
              {s.rate !== null ? `${s.rate}%` : "—"}
            </span>
          </li>
        ))}
      </ol>
    )}
  </Card>
);

export default LowAttendanceList;
