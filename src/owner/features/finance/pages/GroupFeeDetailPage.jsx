import { useParams } from "react-router-dom";
import { Plus, Pencil } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import BackLink from "@/shared/components/ui/link/BackLink";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import StatusBadge from "@/shared/components/ui/badge/StatusBadge";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { formatMoney } from "@/shared/utils/formatMoney";
import { MONTH_LABELS } from "@/shared/constants/calendar";
import GroupFeeEditModal from "../components/modals/GroupFeeEditModal";
import useGroupFeesByGroupQuery from "../hooks/useGroupFeesByGroupQuery";

// effectiveFrom UTC midnight'da saqlanadi - ISO'ning kun qismidan DD.MM.YYYY chiqaramiz
// (local TZ'ga o'tkazmaymiz, off-by-one bo'lmasligi uchun).
const formatEffectiveDate = (value) => {
  const [y, m, d] = String(value).slice(0, 10).split("-");
  return d && m && y ? `${d}.${m}.${y}` : String(value).slice(0, 10);
};

const GroupFeeDetailPage = () => {
  const { groupId } = useParams();
  const { openModal } = useModal();
  const { data, isLoading } = useGroupFeesByGroupQuery(groupId);

  const group = data?.group;
  const fees = data?.fees || [];

  const openEdit = (fee) =>
    openModal(MODAL.GROUP_FEE_EDIT, {
      groupId,
      groupName: group?.name,
      year: fee?.year,
      month: fee?.month,
      amount: fee?.amount,
      effectiveFrom: fee?.effectiveFrom,
      lockPeriod: !!fee,
    });

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <BackLink to="/owner/finance/group-fees" />
          <div>
            <h1 className="text-2xl font-semibold">{group?.name || "Guruh to'lovi"}</h1>
            <p className="text-sm text-muted-foreground">Oylik to'lov tarixi</p>
          </div>
        </div>
        <Button onClick={() => openEdit(null)}>
          <Plus className="size-4" />
          Boshqa oy uchun belgilash
        </Button>
      </header>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : fees.length === 0 ? (
        <EmptyState title="To'lovlar belgilanmagan" />
      ) : (
        <ul className="divide-y rounded-lg border bg-white">
          {fees.map((fee) => (
            <li key={fee._id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-3">
                  <span className="font-medium">
                    {MONTH_LABELS[fee.month - 1]} {fee.year}
                  </span>
                  <StatusBadge tone={fee.source === "manual" ? "info" : "neutral"}>
                    {fee.source === "manual" ? "Qo'lda" : "Avto"}
                  </StatusBadge>
                </div>
                {fee.effectiveFrom && (
                  <span className="text-xs text-amber-600">
                    {formatEffectiveDate(fee.effectiveFrom)} dan kuchga kiradi
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">{formatMoney(fee.amount)}</span>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => openEdit(fee)}
                  aria-label="Tahrirlash"
                >
                  <Pencil className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ModalWrapper name={MODAL.GROUP_FEE_EDIT} title="Guruh to'lovini belgilash">
        <GroupFeeEditModal />
      </ModalWrapper>
    </div>
  );
};

export default GroupFeeDetailPage;
