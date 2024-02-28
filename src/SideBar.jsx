import { AreaChart, DollarSign, UserRoundCog } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

const SideBar = () => {
  const navi = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      navi("/sign_in");
    } catch (error) {
      console.log("Could not Log Out...");
    }
  };
  return (
    <div className="bg-blue-600 h-screen text-white">
      <div className={"logo flex justify-between items-center p-3"}>
        <h2 className={" uppercase text-lg font-semibold tracking-wider"}>
          Small Book
        </h2>
        <span>
          <Button
            onClick={handleLogout}
            className="flex flex-shrink text-rose-700 bg-rose-400 rounded-md font-semibold"
          >
            Log Out
          </Button> </span>
        </div>
          
      
      <div className={"pl-1 "}>
        <ul className={"mt-5"}>
          <li className={"hover:bg-blue-800 rounded-l-md"}>
            <a href="#" className={"flex items-center p-2"}>
              <span className={"w-5 h-5"}>
                <DollarSign className={"w-5 h-5"} />
              </span>
              <span className={"ml-2"}>Expenses</span>
            </a>
          </li>
          <li className={"hover:bg-blue-800 rounded-l-md"}>
            <a href="#" className={"flex items-center p-2"}>
              <span className={"w-5 h-5"}>
                <AreaChart className={"w-5 h-5"} />
              </span>
              <span className={"ml-2"}>Reports</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
