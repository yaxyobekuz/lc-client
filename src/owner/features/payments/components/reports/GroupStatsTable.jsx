import { Link } from "react-router-dom";
import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";

const GroupStatsTable = ({ items = [] }) => {
  return (
    <Card>
      <h3 className="font-semibold mb-3">Guruhlar bo'yicha statistika</h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Ma'lumot yo'q</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr>
                <th className="py-2">Guruh</th>
                <th className="py-2">Reja</th>
                <th className="py-2">Yig'ilgan</th>
                <th className="py-2">Qoldiq</th>
                <th className="py-2">To'lagan</th>
                <th className="py-2">%</th>
              </tr>
            </thead>
            <tbody>
              {items.map((g) => (
                <tr key={g.groupId} className="border-t">
                  <td className="py-2 font-medium">
                    <Link
                      to={`/owner/groups/${g.groupId}`}
                      className="hover:underline"
                    >
                      {g.name}
                    </Link>
                  </td>
                  <td className="py-2">{formatMoney(g.planned)}</td>
                  <td className="py-2 text-emerald-600">{formatMoney(g.collected)}</td>
                  <td className="py-2 text-rose-500">{formatMoney(g.outstanding)}</td>
                  <td className="py-2">
                    {g.paidStudents}/{g.totalStudents}
                  </td>
                  <td className="py-2 font-medium">{g.percent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default GroupStatsTable;
