import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import InputField from "@/shared/components/ui/input/InputField";
import { AttendanceGrid } from "@/shared/components/attendance";
import useAttendanceForGroupDateQuery from "@/owner/features/attendance/hooks/useAttendanceForGroupDateQuery";
import useBulkRecordMutation from "@/owner/features/attendance/hooks/useBulkRecordMutation";
import { toDateInput } from "@/shared/utils/formatDate";

const TeacherAttendanceMarkPage = () => {
  const { groupId } = useParams();
  const [date, setDate] = useState(toDateInput(new Date()));

  const { data, isLoading } = useAttendanceForGroupDateQuery(groupId, date);
  const { mutate, isPending } = useBulkRecordMutation();

  const handleSubmit = (items) => {
    if (!groupId || !date || items.length === 0) return;
    mutate({ groupId, date, items });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/teacher/attendance"
            className="size-9 inline-flex items-center justify-center rounded-md border bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-2xl font-semibold truncate">
            {data?.group?.name || "Davomat"}
          </h1>
        </div>
        <InputField
          type="date"
          name="date"
          label="Sana"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="!gap-1"
        />
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <AttendanceGrid
          data={data}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      )}
    </div>
  );
};

export default TeacherAttendanceMarkPage;
