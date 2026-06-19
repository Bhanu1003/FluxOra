import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Globe, Shield, Zap, LineChart as LineChartIcon, BellRing, Smartphone } from "lucide-react";
import { ConverterCard } from "@/components/site/ConverterCard";
import { PopularRates } from "@/components/site/PopularRates";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { COUNTRIES } from "@/lib/countries";




export const Route = createFileRoute("/")({
  head: () => {
    const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "";
    return {
      meta: [
        { title: "FluxOra — Real-time Currency Converter & Crypto Rates" },
        { name: "description", content: "Convert 40+ world currencies and top cryptocurrencies in real time. Charts, alerts, and beautifully fast." },
        { property: "og:title", content: "FluxOra — Real-time Currency Converter" },
        { property: "og:description", content: "Live FX + crypto conversion with elegant charts and rate alerts." },
        { property: "og:url", content: siteUrl ? `${siteUrl}/` : "/" },
      ],
      links: [{ rel: "canonical", href: siteUrl ? `${siteUrl}/` : "/" }],
    };
  },
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <PopularSection />
      <CountryInsightsSection />
      <PlatformsSection />
      <Testimonials />
      <NewsSection />
      <ReviewsSection />
      <FaqSection />
    </>
  );
}




function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-12 pb-20 sm:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs">
            <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            Live rates · updated every 60s
          </span>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            The world's <span className="text-gradient-brand">money</span>,<br />
            in one glance.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Convert 40+ fiat currencies and major cryptocurrencies in real time. Charts,
            alerts, and a fintech-grade UI that finally feels worthy of your money moves.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-xl bg-gradient-brand text-white shadow-glow hover:opacity-90">
              <Link to="/converter">
                Start converting <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-border/60 bg-card/40 backdrop-blur hover:bg-accent/30">
              <Link to="/trends">View trends</Link>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <Stat n="40+" label="Currencies" />
            <Stat n="10" label="Cryptos" />
            <Stat n="<200ms" label="Latency" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ConverterCard />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold tabular-nums sm:text-3xl">{n}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Features() {
  const items = [
    {
      icon: Zap,
      title: "Real-time rates",
      desc: "Live FX & crypto prices refreshed every minute from trusted sources.",
      details:
        "FluxOra polls open exchange rate providers and CoinGecko on a 60–90 second cycle. Whenever a page is open, the converter quietly refetches in the background so the number you see is the number that's true right now — no manual reloads, no stale spreadsheets.",
    },
    {
      icon: LineChartIcon,
      title: "Beautiful charts",
      desc: "Visualize 30 / 90 / 365 day trends with smooth, interactive area charts.",
      details:
        "Every pair you convert comes with a historical chart powered by Frankfurter (fiat) and CoinGecko (crypto). Hover to read precise daily values, switch ranges to spot momentum, and use the gradient area view to feel the trend at a glance.",
    },
    {
      icon: BellRing,
      title: "Rate alerts",
      desc: "Get notified the moment a pair hits your target rate.",
      details:
        "Set a target price on any fiat or crypto pair and FluxOra will watch it for you in-browser. When the threshold is crossed you'll get a desktop notification — perfect for travelers waiting for a better USD→EUR moment or freelancers timing an invoice.",
    },
    {
      icon: Globe,
      title: "40+ currencies",
      desc: "Every major world currency with country flags and full names.",
      details:
        "From the US Dollar, Euro and Yen to the Indian Rupee, Brazilian Real and South African Rand — FluxOra covers the currencies real people actually move money in, each with a flag, ISO code and the country it belongs to so picking the right one is unambiguous.",
    },
    {
      icon: Shield,
      title: "Privacy-first",
      desc: "No tracking, no accounts required. Your data stays yours.",
      details:
        "We don't ask you to sign up, we don't drop advertising trackers and we don't sell behaviour. Your favourite currencies are stored locally in your own browser. The only third-party calls FluxOra makes are to public, key-less rate providers — proxied server-side to keep your IP private.",
    },
    {
      icon: Smartphone,
      title: "Works everywhere",
      desc: "A fast, responsive website that opens in any modern browser.",
      details:
        "FluxOra is a website, not an app you have to install. Open it on a phone, tablet, laptop or desktop — the layout adapts, the converter stays one tap away, and you can bookmark it like any other site. No downloads, no permissions, no friction.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? items[openIndex] : null;

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-primary">Why FluxOra</span>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Everything you need. <span className="text-gradient-brand">Nothing you don't.</span>
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.button
            type="button"
            onClick={() => setOpenIndex(i)}
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass group rounded-2xl p-6 text-left transition-all hover:-translate-y-1 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Learn more about ${it.title}`}
          >
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold">{it.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
            <p className="mt-3 text-xs font-medium text-primary">Learn more →</p>
          </motion.button>
        ))}
      </div>

      <Dialog open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <DialogContent className="sm:max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
                  <active.icon className="h-5 w-5" />
                </div>
                <DialogTitle className="font-display text-2xl">{active.title}</DialogTitle>
                <DialogDescription className="text-base leading-relaxed text-muted-foreground">
                  {active.details}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function PopularSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-primary">Market pulse</span>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Popular rates vs USD</h2>
        </div>
        <Link to="/trends" className="text-sm text-muted-foreground hover:text-foreground">
          View all trends →
        </Link>
      </div>
      <PopularRates base="USD" />
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "Maya R.", role: "Travel writer", quote: "Finally a converter that doesn't look like it's from 2009. I use it daily." },
    { name: "Daniel K.", role: "Freelance dev", quote: "The crypto + fiat view in one place is exactly what I needed for client invoicing." },
    { name: "Aiko T.", role: "E-commerce lead", quote: "Charts are gorgeous and the alerts saved me real money on a JPY transfer." },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-primary">Loved by</span>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">People who move money globally</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((t) => (
          <div key={t.name} className="glass rounded-2xl p-6">
            <p className="text-foreground">"{t.quote}"</p>
            <div className="mt-4 text-sm">
              <div className="font-semibold">{t.name}</div>
              <div className="text-muted-foreground">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NewsSection() {
  const items = [
    {
      tag: "Forex",
      title: "Dollar steadies as traders weigh Fed rate path",
      time: "2h ago",
      body:
        "The US Dollar Index held a narrow range overnight as currency traders parsed mixed signals from Federal Reserve officials on the timing of the next policy move. EUR/USD hovered near recent highs while USD/JPY drifted lower on softer Treasury yields. Watch upcoming PCE inflation data — a hotter print would likely revive bids for the dollar across the G10 board.",
    },
    {
      tag: "Crypto",
      title: "Bitcoin reclaims key support amid ETF inflows",
      time: "5h ago",
      body:
        "Bitcoin pushed back above a closely-watched support level as spot ETFs recorded another session of net inflows. On-chain data shows long-term holders continuing to accumulate while exchange balances trend lower — historically a constructive setup. Ethereum and Solana followed higher, with altcoin breadth improving for the first time in two weeks.",
    },
    {
      tag: "Markets",
      title: "Euro edges higher on stronger PMI data",
      time: "9h ago",
      body:
        "The euro firmed against most G10 peers after composite PMI readings across the bloc surprised to the upside, led by a return to expansion in services. Bund yields nudged higher and rate-cut bets for the European Central Bank were trimmed at the margin. EUR/GBP and EUR/CHF both posted modest gains as traders re-priced the relative growth outlook.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? items[openIndex] : null;

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-primary">Market news</span>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Forex & crypto in 60 seconds</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((n, i) => (
          <article
            key={n.title}
            onClick={() => setOpenIndex(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpenIndex(i)}
            className="glass group cursor-pointer rounded-2xl p-6 transition hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="mb-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {n.tag}
            </div>
            <h3 className="font-display text-lg font-semibold leading-snug">{n.title}</h3>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{n.time}</span>
              <span className="text-primary">Read →</span>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <DialogContent className="sm:max-w-xl">
          {active && (
            <DialogHeader>
              <span className="text-[11px] uppercase tracking-wider text-primary">{active.tag} · {active.time}</span>
              <DialogTitle className="font-display text-2xl leading-snug">{active.title}</DialogTitle>
              <DialogDescription className="pt-2 text-base leading-relaxed text-muted-foreground">
                {active.body}
              </DialogDescription>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function FaqSection() {
  const items = [
    { q: "Where do exchange rates come from?", a: "We pull from open exchange rate providers and refresh aggregated mid-market prices every 60 seconds." },
    { q: "Is FluxOra free?", a: "Yes. All core converter and chart features are free. No account required." },
    { q: "Do you support cryptocurrencies?", a: "Yes — Bitcoin, Ethereum, Tether, BNB, Solana, XRP, Cardano, Dogecoin, TRON and Polygon." },
    { q: "Do I need to install anything?", a: "No. FluxOra is a website — open it in any modern browser on phone, tablet or desktop. Bookmark it for one-tap access; there's no app to download and no account to create." },
    { q: "Are rates suitable for trading?", a: "Rates are indicative for information only. They're not financial advice and shouldn't be the only input to trading decisions." },
  ];
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-20">
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-widest text-primary">FAQ</span>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Common questions</h2>
      </div>
      <Accordion type="single" collapsible className="glass rounded-2xl p-2">
        {items.map((it, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border/60 px-4">
            <AccordionTrigger className="text-left font-medium">{it.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{it.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

const REVIEW_EMAIL = "fluxorarate@gmail.com";

// 🔧 EDIT HERE — replace href values with your real affiliate / referral links.
const PLATFORMS = [
  {
    category: "Crypto exchange",
    name: "Binance",
    blurb: "Global crypto exchange with deep liquidity across spot, futures and staking products.",
    href: "https://www.binance.com/", // TODO: replace with your affiliate link
  },
  {
    category: "Stock broker (India)",
    name: "Zerodha",
    blurb: "India's largest discount broker. Equities, F&O and mutual funds on the Kite platform.",
    href: "https://zerodha.com/", // TODO: replace with your affiliate link
  },
  {
    category: "Stock broker (India)",
    name: "Upstox",
    blurb: "Popular Indian discount broker for stocks, derivatives and mutual funds.",
    href: "https://upstox.com/", // TODO: replace with your affiliate link
  },
  {
    category: "Stock broker (India)",
    name: "Angel One",
    blurb: "Full-service Indian broker offering equities, commodities, IPOs and advisory tools.",
    href: "https://www.angelone.in/", // TODO: replace with your affiliate link
  },
  {
    category: "Investment app (India)",
    name: "Groww",
    blurb: "Beginner-friendly app for stocks, mutual funds, ETFs and US equities.",
    href: "https://groww.in/", // TODO: replace with your affiliate link
  },
  {
    category: "Crypto exchange",
    name: "Coinbase",
    blurb: "US-regulated exchange known for compliance, security and a simple onboarding flow.",
    href: "https://www.coinbase.com/", // TODO: replace with your affiliate link
  },

];

function PlatformsSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="mb-8 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-primary">A few suggestions</span>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Platforms people often start with
        </h2>
        <p className="mt-3 text-muted-foreground">
          These are widely used, well-known apps and exchanges — just suggestions to help you explore. We're not recommending any one over another, and nothing here is a guarantee. Take a look, read their own terms, and pick what feels right for you.
        </p>
      </div>


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="glass group flex flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-glow"
          >
            <span className="text-[11px] uppercase tracking-wider text-primary">{p.category}</span>
            <h3 className="mt-2 font-display text-xl font-semibold">{p.name}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.blurb}</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
              Take a look <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </a>
        ))}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        Shared for educational purposes. Some links may be affiliate links — if you sign up through them we may earn a small commission, at no extra cost to you. That never decides which platforms appear here.
      </p>
    </section>
  );
}

function ReviewsSection() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-16">
      <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
        <div className="mb-6 max-w-xl">
          <span className="text-xs uppercase tracking-widest text-primary">Reviews & feedback</span>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            Tell us how we can be <span className="text-gradient-brand">better</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Your rating and feedback go straight to our inbox. We read every single one.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = (fd.get("name") as string) || "Anonymous";
            const email = (fd.get("email") as string) || "not provided";
            const message = (fd.get("message") as string) || "";

            if (rating === 0) {
              toast.error("Please pick a star rating");
              return;
            }
            if (message.trim().length < 5) {
              toast.error("Please write a short review (min 5 characters)");
              return;
            }

            const subject = `FluxOra review — ${rating}★ from ${name}`;
            const body =
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Rating: ${rating} / 5\n\n` +
              `Feedback:\n${message}\n`;
            window.location.href =
              `mailto:${REVIEW_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            toast.success("Opening your email app to send the review…");
            (e.currentTarget as HTMLFormElement).reset();
            setRating(0);
          }}
          className="grid gap-4"
        >
          <div>
            <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Your rating</div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => {
                const filled = (hover || rating) >= n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                    className="rounded-md p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-7 w-7 ${filled ? "fill-yellow-400 stroke-yellow-400" : "fill-transparent stroke-muted-foreground"}`}
                      strokeWidth={1.5}
                    >
                      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </button>
                );
              })}
              {rating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">{rating} / 5</span>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              name="name"
              maxLength={80}
              placeholder="Your name (optional)"
              className="h-11 rounded-xl border-border/60 bg-card/40"
            />
            <Input
              type="email"
              name="email"
              maxLength={254}
              placeholder="Your email (optional)"
              className="h-11 rounded-xl border-border/60 bg-card/40"
            />
          </div>

          <textarea
            name="message"
            required
            rows={4}
            maxLength={1000}
            placeholder="What did you love? What should we improve?"
            className="w-full rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-gradient-brand text-white shadow-glow hover:opacity-90 sm:w-auto"
          >
            Send review
          </Button>
        </form>
      </div>
    </section>
  );
}

