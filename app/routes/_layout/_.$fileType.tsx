import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { UserData } from "@/types/auth";
import db from "@/db";
import { filesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createServerFn } from "@tanstack/start";
import Loading from "@/components/Loading";
import ErrorComp from "@/components/Error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type SORTING_OPTION = "newest" | "oldest";

const getAllFile = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async (ctx) => {
    return await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.ownerId, ctx.data))
      .orderBy(filesTable.createdAt);
  });

export const Route = createFileRoute("/_layout/_/$fileType")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const user = context.queryClient.getQueryData<UserData>(["user"]);
    return { params, user };
  },
});

function RouteComponent() {
  const { params, user } = Route.useLoaderData();
  if (!user) return null;

  const [sortingOption, setSortingOptions] = useState<SORTING_OPTION>("newest");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allFiles"],
    queryFn: async () => await getAllFile({ data: user.id! }),
    staleTime: Infinity,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComp />;

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-semibold text-gray-700">{`${params.fileType[0].toLocaleUpperCase()}${params.fileType.slice(1)}`}</h1>
        <div className="flex justify-between items-center">
          <div>
            Total: <span>100Mb</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-full">Sort by:</span>
            <Select
              onValueChange={(value: SORTING_OPTION) =>
                setSortingOptions(value)
              }
              defaultValue={sortingOption}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{"Date created(newest)"}</SelectItem>
                <SelectItem value="oldest">{"Date created(oldest)"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
