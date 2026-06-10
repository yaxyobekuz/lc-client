import { useMemo, useState } from "react";
import ErrorState from "@/shared/components/ui/feedback/ErrorState";
import PeriodToggle from "../components/PeriodToggle";
import { resolvePeriod } from "../utils/period";
import LeadKpiCards from "../components/LeadKpiCards";
import LeadFunnel from "../components/LeadFunnel";
import LeadSourcePerformance from "../components/LeadSourcePerformance";
import LeadDirectionDemand from "../components/LeadDirectionDemand";
import LeadDropOff from "../components/LeadDropOff";
import useLeadStatsQuery from "../hooks/useLeadStatsQuery";

const LeadsStatsPage = () => {
  const [preset, setPreset] = useState("all");
  const period = useMemo(() => resolvePeriod(preset), [preset]);

  const { data, isLoading, isError, refetch } = useLeadStatsQuery({
    from: period.from,
    to: period.to,
  });

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Lidlar statistikasi</h1>
          <p className="text-sm text-muted-foreground">
            Voronka, manba samaradorligi va konversiya tahlili
          </p>
        </div>
        <PeriodToggle value={preset} onChange={setPreset} />
      </header>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <>
          <LeadKpiCards stats={data} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <LeadFunnel funnel={data?.funnel || []} rates={data?.rates} />
            <LeadDropOff rows={data?.dropOffByStage || []} />
            <LeadSourcePerformance rows={data?.bySource || []} />
            <LeadDirectionDemand rows={data?.byDirection || []} />
          </div>
        </>
      )}
    </div>
  );
};

export default LeadsStatsPage;
