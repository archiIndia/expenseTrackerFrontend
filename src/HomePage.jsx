import { useEffect } from "react";
import SideBar from "./SideBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navi = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navi("/sign_in");
      return;
    }
  }, []);
  return (
    <div className={"flex"}>
      <div className={"min-w-60 h-screen"}>
        <SideBar />
      </div>
      <div className={"w-full h-screen overflow-scroll"}>
        <Outlet />
      </div>
    </div>
  );
};
export default HomePage;
