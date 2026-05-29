import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import { Skeleton } from "@/shared/components/shadcn/skeleton";

const ROW_SKELETON_COUNT = 6;

const GroupBreakdownTable = ({ items = [], isLoading = false }) => (
  <div className="border rounded-md overflow-hidden bg-white">
    <div className="px-4 py-3 border-b bg-gray-50">
      <h3 className="font-semibold text-base">Guruhlar bo'yicha statistika</h3>
    </div>

    {isLoading ? (
      <div className="p-4 space-y-2">
        {Array.from({ length: ROW_SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 items-center py-1">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-12" />
          </div>
        ))}
      </div>
    ) : items.length === 0 ? (
      <div className="px-4 py-12 text-center">
        <BarChart3 className="size-10 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm font-medium">Statistika mavjud emas</p>
        <p className="text-xs text-muted-foreground mt-1">
          Tanlangan davr uchun guruhlar bo'yicha ma'lumot topilmadi
        </p>
      </div>
    ) : (
      <div className="max-h-[600px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-gray-50 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-4 py-3 font-semibold">Guruh</th>
              <th className="px-4 py-3 font-semibold">Jami darslar</th>
              <th className="px-4 py-3 font-semibold">Davomat</th>
            </tr>
          </thead>
          <tbody>
            {items.map((g) => (
              <tr key={g.groupId} className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Link
                    to={`/owner/groups/${g.groupId}`}
                    className="font-medium hover:underline"
                  >
                    {g.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{g.totalClasses}</td>
                <td className="px-4 py-3 font-medium">
                  {g.groupRate !== null ? `${g.groupRate}%` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default GroupBreakdownTable;
