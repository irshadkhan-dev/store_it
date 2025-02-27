import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import UploadDropzone from "@/components/UploadDropzone";

import { UserData } from "@/types/auth";

import { clerkClient, getAuth } from "@clerk/tanstack-start/server";
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

  const client = clerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

  const userData = userId ? await client.users.getUser(userId) : null;
  const user = {
    id: userData?.id,
    email: userData?.emailAddresses[0].emailAddress,
    firstName: userData?.firstName,
  };
  return user;
});

export const Route = createFileRoute("/_layout")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery<UserData>({
      queryKey: ["user"],
      queryFn: async () => await authStateFn(),
      staleTime: 5 * 60 * 1000,
    });

    if (!user.id) {
      throw redirect({
        to: "/auth/auth-page",
      });
    }
  },
  component: RouteComponent,
  loader: async ({ context }) => {
    const user = context.queryClient.getQueryData<UserData>(["user"]);
    return user;
  },
});

function RouteComponent() {
  const user = Route.useLoaderData();
  if (!user) return null;

  const [dropZoneActive, setDropZoneActive] = useState(false);

  return (
    <>
      {dropZoneActive && (
        <UploadDropzone setDropZoneActive={setDropZoneActive} />
      )}
      <main className="max-h-screen w-full px-4 md:px-8 py-4">
        <Navbar setDropZoneActive={setDropZoneActive} />
        <div className="h-[calc(100vh-6rem-1px)] flex flex-row mt-4">
          <Sidebar
            firstName={user.firstName!}
            email={user.email!}
            className="h-full hidden md:flex mr-4"
          />

          <div className="w-full h-full rounded-xl bg-[#f1f4f8] p-4 overflow-scroll no-scrollbar">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
