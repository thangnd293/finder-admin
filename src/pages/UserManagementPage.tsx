import PageLayout from "@/layouts/PageLayout";
import UserTable from "@/modules/user-management/UserTable";

export default function UserManagementPage() {
  return (
    <PageLayout header="Người dùng">
      <UserTable />
    </PageLayout>
  );
}
