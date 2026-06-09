import { CheckCircle2, Clock, XCircle, Bot } from "lucide-react";
import StatusBadge from "@/shared/components/ui/badge/StatusBadge";
import {
  resolveStatusTone,
  resolveStatusLabel,
} from "@/shared/constants/notification";

const ICON = {
  success: CheckCircle2,
  warning: Clock,
  danger: XCircle,
  neutral: Bot,
};

// Modul bo'yicha YAGONA status badge — yuborildi/rejalashtirilgan/bekor/avto.
const NotificationStatusBadge = ({ status = "sent", isAuto = false }) => {
  const tone = resolveStatusTone({ status, isAuto });
  const label = resolveStatusLabel({ status, isAuto });
  return (
    <StatusBadge tone={tone} icon={ICON[tone]}>
      {label}
    </StatusBadge>
  );
};

export default NotificationStatusBadge;
