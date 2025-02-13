import { SidebarFolderData } from "../utils/data";
import SidebarFolderBtn from "./SidebarFolderBtn";

type User = {
  firstName: string;
  email: string;
};

const Sidebar = ({ firstName, email }: User) => {
  return (
    <div className="flex flex-col">
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
      <div className="flex flex-col space-y-4 pt-7">
        <div>
          <img src="/illustration.png" alt="" className="w-72 h-60 shrink-0" />
        </div>

        <div className="flex flex-row items-center space-x-2 rounded-lg bg-[#F2F4F8] p-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-center text-xl font-bold text-white">
            A
          </div>
          <div className="flex flex-col">
            <span>{firstName}</span>
            <span className="text-sm">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
