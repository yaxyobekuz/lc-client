import { useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import { useResolveMutation } from "../../hooks/useFeedbackMutations";

const ResolveModal = ({
  feedbackId,
  currentReply,
  close,
  isLoading,
  setIsLoading,
}) => {
  const [adminReply, setAdminReply] = useState(currentReply || "");
  const { mutate } = useResolveMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    mutate({ id: feedbackId, adminReply: adminReply.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Status "Hal qilindi" ga o'zgaradi va muallifga avto-xabar yuboriladi
        (anonim bo'lmasa).
      </p>
      <div>
        <label className="text-sm font-medium block mb-1">
          Yakuniy javob (ixtiyoriy)
        </label>
        <textarea
          rows={4}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Yakuniy izoh..."
          value={adminReply}
          onChange={(e) => setAdminReply(e.target.value)}
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
          {isLoading ? "Yopilmoqda..." : "Hal qilindi"}
        </Button>
      </div>
    </form>
  );
};

export default ResolveModal;
