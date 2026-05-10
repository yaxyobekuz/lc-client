import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useObjectState from "@/shared/hooks/useObjectState";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { TEMPLATE_CATEGORY_OPTIONS } from "@/shared/constants/notification";

import TemplatesTable from "../components/TemplatesTable";
import TemplateCreateModal from "../components/TemplateCreateModal";
import TemplateEditModal from "../components/TemplateEditModal";
import TemplateDeleteModal from "../components/TemplateDeleteModal";
import useNotificationTemplatesQuery from "../hooks/useNotificationTemplatesQuery";

const CATEGORY_OPTIONS = [
  { value: "", label: "Barcha kategoriyalar" },
  ...TEMPLATE_CATEGORY_OPTIONS,
];

const NotificationTemplatesListPage = () => {
  const filters = useObjectState({
    search: "",
    category: "",
    includeInactive: false,
  });
  const { openModal } = useModal();

  const { data, isLoading } = useNotificationTemplatesQuery({
    search: filters.search || undefined,
    category: filters.category || undefined,
    includeInactive: filters.includeInactive,
    limit: 100,
  });
  const items = data?.data || [];

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Bildirishnoma shablonlari</h1>
        <Button onClick={() => openModal(MODAL.NOTIFICATION_TEMPLATE_CREATE)}>
          <Plus className="size-4" />
          Yangi shablon
        </Button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <InputField
          name="search"
          label="Qidirish"
          placeholder="Nom bo'yicha..."
          value={filters.search}
          onChange={(e) => filters.setField("search", e.target.value)}
        />
        <SelectField
          label="Kategoriya"
          value={filters.category}
          onChange={(v) => filters.setField("category", v)}
          options={CATEGORY_OPTIONS}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.includeInactive}
            onChange={(e) => filters.setField("includeInactive", e.target.checked)}
          />
          Arxivlanganlar
        </label>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <TemplatesTable items={items} />
      )}

      <ModalWrapper
        name={MODAL.NOTIFICATION_TEMPLATE_CREATE}
        title="Yangi shablon"
      >
        <TemplateCreateModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.NOTIFICATION_TEMPLATE_EDIT}
        title="Shablonni tahrirlash"
      >
        <TemplateEditModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.NOTIFICATION_TEMPLATE_DELETE}
        title="Shablonni o'chirish"
      >
        <TemplateDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default NotificationTemplatesListPage;
