import { createAPIFileRoute } from "@tanstack/react-start/api";
import { createRouteHandler } from "uploadthing/server";
import { uploadRouter } from "@/routes/api/uploadthing/core";

const handler = createRouteHandler({ router: uploadRouter });

export const APIRoute = createAPIFileRoute("/api/uploadthing")({
  GET: handler,
  POST: handler,
});
