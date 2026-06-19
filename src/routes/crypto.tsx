import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { CRYPTOS } from "@/lib/currencies";
import { getCryptoChart, getCryptoPrices } from "@/lib/rates.functions";
import { RateChart } from "@/components/site/RateChart";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/crypto")({
  head: () => ({
    meta: [
      { title: "Crypto Converter — BTC, ETH, USDT & more | FluxOra" },
      { name: "description", content: "Live cryptocurrency prices and conversion for Bitcoin, Ethereum, Solana, USDT and more." },
      { property: "og:title", content: "Crypto Converter | FluxOra" },
      { property: "og:description", content: "Real-time crypto prices and beautiful charts." },
    ],
  }),
  component: CryptoPage,
});

function CryptoPage() {
  const [selectedId, setSelectedId] = useState("bitcoin");
  const [amount, setAmount] = useState("1");
  const [days, setDays] = useState(30);
  const ids = useMemo(() => CRYPTOS.map((c) => c.id), []);
  const vs = "usd";

  const fetchPrices = useServerFn(getCryptoPrices);
  const { data: pricesData, isLoading: pricesLoading } = useQuery({
    queryKey: ["crypto-prices", vs],
    queryFn: () => fetchPrices({ data: { ids, vs } }),
    staleTime: 60_000,
    refetchInterval: 90_000,
  });

  const fetchChart = useServerFn(getCryptoChart);
  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ["crypto-chart", selectedId, days],
    queryFn: () => fetchChart({ data: { id: selectedId, vs, days } }),
    staleTime: 300_000,
  });

  const selected = CRYPTOS.find((c) => c.id === selectedId)!;
  const currentPrice = pricesData?.prices?.[selectedId]?.usd;
  const change = pricesData?.prices?.[selectedId]?.usd_24h_change ?? 0;
  const num = parseFloat(amount) || 0;
  const usdValue = currentPrice ? num * currentPrice : null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-primary">Crypto</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
          Crypto, <span className="text-gradient-brand">priced live</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Real-time prices for the top 10 cryptocurrencies, with 24h change and historical charts.
        </p>
      </div>

      {/* Price grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {CRYPTOS.map((c) => {
          const price = pricesData?.prices?.[c.id]?.usd;
          const ch = pricesData?.prices?.[c.id]?.usd_24h_change ?? 0;
          const active = selectedId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={cn(
                "glass group rounded-2xl p-4 text-left transition-all hover:-translate-y-1",
                active && "ring-2 ring-primary shadow-glow",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{c.icon}</span>
                  <div>
                    <div className="font-display text-base font-semibold">{c.code}</div>
                    <div className="text-[11px] text-muted-foreground">{c.name}</div>
                  </div>
                </div>
                <span className={cn(
                  "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
                  ch >= 0 ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
                )}>
                  {ch >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(ch).toFixed(2)}%
                </span>
              </div>
              <div className="mt-3 font-display text-xl font-bold tabular-nums">
                {pricesLoading || !price ? (
                  <Skeleton className="h-6 w-20" />
                ) : (
                  `$${price.toLocaleString(undefined, { maximumFractionDigits: price < 1 ? 4 : 2 })}`
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Converter + chart */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <div className="glass rounded-3xl p-6">
          <h2 className="font-display text-xl font-bold">Convert {selected.code} → USD</h2>
          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">{selected.code} amount</div>
              <Input
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                className="h-14 rounded-xl border-border/60 bg-card/40 font-display text-2xl font-bold"
              />
            </div>
            <div>
              <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">USD value</div>
              <div className="rounded-xl border border-border/60 bg-card/40 p-4">
                <div className="font-display text-3xl font-bold tabular-nums">
                  {usdValue != null ? `$${usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "—"}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  1 {selected.code} = {currentPrice ? `$${currentPrice.toLocaleString()}` : "—"}
                </div>
              </div>
            </div>
            <div className={cn(
              "rounded-xl border p-3 text-xs",
              change >= 0
                ? "border-success/30 bg-success/10 text-success"
                : "border-destructive/30 bg-destructive/10 text-destructive",
            )}>
              24h change: {change.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold">{selected.name} chart</h2>
              <p className="text-sm text-muted-foreground">Price in USD · last {days} days</p>
            </div>
            <div className="flex gap-2">
              {[7, 30, 90, 365].map((d) => (
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
          <div className="mt-4 h-80">
            {chartLoading ? (
              <Skeleton className="h-full w-full rounded-2xl" />
            ) : (
              <RateChart data={chartData?.series ?? []} color="var(--chart-2)" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
