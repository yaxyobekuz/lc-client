import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import Pagination from "@/shared/components/ui/pagination/Pagination";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useObjectState from "@/shared/hooks/useObjectState";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

import StatusPicker from "../components/StatusPicker";
import SourcePicker from "../components/SourcePicker";
import DirectionPicker from "../components/DirectionPicker";
import AssignedStaffPicker from "../components/AssignedStaffPicker";
import LeadsTable from "../components/LeadsTable";
import LeadCreateModal from "../components/modals/LeadCreateModal";
import useLeadsQuery from "../hooks/useLeadsQuery";

const LeadsListPage = () => {
  const { openModal } = useModal();
  const filters = useObjectState({
    search: "",
    status: "",
    source: "",
    direction: "",
    assignedTo: "",
    overdue: false,
  });
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading } = useLeadsQuery({
    ...filters.state,
    overdue: filters.overdue || undefined,
    status: filters.status || undefined,
    source: filters.source || undefined,
    direction: filters.direction || undefined,
    assignedTo: filters.assignedTo || undefined,
    search: filters.search || undefined,
    page,
    limit,
  });

  const items = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Lidlar</h1>
        <Button onClick={() => openModal(MODAL.LEAD_CREATE)}>
          <Plus className="size-4" />
          Yangi lid
        </Button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <InputField
          name="search"
          label="Qidirish"
          placeholder="Ism yoki telefon..."
          value={filters.search}
          onChange={(e) => {
            filters.setField("search", e.target.value);
            setPage(1);
          }}
        />
        <StatusPicker
          value={filters.status}
          onChange={(v) => {
            filters.setField("status", v);
            setPage(1);
          }}
        />
        <SourcePicker
          value={filters.source}
          onChange={(v) => {
            filters.setField("source", v);
            setPage(1);
          }}
        />
        <DirectionPicker
          value={filters.direction}
          onChange={(v) => {
            filters.setField("direction", v);
            setPage(1);
          }}
        />
        <AssignedStaffPicker
          value={filters.assignedTo}
          onChange={(v) => {
            filters.setField("assignedTo", v);
            setPage(1);
          }}
        />
        <label className="flex items-center gap-2 text-sm self-end">
          <input
            type="checkbox"
            checked={filters.overdue}
            onChange={(e) => {
              filters.setField("overdue", e.target.checked);
              setPage(1);
            }}
          />
          Faqat kechikkanlar
        </label>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <LeadsTable items={items} />
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

      <ModalWrapper name={MODAL.LEAD_CREATE} title="Yangi lid">
        <LeadCreateModal />
      </ModalWrapper>
    </div>
  );
};

export default LeadsListPage;
