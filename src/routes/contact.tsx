import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact FluxOra" },
      { name: "description", content: "Get in touch with the FluxOra team — partnerships, press, support." },
      { property: "og:title", content: "Contact FluxOra" },
      { property: "og:description", content: "Get in touch with our team." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(1000),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-primary">Contact</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
          Let's <span className="text-gradient-brand">talk</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Press, partnerships, feedback, or just to say hi — we read everything.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-3">
          {[
            { i: Mail, t: "Email", d: "fluxorarate@gmail.com" },
            { i: MessageSquare, t: "Support", d: "fluxorarate@gmail.com" },
            { i: MapPin, t: "Office", d: "Lisbon · Singapore · São Paulo" },
          ].map((c) => (
            <div key={c.t} className="glass flex items-center gap-3 rounded-2xl p-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white">
                <c.i className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.t}</div>
                <div className="font-medium">{c.d}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const parsed = schema.safeParse(Object.fromEntries(fd));
            if (!parsed.success) {
              toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
              return;
            }
            setSubmitting(true);
            // Simulate async send — in production, wire to a server fn / email API.
            setTimeout(() => {
              toast.success("Message sent! We'll be in touch shortly.");
              (e.target as HTMLFormElement).reset();
              setSubmitting(false);
            }, 800);
          }}
          className="glass space-y-4 rounded-3xl p-6 sm:p-8"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required maxLength={100} className="mt-1 rounded-xl border-border/60 bg-card/40" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required maxLength={255} className="mt-1 rounded-xl border-border/60 bg-card/40" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={6} required maxLength={1000} className="mt-1 rounded-xl border-border/60 bg-card/40" />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-gradient-brand text-white shadow-glow hover:opacity-90"
          >
            {submitting ? "Sending…" : "Send message"}
          </Button>
        </form>
      </div>
    </section>
  );
}
