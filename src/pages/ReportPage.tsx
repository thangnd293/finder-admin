import PageLayout from "@/layouts/PageLayout";
import ReportTable from "@/modules/report/ReportTable";

export default function ReportPage() {
  return (
    <PageLayout header="Báo cáo">
      <ReportTable />
    </PageLayout>
  );
}
