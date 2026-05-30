import Card from "@/shared/components/ui/card/Card";
import { useTopDebtorsQuery, useDailyCollectionsQuery } from "../../hooks/useReportsQueries";
import DebtorsTable from "../DebtorsTable";
import { formatMoney } from "@/shared/utils/formatMoney";
import { toDateInput } from "@/shared/utils/formatDate";

const CurrentMonthTab = () => {
  const { data: debtors = [] } = useTopDebtorsQuery({ limit: 30 });
  const { data: today } = useDailyCollectionsQuery({
    date: toDateInput(new Date()),
  });

  return (
    <div className="space-y-4 pt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card>
          <p className="text-sm text-muted-foreground">Bugun yig'ilgan</p>
          <p className="text-2xl font-semibold text-green-600">
            {formatMoney(today?.total || 0)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {today?.paymentsCount || 0} ta to'lov
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Jami qarz</p>
          <p className="text-2xl font-semibold text-rose-500">
            {formatMoney(debtors.reduce((s, d) => s + d.debt, 0))}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {debtors.length} ta qarzdor
          </p>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Qarzdorlar ro'yxati</h2>
        <DebtorsTable items={debtors} />
      </div>
    </div>
  );
};

export default CurrentMonthTab;
