
import {AreaChart, DollarSign, LayoutDashboard, UserRoundCog} from "lucide-react";
import { NavLink} from "react-router-dom";
import {cn} from "@/lib/utils.js";
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
            className="flex flex-shrink text-rose-700"
          >
            Log Out
          </Button> </span>
        </div>
          
       <div className={"pl-1 "}>
        <ul className={"mt-5"}>
          <li >
              <SideMenuItem icon={<LayoutDashboard className={"w-5 h-5"} />} title={"Dashboard"} to={"/app/home"} />
          </li>
            <li >
              <SideMenuItem icon={<DollarSign className={"w-5 h-5"} />} title={"Expenses"} to={"/app/expenses?page=1"} />
          </li>
          <li>
              <SideMenuItem icon={<AreaChart className={"w-5 h-5"} />} title={"Reports"} to={"/app/reports"} />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;

const SideMenuItem = ({icon, title, to}) => {
    return (
        <NavLink
            to={to}
            className={({isActive})=>{
                return cn("flex items-center  rounded-l-md p-2",isActive ? "text-accent-foreground bg-gray-50" : "hover:bg-blue-800")
            }}>
            <span className={"w-5 h-5"}>
            {icon}
            </span>
            <div className={"ml-2"}>
            {title}
            </div>
        </NavLink>
    );
}
