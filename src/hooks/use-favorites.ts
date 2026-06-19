import { useEffect, useState, useCallback } from "react";

const KEY = "aurora-favs";

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setFavs(JSON.parse(raw));
      else setFavs(["EUR", "GBP", "JPY"]);
    } catch {
      setFavs(["EUR", "GBP", "JPY"]);
    }
  }, []);

  const toggle = useCallback((code: string) => {
    setFavs((prev) => {
      const next = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { favs, toggle, isFav: (c: string) => favs.includes(c) };
}
