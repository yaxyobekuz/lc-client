import { Link } from "react-router-dom";
import Card from "@/shared/components/ui/card/Card";

const TopAbsentList = ({ items = [] }) => (
  <Card>
    <h3 className="font-semibold mb-3">Eng ko'p kelmaganlar</h3>
    {items.length === 0 ? (
      <p className="text-sm text-muted-foreground">Ma'lumot yo'q</p>
    ) : (
      <ol className="space-y-2">
        {items.map((s, i) => (
          <li
            key={s.student._id}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex items-center gap-2 min-w-0">
              <span className="text-muted-foreground w-5">{i + 1}.</span>
              <Link
                to={`/owner/users/${s.student._id}`}
                className="font-medium hover:underline truncate"
              >
                {s.student.firstName} {s.student.lastName}
              </Link>
            </span>
            <span className="font-medium text-red-600 shrink-0">{s.absent} ta</span>
          </li>
        ))}
      </ol>
    )}
  </Card>
);

export default TopAbsentList;
