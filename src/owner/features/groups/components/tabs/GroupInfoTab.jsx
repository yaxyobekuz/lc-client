// Icons
import { RefreshCw } from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";
import Card from "@/shared/components/ui/card/Card";
import GroupStatsPanel from "../GroupStatsPanel";

// Hooks
import useModal from "@/shared/hooks/useModal";

// Constants
import { MODAL } from "@/shared/constants/modals";

// Utils
import { DAY_LABELS_FULL_UZ, sortSchedule } from "@/shared/utils/formatSchedule";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";

// Guruh "Ma'lumot" tab'i: O'qituvchilar, Oylik narx, Dars jadvali + statistika
// (To'lov, Davomat, Baho) kartalari. Avval sahifa boshida turardi, endi tab ichida.
const GroupInfoTab = ({ group }) => {
  const { openModal } = useModal();

  const teachers = group.teachers || [];
  const isFinished = group.status === "finished";

  return (
    <div className="space-y-4 pt-3">
      {(group.startDate || group.durationMonths) && (
        <p className="text-sm text-muted-foreground">
          {group.startDate && `Boshlanish: ${formatDateUz(group.startDate)}`}
          {group.startDate && group.durationMonths ? " · " : ""}
          {group.durationMonths ? `Davomiylik: ${group.durationMonths} oy` : ""}
          {isFinished && group.finishedAt
            ? ` · Yakunlandi: ${formatDateUz(group.finishedAt)}`
            : ""}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs text-muted-foreground mb-2">O'qituvchilar</p>
          {teachers.length === 0 ? (
            <p className="font-medium">-</p>
          ) : (
            <div className="space-y-1">
              {teachers.map((t) => (
                <div
                  key={t._id}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="font-medium">
                    {t.firstName} {t.lastName || ""}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    onClick={() =>
                      openModal(MODAL.GROUP_REPLACE_TEACHER, {
                        group,
                        teacher: t,
                      })
                    }
                  >
                    <RefreshCw className="size-3.5" />
                    Almashtirish
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card>
          <p className="text-xs text-muted-foreground mb-2">Oylik narx</p>
          <p className="font-medium">{formatMoney(group.monthlyPrice)}</p>
        </Card>
        <Card>
          <p className="text-xs text-muted-foreground mb-2">Dars jadvali</p>
          {!group.schedule || group.schedule.length === 0 ? (
            <p className="text-sm text-muted-foreground">-</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {sortSchedule(group.schedule).map((s, i) => (
                <div
                  key={`${s.day}-${i}`}
                  className="flex flex-col items-start gap-0.5 rounded-md border bg-muted/40 px-3 py-1.5"
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    {DAY_LABELS_FULL_UZ[s.day] || s.day}
                  </span>
                  <span className="text-sm font-medium">
                    {s.startTime}–{s.endTime}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <GroupStatsPanel groupId={group._id} />
    </div>
  );
};

export default GroupInfoTab;
