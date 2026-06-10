import { TrendingUp, TriangleAlert, Tag, Wallet } from "lucide-react";
import StatCard from "@/shared/components/ui/card/StatCard";

const StatCards = ({ totals = {}, byMethod = {} }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <StatCard
      label="Umumiy kirim"
      value={totals.income || 0}
      isMoney
      icon={TrendingUp}
      tone="positive"
      hint={`Naqd ${(byMethod.cash || 0).toLocaleString("uz-UZ")} • Karta ${(byMethod.card || 0).toLocaleString("uz-UZ")}`}
    />
    <StatCard
      label="Umumiy qarzdorlik"
      value={totals.debt || 0}
      isMoney
      icon={TriangleAlert}
      tone="negative"
    />
    <StatCard
      label="Chegirmalar qiymati"
      value={totals.discountValue || 0}
      isMoney
      icon={Tag}
      tone="warn"
      hint={`${totals.discountedCount || 0} ta o'quvchi`}
    />
    <StatCard
      label="To'langan to'lovlar"
      value={totals.paidCount || 0}
      icon={Wallet}
      tone="info"
      suffix={` / ${totals.paymentsCount || 0}`}
    />
  </div>
);

export default StatCards;
