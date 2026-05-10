import { Link, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Card from "@/shared/components/ui/card/Card";
import Button from "@/shared/components/ui/button/Button";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import LeadStatusBadge from "@/shared/components/lead/LeadStatusBadge";
import { formatPhone } from "@/shared/utils/formatPhone";
import { formatDateUz } from "@/shared/utils/formatDate";
import { calculateAge } from "@/shared/utils/calculateAge";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

import LeadActionsBar from "../components/LeadActionsBar";
import LeadHistoryList from "../components/LeadHistoryList";
import LeadEditModal from "../components/modals/LeadEditModal";
import LeadDeleteConfirmModal from "../components/modals/LeadDeleteConfirmModal";
import StatusChangeModal from "../components/modals/StatusChangeModal";
import AddNoteModal from "../components/modals/AddNoteModal";
import RecordContactModal from "../components/modals/RecordContactModal";
import SetFollowUpModal from "../components/modals/SetFollowUpModal";
import SetTrialModal from "../components/modals/SetTrialModal";
import ConvertToStudentModal from "../components/modals/ConvertToStudentModal";

import useLeadDetailQuery from "../hooks/useLeadDetailQuery";

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between gap-3 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right">{value || "—"}</span>
  </div>
);

const LeadDetailPage = () => {
  const { id } = useParams();
  const { openModal } = useModal();
  const { data: lead, isLoading } = useLeadDetailQuery(id);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Yuklanmoqda...
      </div>
    );
  }
  if (!lead) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Lid topilmadi</p>
        <Link to="/owner/leads" className="text-blue-600 hover:underline">
          Lidlar ro'yxatiga qaytish
        </Link>
      </div>
    );
  }

  const age = calculateAge(lead.birthDate);

  return (
    <div className="space-y-4">
      <div>
        <Link
          to="/owner/leads"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Lidlar
        </Link>
        <header className="flex items-center justify-between gap-3 flex-wrap mt-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-semibold">
              {lead.firstName} {lead.lastName}
            </h1>
            <LeadStatusBadge status={lead.status} />
            {lead.convertedUser && (
              <Link
                to={`/owner/users/${lead.convertedUser._id || lead.convertedUser}`}
                className="text-sm text-green-700 hover:underline"
              >
                ✅ O'quvchiga aylantirilgan
              </Link>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openModal(MODAL.LEAD_EDIT, { lead })}
            >
              <Pencil className="size-4" />
              Tahrirlash
            </Button>
            {!lead.convertedUser && (
              <Button
                variant="outline"
                size="sm"
                className="text-red-600"
                onClick={() =>
                  openModal(MODAL.LEAD_DELETE_CONFIRM, {
                    lead,
                    redirectAfter: true,
                  })
                }
              >
                <Trash2 className="size-4" />
                O'chirish
              </Button>
            )}
          </div>
        </header>
      </div>

      <LeadActionsBar lead={lead} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="space-y-2">
          <h3 className="font-semibold">Asosiy ma'lumotlar</h3>
          <InfoRow label="Telefon" value={formatPhone(lead.phone) || lead.phone} />
          <InfoRow label="Yoshi" value={age !== null ? `${age} yosh` : "—"} />
          <InfoRow label="Manba" value={lead.source?.name} />
          <InfoRow label="Yo'nalish" value={lead.direction?.name} />
          <InfoRow
            label="Mas'ul"
            value={
              lead.assignedTo
                ? `${lead.assignedTo.firstName} ${lead.assignedTo.lastName}`
                : null
            }
          />
          <InfoRow
            label="Murojaat sanasi"
            value={formatDateUz(lead.requestDate)}
          />
        </Card>

        <Card className="space-y-2">
          <h3 className="font-semibold">Bog'lanish</h3>
          <InfoRow label="Bog'lanishlar" value={`${lead.contactCount || 0} marta`} />
          <InfoRow
            label="Oxirgi bog'lanish"
            value={lead.lastContactAt ? formatDateUz(lead.lastContactAt) : null}
          />
          <InfoRow
            label="Eslatma"
            value={lead.followUpDate ? formatDateUz(lead.followUpDate) : null}
          />
          {lead.followUpNote && (
            <p className="text-xs text-muted-foreground italic mt-1">
              {lead.followUpNote}
            </p>
          )}
        </Card>

        <Card className="space-y-2">
          <h3 className="font-semibold">Sinov darsi</h3>
          <InfoRow
            label="Sana"
            value={lead.trialDate ? formatDateUz(lead.trialDate) : null}
          />
          <InfoRow label="Guruh" value={lead.trialGroup?.name} />
          {lead.convertedAt && (
            <>
              <h3 className="font-semibold pt-2 border-t">Konversiya</h3>
              <InfoRow
                label="Sana"
                value={formatDateUz(lead.convertedAt)}
              />
            </>
          )}
        </Card>
      </div>

      {lead.notes && (
        <Card>
          <h3 className="font-semibold mb-1">Izoh</h3>
          <p className="text-sm">{lead.notes}</p>
        </Card>
      )}

      <LeadHistoryList history={lead.history || []} />

      {/* Modallar */}
      <ModalWrapper
        name={MODAL.LEAD_EDIT}
        title="Lidni tahrirlash"
        className="max-w-xl"
      >
        <LeadEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.LEAD_DELETE_CONFIRM} title="Lidni o'chirish">
        <LeadDeleteConfirmModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.LEAD_STATUS_CHANGE}
        title="Statusni o'zgartirish"
      >
        <StatusChangeModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.LEAD_ADD_NOTE} title="Eslatma qo'shish">
        <AddNoteModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.LEAD_RECORD_CONTACT}
        title="Bog'lanishni qayd qilish"
      >
        <RecordContactModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.LEAD_SET_FOLLOWUP} title="Eslatma sozlash">
        <SetFollowUpModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.LEAD_SET_TRIAL} title="Sinov darsi sozlash">
        <SetTrialModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.LEAD_CONVERT}
        title="Lidni o'quvchiga aylantirish"
        className="max-w-xl"
      >
        <ConvertToStudentModal />
      </ModalWrapper>
    </div>
  );
};

export default LeadDetailPage;
