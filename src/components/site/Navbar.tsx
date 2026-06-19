import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/converter", label: "Converter" },
  { to: "/crypto", label: "Crypto" },
  { to: "/trends", label: "Trends" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="mx-auto max-w-7xl px-4 py-2">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 shadow-soft">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
              <TrendingUp className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base font-bold tracking-tight">Flux<span className="text-gradient-brand">Ora</span></span>
              <span className="hidden text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
                Currency Intelligence
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/30 hover:text-foreground"
                activeProps={{ className: "rounded-lg px-3 py-2 text-sm font-semibold text-foreground bg-accent/40" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggle}
              aria-label="Toggle theme"
              className="rounded-xl"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </Button>
            <Button asChild className="hidden rounded-xl bg-gradient-brand text-white shadow-glow hover:opacity-90 md:inline-flex">
              <Link to="/converter">Convert now</Link>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="rounded-xl md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mt-2 flex flex-col gap-1 rounded-2xl p-2 md:hidden"
            >
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent/30 hover:text-foreground"
                  activeProps={{ className: "rounded-lg px-3 py-2 text-sm font-semibold text-foreground bg-accent/40" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
