// Icons
import { Trophy, Medal } from "lucide-react";

// Utils
import { cn } from "@/shared/utils/cn";

// Top-3 uchun rang/ikon
const rankStyle = (rank) => {
  if (rank === 1) return { ring: "bg-amber-50 border-amber-200", badge: "bg-amber-400 text-white" };
  if (rank === 2) return { ring: "bg-slate-50 border-slate-200", badge: "bg-slate-400 text-white" };
  if (rank === 3) return { ring: "bg-orange-50 border-orange-200", badge: "bg-orange-400 text-white" };
  return { ring: "bg-white border-gray-100", badge: "bg-gray-100 text-gray-500" };
};

// items: [{ rank, student, point, averageGrade, attendanceRate }]
// highlightStudentId: o'quvchining o'z qatorini ajratib ko'rsatish uchun (ixtiyoriy)
const Leaderboard = ({ items = [], highlightStudentId = null, emptyText = "Ma'lumot yo'q" }) => {
  if (!items.length) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground bg-white">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {items.map((it) => {
        const s = rankStyle(it.rank);
        const isMe =
          highlightStudentId &&
          String(it.student._id) === String(highlightStudentId);
        return (
          <div
            key={it.student._id}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2.5",
              s.ring,
              isMe && "ring-2 ring-sky-400 border-sky-300",
            )}
          >
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold",
                s.badge,
              )}
            >
              {it.rank <= 3 ? (
                it.rank === 1 ? (
                  <Trophy className="size-4" />
                ) : (
                  <Medal className="size-4" />
                )
              ) : (
                it.rank
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">
                {it.student.firstName} {it.student.lastName}
                {isMe && (
                  <span className="ml-2 text-xs font-normal text-sky-600">(siz)</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                Baho: {it.averageGrade ?? "—"} · Davomat:{" "}
                {it.attendanceRate != null ? `${it.attendanceRate}%` : "—"}
              </p>
            </div>

            <span className="shrink-0 text-lg font-semibold tabular-nums">
              {it.point}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                ball
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Leaderboard;
