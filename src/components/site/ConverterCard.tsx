import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Star, RefreshCcw, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CurrencySelect } from "./CurrencySelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { findCurrency } from "@/lib/currencies";
import { getLatestRates } from "@/lib/rates.functions";
import { useFavorites } from "@/hooks/use-favorites";

type Props = {
  defaultFrom?: string;
  defaultTo?: string;
  className?: string;
};

export function ConverterCard({ defaultFrom = "USD", defaultTo = "EUR", className }: Props) {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [amount, setAmount] = useState("100");
  const [swapping, setSwapping] = useState(false);
  const { favs, toggle, isFav } = useFavorites();

  const fetchRates = useServerFn(getLatestRates);
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["rates", from],
    queryFn: () => fetchRates({ data: { base: from } }),
    staleTime: 60_000,
    refetchInterval: 90_000,
  });

  const rate = data?.rates?.[to];
  const num = parseFloat(amount) || 0;
  const converted = rate ? num * rate : null;

  const fromCcy = findCurrency(from);
  const toCcy = findCurrency(to);

  const inverseRate = rate ? 1 / rate : null;

  const swap = () => {
    setSwapping(true);
    setFrom(to);
    setTo(from);
    setTimeout(() => setSwapping(false), 400);
  };

  // re-render every minute so "updated X ago" stays fresh
  const [, force] = useState(0);
  useEffect(() => {
    const id = setInterval(() => force((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const ago = useMemo(() => {
    if (!data?.updatedAt) return "";
    const diff = (Date.now() - new Date(data.updatedAt).getTime()) / 1000;
    if (diff < 60) return `${Math.max(1, Math.floor(diff))}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  }, [data?.updatedAt]);

  return (
    <div className={cn("glass relative overflow-hidden rounded-3xl p-6 shadow-glow sm:p-8", className)}>
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-brand opacity-20 blur-3xl" />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Live converter</div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Exchange anything</h2>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => refetch()}
          aria-label="Refresh rates"
          className="rounded-xl"
        >
          <RefreshCcw className={cn("h-4 w-4", isFetching && "animate-spin")} />
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-end">
        {/* FROM */}
        <Side
          label="You send"
          ccy={fromCcy}
          value={amount}
          onValueChange={setAmount}
          editable
          select={<CurrencySelect value={from} onChange={setFrom} />}
          fav={{ isFav: isFav(from), toggle: () => toggle(from) }}
        />

        <motion.div
          animate={{ rotate: swapping ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto"
        >
          <Button
            size="icon"
            onClick={swap}
            aria-label="Swap currencies"
            className="h-12 w-12 rounded-full bg-gradient-brand text-white shadow-glow hover:opacity-90"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* TO */}
        <Side
          label="They receive"
          ccy={toCcy}
          value={
            isLoading
              ? ""
              : converted != null
                ? converted.toLocaleString(undefined, { maximumFractionDigits: 4 })
                : "—"
          }
          loading={isLoading}
          select={<CurrencySelect value={to} onChange={setTo} />}
          fav={{ isFav: isFav(to), toggle: () => toggle(to) }}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-3 text-muted-foreground">
          {rate ? (
            <>
              <span>
                <span className="font-medium text-foreground">1 {from}</span> = {rate.toLocaleString(undefined, { maximumFractionDigits: 4 })} {to}
              </span>
              <span className="hidden h-4 w-px bg-border sm:block" />
              <span className="hidden sm:inline">
                1 {to} = {inverseRate!.toLocaleString(undefined, { maximumFractionDigits: 4 })} {from}
              </span>
            </>
          ) : (
            <Skeleton className="h-4 w-48" />
          )}
        </div>
        <div className="flex flex-col items-end gap-0.5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:gap-2">
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-success" />
            Updated {ago || "just now"}
          </span>
          {data?.source && (
            <span className="hidden text-[10px] opacity-70 sm:inline">· {data.source}</span>
          )}
        </div>
      </div>

      {data?.error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive-foreground">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{data.error}</span>
        </div>
      )}

      {favs.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Favorites</span>
          {favs.map((code) => {
            const c = findCurrency(code);
            return (
              <button
                key={code}
                onClick={() => setTo(code)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs transition-colors hover:border-primary/50 hover:bg-accent/30"
              >
                <span>{c.flag}</span>
                <span className="font-medium">{c.code}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Side({
  label,
  ccy,
  value,
  onValueChange,
  loading,
  editable,
  select,
  fav,
}: {
  label: string;
  ccy: ReturnType<typeof findCurrency>;
  value: string;
  onValueChange?: (v: string) => void;
  loading?: boolean;
  editable?: boolean;
  select: React.ReactNode;
  fav: { isFav: boolean; toggle: () => void };
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <button
          onClick={fav.toggle}
          aria-label={fav.isFav ? "Remove favorite" : "Add favorite"}
          className="rounded-md p-1 transition-colors hover:bg-accent/30"
        >
          <Star className={cn("h-3.5 w-3.5", fav.isFav ? "fill-primary text-primary" : "text-muted-foreground")} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        {editable ? (
          <Input
            inputMode="decimal"
            value={value}
            onChange={(e) => onValueChange?.(e.target.value.replace(/[^0-9.]/g, ""))}
            className="h-12 border-0 bg-transparent p-0 font-display text-3xl font-bold shadow-none focus-visible:ring-0"
            aria-label={`${ccy.code} amount`}
          />
        ) : loading ? (
          <Skeleton className="h-10 w-32" />
        ) : (
          <div className="h-12 truncate font-display text-3xl font-bold tabular-nums">{value}</div>
        )}
      </div>
      <div className="mt-3">{select}</div>
    </div>
  );
}
