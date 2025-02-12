import { createFileRoute, Link } from "@tanstack/react-router";
import AuthPage from "../components/auth/AuthPage";

export const Route = createFileRoute("/")({
  component: AuthPage,
});
