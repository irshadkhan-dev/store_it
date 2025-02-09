import { createFileRoute } from "@tanstack/react-router";
import HomeLayout from "../components/HomeLayout";

export const Route = createFileRoute("/_layout")({
  component: HomeLayout,
});
