import { cn } from "@/lib/utils";
import { SidebarFolderData } from "../utils/data";
import SidebarFolderBtn from "./SidebarFolderBtn";

const Sidebar = ({
  className,
  firstName,
  email,
}: {
  className?: string;
  firstName: string;
  email: string;
}) => {
  return (
    <div className={cn("flex flex-col justify-between", className)}>
      <div className="flex flex-col space-y-5">
        {SidebarFolderData.map((item) => (
          <SidebarFolderBtn
            key={item.id}
            name={item.name}
            icon={item.icon}
            link={item.link}
          />
        ))}
      </div>
      <div className="pt-7">
        <div className="flex flex-row items-center space-x-2 rounded-lg bg-[#F2F4F8] p-2 ">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-center text-xl font-bold text-white">
            A
          </div>
          <div className="flex flex-col">
            <span>{firstName}</span>
            <span className="text-xs">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
