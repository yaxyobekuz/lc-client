import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// Components
import Card from "@/shared/components/ui/card/Card";
import InputField from "@/shared/components/ui/input/InputField";
import { SessionTabs } from "@/shared/components/attendance";
import { GroupPicker } from "@/owner/features/attendance";
import GradeGrid from "../components/GradeGrid";

// Hooks
import useGradesForGroupDateQuery from "../hooks/useGradesForGroupDateQuery";
import useGradeBulkRecordMutation from "../hooks/useGradeBulkRecordMutation";

// Utils
import { todayInput } from "@/shared/utils/formatDate";

const GradesGivePage = () => {
  const [searchParams] = useSearchParams();
  const [groupId, setGroupId] = useState(searchParams.get("groupId") || "");
  const [date, setDate] = useState(todayInput());
  const [slot, setSlot] = useState(null); // null → server birinchi sessiyani tanlaydi

  const { data, isLoading } = useGradesForGroupDateQuery(groupId, date, slot);
  const { mutate, isPending } = useGradeBulkRecordMutation();

  const effectiveSlot = slot ?? data?.slot ?? "";

  const handleSubmit = (items) => {
    if (!groupId || !date || items.length === 0) return;
    mutate({ groupId, date, items, slot: effectiveSlot });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Baholash</h1>

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex-1 min-w-0">
          <GroupPicker value={groupId} onChange={setGroupId} autoSelectFirst />
        </div>
        <InputField
          type="date"
          name="date"
          label="Sana"
          value={date}
          max={todayInput()}
          onChange={(e) => {
            setDate(e.target.value);
            setSlot(null);
          }}
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
          <SessionTabs
            sessions={data?.sessions}
            activeSlot={effectiveSlot}
            onSelect={setSlot}
          />
          <GradeGrid data={data} onSubmit={handleSubmit} isSubmitting={isPending} />
        </>
      )}
    </div>
  );
};

export default GradesGivePage;
