import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import ErrorState from "@/shared/components/ui/feedback/ErrorState";
import PaymentMethodsTable from "../components/PaymentMethodsTable";
import PaymentMethodCreateModal from "../components/PaymentMethodCreateModal";
import PaymentMethodEditModal from "../components/PaymentMethodEditModal";
import PaymentMethodDeleteModal from "../components/PaymentMethodDeleteModal";
import useModal from "@/shared/hooks/useModal";
import usePaymentMethodsQuery from "../hooks/usePaymentMethodsQuery";
import { MODAL } from "@/shared/constants/modals";

const PaymentMethodsListPage = () => {
  const [search, setSearch] = useState("");
  const [includeInactive, setIncludeInactive] = useState(false);
  const { openModal } = useModal();
  const { data, isLoading, isError, refetch } = usePaymentMethodsQuery({
    search,
    includeInactive,
    limit: 100,
  });
  const items = data?.data || [];

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">To'lov usullari</h1>
        <Button onClick={() => openModal(MODAL.PAYMENT_METHOD_CREATE)}>
          <Plus className="size-4" />
          Yangi usul
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
        <PaymentMethodsTable items={items} />
      )}

      <ModalWrapper name={MODAL.PAYMENT_METHOD_CREATE} title="Yangi to'lov usuli">
        <PaymentMethodCreateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.PAYMENT_METHOD_EDIT} title="To'lov usulini tahrirlash">
        <PaymentMethodEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.PAYMENT_METHOD_DELETE} title="To'lov usulini arxivlash">
        <PaymentMethodDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default PaymentMethodsListPage;
