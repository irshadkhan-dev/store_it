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
import { getSpaceUsedSummary, getUsageSummary } from "@/utils/helperFunc";
import { useCallback } from "react";

const getAllFile = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async (ctx) => {
    return await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.ownerId, ctx.data))
      .orderBy(filesTable.id);
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

  const getSpaceSummary = useCallback(getSpaceUsedSummary, [data]);
  const spaceSummary = getSpaceSummary({ data: data! });

  if (isError) {
    console.log("error loading component");
  }
  if (isLoading) return <Loading />;

  const cardSummary = getUsageSummary(spaceSummary);
  console.log(spaceSummary);
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-10">
      <div className="flex flex-col">
        <AvailableSpaceCard />
        <div className="mt-6 grid grid-cols-1 gap-4 xl:mt-10 lg:grid-cols-2 xl:gap-9">
          {cardSummary.map((item) => (
            <SpaceCard
              key={item.title}
              title={item.title}
              icon={item.icon}
              size={item.size}
              link={item.url}
              iconColor={item.iconBgColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
