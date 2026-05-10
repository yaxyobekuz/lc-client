import { Link } from "react-router-dom";
import Card from "@/shared/components/ui/card/Card";
import Badge from "@/shared/components/ui/badge/Badge";
import { formatSchedule } from "@/shared/utils/formatSchedule";
import { formatMoney } from "@/shared/utils/formatMoney";

const UserTaughtGroupsList = ({ groups = [], ownerLinks = false }) => {
  return (
    <Card>
      <h3 className="font-semibold mb-3">Biriktirilgan guruhlar</h3>
      {groups.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Biriktirilgan guruhlar yo'q
        </p>
      ) : (
        <div className="space-y-2">
          {groups.map((g) => (
            <div
              key={g._id}
              className="flex items-start justify-between gap-3 p-3 border rounded-lg"
            >
              <div className="min-w-0 flex-1">
                {ownerLinks ? (
                  <Link
                    to={`/owner/groups/${g._id}`}
                    className="font-medium hover:underline"
                  >
                    {g.name}
                  </Link>
                ) : (
                  <p className="font-medium">{g.name}</p>
                )}
                <p className="text-sm text-muted-foreground mt-0.5">
                  {formatSchedule(g.schedule)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatMoney(g.monthlyPrice)}
                </p>
              </div>
              <Badge variant="secondary" className="shrink-0">
                {g.studentsCount || 0} talaba
              </Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default UserTaughtGroupsList;
