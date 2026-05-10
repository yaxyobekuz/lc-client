import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";

const TopEarnersList = ({ items = [] }) => (
  <Card className="space-y-3">
    <h3 className="font-semibold">Eng yuqori oluvchilar</h3>
    {items.length === 0 ? (
      <p className="text-muted-foreground text-sm">Ma'lumot yo'q</p>
    ) : (
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li
            key={String(it.teacherId)}
            className="flex items-center justify-between gap-2"
          >
            <span className="text-sm">
              <span className="text-muted-foreground mr-2">{i + 1}.</span>
              {it.firstName} {it.lastName}
            </span>
            <span className="font-medium text-sm">
              {formatMoney(it.total)}{" "}
              <span className="text-xs text-muted-foreground">
                ({it.count} oylik)
              </span>
            </span>
          </li>
        ))}
      </ul>
    )}
  </Card>
);

export default TopEarnersList;
