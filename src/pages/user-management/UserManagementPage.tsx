import PageLayout from "@/layouts/PageLayout";
import UserTable from "@/modules/user-management/UserTable";
import AgeChart from "@/pages/user-management/_ui/age-chart";
import GenderChart from "@/pages/user-management/_ui/gender-chart";

export default function UserManagementPage() {
  return (
    <PageLayout isContainer={false} header="Người dùng">
      <div className="grid gap-10">
        <div className="grid grid-cols-[1fr_2fr] gap-14">
          <AgeChart />
          <GenderChart />
        </div>
        <div className="container mx-auto px-8 py-5 shadow-sm bg-white border-border border border-solid rounded-md">
          <UserTable />
        </div>
      </div>
    </PageLayout>
  );
}
