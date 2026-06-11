// React
import { useState } from "react";

// Router
import { useParams } from "react-router-dom";

// Icons
import { ArrowLeft, Plus, Send } from "lucide-react";

// UI
import Card from "@/shared/components/ui/card/Card";
import Badge from "@/shared/components/ui/badge/Badge";
import Button from "@/shared/components/ui/button/Button";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";

// Hooks
import useGoBack from "@/shared/hooks/useGoBack";
import useModal from "@/shared/hooks/useModal";
import useGroupQuery from "../hooks/useGroupQuery";

// Davomat heatmap (owner feature qayta ishlatiladi - rolga bog'liq emas)
import { AttendanceYearHeatmap } from "@/shared/components/attendance";
import useStudentYearAttendanceQuery from "@/owner/features/attendance/hooks/useStudentYearAttendanceQuery";

// Davomatdan ozod davrlari (owner feature qayta ishlatiladi)
import {
  ExemptionsTable,
  ExemptionCreateModal,
  ExemptionDeleteModal,
} from "@/owner/features/attendanceExemptions";

// Utils & constants
import { formatPhone } from "@/shared/utils/formatPhone";
import { MODAL } from "@/shared/constants/modals";

const TelegramStatus = ({ telegram }) => {
  if (!telegram) {
    return <span className="text-muted-foreground">Bog'lanmagan</span>;
  }
  if (telegram.username) {
    return (
      <a
        href={`https://t.me/${telegram.username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-w-0 items-center gap-1 font-medium text-sky-600 hover:text-sky-700 hover:underline"
      >
        <Send className="size-3.5 shrink-0" />
        <span className="truncate">@{telegram.username}</span>
      </a>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
      <Send className="size-3.5 shrink-0" />
      Bog'langan
    </span>
  );
};

const StudentAttendanceTab = ({ studentId }) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const { data, isLoading } = useStudentYearAttendanceQuery(studentId, { year });

  return (
    <Card className="mt-3">
      {isLoading ? (
        <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <AttendanceYearHeatmap
          data={data}
          year={year}
          onPrevYear={() => setYear((y) => y - 1)}
          onNextYear={() => setYear((y) => y + 1)}
        />
      )}
    </Card>
  );
};

const StudentExemptionsTab = ({ studentId }) => {
  const { openModal } = useModal();
  return (
    <div className="space-y-3 pt-3">
      <div className="flex justify-end">
        <Button
          onClick={() =>
            openModal(MODAL.ATTENDANCE_EXEMPTION_CREATE, { studentId })
          }
        >
          <Plus className="size-4" />
          Yangi davr
        </Button>
      </div>
      <ExemptionsTable studentId={studentId} />
    </div>
  );
};

const MyStudentDetailPage = () => {
  const { id, studentId } = useParams();
  const goBack = useGoBack(`/teacher/groups/${id}`);
  const { data: group, isLoading, isError } = useGroupQuery(id);
  const [tab, setTab] = useState("attendance");

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
    );
  }

  const student = (group?.students || []).find((s) => s._id === studentId);

  if (isError || !group || !student) {
    return (
      <div className="p-8 text-center">
        <button
          type="button"
          onClick={goBack}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Guruhga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border bg-white hover:bg-gray-50 cursor-pointer"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
          <h1 className="min-w-0 break-words text-xl font-semibold sm:text-2xl">
            {student.firstName} {student.lastName}
          </h1>
          <Badge variant="secondary" className="shrink-0">
            {group.name}
          </Badge>
        </div>
      </div>

      <Card className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
          <span className="text-muted-foreground">
            Telefon:{" "}
            <span className="font-medium text-foreground">
              {formatPhone(student.phone) || "-"}
            </span>
          </span>
          <span className="text-muted-foreground">
            Telegram: <TelegramStatus telegram={student.telegram} />
          </span>
        </div>
      </Card>

      <TabsButtons
        value={tab}
        onChange={setTab}
        items={[
          { value: "attendance", label: "Davomat" },
          { value: "exemptions", label: "Darsdan ozod" },
        ]}
      />

      {tab === "attendance" && <StudentAttendanceTab studentId={studentId} />}
      {tab === "exemptions" && <StudentExemptionsTab studentId={studentId} />}

      <ModalWrapper
        name={MODAL.ATTENDANCE_EXEMPTION_CREATE}
        title="Darsdan ozod qilish"
      >
        <ExemptionCreateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.ATTENDANCE_EXEMPTION_DELETE} title="Davrni o'chirish">
        <ExemptionDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default MyStudentDetailPage;
