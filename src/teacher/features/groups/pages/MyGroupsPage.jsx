// Router
import { Link } from "react-router-dom";

// Components
import Card from "@/shared/components/ui/card/Card";
import Badge from "@/shared/components/ui/badge/Badge";

// Hooks
import useMyGroupsQuery from "../hooks/useMyGroupsQuery";

// Utils
import { formatSchedule } from "@/shared/utils/formatSchedule";
import { formatMoney } from "@/shared/utils/formatMoney";

const MyGroupsPage = () => {
  const { data, isLoading } = useMyGroupsQuery();
  const groups = data || [];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Mening guruhlarim</h1>

      {isLoading && (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      )}

      {!isLoading && groups.length === 0 && (
        <div className="border rounded-lg p-12 text-center bg-white">
          <p className="text-muted-foreground">Sizga biriktirilgan guruhlar yo'q</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((g) => (
          <Link
            key={g._id}
            to={`/teacher/groups/${g._id}`}
            className="block transition hover:shadow-md"
          >
            <Card className="h-full flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-base">{g.name}</h3>
                <Badge variant="secondary">{g.studentsCount || 0} o'quvchi</Badge>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>
                  <span className="font-medium text-foreground">Dars:</span>{" "}
                  {formatSchedule(g.schedule)}
                </div>
                <div>
                  <span className="font-medium text-foreground">Oylik narx:</span>{" "}
                  {formatMoney(g.monthlyPrice)}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyGroupsPage;
