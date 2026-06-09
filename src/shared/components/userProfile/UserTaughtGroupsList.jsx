import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import Card from "@/shared/components/ui/card/Card";
import GroupScheduleLines from "./GroupScheduleLines";

const UserTaughtGroupsList = ({ groups = [], ownerLinks = false }) => {
  return (
    <Card className="rounded-2xl border-border/60 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-semibold text-foreground">
          <Users className="size-4 text-muted-foreground" />
          Biriktirilgan guruhlar
        </h3>
        {groups.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {groups.length} ta
          </span>
        )}
      </div>

      {groups.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Biriktirilgan guruhlar yo'q
        </p>
      ) : (
        <div className="space-y-2.5">
          {groups.map((g) => (
            <div
              key={g._id}
              className="rounded-xl border border-border/60 p-3.5 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-center justify-between gap-3">
                {ownerLinks ? (
                  <Link
                    to={`/owner/groups/${g._id}`}
                    className="truncate font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {g.name}
                  </Link>
                ) : (
                  <p className="truncate font-semibold text-foreground">
                    {g.name}
                  </p>
                )}
                <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {g.studentsCount || 0} o'quvchi
                </span>
              </div>

              <div className="mt-2.5">
                <GroupScheduleLines schedule={g.schedule} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default UserTaughtGroupsList;
