import { Link } from "react-router-dom";
import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";

const TopDebtorsTable = ({ items = [] }) => (
  <Card>
    <h3 className="font-semibold mb-3">Eng ko'p qarzdorlar</h3>
    {items.length === 0 ? (
      <p className="text-sm text-muted-foreground">Qarzdorlar yo'q</p>
    ) : (
      <ol className="space-y-2">
        {items.map((d, i) => (
          <li
            key={d.studentId}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex items-center gap-2 min-w-0">
              <span className="text-muted-foreground w-5">{i + 1}.</span>
              <Link
                to={`/owner/users/${d.studentId}`}
                className="font-medium hover:underline truncate"
              >
                {d.firstName} {d.lastName}
              </Link>
            </span>
            <span className="font-medium text-red-600 shrink-0">
              {formatMoney(d.debt)}
            </span>
          </li>
        ))}
      </ol>
    )}
  </Card>
);

export default TopDebtorsTable;
