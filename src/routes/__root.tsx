import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-5xl font-bold text-teal">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-teal px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-ink">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Refreshing usually fixes it.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-teal px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-ink transition hover:border-teal"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fenan Dental Clinic — Healthy Mouth, Healthy Body" },
      {
        name: "description",
        content:
          "Fenan Dental Clinic in Addis Ababa delivers exceptional dental care with compassion, advanced technology and a patient-first approach.",
      },
      { property: "og:title", content: "Fenan Dental Clinic" },
      {
        property: "og:description",
        content: "Because your smile matters. Modern dentistry with a patient-first approach.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Poppins:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
