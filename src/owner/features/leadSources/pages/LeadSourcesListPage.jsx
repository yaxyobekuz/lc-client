import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import LeadSourcesTable from "../components/LeadSourcesTable";
import LeadSourceCreateModal from "../components/LeadSourceCreateModal";
import LeadSourceEditModal from "../components/LeadSourceEditModal";
import LeadSourceDeleteModal from "../components/LeadSourceDeleteModal";
import useModal from "@/shared/hooks/useModal";
import useLeadSourcesQuery from "../hooks/useLeadSourcesQuery";
import { MODAL } from "@/shared/constants/modals";

const LeadSourcesListPage = () => {
  const [search, setSearch] = useState("");
  const [includeInactive, setIncludeInactive] = useState(false);
  const { openModal } = useModal();
  const { data, isLoading } = useLeadSourcesQuery({
    search,
    includeInactive,
    limit: 100,
  });
  const items = data?.data || [];

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Lid manbalari</h1>
        <Button onClick={() => openModal(MODAL.LEAD_SOURCE_CREATE)}>
          <Plus className="size-4" />
          Yangi manba
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
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <LeadSourcesTable items={items} />
      )}

      <ModalWrapper name={MODAL.LEAD_SOURCE_CREATE} title="Yangi lid manba">
        <LeadSourceCreateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.LEAD_SOURCE_EDIT} title="Lid manbani tahrirlash">
        <LeadSourceEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.LEAD_SOURCE_DELETE} title="Lid manbani o'chirish">
        <LeadSourceDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default LeadSourcesListPage;
