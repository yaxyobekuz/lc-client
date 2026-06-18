import ErrorState from "@/shared/components/ui/feedback/ErrorState";

import StudentStatCards from "../components/StudentStatCards";
import EnrollmentTrendChart from "../components/EnrollmentTrendChart";
import DurationCohortBars from "../components/DurationCohortBars";
import RecentEnrollmentsList from "../components/RecentEnrollmentsList";

import useStudentStatsQuery from "../hooks/useStudentStatsQuery";

const StudentStatsPage = () => {
  const { data, isLoading, isError, refetch } = useStudentStatsQuery({
    months: 12,
    recentLimit: 8,
  });

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold">O'quvchilar statistikasi</h1>
      </header>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <StudentStatCards data={data} />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <EnrollmentTrendChart items={data?.enrollmentTrend || []} />
            </div>
            <DurationCohortBars cohorts={data?.cohorts || []} />
          </div>

          <RecentEnrollmentsList items={data?.recentEnrollments || []} />
        </>
      )}
    </div>
  );
};

export default StudentStatsPage;
