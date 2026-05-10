import Card from "@/shared/components/ui/card/Card";
import SalaryCard from "../components/SalaryCard";
import SalaryHistoryItem from "../components/SalaryHistoryItem";
import useMyCurrentSalaryQuery from "../hooks/useMyCurrentSalaryQuery";
import useMySalariesHistoryQuery from "../hooks/useMySalariesHistoryQuery";

const MySalariesPage = () => {
  const { data: current, isLoading: curLoading } = useMyCurrentSalaryQuery();
  const { data: history, isLoading: histLoading } = useMySalariesHistoryQuery({
    limit: 24,
  });

  const items = history?.data || [];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Mening maoshlarim</h1>

      {curLoading ? (
        <div className="p-4 text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <SalaryCard salary={current?.salary} period={current?.period} />
      )}

      <Card className="space-y-3">
        <h2 className="font-semibold">Tarix</h2>
        {histLoading ? (
          <div className="p-4 text-sm text-muted-foreground">
            Yuklanmoqda...
          </div>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Tarix bo'sh
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((s) => (
              <SalaryHistoryItem key={String(s._id)} salary={s} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default MySalariesPage;
