import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

import FeedbackTypesTable from "../components/FeedbackTypesTable";
import FeedbackTypeCreateModal from "../components/FeedbackTypeCreateModal";
import FeedbackTypeEditModal from "../components/FeedbackTypeEditModal";
import FeedbackTypeDeleteModal from "../components/FeedbackTypeDeleteModal";
import useFeedbackTypesQuery from "../hooks/useFeedbackTypesQuery";

const FeedbackTypesListPage = () => {
  const [search, setSearch] = useState("");
  const [includeInactive, setIncludeInactive] = useState(false);
  const { openModal } = useModal();

  const { data, isLoading } = useFeedbackTypesQuery({
    search,
    includeInactive,
    limit: 100,
  });
  const items = data?.data || [];

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Feedback turlari</h1>
        <Button onClick={() => openModal(MODAL.FEEDBACK_TYPE_CREATE)}>
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
          Arxivlanganlarni ham ko'rsatish
        </label>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <FeedbackTypesTable items={items} />
      )}

      <ModalWrapper name={MODAL.FEEDBACK_TYPE_CREATE} title="Yangi feedback turi">
        <FeedbackTypeCreateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.FEEDBACK_TYPE_EDIT} title="Turni tahrirlash">
        <FeedbackTypeEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.FEEDBACK_TYPE_DELETE} title="Turni o'chirish">
        <FeedbackTypeDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default FeedbackTypesListPage;
