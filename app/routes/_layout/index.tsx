import AvailableSpaceCard from "@/components/dashboard/AvailableSpaceCard";
import db from "@/db";
import { filesTable } from "@/db/schema";

import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { eq } from "drizzle-orm";

import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import SpaceCard from "@/components/dashboard/SpaceCard";
import { FolderOpenDot } from "lucide-react";
import { getSpaceUsed } from "@/utils/helperFunc";
import { UserData } from "@/types/auth";

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

  const { document, media, image, other } = getSpaceUsed({ data: data! });

  if (isError) return <div>Error</div>;
  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-10">
      <div className="flex flex-col">
        <AvailableSpaceCard />
        <div className="mt-6 grid grid-cols-1 gap-4 xl:mt-10 lg:grid-cols-2 xl:gap-9">
          <SpaceCard
            icon={FolderOpenDot}
            iconColor="#FF7474"
            category="Documents"
            link="/documents"
            lastUpdatedDate="10:15am, 20Feb"
          />
        </div>
      </div>
    </div>
  );
}
