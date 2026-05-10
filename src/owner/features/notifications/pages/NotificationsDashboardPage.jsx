import Card from "@/shared/components/ui/card/Card";
import CategoryBadge from "../components/CategoryBadge";
import { useNotificationStatsQuery } from "../hooks/useNotificationDetailQuery";

const StatCard = ({ label, value, hint, valueClass = "" }) => (
  <Card>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className={`text-2xl font-semibold ${valueClass}`}>{value}</p>
    {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
  </Card>
);

const NotificationsDashboardPage = () => {
  const { data, isLoading } = useNotificationStatsQuery();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Bildirishnoma hisoboti</h1>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Jami xabarlar" value={data?.total || 0} />
            <StatCard
              label="Qabul qiluvchilar"
              value={data?.totalRecipients || 0}
            />
            <StatCard
              label="Bot orqali yetkazib berildi"
              value={data?.totalDelivered || 0}
              valueClass="text-blue-600"
            />
            <StatCard
              label="O'qish foizi"
              value={`${data?.readRate || 0}%`}
              hint={`${data?.totalReads || 0} marta`}
              valueClass="text-green-600"
            />
          </div>

          <Card className="space-y-3">
            <h3 className="font-semibold">Kategoriya bo'yicha</h3>
            {(!data?.byCategory || data.byCategory.length === 0) ? (
              <p className="text-muted-foreground text-sm">Ma'lumot yo'q</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="px-3 py-2">Kategoriya</th>
                      <th className="px-3 py-2 text-right">Xabarlar</th>
                      <th className="px-3 py-2 text-right">Qabul qiluvchilar</th>
                      <th className="px-3 py-2 text-right">Bot</th>
                      <th className="px-3 py-2 text-right">O'qilgan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.byCategory.map((c) => (
                      <tr key={String(c._id)} className="border-t">
                        <td className="px-3 py-2">
                          <CategoryBadge category={c._id} />
                        </td>
                        <td className="px-3 py-2 text-right">{c.count}</td>
                        <td className="px-3 py-2 text-right">{c.recipients}</td>
                        <td className="px-3 py-2 text-right text-blue-600">
                          {c.delivered}
                        </td>
                        <td className="px-3 py-2 text-right text-green-700">
                          {c.reads}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default NotificationsDashboardPage;
