import { cn } from "@/lib/utils";
import { SidebarFolderData } from "../utils/data";
import SidebarFolderBtn from "./SidebarFolderBtn";
import { createServerFn } from "@tanstack/react-start";
import { clerkClient } from "@clerk/tanstack-start/server";

import { useQuery } from "@tanstack/react-query";

const userInfoFn = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async (ctx) => {
    const client = clerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

    const userData = ctx.data ? await client.users.getUser(ctx.data) : null;
    const user = {
      id: userData?.id!,
      email: userData?.emailAddresses[0].emailAddress!,
      firstName: userData?.firstName!,
    };
    return user;
  });

const Sidebar = ({
  className,
  userId,
}: {
  className?: string;
  userId: string;
}) => {
  const { data } = useQuery({
    queryKey: ["user-info"],
    queryFn: async () => await userInfoFn({ data: userId }),
    staleTime: Infinity,
  });

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
            <span>{data?.firstName}</span>
            <span className="text-xs">{data?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
