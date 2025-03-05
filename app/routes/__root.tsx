import { Scripts, HeadContent } from "@tanstack/react-router";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import appCss from "@/styles/app.css?url";

import { ClerkProvider } from "@clerk/tanstack-start";
import { NotFound } from "@/components/NotFound";
import { Toaster } from "react-hot-toast";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),

  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ClerkProvider>
      <html>
        <head>
          <HeadContent />
        </head>

        <body>
          {children}
          <Toaster position="top-right" />
          <ReactQueryDevtools initialIsOpen={false} />
          <Scripts />
        </body>
      </html>
    </ClerkProvider>
  );
}
