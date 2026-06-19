import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { COUNTRIES, getCountry } from "@/lib/countries";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/country/$code")({
  head: ({ params }) => {
    const country = getCountry(params.code);
    const title = country
      ? `${country.name} — Financial overview & history | FluxOra`
      : "Country — FluxOra";
    const description = country
      ? `${country.name} (${country.currency}). Economy, markets, history and what investors watch. Educational content from FluxOra.`
      : "Country financial overview.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    const country = getCountry(params.code);
    if (!country) throw notFound();
    return { country };
  },
  component: CountryPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Country not found</h1>
      <p className="mt-3 text-muted-foreground">We don't have a profile for that country yet.</p>
      <Button asChild className="mt-6 rounded-xl">
        <Link to="/">Back home</Link>
      </Button>
    </div>
  ),
});

function CountryPage() {
  const { country } = Route.useLoaderData();

  return (
    <article className="relative mx-auto max-w-4xl px-6 py-16">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <motion.header
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex flex-wrap items-center gap-5"
      >
        <span className="text-6xl" aria-hidden>{country.flag}</span>
        <div className="min-w-0">
          <span className="text-xs uppercase tracking-widest text-primary">Country profile</span>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{country.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {country.currency} · Major markets: {country.markets}
          </p>
        </div>
      </motion.header>

      <Section title="Overview">
        <p>{country.details.overview}</p>
      </Section>

      <Section title="Economy at a glance">
        <ul className="ml-5 list-disc space-y-2">
          {country.details.economy.map((p: string, i: number) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </Section>

      <Section title="Markets & instruments">
        <ul className="ml-5 list-disc space-y-2">
          {country.details.markets.map((p: string, i: number) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </Section>

      <Section title="Historical milestones">
        <ul className="ml-5 list-disc space-y-2">
          {country.details.history.map((p: string, i: number) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </Section>

      <Section title="What to watch">
        <ul className="ml-5 list-disc space-y-2">
          {country.details.watch.map((p: string, i: number) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </Section>

      <div className="mt-14 border-t border-border/60 pt-8">
        <h3 className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">
          Explore other countries
        </h3>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.filter((c) => c.code !== country.code).map((c) => (
            <Link
              key={c.code}
              to="/country/$code"
              params={{ code: c.code }}
              className="rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-sm hover:border-primary/60 hover:text-foreground"
            >
              <span className="mr-1">{c.flag}</span> {c.name}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 font-display text-2xl font-bold">{title}</h2>
      <div className="text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
