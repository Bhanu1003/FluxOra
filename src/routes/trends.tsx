import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CurrencySelect } from "@/components/site/CurrencySelect";
import { RateChart } from "@/components/site/RateChart";
import { getHistorical } from "@/lib/rates.functions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trends")({
  head: () => ({
    meta: [
      { title: "Historical Exchange Rate Trends | FluxOra" },
      { name: "description", content: "Explore 7-day to 1-year historical trends for any currency pair." },
      { property: "og:title", content: "Historical Trends | FluxOra" },
      { property: "og:description", content: "Beautiful historical FX charts and analytics." },
    ],
  }),
  component: TrendsPage,
});

const PAIRS: [string, string][] = [
  ["EUR", "USD"],
  ["GBP", "USD"],
  ["USD", "JPY"],
  ["USD", "INR"],
  ["AUD", "USD"],
  ["USD", "CNY"],
];

function TrendsPage() {
  const [days, setDays] = useState(90);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");

  const fetchHist = useServerFn(getHistorical);
  const { data, isLoading } = useQuery({
    queryKey: ["trend", from, to, days],
    queryFn: () => fetchHist({ data: { from, to, days } }),
    staleTime: 300_000,
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-primary">Historical trends</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
          See the <span className="text-gradient-brand">market shape</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Chart any pair from 7 days up to a full year of history.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">From</div>
            <CurrencySelect value={from} onChange={setFrom} />
          </div>
          <div>
            <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">To</div>
            <CurrencySelect value={to} onChange={setTo} />
          </div>
          <div className="ml-auto flex gap-2">
            {[7, 30, 90, 180, 365].map((d) => (
              <Button
                key={d}
                size="sm"
                variant={days === d ? "default" : "outline"}
                onClick={() => setDays(d)}
                className={cn("rounded-lg", days === d && "bg-gradient-brand text-white shadow-glow")}
              >
                {d}d
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-6 h-96">
          {isLoading ? (
            <Skeleton className="h-full w-full rounded-2xl" />
          ) : (
            <RateChart data={data?.series ?? []} />
          )}
        </div>
      </div>

      <h2 className="mt-12 mb-4 font-display text-2xl font-bold">Popular pairs</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PAIRS.map(([f, t]) => (
          <MiniPair key={`${f}${t}`} from={f} to={t} days={30} />
        ))}
      </div>
    </section>
  );
}

function MiniPair({ from, to, days }: { from: string; to: string; days: number }) {
  const fetchHist = useServerFn(getHistorical);
  const { data, isLoading } = useQuery({
    queryKey: ["mini", from, to, days],
    queryFn: () => fetchHist({ data: { from, to, days } }),
    staleTime: 300_000,
  });
  const last = data?.series.at(-1)?.value;
  const first = data?.series[0]?.value;
  const pct = first && last ? ((last - first) / first) * 100 : 0;
  const up = pct >= 0;

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div className="font-display text-lg font-semibold">{from}/{to}</div>
        <div className={cn("text-xs font-medium", up ? "text-success" : "text-destructive")}>
          {up ? "+" : ""}{pct.toFixed(2)}%
        </div>
      </div>
      <div className="mt-1 font-display text-xl font-bold tabular-nums">
        {last ? last.toFixed(4) : "—"}
      </div>
      <div className="mt-2 h-24">
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <RateChart data={data?.series ?? []} color={up ? "var(--chart-3)" : "var(--chart-4)"} />
        )}
      </div>
    </div>
  );
}
