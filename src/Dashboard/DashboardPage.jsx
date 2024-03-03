import TopExpenses from "@/Dashboard/TopExpenses.jsx";

const DashboardPage = () => {
  return (
    <div className={"p-5"}>
      <h1>Dashboard</h1>
        <div className={"flex my-5 h-60"}>
            <div className={"w-1/3"}>
                <TopExpenses/>
            </div>
        </div>
    </div>
  );
};
export default DashboardPage;