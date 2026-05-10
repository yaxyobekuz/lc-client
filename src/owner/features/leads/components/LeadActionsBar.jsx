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
        📞 Bog'lanish
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          openModal(MODAL.LEAD_ADD_NOTE, { leadId: lead._id })
        }
      >
        📝 Eslatma
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
        ⏰ Eslatma sozlash
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
        🎓 Sinov darsi
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
          🔄 Status
        </Button>
      )}
      {!isConverted && !isFinal && (
        <Button
          size="sm"
          onClick={() =>
            openModal(MODAL.LEAD_CONVERT, { lead })
          }
        >
          ✅ O'quvchiga aylantirish
        </Button>
      )}
    </div>
  );
};

export default LeadActionsBar;
