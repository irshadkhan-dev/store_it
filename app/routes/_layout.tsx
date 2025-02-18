import MaxWidthwrapper from "@/components/MaxWidthwrapper";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { clerkClient, getAuth } from "@clerk/tanstack-start/server";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getWebRequest } from "vinxi/http";

type UserData = {
  id: string | undefined;
  email: string | undefined;
  firstName: string | null | undefined;
};

const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());
  if (!userId) {
    throw redirect({
      to: "/auth/auth-page",
    });
  }

  const client = await clerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

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
  loader: ({ context }) => {
    const user = context.queryClient.getQueryData<UserData>(["user"]);
    return user;
  },
});

function RouteComponent() {
  const user = Route.useLoaderData();
  if (!user) return null;
  return (
    <div className="flex flex-col space-y-10">
      <Navbar />
      <MaxWidthwrapper>
        <div className="flex flex-row">
          <div className="hidden md:flex shrink-0 mr-8">
            <Sidebar firstName={user.firstName!} email={user.email!} />
          </div>
          <div className="w-full py-6 px-4 rounded-xl bg-[#F2F4F8]">
            <Outlet />
          </div>
        </div>
      </MaxWidthwrapper>
    </div>
  );
}
