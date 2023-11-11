import PageLayout from "@/layouts/PageLayout";
import DatingTable from "@/modules/dating/DatingTable";

export default function DatingPage() {
  return (
    <PageLayout header="Cuộc hẹn">
      <DatingTable />
    </PageLayout>
  );
}
