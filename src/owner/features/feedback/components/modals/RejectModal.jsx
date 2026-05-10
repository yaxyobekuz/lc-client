import { useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import { useRejectMutation } from "../../hooks/useFeedbackMutations";

const RejectModal = ({ feedbackId, close, isLoading, setIsLoading }) => {
  const [reason, setReason] = useState("");
  const { mutate } = useRejectMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    setIsLoading(true);
    mutate({ id: feedbackId, rejectionReason: reason.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-xs text-amber-700">
        Status "Rad etildi" ga o'zgaradi va muallifga avto-xabar yuboriladi
        (anonim bo'lmasa). Sabab majburiy.
      </p>
      <div>
        <label className="text-sm font-medium block mb-1">
          Rad etish sababi
        </label>
        <textarea
          rows={4}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Sababini yozing..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
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
        <Button
          type="submit"
          variant="destructive"
          disabled={isLoading || !reason.trim()}
          className="flex-1"
        >
          {isLoading ? "Saqlanmoqda..." : "Rad etish"}
        </Button>
      </div>
    </form>
  );
};

export default RejectModal;
