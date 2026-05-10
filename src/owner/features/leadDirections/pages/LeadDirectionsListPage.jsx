import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

import LeadDirectionsTable from "../components/LeadDirectionsTable";
import LeadDirectionCreateModal from "../components/LeadDirectionCreateModal";
import LeadDirectionEditModal from "../components/LeadDirectionEditModal";
import LeadDirectionDeleteModal from "../components/LeadDirectionDeleteModal";
import useLeadDirectionsQuery from "../hooks/useLeadDirectionsQuery";

const LeadDirectionsListPage = () => {
  const [search, setSearch] = useState("");
  const [includeInactive, setIncludeInactive] = useState(false);
  const { openModal } = useModal();

  const { data, isLoading } = useLeadDirectionsQuery({
    search,
    includeInactive,
    limit: 100,
  });
  const items = data?.data || [];

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Lid yo'nalishlari</h1>
        <Button onClick={() => openModal(MODAL.LEAD_DIRECTION_CREATE)}>
          <Plus className="size-4" />
          Yangi yo'nalish
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
        <LeadDirectionsTable items={items} />
      )}

      <ModalWrapper name={MODAL.LEAD_DIRECTION_CREATE} title="Yangi yo'nalish">
        <LeadDirectionCreateModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.LEAD_DIRECTION_EDIT}
        title="Yo'nalishni tahrirlash"
      >
        <LeadDirectionEditModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.LEAD_DIRECTION_DELETE}
        title="Yo'nalishni o'chirish"
      >
        <LeadDirectionDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default LeadDirectionsListPage;
