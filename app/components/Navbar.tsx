import React, { useState } from "react";

import { LogOut, Search, Sidebar } from "lucide-react";

import { cn } from "../utils/helperFunc";
import MaxWidthwrapper from "./MaxWidthwrapper";
import SidebarMobile from "./SidebarMobile";
import UploadBtn from "./UploadBtn";

const Navbar = () => {
  const [open, setIsOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsOpen(!open);
  };

  const handleOpenSidebar = () => {
    setIsOpen(!open);
  };

  return (
    <>
      <SidebarMobile
        open={open}
        handleCloseSidebar={handleCloseSidebar}
        className={cn(
          "transform transition-all duration-500 ease-in-out",
          open
            ? "z-[99999] translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        )}
      />

      <MaxWidthwrapper className="mt-4 w-full">
        <div className="flex w-full flex-row items-center justify-between space-x-10">
          <div className="flex flex-row items-center space-x-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-semibold text-[#FA7275]">
                Storage
              </span>
            </div>

            <div className="hidden w-96 items-center space-x-1 rounded-2xl p-2 shadow-xl md:flex">
              <Search height={25} width={25} />
              <input
                type="text"
                className="w-full text-neutral-700 outline-none"
              />
            </div>
          </div>

          <div className="hidden flex-row items-center space-x-4 md:flex">
            <UploadBtn />
            <LogOut className="h-6 w-6 font-bold text-[#FA7275]" />
          </div>

          <div className="md:hidden">
            <Sidebar onClick={handleOpenSidebar} />
          </div>
        </div>
      </MaxWidthwrapper>
    </>
  );
};

export default Navbar;
