import {AreaChart, DollarSign, UserRoundCog} from "lucide-react";

const SideBar = () => {
  return (
    <div className="bg-blue-600 h-screen text-white">
      <div className={"logo flex justify-between items-center p-3"}>
        <h2 className={" uppercase text-lg font-semibold tracking-wider"}>Small Book</h2>
        <UserRoundCog className={"w-5 h-5"} />
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
