import Expense from "./Expense.jsx";
import SideBar from "./SideBar.jsx";
import LoginPage from "@/LoginPage.jsx";
import SignUpPage from "@/SignUpPage.jsx";

const HomePage = () => {
  const isVerified = false;
  if (!isVerified) {
    return <SignUpPage />;
  }

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