// ============================================================
// Country Insights — pick a country to see financial highlights,
// recent market context, and notable historical economic moments.
// Content is editorial/educational only — NOT financial advice.
// Country data lives in src/lib/countries.ts so the dedicated
// /country/$code detail pages and this homepage section share it.

function CountryInsightsSection() {
  const [code, setCode] = useState<string>("US");
  const country = COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="mb-8 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-primary">Country insights</span>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Pick a country. <span className="text-gradient-brand">See the money story.</span>
        </h2>
        <p className="mt-3 text-muted-foreground">
          A snapshot of each country's financial system, recent market context and notable historical moments. Click through for the full guide.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="text-sm text-muted-foreground sm:w-40">Choose a country</label>
        <div className="sm:w-80">
          <Select value={code} onValueChange={setCode}>
            <SelectTrigger className="h-12 rounded-xl border-border/60 bg-card/40 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  <span className="mr-2">{c.flag}</span> {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <motion.div
        key={country.code}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="glass rounded-3xl p-6 sm:p-10"
      >
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <span className="text-5xl" aria-hidden>{country.flag}</span>
          <div>
            <h3 className="font-display text-2xl font-bold sm:text-3xl">{country.name}</h3>
            <p className="text-sm text-muted-foreground">
              {country.currency} · Major markets: {country.markets}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <InsightCard
            tag="Financial overview"
            title="How the system works"
            body={country.financial}
          />
          <InsightCard
            tag="Latest context"
            title="What markets are watching"
            body={country.latest}
          />
          <InsightCard
            tag="Historical significance"
            title="Moments that shaped it"
            body={country.history}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <Button asChild className="rounded-xl bg-gradient-brand text-white shadow-glow hover:opacity-90">
            <Link to="/country/$code" params={{ code: country.code }}>
              Read the full {country.name} guide <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

function InsightCard({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-5">
      <span className="text-[11px] uppercase tracking-wider text-primary">{tag}</span>
      <h4 className="mt-2 font-display text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
