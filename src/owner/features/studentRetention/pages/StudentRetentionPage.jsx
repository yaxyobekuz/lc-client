import { useMemo, useState } from "react";

import ErrorState from "@/shared/components/ui/feedback/ErrorState";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";

import RetentionStatCards from "../components/RetentionStatCards";
import DurationBeforeLeavingChart from "../components/DurationBeforeLeavingChart";
import ChurnReasonsTable from "../components/ChurnReasonsTable";
import TeacherChurnTable from "../components/TeacherChurnTable";
import ChurnedStudentsModal from "../components/ChurnedStudentsModal";

import useRetentionQuery from "../hooks/useRetentionQuery";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

// Davr presetlari - leftAt diapazonini hisoblaydi (mashina sanasi YYYY-MM-DD).
const toISO = (d) => d.toISOString().slice(0, 10);
const rangeFor = (preset) => {
  if (preset === "all") return {};
  const now = new Date();
  const months = preset === "3m" ? 3 : 12;
  const from = new Date(now.getFullYear(), now.getMonth() - months, now.getDate());
  return { fromDate: toISO(from), toDate: toISO(now) };
};

const RetentionContent = ({ preset }) => {
  const params = useMemo(() => rangeFor(preset), [preset]);
  const { data, isLoading, isError, refetch } = useRetentionQuery(params);
  const { openModal } = useModal();

  if (isError) return <ErrorState onRetry={refetch} />;
  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
    );
  }

  return (
    <div className="space-y-5 pt-3">
      <RetentionStatCards
        data={data}
        onShowChurned={() => openModal(MODAL.CHURNED_STUDENTS, { params })}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DurationBeforeLeavingChart buckets={data?.durationBuckets || []} />
        <ChurnReasonsTable reasons={data?.reasons || []} />
      </div>

      <TeacherChurnTable teachers={data?.teachers || []} />
    </div>
  );
};

const StudentRetentionPage = () => {
  const [preset, setPreset] = useState("all");

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Chiqib ketish tahlili</h1>
        <p className="text-sm text-muted-foreground">
          O'quvchilar qancha o'qib, qaysi sabab bilan va qaysi o'qituvchidan
          ko'proq chiqib ketayotganini ko'rsatadi
        </p>
      </header>

      <TabsButtons
        value={preset}
        onChange={setPreset}
        items={[
          { value: "all", label: "Butun davr", content: <RetentionContent preset="all" /> },
          { value: "12m", label: "Oxirgi 12 oy", content: <RetentionContent preset="12m" /> },
          { value: "3m", label: "Oxirgi 3 oy", content: <RetentionContent preset="3m" /> },
        ]}
      />

      <ModalWrapper
        name={MODAL.CHURNED_STUDENTS}
        title="Chiqib ketgan o'quvchilar"
        className="max-w-3xl"
      >
        <ChurnedStudentsModal />
      </ModalWrapper>
    </div>
  );
};

export default StudentRetentionPage;
