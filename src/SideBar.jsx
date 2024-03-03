import {
  AreaChart,
  DollarSign,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  UserRoundCog,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils.js";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";

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
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <MoreVertical className={"h-4 cursor-pointer"} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="text-sm bg-gray-50 outline-none  p-1"
            align={"end"}
          >
            <DropdownMenuItem role={"button"} onClick={() => handleLogout()}>
              <LogOut className={"h-4 w-4"} />
              <span className={"ml-1 text-destructive"}>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className={"pl-2"}>
        <ul className={"mt-5"}>
          <li>
            <SideMenuItem
              icon={<LayoutDashboard className={"w-5 h-5"} />}
              title={"Dashboard"}
              to={"/app/home"}
            />
          </li>
          <li>
            <SideMenuItem
              icon={<DollarSign className={"w-5 h-5"} />}
              title={"Expenses"}
              to={"/app/expenses?page=1"}
            />
          </li>
          <li>
            <SideMenuItem
              icon={<AreaChart className={"w-5 h-5"} />}
              title={"Reports"}
              to={"/app/reports"}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;

const SideMenuItem = ({ icon, title, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return cn(
          "flex items-center p-2 rounded-l-md  ",
          isActive ? "text-accent-foreground bg-gray-50" : "hover:bg-blue-800",
        );
      }}
    >
      <span className={"w-5 h-5"}>{icon}</span>
      <div className={"ml-2"}>{title}</div>
    </NavLink>
  );
};
