import { Link } from "react-router-dom";
import Card from "@/shared/components/ui/card/Card";

const GroupBreakdownTable = ({ items = [] }) => (
  <Card>
    <h3 className="font-semibold mb-3">Guruhlar bo'yicha statistika</h3>
    {items.length === 0 ? (
      <p className="text-sm text-muted-foreground">Ma'lumot yo'q</p>
    ) : (
      <table className="w-full text-sm">
        <thead className="text-left text-muted-foreground">
          <tr>
            <th className="py-2">Guruh</th>
            <th className="py-2">Jami darslar</th>
            <th className="py-2">Davomat</th>
          </tr>
        </thead>
        <tbody>
          {items.map((g) => (
            <tr key={g.groupId} className="border-t">
              <td className="py-2">
                <Link
                  to={`/owner/groups/${g.groupId}`}
                  className="font-medium hover:underline"
                >
                  {g.name}
                </Link>
              </td>
              <td className="py-2 text-muted-foreground">{g.totalClasses}</td>
              <td className="py-2 font-medium">
                {g.groupRate !== null ? `${g.groupRate}%` : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </Card>
);

export default GroupBreakdownTable;
