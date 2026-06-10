import { useMemo } from "react";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import useObjectState from "@/shared/hooks/useObjectState";
import useDebounce from "@/shared/hooks/useDebounce";
import useGroupsListQuery from "@/owner/features/groups/hooks/useGroupsListQuery";
import { MODAL } from "@/shared/constants/modals";
import MonthPicker from "../components/MonthPicker";
import StudentPaymentCard from "../components/StudentPaymentCard";
import AddPaymentModal from "../components/modals/AddPaymentModal";
import useStudentPaymentsQuery from "../hooks/useStudentPaymentsQuery";

const now = new Date();

const STATUS_OPTIONS = [
  { value: "", label: "Barchasi" },
  { value: "unpaid", label: "To'lanmagan" },
  { value: "partial", label: "Qisman" },
  { value: "paid", label: "To'langan" },
];

const StudentPaymentsPage = () => {
  const filters = useObjectState({
    groupId: "",
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    status: "",
    search: "",
  });
  const debouncedSearch = useDebounce(filters.search);

  const { data: groupsData } = useGroupsListQuery({ limit: 200 });
  const groupOptions = useMemo(
    () => [
      { value: "", label: "Barcha guruhlar" },
      ...(groupsData?.data || []).map((g) => ({ value: g._id, label: g.name })),
    ],
    [groupsData],
  );

  const { data, isLoading } = useStudentPaymentsQuery({
    groupId: filters.groupId || undefined,
    year: filters.year,
    month: filters.month,
    status: filters.status || undefined,
    search: debouncedSearch || undefined,
    limit: 200,
  });

  const payments = data?.data || [];

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">O'quvchi to'lovlari</h1>
        <MonthPicker
          year={filters.year}
          month={filters.month}
          onChange={({ year, month }) => filters.setFields({ year, month })}
        />
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField
          searchable
          label="Guruh"
          value={filters.groupId}
          onChange={(v) => filters.setField("groupId", v)}
          options={groupOptions}
        />
        <SelectField
          label="Holat"
          value={filters.status}
          onChange={(v) => filters.setField("status", v)}
          options={STATUS_OPTIONS}
        />
        <InputField
          name="search"
          type="search"
          label="Qidiruv"
          placeholder="O'quvchi ismi..."
          value={filters.search}
          onChange={(e) => filters.setField("search", e.target.value)}
          className="sm:col-span-2"
        />
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : payments.length === 0 ? (
        <EmptyState title="To'lovlar topilmadi" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {payments.map((p) => (
            <StudentPaymentCard key={p._id} payment={p} />
          ))}
        </div>
      )}

      <ModalWrapper name={MODAL.FINANCE_ADD_PAYMENT} title="To'lov qo'shish">
        <AddPaymentModal />
      </ModalWrapper>
    </div>
  );
};

export default StudentPaymentsPage;
