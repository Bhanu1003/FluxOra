import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Primary source: fawazahmed0 currency-api (mirrors live FX, refreshed ~hourly,
// 200+ currencies, key-less, CORS-friendly, with a jsdelivr fallback).
// Fallback: open.er-api.com (daily mid-market).
// Historical: Frankfurter (ECB end-of-day).
const FAWAZ_PRIMARY = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const FAWAZ_FALLBACK = "https://latest.currency-api.pages.dev/v1/currencies";
const FIAT_LATEST = "https://open.er-api.com/v6/latest";
const FIAT_TIMESERIES = "https://api.frankfurter.app";
const CRYPTO_PRICE = "https://api.coingecko.com/api/v3/simple/price";
const CRYPTO_CHART = "https://api.coingecko.com/api/v3/coins";

async function fetchFawaz(base: string) {
  const lower = base.toLowerCase();
  for (const root of [FAWAZ_PRIMARY, FAWAZ_FALLBACK]) {
    try {
      const res = await fetch(`${root}/${lower}.json`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) continue;
      const json = (await res.json()) as {
        date?: string;
        [k: string]: unknown;
      };
      const raw = json[lower] as Record<string, number> | undefined;
      if (!raw) continue;
      const rates: Record<string, number> = {};
      for (const [k, v] of Object.entries(raw)) {
        if (typeof v === "number") rates[k.toUpperCase()] = v;
      }
      return {
        rates,
        updatedAt: json.date ? new Date(json.date).toUTCString() : new Date().toUTCString(),
        source: "currency-api (mid-market, refreshed hourly)",
      };
    } catch {
      // try next mirror
    }
  }
  return null;
}

export const getLatestRates = createServerFn({ method: "GET" })
  .inputValidator((data: { base: string }) =>
    z.object({ base: z.string().min(3).max(5).toUpperCase() }).parse(data),
  )
  .handler(async ({ data }) => {
    const fawaz = await fetchFawaz(data.base);
    if (fawaz && Object.keys(fawaz.rates).length > 0) {
      return {
        base: data.base,
        rates: fawaz.rates,
        updatedAt: fawaz.updatedAt,
        source: fawaz.source,
        error: null as string | null,
      };
    }
    try {
      const res = await fetch(`${FIAT_LATEST}/${data.base}`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Upstream ${res.status}`);
      const json = (await res.json()) as {
        result?: string;
        base_code?: string;
        rates?: Record<string, number>;
        time_last_update_utc?: string;
      };
      if (json.result !== "success" || !json.rates) throw new Error("Bad payload");
      return {
        base: json.base_code ?? data.base,
        rates: json.rates,
        updatedAt: json.time_last_update_utc ?? new Date().toUTCString(),
        source: "open.er-api.com (mid-market, daily)",
        error: null as string | null,
      };
    } catch (e) {
      console.error("getLatestRates failed", e);
      return {
        base: data.base,
        rates: {} as Record<string, number>,
        updatedAt: new Date().toUTCString(),
        source: "unavailable",
        error: "Live rates are temporarily unavailable.",
      };
    }
  });

export const getHistorical = createServerFn({ method: "GET" })
  .inputValidator((data: { from: string; to: string; days?: number }) =>
    z
      .object({
        from: z.string().min(3).max(4).toUpperCase(),
        to: z.string().min(3).max(4).toUpperCase(),
        days: z.number().int().min(7).max(365).default(30),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const end = new Date();
    const start = new Date(end.getTime() - data.days * 86400000);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    try {
      const url = `${FIAT_TIMESERIES}/${fmt(start)}..${fmt(end)}?from=${data.from}&to=${data.to}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`Upstream ${res.status}`);
      const json = (await res.json()) as { rates?: Record<string, Record<string, number>> };
      const series = Object.entries(json.rates ?? {})
        .map(([date, vals]) => ({ date, value: vals[data.to] }))
        .filter((p) => typeof p.value === "number")
        .sort((a, b) => a.date.localeCompare(b.date));
      return { series, error: null as string | null };
    } catch (e) {
      console.error("getHistorical failed", e);
      return { series: [] as { date: string; value: number }[], error: "Historical data unavailable." };
    }
  });

export const getCryptoPrices = createServerFn({ method: "GET" })
  .inputValidator((data: { ids: string[]; vs: string }) =>
    z
      .object({
        ids: z.array(z.string().min(1).max(40)).min(1).max(25),
        vs: z.string().min(3).max(5).toLowerCase(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    try {
      const url = `${CRYPTO_PRICE}?ids=${data.ids.join(",")}&vs_currencies=${data.vs}&include_24hr_change=true`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`Upstream ${res.status}`);
      const json = (await res.json()) as Record<string, Record<string, number>>;
      return { prices: json, error: null as string | null };
    } catch (e) {
      console.error("getCryptoPrices failed", e);
      return { prices: {} as Record<string, Record<string, number>>, error: "Crypto rates unavailable." };
    }
  });

export const getCryptoChart = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string; vs: string; days?: number }) =>
    z
      .object({
        id: z.string().min(1).max(40),
        vs: z.string().min(3).max(5).toLowerCase(),
        days: z.number().int().min(1).max(365).default(30),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    try {
      const url = `${CRYPTO_CHART}/${data.id}/market_chart?vs_currency=${data.vs}&days=${data.days}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`Upstream ${res.status}`);
      const json = (await res.json()) as { prices?: [number, number][] };
      const series = (json.prices ?? []).map(([t, v]) => ({
        date: new Date(t).toISOString().slice(0, 10),
        value: v,
      }));
      return { series, error: null as string | null };
    } catch (e) {
      console.error("getCryptoChart failed", e);
      return { series: [] as { date: string; value: number }[], error: "Crypto chart unavailable." };
    }
  });
