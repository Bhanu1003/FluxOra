import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
                <TrendingUp className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-bold">
                Flux<span className="text-gradient-brand">Ora</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time currency intelligence for travelers, traders, and global teams.
              Live FX + crypto rates, beautifully presented.
            </p>
          </div>

          <FooterCol title="Product" items={[
            ["Converter", "/converter"],
            ["Crypto", "/crypto"],
            ["Historical trends", "/trends"],
            ["Rate alerts", "/converter"],
          ]} />
          <FooterCol title="Company" items={[
            ["About us", "/about"],
            ["Contact", "/contact"],
            ["Press kit", "/about"],
            ["Careers", "/about"],
          ]} />
          <FooterCol title="Legal" items={[
            ["Privacy policy", "/"],
            ["Terms of service", "/"],
            ["Cookie policy", "/"],
            ["Disclaimer", "/"],
          ]} />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} FluxOra Labs Ltd. Rates are indicative and not financial advice.</p>
          <p>Built with live data from open exchange rate providers.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold tracking-wide">{title}</h4>
      <ul className="space-y-2">
        {items.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
