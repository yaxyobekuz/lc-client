import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import { MODAL } from "@/shared/constants/modals";

import LeadOptionsTab from "../components/LeadOptionsTab";
import LeadOptionCreateModal from "../components/LeadOptionCreateModal";
import LeadOptionEditModal from "../components/LeadOptionEditModal";
import LeadOptionDeleteModal from "../components/LeadOptionDeleteModal";

const LeadsSettingsPage = () => (
  <div className="space-y-4">
    <header>
      <h1 className="text-2xl font-semibold">Lid sozlamalari</h1>
      <p className="text-sm text-muted-foreground">
        Manba, yo'nalish va rad etish sabablarini boshqaring
      </p>
    </header>

    <TabsButtons
      defaultValue="source"
      items={[
        {
          value: "source",
          label: "Manba",
          content: <LeadOptionsTab kind="source" addLabel="Yangi manba" />,
        },
        {
          value: "direction",
          label: "Yo'nalish",
          content: <LeadOptionsTab kind="direction" addLabel="Yangi yo'nalish" />,
        },
        {
          value: "rejection",
          label: "Rad etish sabablari",
          content: <LeadOptionsTab kind="rejection" addLabel="Yangi sabab" />,
        },
      ]}
    />

    <ModalWrapper name={MODAL.LEAD_OPTION_CREATE} title="Qo'shish">
      <LeadOptionCreateModal />
    </ModalWrapper>
    <ModalWrapper name={MODAL.LEAD_OPTION_EDIT} title="Tahrirlash">
      <LeadOptionEditModal />
    </ModalWrapper>
    <ModalWrapper name={MODAL.LEAD_OPTION_DELETE} title="O'chirish">
      <LeadOptionDeleteModal />
    </ModalWrapper>
  </div>
);

export default LeadsSettingsPage;
