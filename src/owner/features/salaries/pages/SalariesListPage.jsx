import { useState } from "react";
import { Calculator } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import SelectField from "@/shared/components/ui/select/SelectField";
import Pagination from "@/shared/components/ui/pagination/Pagination";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useObjectState from "@/shared/hooks/useObjectState";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { SALARY_STATUS_OPTIONS } from "@/shared/constants/salary";

import TeacherPicker from "../components/TeacherPicker";
import PeriodPicker from "../components/PeriodPicker";
import SalariesTable from "../components/SalariesTable";
import BulkCalculateModal from "../components/modals/BulkCalculateModal";
import useSalariesQuery from "../hooks/useSalariesQuery";

const STATUS_OPTIONS = [
  { value: "", label: "Barcha holatlar" },
  ...SALARY_STATUS_OPTIONS,
];

const SalariesListPage = () => {
  const { openModal } = useModal();
  const now = new Date();

  const filters = useObjectState({
    teacherId: "",
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    status: "",
  });
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading } = useSalariesQuery({
    teacherId: filters.teacherId || undefined,
    year: filters.year,
    month: filters.month,
    status: filters.status || undefined,
    page,
    limit,
  });

  const items = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Maoshlar</h1>
        <Button onClick={() => openModal(MODAL.SALARY_CALCULATE_BULK)}>
          <Calculator className="size-4" />
          Hisoblash
        </Button>
      </header>

      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[220px]">
          <TeacherPicker
            value={filters.teacherId}
            onChange={(v) => {
              filters.setField("teacherId", v);
              setPage(1);
            }}
          />
        </div>
        <PeriodPicker
          year={filters.year}
          month={filters.month}
          onChange={({ year, month }) => {
            filters.setFields({ year, month });
            setPage(1);
          }}
        />
        <div className="min-w-[200px]">
          <SelectField
            label="Holat"
            value={filters.status}
            onChange={(v) => {
              filters.setField("status", v);
              setPage(1);
            }}
            options={STATUS_OPTIONS}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <SalariesTable items={items} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              onPageChange={setPage}
              totalPages={totalPages}
              hasNextPage={page < totalPages}
              hasPrevPage={page > 1}
            />
          )}
        </>
      )}

      <ModalWrapper
        name={MODAL.SALARY_CALCULATE_BULK}
        title="Maoshlarni hisoblash"
      >
        <BulkCalculateModal />
      </ModalWrapper>
    </div>
  );
};

export default SalariesListPage;
