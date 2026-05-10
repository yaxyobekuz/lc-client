import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

import LeadStatusesTable from "../components/LeadStatusesTable";
import LeadStatusCreateModal from "../components/LeadStatusCreateModal";
import LeadStatusEditModal from "../components/LeadStatusEditModal";
import LeadStatusDeleteModal from "../components/LeadStatusDeleteModal";
import useLeadStatusesQuery from "../hooks/useLeadStatusesQuery";

const LeadStatusesListPage = () => {
  const [search, setSearch] = useState("");
  const [includeInactive, setIncludeInactive] = useState(false);
  const { openModal } = useModal();

  const { data, isLoading } = useLeadStatusesQuery({
    search,
    includeInactive,
    limit: 100,
  });
  const items = data?.data || [];

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Lid statuslari</h1>
        <Button onClick={() => openModal(MODAL.LEAD_STATUS_FORM_CREATE)}>
          <Plus className="size-4" />
          Yangi status
        </Button>
      </header>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="max-w-sm flex-1">
          <InputField
            name="search"
            placeholder="Nom bo'yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeInactive}
            onChange={(e) => setIncludeInactive(e.target.checked)}
          />
          Arxivlanganlarni ham ko'rsatish
        </label>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <LeadStatusesTable items={items} />
      )}

      <ModalWrapper name={MODAL.LEAD_STATUS_FORM_CREATE} title="Yangi status">
        <LeadStatusCreateModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.LEAD_STATUS_FORM_EDIT}
        title="Statusni tahrirlash"
      >
        <LeadStatusEditModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.LEAD_STATUS_FORM_DELETE}
        title="Statusni o'chirish"
      >
        <LeadStatusDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default LeadStatusesListPage;
