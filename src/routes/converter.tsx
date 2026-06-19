import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ConverterCard } from "@/components/site/ConverterCard";
import { CurrencySelect } from "@/components/site/CurrencySelect";
import { RateChart } from "@/components/site/RateChart";
import { getHistorical, getLatestRates } from "@/lib/rates.functions";
import { Button } from "@/components/ui/button";
import { CURRENCIES, findCurrency } from "@/lib/currencies";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/converter")({
  head: () => ({
    meta: [
      { title: "Live Currency Converter | FluxOra" },
      { name: "description", content: "Convert any world currency in real time with charts and multi-currency comparison." },
      { property: "og:title", content: "Live Currency Converter | FluxOra" },
      { property: "og:description", content: "Real-time FX conversion with charts and multi-currency comparison." },
    ],
  }),
  component: ConverterPage,
});

function ConverterPage() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [days, setDays] = useState(30);

  const getHist = useServerFn(getHistorical);
  const { data: histData, isLoading: histLoading } = useQuery({
    queryKey: ["hist", from, to, days],
    queryFn: () => getHist({ data: { from, to, days } }),
    staleTime: 300_000,
  });

  const getRates = useServerFn(getLatestRates);
  const { data: rateData } = useQuery({
    queryKey: ["rates", from],
    queryFn: () => getRates({ data: { base: from } }),
    staleTime: 60_000,
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-primary">Live converter</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
          Convert with <span className="text-gradient-brand">precision</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Mid-market rates, refreshed every 60 seconds. Choose any pair and dive into trends.
        </p>
      </div>

      <ConverterCard defaultFrom={from} defaultTo={to} />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="glass rounded-3xl p-6">
          <h2 className="font-display text-xl font-bold">Pair selector</h2>
          <p className="mt-1 text-sm text-muted-foreground">Pick any two currencies to chart.</p>
          <div className="mt-5 space-y-3">
            <div>
              <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">From</div>
              <CurrencySelect value={from} onChange={setFrom} className="w-full" />
            </div>
            <div>
              <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">To</div>
              <CurrencySelect value={to} onChange={setTo} className="w-full" />
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Range</div>
            <div className="flex gap-2">
              {[7, 30, 90, 365].map((d) => (
                <Button
                  key={d}
                  size="sm"
                  variant={days === d ? "default" : "outline"}
                  onClick={() => setDays(d)}
                  className={cn(
                    "rounded-lg",
                    days === d && "bg-gradient-brand text-white shadow-glow",
                  )}
                >
                  {d}d
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold">
                {from}/{to} · last {days} days
              </h2>
              <p className="text-sm text-muted-foreground">{findCurrency(from).name} → {findCurrency(to).name}</p>
            </div>
            {rateData?.rates?.[to] && (
              <div className="text-right">
                <div className="font-display text-2xl font-bold tabular-nums">
                  {rateData.rates[to].toFixed(4)}
                </div>
                <div className="text-xs text-muted-foreground">current</div>
              </div>
            )}
          </div>
          <div className="mt-4 h-72">
            {histLoading ? (
              <Skeleton className="h-full w-full rounded-2xl" />
            ) : (
              <RateChart data={histData?.series ?? []} />
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 font-display text-2xl font-bold">Compare against {from}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CURRENCIES.slice(0, 8).filter((c) => c.code !== from).map((c) => {
            const r = rateData?.rates?.[c.code];
            return (
              <div key={c.code} className="glass flex items-center justify-between rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="font-semibold">{c.code}</div>
                    <div className="text-[11px] text-muted-foreground">{c.name}</div>
                  </div>
                </div>
                <div className="font-display text-lg font-bold tabular-nums">
                  {r ? r.toFixed(r > 100 ? 2 : 4) : "—"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
