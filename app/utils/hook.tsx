import { getAllFile } from "@/serverFn/serverFn";
import { useQuery } from "@tanstack/react-query";

export const useAppData = ({ userId }: { userId: string }) =>
  useQuery({
    queryKey: ["allFiles"],
    queryFn: async () => await getAllFile({ data: userId }),
    staleTime: Infinity,
  });
