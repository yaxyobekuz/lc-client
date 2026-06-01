// Router
import { useParams } from "react-router-dom";

// Icons
import { ArrowLeft } from "lucide-react";

// Components
import Card from "@/shared/components/ui/card/Card";
import Badge from "@/shared/components/ui/badge/Badge";

// Hooks
import useGoBack from "@/shared/hooks/useGoBack";
import useGroupQuery from "../hooks/useGroupQuery";

// Components
import ScheduleCards from "@/shared/components/schedule/ScheduleCards";

// Utils
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatPhone } from "@/shared/utils/formatPhone";

const MyGroupDetailPage = () => {
  const { id } = useParams();
  const goBack = useGoBack("/teacher/groups");
  const { data: group, isLoading, isError } = useGroupQuery(id);

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>;
  }

  if (isError || !group) {
    return (
      <div className="p-8 text-center">
        <button
          type="button"
          onClick={goBack}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Guruhlar ro'yxatiga qaytish
        </button>
      </div>
    );
  }

  const students = group.students || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goBack}
          className="size-9 inline-flex items-center justify-center rounded-md border bg-white hover:bg-gray-50 cursor-pointer"
        >
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="text-2xl font-semibold">{group.name}</h1>
        <Badge variant="secondary">{students.length} o'quvchi</Badge>
      </div>

      <Card className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Dars jadvali
          </p>
          <ScheduleCards schedule={group.schedule} />
        </div>
        <div className="border-t border-border/60 pt-3">
          <p className="text-xs text-muted-foreground">Oylik narx</p>
          <p className="font-medium">{formatMoney(group.monthlyPrice)}</p>
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold mb-3">O'quvchilar</h2>
        {students.length === 0 ? (
          <p className="text-muted-foreground text-sm">O'quvchilar yo'q</p>
        ) : (
          <table className="w-full text-sm">
            <thead className=" text-left">
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
                  <td className="px-3 py-2">{formatPhone(s.phone) || "-"}</td>
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
