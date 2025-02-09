import Navbar from "./Navbar";
import { Outlet } from "@tanstack/react-router";
import MaxWidthwrapper from "./MaxWidthwrapper";
import Sidebar from "./Sidebar";

const HomeLayout = () => {
  return (
    <div className="flex flex-col space-y-10">
      <Navbar />
      <MaxWidthwrapper>
        <div className="flex flex-row">
          <div className="hidden md:flex">
            <Sidebar />
          </div>
          <Outlet />
        </div>
      </MaxWidthwrapper>
    </div>
  );
};

export default HomeLayout;
