import AvailableSpaceCard from "@/components/dashboard/AvailableSpaceCard";
import db from "@/db";
import { filesTable } from "@/db/schema";

import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { eq } from "drizzle-orm";

import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import SpaceCard from "@/components/dashboard/SpaceCard";

import { UserData } from "@/types/auth";
import {
  getRecentFileUploaded,
  getSpaceUsedSummary,
  getTotalSpaceUsed,
  getUsageSummary,
} from "@/utils/helperFunc";
import { useCallback } from "react";
import RecentFileCard from "@/components/dashboard/RecentFileUploads";
import ErrorComp from "@/components/Error";

const getAllFile = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async (ctx) => {
    return await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.ownerId, ctx.data))
      .orderBy(filesTable.createdAt);
  });

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const user = context.queryClient.getQueryData<UserData>(["user"]);
    return user;
  },
});

function RouteComponent() {
  const user = Route.useLoaderData();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["allFiles"],
    queryFn: async () => await getAllFile({ data: user?.id! }),
    staleTime: Infinity,
  });

  const getTotalSpace = useCallback(getTotalSpaceUsed, [data]);
  const getSpaceSummary = useCallback(getSpaceUsedSummary, [data]);

  const spaceSummary = getSpaceSummary({ data: data! });
  const totalSpaceUsed = getTotalSpace({ data: data! });

  if (isError) return <ErrorComp />;
  if (isLoading) return <Loading />;

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
        <div className="flex flex-col space-y-4 mt-4">
          {recentFiles.map((item) => (
            <RecentFileCard
              name={item.name}
              icon={item.icon}
              iconBgColor={item.iconBgColor}
              createdAt={item.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
