import { Link } from "@tanstack/react-router";
import { Menu, Phone, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-primary-soft text-secondary-foreground" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneIntl}`}
            className="hidden items-center gap-2 text-sm font-semibold text-foreground md:flex"
          >
            <Phone className="h-4 w-4 text-primary" aria-hidden />
            {site.phone}
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/book">Book a Cleaning</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
          >
            <Menu className="h-5 w-5" aria-hidden />
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link to="/book" onClick={() => setOpen(false)}>
                Book a Cleaning
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
