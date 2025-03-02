import AuthPage from "@/components/auth/AuthPage";
import { getAuth } from "@clerk/tanstack-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getWebRequest } from "vinxi/http";

export const Route = createFileRoute("/auth/auth-page/")({
  beforeLoad: async () => {
    const { userId } = await getAuth(getWebRequest());
    if (userId) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: AuthPage,
});
