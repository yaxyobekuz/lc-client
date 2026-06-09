// React
import useObjectState from "@/shared/hooks/useObjectState";

// Components
import Card from "@/shared/components/ui/card/Card";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import InputField from "@/shared/components/ui/input/InputField";
import { GroupPicker } from "@/owner/features/attendance";
import Leaderboard from "../components/Leaderboard";

// Hooks
import useLeaderboardQuery from "../hooks/useLeaderboardQuery";

// tab: "all" → markaz bo'yicha (umumiy), "group" → guruh bo'yicha
const RatingPage = () => {
  const { tab, groupId, fromDate, toDate, setField, setFields } =
    useObjectState({
      tab: "all",
      groupId: "",
      fromDate: "",
      toDate: "",
    });

  const isGroup = tab === "group";
  const scope = isGroup ? groupId || "all" : "all";

  // Sana berilsa filterga qo'shamiz (bo'sh bo'lsa — "umrbod")
  const params = { scope };
  if (fromDate) params.fromDate = fromDate;
  if (toDate) params.toDate = toDate;

  const { data, isLoading } = useLeaderboardQuery(params);
  const items = data?.items || [];

  // Guruh bo'yicha, lekin guruh hali tanlanmagan bo'lsa — natija ko'rsatmaymiz
  const needsGroup = isGroup && !groupId;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Reyting</h1>

      <Card className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          {/* Markaz bo'yicha / Guruh bo'yicha */}
          <TabsButtons
            value={tab}
            onChange={(v) => setField("tab", v)}
            items={[
              { value: "all", label: "Markaz bo'yicha" },
              { value: "group", label: "Guruh bo'yicha" },
            ]}
          />

          {/* Sana oralig'i bo'yicha filter */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <InputField
              type="date"
              label="Sanadan"
              value={fromDate}
              max={toDate || undefined}
              onChange={(e) => setField("fromDate", e.target.value)}
            />
            <InputField
              type="date"
              label="Sanagacha"
              value={toDate}
              min={fromDate || undefined}
              onChange={(e) => setField("toDate", e.target.value)}
            />
            {(fromDate || toDate) && (
              <button
                type="button"
                onClick={() => setFields({ fromDate: "", toDate: "" })}
                className="text-sm text-sky-600 hover:underline sm:pb-2.5"
              >
                Tozalash
              </button>
            )}
          </div>
        </div>

        {/* Guruh bo'yicha — guruh tanlash */}
        {isGroup && (
          <GroupPicker
            value={groupId}
            onChange={(v) => setField("groupId", v)}
            label="Guruh"
          />
        )}
      </Card>

      {needsGroup ? (
        <div className="p-8 text-center text-muted-foreground">
          Reytingni ko'rish uchun guruh tanlang
        </div>
      ) : isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <Leaderboard items={items} emptyText="Hali reyting ma'lumoti yo'q" />
      )}
    </div>
  );
};

export default RatingPage;
