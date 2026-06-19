import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CURRENCIES, type Currency, findCurrency } from "@/lib/currencies";

type Props = {
  value: string;
  onChange: (code: string) => void;
  options?: Currency[];
  className?: string;
};

export function CurrencySelect({ value, onChange, options = CURRENCIES, className }: Props) {
  const [open, setOpen] = useState(false);
  const current = useMemo(() => findCurrency(value), [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-auto justify-between gap-2 rounded-xl border border-border/60 bg-card/60 px-3 py-2 text-left",
            className,
          )}
        >
          <span className="flex items-center gap-2">
            <span className="text-xl leading-none" aria-hidden>{current.flag}</span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-base font-semibold">{current.code}</span>
              <span className="text-[11px] text-muted-foreground">{current.name}</span>
            </span>
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 opacity-60" />
            <CommandInput placeholder="Search currency…" className="border-0 focus:ring-0" />
          </div>
          <CommandList className="max-h-72">
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {options.map((c) => (
                <CommandItem
                  key={c.code}
                  value={`${c.code} ${c.name} ${c.country}`}
                  onSelect={() => {
                    onChange(c.code);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 py-2"
                >
                  <span className="text-xl" aria-hidden>{c.flag}</span>
                  <span className="flex-1">
                    <span className="font-medium">{c.code}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{c.name}</span>
                  </span>
                  <Check className={cn("h-4 w-4", value === c.code ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
