import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";

import { serviceAreas, site, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 gradient-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-display text-lg font-extrabold">{site.name}</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-ink-foreground/75">
            Professional residential, commercial and specialized cleaning services in {site.city}.
            Reliable teams, professional equipment and a clean finish you can trust.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <a className="flex items-center gap-2 hover:underline" href={`tel:${site.phoneIntl}`}>
              <Phone className="h-4 w-4 text-primary" aria-hidden />
              {site.phone}
            </a>
            <a className="flex items-center gap-2 hover:underline" href={`mailto:${site.email}`}>
              <Mail className="h-4 w-4 text-primary" aria-hidden />
              {site.email}
            </a>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" aria-hidden />
              {site.location}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide uppercase">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/75">
            <li>
              <Link to="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link to="/book" className="hover:underline">
                Book a Cleaning
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide uppercase">Service areas</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/75">
            {serviceAreas.slice(0, 7).map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/15">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.hours}</p>
        </div>
      </div>
    </footer>
  );
}
