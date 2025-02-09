import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/images/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello Images</div>;
}
