import SideBar from "./SideBar.jsx";
import {Outlet} from "react-router-dom";

const HomePage = () => {
  
  return (
    <div className={"flex"}>
      <div className={"min-w-60 h-screen"}>
        <SideBar />
      </div>
      <div className={"w-full h-screen overflow-y-auto"}>
        <Outlet/>
      </div>
    </div>
  );
};
export default HomePage;
