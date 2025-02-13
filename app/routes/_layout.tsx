import MaxWidthwrapper from "@/components/MaxWidthwrapper";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import {
  createFileRoute,
  Outlet,
  redirect,
  useLoaderData,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { EmailAddress, getAuth } from "@clerk/tanstack-start/server";
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
  const user = await client.users.getUser(userId);

  const { id, firstName, emailAddresses } = user;
  const email = emailAddresses[0].emailAddress;
  const User = {
    id,
    firstName,
    email,
  };

  return { User };
});

export const Route = createFileRoute("/_layout")({
  beforeLoad: () => authStateFn(),
  component: HomeLayout,
  loader: async ({ context }) => {
    return { user: context.User };
  },
});

function HomeLayout() {
  const { user } = Route.useLoaderData();

  return (
    <div className="flex flex-col space-y-10">
      <Navbar />
      <MaxWidthwrapper>
        <div className="flex flex-row">
          <div className="hidden md:flex">
            <Sidebar firstName={user.firstName!} email={user.email} />
          </div>
          <Outlet />
        </div>
      </MaxWidthwrapper>
    </div>
  );
}
