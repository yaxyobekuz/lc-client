import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";

const SalaryStatsCards = ({ data }) => {
  if (!data) return null;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <Card>
        <p className="text-sm text-muted-foreground">Umumiy hisoblangan</p>
        <p className="text-2xl font-semibold text-blue-600">
          {formatMoney(data.totalFinal || 0)}
        </p>
      </Card>
      <Card>
        <p className="text-sm text-muted-foreground">Jami to'langan</p>
        <p className="text-2xl font-semibold text-green-600">
          {formatMoney(data.totalPaid || 0)}
        </p>
      </Card>
      <Card>
        <p className="text-sm text-muted-foreground">Qoldiq</p>
        <p className="text-2xl font-semibold text-amber-600">
          {formatMoney(data.totalUnpaid || 0)}
        </p>
      </Card>
      <Card>
        <p className="text-sm text-muted-foreground">O'qituvchilar (oylik)</p>
        <p className="text-2xl font-semibold">{data.salariesCount || 0}</p>
      </Card>
    </div>
  );
};

export default SalaryStatsCards;
