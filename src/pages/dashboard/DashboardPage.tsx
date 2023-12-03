import ActionStatistic from "@/pages/dashboard/_comps/action-statistic";
import NewUsers from "./_comps/new-users";
import StatisticRevenue from "./_comps/statistic-revenue";
import TopUsers from "./_comps/top-users";

export default function DashboardPage() {
  return (
    <div className="px-4 py-4 grid gap-6">
      {/* <div className="grid grid-cols-[3fr_4fr] gap-6">
        <div className="flex flex-col justify-between gap-6">
          {["Số người đăng ký mới", "Số người mua gói"].map((title) => (
            <CardInfo key={title} title={title} />
          ))}
        </div>
        <div>
          <Card>
            <div>
              <p>Báo cáo gần đây</p>
              <span>100</span>
            </div>
          </Card>
        </div>
      </div> */}
      <div className="rounded-md grid grid-cols-2 gap-6">
        <div className="bg-white  p-6">
          <NewUsers />
        </div>
        <div className="bg-white  p-6">
          <TopUsers />
        </div>
      </div>
      <div className="bg-white p-6 rounded-md">
        <StatisticRevenue />
      </div>
      <ActionStatistic />
    </div>
  );
}
