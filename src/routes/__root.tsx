import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AuroraBackdrop } from "@/components/site/AuroraBackdrop";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="relative">
      <AuroraBackdrop />
      <Navbar />
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="text-[10rem] font-display font-black leading-none text-gradient-brand">404</div>
        <h1 className="mt-2 font-display text-3xl font-bold">Page lost in transit</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Like a wire transfer to the wrong IBAN — this page didn't make it. Let's get you back.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
      <Footer />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="relative">
      <AuroraBackdrop />
      <Navbar />
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn't load this page. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-90"
          >
            Try again
          </button>
          <Link to="/" className="rounded-xl border border-border bg-card/40 px-5 py-2.5 text-sm font-medium hover:bg-accent/40">
            Go home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "";
    const adsenseClient = (import.meta.env.VITE_ADSENSE_CLIENT as string | undefined) || "";
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0b1024" },
        { title: "FluxOra — Live Currency Converter & Crypto Rates" },
        { name: "description", content: "Real-time currency converter with 40+ fiat currencies, crypto rates, historical charts, and rate alerts. Beautifully fast." },
        { name: "author", content: "FluxOra Labs" },
        { name: "keywords", content: "currency converter, exchange rate, forex, crypto converter, BTC USD, live FX rates" },
        { property: "og:site_name", content: "FluxOra" },
        { property: "og:title", content: "FluxOra — Live Currency Converter" },
        { property: "og:description", content: "Live FX + crypto conversion with elegant charts and rate alerts." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: siteUrl || "/" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "FluxOra" },
        { name: "twitter:description", content: "Live currency converter with crypto support." },
        ...(adsenseClient ? [{ name: "google-adsense-account", content: adsenseClient }] : []),
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/manifest.json" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700;800;900&family=JetBrains+Mono:wght@500&display=swap",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "FluxOra",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            description: "Real-time currency converter and crypto rates.",
            url: siteUrl || undefined,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        },
        ...(adsenseClient
          ? [
              {
                async: true,
                src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`,
                crossOrigin: "anonymous" as const,
              },
            ]
          : []),

      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
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
      <AuroraBackdrop />
      <Navbar />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}
