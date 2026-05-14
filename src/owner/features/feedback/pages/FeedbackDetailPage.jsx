import { Link, useParams } from "react-router-dom";
import Card from "@/shared/components/ui/card/Card";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import { formatDateUz } from "@/shared/utils/formatDate";
import { MODAL } from "@/shared/constants/modals";

import FeedbackStatusBadge from "../components/FeedbackStatusBadge";
import FeedbackActionsBar from "../components/FeedbackActionsBar";
import ReplyModal from "../components/modals/ReplyModal";
import ResolveModal from "../components/modals/ResolveModal";
import RejectModal from "../components/modals/RejectModal";
import { useFeedbackDetailQuery } from "../hooks/useFeedbackQueries";
import BackLink from "@/shared/components/ui/link/BackLink";

const InfoRow = ({ label, children }) => (
  <div className="flex justify-between gap-3 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right">{children || "—"}</span>
  </div>
);

const FeedbackDetailPage = () => {
  const { id } = useParams();
  const { data: f, isLoading } = useFeedbackDetailQuery(id);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Yuklanmoqda...
      </div>
    );
  }
  if (!f) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Feedback topilmadi</p>
        <Link to="/owner/feedback" className="text-blue-600 hover:underline">
          Feedback ro'yxatiga qaytish
        </Link>
      </div>
    );
  }

  const isAnonymous = f.isAnonymous || !f.author;

  return (
    <div className="space-y-4">
      <header className="flex items-center gap-3 flex-wrap mt-1">
        <BackLink to="/owner/feedback" />

        <h1 className="text-2xl font-semibold">{f.type?.name || "Feedback"}</h1>

        <FeedbackStatusBadge status={f.status} />

        {isAnonymous && (
          <span className="text-sm text-muted-foreground italic">Anonim</span>
        )}
      </header>

      <FeedbackActionsBar feedback={f} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="space-y-2 lg:col-span-2">
          <h3 className="font-semibold">Xabar matni</h3>
          <p className="whitespace-pre-wrap text-sm">{f.message}</p>
        </Card>

        <Card className="space-y-2">
          <h3 className="font-semibold">Ma'lumot</h3>
          <InfoRow label="Muallif">
            {isAnonymous
              ? "Anonim"
              : `${f.author.firstName} ${f.author.lastName}`}
          </InfoRow>
          <InfoRow label="Rol">{f.authorRoleSnapshot}</InfoRow>
          <InfoRow label="Guruh">{f.group?.name}</InfoRow>
          <InfoRow label="Sana">{formatDateUz(f.createdAt)}</InfoRow>
          {f.reviewedAt && (
            <InfoRow label="Ko'rib chiqilgan">
              {formatDateUz(f.reviewedAt)}
              {f.reviewedBy && ` (${f.reviewedBy.firstName})`}
            </InfoRow>
          )}
          {f.repliedAt && (
            <InfoRow label="Javob berilgan">
              {formatDateUz(f.repliedAt)}
              {f.repliedBy && ` (${f.repliedBy.firstName})`}
            </InfoRow>
          )}
          {f.resolvedAt && (
            <InfoRow label="Yopilgan">
              {formatDateUz(f.resolvedAt)}
              {f.resolvedBy && ` (${f.resolvedBy.firstName})`}
            </InfoRow>
          )}
        </Card>
      </div>

      {f.adminReply && (
        <Card className="space-y-2">
          <h3 className="font-semibold">Admin javobi</h3>
          <p className="text-sm whitespace-pre-wrap">{f.adminReply}</p>
        </Card>
      )}

      {f.rejectionReason && (
        <Card className="space-y-2 border-red-200 bg-red-50/40">
          <h3 className="font-semibold text-red-700">Rad etish sababi</h3>
          <p className="text-sm whitespace-pre-wrap">{f.rejectionReason}</p>
        </Card>
      )}

      <ModalWrapper
        title="Javob yozish"
        name={MODAL.FEEDBACK_REPLY}
        description="Javob foydalanuvchiga xabar sifatida yuboriladi"
      >
        <ReplyModal />
      </ModalWrapper>

      <ModalWrapper
        title="Hal qilingan"
        name={MODAL.FEEDBACK_RESOLVE}
        description="Status Hal qilindi ga o'zgaradi va muallifga avto-xabar yuboriladi"
      >
        <ResolveModal />
      </ModalWrapper>

      <ModalWrapper
        title="Rad etish"
        name={MODAL.FEEDBACK_REJECT}
        description="Status Rad etildi ga o'zgaradi va muallifga avto-xabar yuboriladi"
      >
        <RejectModal />
      </ModalWrapper>
    </div>
  );
};

export default FeedbackDetailPage;
