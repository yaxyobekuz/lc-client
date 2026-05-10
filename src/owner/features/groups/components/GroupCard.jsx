// Router
import { Link } from "react-router-dom";

// Components
import Card from "@/shared/components/ui/card/Card";
import Badge from "@/shared/components/ui/badge/Badge";

// Utils
import { formatSchedule } from "@/shared/utils/formatSchedule";
import { formatMoney } from "@/shared/utils/formatMoney";

const GroupCard = ({ group }) => {
  const teachers = (group.teachers || [])
    .map((t) => `${t.firstName} ${t.lastName || ""}`.trim())
    .join(", ");

  return (
    <Link
      to={`/owner/groups/${group._id}`}
      className="block transition hover:shadow-md"
    >
      <Card className="h-full flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base">{group.name}</h3>
          <Badge variant="secondary">{group.studentsCount || 0} talaba</Badge>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <div>
            <span className="font-medium text-foreground">Dars:</span>{" "}
            {formatSchedule(group.schedule)}
          </div>
          <div>
            <span className="font-medium text-foreground">O'qituvchilar:</span>{" "}
            {teachers || "—"}
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
