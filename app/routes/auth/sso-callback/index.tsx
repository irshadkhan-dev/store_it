import { AuthenticateWithRedirectCallback } from "@clerk/tanstack-start";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/auth/sso-callback/")({
  component: SSOCallback,
});

function SSOCallback() {
  return <AuthenticateWithRedirectCallback />;
}
