import Expense from "./Expense.jsx";
import SideBar from "./SideBar.jsx";

const HomePage = () => {
  return (
    <div className={"flex"}>
      <div className={"min-w-60"}>
        <SideBar />
      </div>
      <div className={"w-full"}>
        <Expense />
      </div>
    </div>
  );
};
export default HomePage;
