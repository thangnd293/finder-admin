import ReportTable from "@/modules/report/ReportTable";

const ReportPage = () => {
  return (
    <div>
      <header className="sticky text-xl font-bold flex items-center px-8 top-0 h-header shadow-sm bg-white z-50">
        Báo cáo
      </header>
      <main className="container p-8 mx-auto">
        <div className="container mx-auto px-8 py-5 shadow-sm bg-white border-border border border-solid rounded-md">
          <ReportTable />
        </div>
      </main>
    </div>
  );
};

export default ReportPage;
