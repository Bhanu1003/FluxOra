import { createFileRoute } from "@tanstack/react-router";
import { Shield, Sparkles, Globe2, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FluxOra — Currency intelligence done right" },
      { name: "description", content: "FluxOra builds the most beautiful and accurate currency tools on the web." },
      { property: "og:title", content: "About FluxOra" },
      { property: "og:description", content: "Currency intelligence done right." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest text-primary">About us</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-6xl">
          Money should be <span className="text-gradient-brand">borderless</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          FluxOra is a small team of designers, engineers and currency nerds building
          tools that make global money make sense.
        </p>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { i: Sparkles, t: "Beautiful by default", d: "Fintech UI that doesn't feel like a spreadsheet." },
          { i: Globe2, t: "Truly global", d: "40+ currencies and growing, with full localization." },
          { i: Shield, t: "Privacy-first", d: "No tracking pixels. No accounts. Just rates." },
          { i: Heart, t: "Built with care", d: "Every pixel and millisecond obsessed over." },
        ].map((v) => (
          <div key={v.t} className="glass rounded-2xl p-5">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
              <v.i className="h-5 w-5" />
            </div>
            <h3 className="font-display font-semibold">{v.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 glass rounded-3xl p-8 sm:p-12">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Our story</h2>
        <div className="mt-4 space-y-4 text-muted-foreground">
          <p>
            FluxOra started in 2024 when our founders — frequent travelers and freelancers —
            got tired of currency converters that looked like they were designed in 2009 and
            updated rates "sometime today." We thought we could do better.
          </p>
          <p>
            Today, FluxOra powers conversions for thousands of travelers, traders, and global
            teams who care about both accuracy and aesthetics. We aggregate mid-market rates
            from trusted open providers and refresh them every minute.
          </p>
          <p className="text-foreground">
            We're a remote team across Lisbon, Singapore and São Paulo — three cities where
            knowing the exchange rate really matters.
          </p>
        </div>
      </div>
    </section>
  );
}
