import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ErrorState from "@/shared/components/ui/feedback/ErrorState";
import useModal from "@/shared/hooks/useModal";
import useDebounce from "@/shared/hooks/useDebounce";
import { MODAL } from "@/shared/constants/modals";

import ArchiveReasonsTable from "../components/ArchiveReasonsTable";
import ArchiveReasonCreateModal from "../components/ArchiveReasonCreateModal";
import ArchiveReasonEditModal from "../components/ArchiveReasonEditModal";
import ArchiveReasonDeleteModal from "../components/ArchiveReasonDeleteModal";
import ArchiveReasonReportTab from "../components/ArchiveReasonReportTab";
import useArchiveReasonsQuery from "../hooks/useArchiveReasonsQuery";

const ReasonsTab = () => {
  const [search, setSearch] = useState("");
  const { openModal } = useModal();
  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isError, refetch } = useArchiveReasonsQuery({
    search: debouncedSearch || undefined,
    limit: 200,
  });
  const items = data?.data || [];

  return (
    <div className="pt-3 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="max-w-sm flex-1">
          <InputField
            name="search"
            type="search"
            placeholder="Sarlavha bo'yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button onClick={() => openModal(MODAL.ARCHIVE_REASON_CREATE)}>
          <Plus className="size-4" />
          Yangi sabab
        </Button>
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <ArchiveReasonsTable items={items} isLoading={isLoading} />
      )}
    </div>
  );
};

const ArchiveReasonsPage = () => {
  const [tab, setTab] = useState("reasons");

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Arxiv sabablari</h1>
      </header>

      <TabsButtons
        value={tab}
        onChange={setTab}
        items={[
          { value: "reasons", label: "Sabablar", content: <ReasonsTab /> },
          {
            value: "report",
            label: "Hisobot",
            content: (
              <div className="pt-3">
                <ArchiveReasonReportTab />
              </div>
            ),
          },
        ]}
      />

      <ModalWrapper name={MODAL.ARCHIVE_REASON_CREATE} title="Yangi sabab">
        <ArchiveReasonCreateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.ARCHIVE_REASON_EDIT} title="Sababni tahrirlash">
        <ArchiveReasonEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.ARCHIVE_REASON_DELETE} title="Sababni o'chirish">
        <ArchiveReasonDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default ArchiveReasonsPage;
