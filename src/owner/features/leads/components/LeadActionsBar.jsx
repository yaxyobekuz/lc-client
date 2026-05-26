import {
  Phone,
  StickyNote,
  AlarmClock,
  GraduationCap,
  RefreshCw,
  UserCheck,
} from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

const LeadActionsBar = ({ lead }) => {
  const { openModal } = useModal();
  if (!lead) return null;

  const isFinal = lead.status?.isFinal;
  const isConverted = !!lead.convertedUser;

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          openModal(MODAL.LEAD_RECORD_CONTACT, { leadId: lead._id })
        }
      >
        <Phone className="size-4" />
        Bog'lanish
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          openModal(MODAL.LEAD_ADD_NOTE, { leadId: lead._id })
        }
      >
        <StickyNote className="size-4" />
        Eslatma
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          openModal(MODAL.LEAD_SET_FOLLOWUP, {
            leadId: lead._id,
            current: {
              date: lead.followUpDate,
              note: lead.followUpNote,
            },
          })
        }
      >
        <AlarmClock className="size-4" />
        Eslatma sozlash
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          openModal(MODAL.LEAD_SET_TRIAL, {
            leadId: lead._id,
            current: {
              date: lead.trialDate,
              groupId: lead.trialGroup?._id || lead.trialGroup,
            },
          })
        }
      >
        <GraduationCap className="size-4" />
        Sinov darsi
      </Button>
      {!isConverted && (
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            openModal(MODAL.LEAD_STATUS_CHANGE, {
              leadId: lead._id,
              currentStatusId: lead.status?._id,
            })
          }
        >
          <RefreshCw className="size-4" />
          Status
        </Button>
      )}
      {!isConverted && !isFinal && (
        <Button
          size="sm"
          onClick={() =>
            openModal(MODAL.LEAD_CONVERT, { lead })
          }
        >
          <UserCheck className="size-4" />
          O'quvchiga aylantirish
        </Button>
      )}
    </div>
  );
};

export default LeadActionsBar;
