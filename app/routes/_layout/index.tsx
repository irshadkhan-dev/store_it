import AvailableSpaceCard from "@/components/dashboard/AvailableSpaceCard";

import { createFileRoute } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";
import SpaceCard from "@/components/dashboard/SpaceCard";

import {
  getRecentFileUploaded,
  getSpaceUsedSummary,
  getTotalSpaceUsed,
  getUsageSummary,
} from "@/utils/helperFunc";
import { useCallback } from "react";
import RecentFileCard from "@/components/dashboard/RecentFileUploads";
import { getAllFile } from "@/serverFn/serverFn";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Rabbit } from "lucide-react";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { userId } = context;
    return { userId };
  },
});

function RouteComponent() {
  const { userId } = Route.useLoaderData();

  const { data } = useQuery({
    queryKey: ["allFiles"],
    queryFn: async () => await getAllFile({ data: userId }),
    staleTime: Infinity,
  });

  const getTotalSpace = useCallback(getTotalSpaceUsed, [data]);
  const getSpaceSummary = useCallback(getSpaceUsedSummary, [data]);

  const spaceSummary = getSpaceSummary({ data: data! });
  const totalSpaceUsed = getTotalSpace({ data: data! });

  const cardSummary = getUsageSummary(spaceSummary);
  const recentFiles = getRecentFileUploaded({ data: data! });

  return (
    <div className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-2 xl:gap-10">
      <div className="flex flex-col">
        <AvailableSpaceCard spaceUsed={totalSpaceUsed} />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
          {cardSummary.map((item) => (
            <SpaceCard
              key={item.title}
              title={item.title}
              icon={item.icon}
              size={item.size}
              link={item.url}
              iconColor={item.iconBgColor}
              latestDate={item.lastUpdated}
            />
          ))}
        </div>
      </div>

      <div className="max-lg:hidden w-full bg-white rounded-2xl  p-5 pr-10 drop-shadow-2xl">
        <h2 className="text-2xl font-bold text-neutral-700">
          Recent Files Uploaded
        </h2>

        {recentFiles.length === 0 ? (
          <>
            <div className="h-full flex flex-col items-center justify-center">
              <Rabbit className="w-32 h-32 text-gray-400" />
              <span className="text-2xl text-gray-400">No File Uploads</span>
            </div>
          </>
        ) : (
          <>
            <ScrollArea className="h-[75vh]">
              <div className="flex flex-col space-y-4 mt-4">
                {recentFiles.map((item, i) => (
                  <RecentFileCard
                    name={item.name}
                    icon={item.icon}
                    iconBgColor={item.iconBgColor}
                    createdAt={item.createdAt}
                    key={i}
                  />
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
}
