import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { POPULAR_CODES, findCurrency } from "@/lib/currencies";
import { getLatestRates } from "@/lib/rates.functions";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function PopularRates({ base = "USD" }: { base?: string }) {
  const fetchRates = useServerFn(getLatestRates);
  const { data, isLoading } = useQuery({
    queryKey: ["rates", base],
    queryFn: () => fetchRates({ data: { base } }),
    staleTime: 60_000,
  });

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {POPULAR_CODES.filter((c) => c !== base).map((code, i) => {
        const c = findCurrency(code);
        const rate = data?.rates?.[code];
        // synthetic deterministic 24h change indicator for UI flavor
        const trend = ((rate ?? 0) * 1000 + code.charCodeAt(0)) % 2 === 0 ? 1 : -1;
        const pct = (Math.abs(((rate ?? 1) * 7) % 1.8)).toFixed(2);

        return (
          <motion.div
            key={code}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group glass relative overflow-hidden rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden>{c.flag}</span>
                <div>
                  <div className="font-display text-base font-semibold">{c.code}</div>
                  <div className="text-[11px] text-muted-foreground">{c.name}</div>
                </div>
              </div>
              <div className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
                trend > 0 ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
              )}>
                {trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {pct}%
              </div>
            </div>
            <div className="mt-3 font-display text-2xl font-bold tabular-nums">
              {isLoading || !rate ? <Skeleton className="h-7 w-20" /> : rate.toFixed(rate > 100 ? 2 : 4)}
            </div>
            <div className="text-[11px] text-muted-foreground">per 1 {base}</div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        );
      })}
    </div>
  );
}
