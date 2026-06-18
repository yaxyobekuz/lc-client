import { useState } from "react";
import InputField from "@/shared/components/ui/input/InputField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import useDebounce from "@/shared/hooks/useDebounce";
import { MODAL } from "@/shared/constants/modals";
import SalaryConfigsTable from "../components/SalaryConfigsTable";
import SalaryConfigEditModal from "../components/modals/SalaryConfigEditModal";
import RatePeriodsModal from "../components/modals/RatePeriodsModal";
import useSalaryConfigsQuery from "../hooks/useSalaryConfigsQuery";

const SalaryConfigsPage = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { data: rows = [], isLoading } = useSalaryConfigsQuery({
    search: debouncedSearch || undefined,
  });

  return (
    <div className="space-y-4">
      <InputField
        name="search"
        type="search"
        label="Qidiruv"
        placeholder="O'qituvchi yoki guruh nomi..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <SalaryConfigsTable
        rows={rows}
        isLoading={isLoading}
        empty={
          <EmptyState
            title="Juftliklar topilmadi"
            description="Faol guruhlarga biriktirilgan o'qituvchilar bu yerda ko'rinadi."
          />
        }
      />

      <ModalWrapper
        name={MODAL.SALARY_CONFIG_EDIT}
        title="Maosh sozlamasi"
        className="max-w-md"
      >
        <SalaryConfigEditModal />
      </ModalWrapper>

      <ModalWrapper
        name={MODAL.SALARY_RATE_PERIODS}
        title="Maosh stavkasi davrlari"
        className="max-w-lg"
      >
        <RatePeriodsModal />
      </ModalWrapper>
    </div>
  );
};

export default SalaryConfigsPage;
