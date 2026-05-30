// Components
import Card from "@/shared/components/ui/card/Card";
import Switch from "@/shared/components/ui/switch/Switch";

// Hooks
import useTeacherAttendanceQuery from "../hooks/useTeacherAttendanceQuery";
import useTeacherAttendanceMutation from "../hooks/useTeacherAttendanceMutation";

// Utils
import { formatMoney } from "@/shared/utils/formatMoney";

const TeacherPresenceCard = ({ groupId, date }) => {
  const { data: status, isLoading } = useTeacherAttendanceQuery(groupId, date);
  const { mutate, isPending } = useTeacherAttendanceMutation();

  // Dars kuni bo'lmasa yoki ma'lumot yo'q bo'lsa ko'rsatmaymiz
  if (!groupId || !date || isLoading || !status || !status.isClassDay) {
    return null;
  }

  const present = status.present;
  const amount = status.perStudentAmount || 0;

  return (
    <Card className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="font-medium">O'qituvchi darsga keldimi?</p>
        {present ? (
          <p className="text-sm text-muted-foreground">
            {amount > 0
              ? `Kelmadi deb belgilansa, har o'quvchidan ${formatMoney(amount)} ayiriladi`
              : "Kelmadi deb belgilansa, o'quvchilardan ayirilmaydi (0)"}
          </p>
        ) : (
          <p className="text-sm text-rose-500">
            Kelmadi — {status.affectedCount} o'quvchidan {formatMoney(amount)}
            dan ayirildi
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span
          className={
            present
              ? "text-sm font-medium text-emerald-600"
              : "text-sm font-medium text-rose-500"
          }
        >
          {present ? "Keldi" : "Kelmadi"}
        </span>
        <Switch
          checked={present}
          onChange={(checked) => mutate({ groupId, date, present: checked })}
          disabled={isPending}
        />
      </div>
    </Card>
  );
};

export default TeacherPresenceCard;
