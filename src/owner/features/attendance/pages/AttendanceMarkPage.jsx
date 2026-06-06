import { useState } from "react";
import InputField from "@/shared/components/ui/input/InputField";
import Card from "@/shared/components/ui/card/Card";
import { AttendanceGrid } from "@/shared/components/attendance";
import GroupPicker from "../components/GroupPicker";
import TeacherPresenceCard from "../components/TeacherPresenceCard";
import useAttendanceForGroupDateQuery from "../hooks/useAttendanceForGroupDateQuery";
import useBulkRecordMutation from "../hooks/useBulkRecordMutation";
import { toDateInput } from "@/shared/utils/formatDate";

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

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex-1 min-w-0">
          <GroupPicker value={groupId} onChange={setGroupId} autoSelectFirst />
        </div>

        <InputField
          type="date"
          name="date"
          label="Sana"
          value={date}
          max={toDateInput(new Date())}
          onChange={(e) => setDate(e.target.value)}
          className="w-full sm:w-56"
        />
      </Card>

      {!groupId ? (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          Boshlash uchun guruh tanlang
        </div>
      ) : isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <>
          <TeacherPresenceCard groupId={groupId} date={date} />
          <AttendanceGrid
            data={data}
            onSubmit={handleSubmit}
            isSubmitting={isPending}
          />
        </>
      )}
    </div>
  );
};

export default AttendanceMarkPage;
