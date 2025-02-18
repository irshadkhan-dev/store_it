import AuthPage from "@/components/auth/AuthPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/auth-page/")({
  component: AuthPage,
});
