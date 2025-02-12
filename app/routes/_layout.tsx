import MaxWidthwrapper from "@/components/MaxWidthwrapper";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getAuth } from "@clerk/tanstack-start/server";
import { getWebRequest } from "vinxi/http";
import { clerkClient } from "@clerk/tanstack-start/server";

const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  if (!userId) {
    throw redirect({
      to: "/",
    });
  }
  const client = clerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  const user = userId ? await client.users.getUser(userId) : null;

  return { user };
});

export const Route = createFileRoute("/_layout")({
  component: HomeLayout,
});

function HomeLayout() {
  return (
    <div className="flex flex-col space-y-10">
      <Navbar />
      <MaxWidthwrapper>
        <div className="flex flex-row">
          <div className="hidden md:flex">
            <Sidebar />
          </div>
          <Outlet />
        </div>
      </MaxWidthwrapper>
    </div>
  );
}
