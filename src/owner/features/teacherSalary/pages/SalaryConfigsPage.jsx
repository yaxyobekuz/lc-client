import { useMemo } from "react";
import SelectField from "@/shared/components/ui/select/SelectField";
import InputField from "@/shared/components/ui/input/InputField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import useObjectState from "@/shared/hooks/useObjectState";
import useDebounce from "@/shared/hooks/useDebounce";
import useGroupsListQuery from "@/owner/features/groups/hooks/useGroupsListQuery";
import { MODAL } from "@/shared/constants/modals";
import SalaryConfigsTable from "../components/SalaryConfigsTable";
import SalaryConfigEditModal from "../components/modals/SalaryConfigEditModal";
import RatePeriodsModal from "../components/modals/RatePeriodsModal";
import useSalaryConfigsQuery from "../hooks/useSalaryConfigsQuery";

const SalaryConfigsPage = () => {
  const filters = useObjectState({ groupId: "", search: "" });
  const debouncedSearch = useDebounce(filters.search);

  const { data: groupsData } = useGroupsListQuery({ limit: 200 });
  const groupOptions = useMemo(
    () => [
      { value: "", label: "Barcha guruhlar" },
      ...(groupsData?.data || []).map((g) => ({ value: g._id, label: g.name })),
    ],
    [groupsData],
  );

  const { data: rows = [], isLoading } = useSalaryConfigsQuery({
    groupId: filters.groupId || undefined,
    search: debouncedSearch || undefined,
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SelectField
          searchable
          label="Guruh"
          value={filters.groupId}
          onChange={(v) => filters.setField("groupId", v)}
          options={groupOptions}
        />
        <InputField
          name="search"
          type="search"
          label="Qidiruv"
          placeholder="O'qituvchi yoki guruh nomi..."
          value={filters.search}
          onChange={(e) => filters.setField("search", e.target.value)}
          className="sm:col-span-2"
        />
      </div>

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
