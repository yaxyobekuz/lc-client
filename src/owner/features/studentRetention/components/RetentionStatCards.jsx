import { UserMinus, Clock, BarChart3 } from "lucide-react";
import StatCard from "@/shared/components/ui/card/StatCard";
import { formatMonths } from "../utils/formatMonths";

const RetentionStatCards = ({ data }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        icon={UserMinus}
        label="Jami chiqib ketgan"
        value={data.totalChurned}
        tone="negative"
        hint="Tanlangan davrda guruhdan chiqarilgan"
      />
      <StatCard
        icon={Clock}
        label="O'rtacha o'qish muddati"
        value={data.avgDurationMonths}
        suffix=" oy"
        tone="warn"
        hint={`Chiqishdan oldin: ${formatMonths(data.avgDurationMonths)}`}
      />
      <StatCard
        icon={BarChart3}
        label="Median muddat"
        value={data.medianDurationMonths}
        suffix=" oy"
        tone="info"
        hint={`Yarmidan ko'pi: ${formatMonths(data.medianDurationMonths)}`}
      />
    </div>
  );
};

export default RetentionStatCards;
