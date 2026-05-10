import { useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import { useReplyMutation } from "../../hooks/useFeedbackMutations";

const ReplyModal = ({ feedbackId, currentReply, close, isLoading, setIsLoading }) => {
  const [message, setMessage] = useState(currentReply || "");
  const { mutate } = useReplyMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsLoading(true);
    mutate({ id: feedbackId, message: message.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Javob foydalanuvchiga xabar sifatida yuboriladi (anonim emas bo'lsa).
      </p>
      <div>
        <label className="text-sm font-medium block mb-1">Javob matni</label>
        <textarea
          rows={5}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Javob..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          autoFocus
          disabled={isLoading}
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => close?.()}
          disabled={isLoading}
          className="flex-1"
        >
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default ReplyModal;
