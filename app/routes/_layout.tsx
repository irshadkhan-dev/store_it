import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import UploadDropzone from "@/components/UploadDropzone";

import { getAllFile } from "@/serverFn/serverFn";

import { getAuth } from "@clerk/tanstack-start/server";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

import { useState } from "react";
import { getWebRequest } from "vinxi/http";

const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  if (!userId) {
    throw redirect({
      to: "/auth/auth-page",
    });
  }

  return { userId };
});

export const Route = createFileRoute("/_layout")({
  beforeLoad: async () => {
    const { userId } = await authStateFn();
    return { userId };
  },

  component: RouteComponent,
  loader: async ({ context }) => {
    const { userId } = context;
    await context.queryClient.prefetchQuery({
      queryKey: ["allFiles"],
      queryFn: async () => await getAllFile({ data: userId }),
      staleTime: Infinity,
    });
    return { userId };
  },
  staleTime: Infinity,
});

function RouteComponent() {
  const { userId } = Route.useLoaderData();
  if (!userId) return null;

  const [dropZoneActive, setDropZoneActive] = useState(false);

  return (
    <>
      {dropZoneActive && (
        <UploadDropzone setDropZoneActive={setDropZoneActive} />
      )}

      <main className="max-h-screen w-full px-4 md:px-8 py-4">
        <Navbar setDropZoneActive={setDropZoneActive} />
        <div className="h-[calc(100vh-6rem-1px)] flex flex-row mt-4">
          <Sidebar className="h-full hidden md:flex mr-4" userId={userId} />

          <div className="w-full h-full rounded-xl bg-[#f1f4f8] p-4 overflow-scroll no-scrollbar">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
