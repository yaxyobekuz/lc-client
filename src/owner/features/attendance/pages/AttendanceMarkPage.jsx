import { useState } from "react";
import InputField from "@/shared/components/ui/input/InputField";
import { AttendanceGrid } from "@/shared/components/attendance";
import GroupPicker from "../components/GroupPicker";
import useAttendanceForGroupDateQuery from "../hooks/useAttendanceForGroupDateQuery";
import useBulkRecordMutation from "../hooks/useBulkRecordMutation";
import { toDateInput, formatDateWithWeekday } from "@/shared/utils/formatDate";

const AttendanceMarkPage = () => {
  const [groupId, setGroupId] = useState("");
  const [date, setDate] = useState(toDateInput(new Date()));

  const { data, isLoading } = useAttendanceForGroupDateQuery(groupId, date);
  const { mutate, isPending } = useBulkRecordMutation();

  const handleSubmit = (items) => {
    if (!groupId || !date || items.length === 0) return;
    mutate({ groupId, date, items });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Davomat belgilash</h1>

      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-[280px] flex-1">
          <GroupPicker value={groupId} onChange={setGroupId} />
        </div>

        <div className="flex flex-col gap-1">
          <InputField
            type="date"
            name="date"
            label="Sana"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="!gap-1"
          />
          {date && (
            <span className="text-xs text-muted-foreground">
              {formatDateWithWeekday(date)}
            </span>
          )}
        </div>
      </div>

      {!groupId ? (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          Boshlash uchun guruh tanlang
        </div>
      ) : isLoading ? (
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

export default AttendanceMarkPage;
