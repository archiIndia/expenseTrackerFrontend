import {AreaChart, DollarSign, UserRoundCog} from "lucide-react";
import {Link, NavLink} from "react-router-dom";
import {cn} from "@/lib/utils.js";
const SideBar = () => {
  return (
    <div className="bg-blue-600 h-screen text-white">
      <div className={"logo flex justify-between items-center p-3"}>
        <h2 className={" uppercase text-lg font-semibold tracking-wider"}>Small Book</h2>
        <UserRoundCog className={"w-5 h-5"} />
      </div>
      <div className={"pl-1 "}>
        <ul className={"mt-5"}>
          <li className={""}>
            <NavLink
                to={"/app/expenses"}
                className={({isActive})=>{
                  return cn("flex items-center  rounded-l-md p-2",isActive ? "text-accent-foreground bg-gray-50" : "hover:bg-blue-800")
                }}>
              <span className={"w-5 h-5"}>
                <DollarSign className={"w-5 h-5"} />
              </span>
              <div className={"ml-2"}>
                  Expenses
              </div>
            </NavLink>
          </li>
          <li className={"hover:bg-blue-800 rounded-l-md"}>
            <div className={"flex items-center p-2"}>
              <span className={"w-5 h-5"}>
                <AreaChart className={"w-5 h-5"} />
              </span>
              <div className={"ml-2"}>
                <Link to={"/app/reports"}>
                  Reports
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
