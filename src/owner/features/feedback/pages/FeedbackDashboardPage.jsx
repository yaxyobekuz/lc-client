import Card from "@/shared/components/ui/card/Card";
import FeedbackStatusBadge from "../components/FeedbackStatusBadge";
import { useFeedbackStatsQuery } from "../hooks/useFeedbackQueries";

const FeedbackDashboardPage = () => {
  const { data, isLoading } = useFeedbackStatsQuery();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Feedback hisoboti</h1>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card>
              <p className="text-sm text-muted-foreground">Jami</p>
              <p className="text-2xl font-semibold">{data?.total || 0}</p>
            </Card>
            {(data?.byStatus || []).map((s) => (
              <Card key={s._id}>
                <div className="text-sm text-muted-foreground">
                  <FeedbackStatusBadge status={s._id} />
                </div>
                <p className="text-2xl font-semibold">{s.count}</p>
              </Card>
            ))}
          </div>

          <Card className="space-y-3">
            <h3 className="font-semibold">Tur bo'yicha</h3>
            {(!data?.byType || data.byType.length === 0) ? (
              <p className="text-muted-foreground text-sm">Ma'lumot yo'q</p>
            ) : (
              <ul className="space-y-2">
                {data.byType.map((t) => (
                  <li
                    key={String(t.typeId)}
                    className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0"
                  >
                    <span className="text-sm">{t.name || "—"}</span>
                    <span className="font-medium">{t.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default FeedbackDashboardPage;
