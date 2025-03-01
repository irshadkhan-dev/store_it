import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useState } from "react";
import {
  convertFileSize,
  getFileIconByExtention,
  getRelevantFile,
  getSpaceUsedSummary,
} from "@/utils/helperFunc";
import { getAllFile } from "@/serverFn/serverFn";
import { SORTING_OPTION } from "@/types/auth";
import FileCard from "@/components/FileCard";
import { Rabbit } from "lucide-react";

export const Route = createFileRoute("/_layout/_/$fileType")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { userId } = context;
    return { params, userId };
  },
});

function RouteComponent() {
  const { params, userId } = Route.useLoaderData();
  const [sortingOption, setSortingOptions] = useState<SORTING_OPTION>("newest");

  const { data } = useQuery({
    queryKey: ["allFiles"],
    queryFn: async () => await getAllFile({ data: userId }),
    staleTime: Infinity,
  });

  const relavantFile = getRelevantFile({
    data: data!,
    sortBy: sortingOption,
    fileType: params.fileType,
  });

  const totalSpaceUsed = getSpaceUsedSummary({ data: data! });
  const totalSpace = convertFileSize(totalSpaceUsed[params.fileType]?.size);
  return (
    <div className="h-full flex flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-semibold text-gray-700">{`${params.fileType[0].toLocaleUpperCase()}${params.fileType.slice(1)}`}</h1>
        <div className="flex justify-between items-center">
          <div>
            Total: <span>{totalSpace}</span>
          </div>

          <div className="">
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
      {relavantFile.length === 0 ? (
        <>
          <div className="flex flex-col items-center justify-center h-full ">
            <Rabbit className="w-40 h-40 text-gray-400" />
            <span className="text-4xl text-gray-400">No File Uploads</span>
          </div>
        </>
      ) : (
        <>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5">
            {relavantFile.map((file) => (
              <FileCard
                key={file.id}
                name={file.name}
                size={convertFileSize(file.size)}
                createdAt={file.createdAt}
                url={
                  file.fileType === "image"
                    ? file.url
                    : getFileIconByExtention(file.name)
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
