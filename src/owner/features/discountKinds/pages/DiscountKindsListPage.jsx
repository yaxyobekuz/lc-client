import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import ErrorState from "@/shared/components/ui/feedback/ErrorState";
import DiscountKindsTable from "../components/DiscountKindsTable";
import DiscountKindCreateModal from "../components/DiscountKindCreateModal";
import DiscountKindEditModal from "../components/DiscountKindEditModal";
import DiscountKindDeleteModal from "../components/DiscountKindDeleteModal";
import useModal from "@/shared/hooks/useModal";
import useDiscountKindsQuery from "../hooks/useDiscountKindsQuery";
import { MODAL } from "@/shared/constants/modals";

const DiscountKindsListPage = () => {
  const [search, setSearch] = useState("");
  const [includeInactive, setIncludeInactive] = useState(false);
  const { openModal } = useModal();
  const { data, isLoading, isError, refetch } = useDiscountKindsQuery({
    search,
    includeInactive,
    limit: 100,
  });
  const items = data?.data || [];

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Chegirma turlari</h1>
        <Button onClick={() => openModal(MODAL.DISCOUNT_KIND_CREATE)}>
          <Plus className="size-4" />
          Yangi tur
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
          Arxivlanganlarni ko'rsatish
        </label>
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <DiscountKindsTable items={items} />
      )}

      <ModalWrapper name={MODAL.DISCOUNT_KIND_CREATE} title="Yangi chegirma turi">
        <DiscountKindCreateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.DISCOUNT_KIND_EDIT} title="Chegirma turini tahrirlash">
        <DiscountKindEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.DISCOUNT_KIND_DELETE} title="Chegirma turini arxivlash">
        <DiscountKindDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default DiscountKindsListPage;
