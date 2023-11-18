import NewUsers from "./_comps/new-users";
import StatisticRevenue from "./_comps/statistic-revenue";

export default function DashboardPage() {
  return (
    <div className="px-4 py-4 grid gap-4">
      {/* <div className="grid grid-cols-[3fr_4fr] gap-4">
        <div className="flex flex-col justify-between gap-4">
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
      <div className="bg-white p-6 rounded-md">
        <StatisticRevenue />
      </div>
      <div className="bg-white p-6 rounded-md">
        <NewUsers />
      </div>
    </div>
  );
}
