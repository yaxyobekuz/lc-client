// Router
import { Link, useParams } from "react-router-dom";

// Icons
import { ArrowLeft } from "lucide-react";

// Components
import Card from "@/shared/components/ui/card/Card";
import Badge from "@/shared/components/ui/badge/Badge";

// Hooks
import useGroupQuery from "../hooks/useGroupQuery";

// Utils
import { formatSchedule } from "@/shared/utils/formatSchedule";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatPhone } from "@/shared/utils/formatPhone";

const MyGroupDetailPage = () => {
  const { id } = useParams();
  const { data: group, isLoading, isError } = useGroupQuery(id);

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>;
  }

  if (isError || !group) {
    return (
      <div className="p-8 text-center">
        <Link to="/teacher/groups" className="text-blue-600 hover:underline">
          Guruhlar ro'yxatiga qaytish
        </Link>
      </div>
    );
  }

  const students = group.students || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link
          to="/teacher/groups"
          className="size-9 inline-flex items-center justify-center rounded-md border bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-2xl font-semibold">{group.name}</h1>
        <Badge variant="secondary">{students.length} talaba</Badge>
      </div>

      <Card className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Dars jadvali</p>
          <p className="font-medium">{formatSchedule(group.schedule)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Oylik narx</p>
          <p className="font-medium">{formatMoney(group.monthlyPrice)}</p>
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold mb-3">Talabalar</h2>
        {students.length === 0 ? (
          <p className="text-muted-foreground text-sm">Talabalar yo'q</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">Ism familiya</th>
                <th className="px-3 py-2 font-medium">Telefon</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s._id} className="border-t">
                  <td className="px-3 py-2 text-muted-foreground">{i + 1}</td>
                  <td className="px-3 py-2">
                    {s.firstName} {s.lastName}
                  </td>
                  <td className="px-3 py-2">{formatPhone(s.phone) || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default MyGroupDetailPage;
