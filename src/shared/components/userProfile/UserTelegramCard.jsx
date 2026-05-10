import Card from "@/shared/components/ui/card/Card";
import { Send } from "lucide-react";

const UserTelegramCard = ({ telegram }) => {
  if (!telegram) {
    return (
      <Card>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Send className="size-4" />
          <p className="text-sm">Telegram hali bog'lanmagan</p>
        </div>
      </Card>
    );
  }

  const display = [telegram.firstName, telegram.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center size-10 rounded-full bg-blue-50 text-blue-600 shrink-0">
          <Send className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium">Telegram</p>
          <p className="text-sm text-muted-foreground">
            {display || "—"}
            {telegram.username && (
              <span className="ml-1">@{telegram.username}</span>
            )}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            ID: {telegram.telegramId}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default UserTelegramCard;
