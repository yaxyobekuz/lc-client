import { useState } from "react";

// Components
import Card from "@/shared/components/ui/card/Card";
import { GroupPicker } from "@/owner/features/attendance";
import Leaderboard from "../components/Leaderboard";

// Hooks
import useLeaderboardQuery from "../hooks/useLeaderboardQuery";

const RatingPage = () => {
  // scope: "all" yoki groupId
  const [groupId, setGroupId] = useState("");
  const scope = groupId || "all";

  const { data, isLoading } = useLeaderboardQuery({ scope });
  const items = data?.items || [];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Reyting</h1>

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 min-w-0">
          <GroupPicker
            value={groupId}
            onChange={setGroupId}
            label="Guruh (ixtiyoriy — bo'sh = umumiy)"
          />
        </div>
        {groupId && (
          <button
            type="button"
            onClick={() => setGroupId("")}
            className="text-sm text-sky-600 hover:underline"
          >
            Umumiy reytingga qaytish
          </button>
        )}
      </Card>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <Leaderboard items={items} emptyText="Hali reyting ma'lumoti yo'q" />
      )}
    </div>
  );
};

export default RatingPage;
