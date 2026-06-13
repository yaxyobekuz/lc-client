import { useMemo } from "react";
import { RefreshCw } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import useObjectState from "@/shared/hooks/useObjectState";
import useDebounce from "@/shared/hooks/useDebounce";
import useGroupsListQuery from "@/owner/features/groups/hooks/useGroupsListQuery";
import { MODAL } from "@/shared/constants/modals";
import MonthPicker from "../components/MonthPicker";
import TeacherSalaryCard from "../components/TeacherSalaryCard";
import SalaryEditModal from "../components/modals/SalaryEditModal";
import AddSalaryPayoutModal from "../components/modals/AddSalaryPayoutModal";
import useTeacherSalariesQuery from "../hooks/useTeacherSalariesQuery";
import { useSalaryRegenerateMutation } from "../hooks/useSalaryMutations";

const now = new Date();

const STATUS_OPTIONS = [
  { value: "", label: "Barchasi" },
  { value: "unpaid", label: "To'lanmagan" },
  { value: "partial", label: "Qisman" },
  { value: "paid", label: "To'langan" },
];

const TeacherSalariesPage = () => {
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

  const { data, isLoading } = useTeacherSalariesQuery({
    groupId: filters.groupId || undefined,
    year: filters.year,
    month: filters.month,
    status: filters.status || undefined,
    search: debouncedSearch || undefined,
    limit: 200,
  });

  const salaries = data?.data || [];
  const regenerate = useSalaryRegenerateMutation();

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">O'qituvchi maoshlari</h1>
        <div className="flex flex-wrap items-end gap-2">
          <MonthPicker
            year={filters.year}
            month={filters.month}
            onChange={({ year, month }) => filters.setFields({ year, month })}
          />
          <Button
            variant="outline"
            disabled={regenerate.isPending}
            onClick={() => regenerate.mutate({ year: filters.year, month: filters.month })}
          >
            <RefreshCw className="size-4" />
            Oylikni Hisoblash
          </Button>
        </div>
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
          placeholder="O'qituvchi ismi..."
          value={filters.search}
          onChange={(e) => filters.setField("search", e.target.value)}
          className="sm:col-span-2"
        />
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : salaries.length === 0 ? (
        <EmptyState title="Maoshlar topilmadi" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {salaries.map((s) => (
            <TeacherSalaryCard key={s._id} salary={s} />
          ))}
        </div>
      )}

      <ModalWrapper name={MODAL.SALARY_EDIT} title="Maoshni tahrirlash" className="max-w-lg">
        <SalaryEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.SALARY_ADD_PAYOUT} title="Maosh to'lovi">
        <AddSalaryPayoutModal />
      </ModalWrapper>
    </div>
  );
};

export default TeacherSalariesPage;
