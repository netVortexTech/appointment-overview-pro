import { Link, createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import heroImage from "@/assets/hero-cleaning.jpg";
import officeImage from "@/assets/service-office.jpg";
import sofaImage from "@/assets/service-sofa.jpg";
import { Button } from "@/components/ui/button";
import { serviceAreas, site, whatsappLink } from "@/lib/site";
import { services } from "@/lib/services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PALMCLEANERS | Professional Cleaning Services in Dar es Salaam" },
      {
        name: "description",
        content:
          "Professional home, office, sofa, mattress and carpet cleaning by PALMCLEANERS. Book a cleaning in minutes and get a trackable service ticket.",
      },
      { property: "og:title", content: "PALMCLEANERS | Professional Cleaning Services" },
      {
        property: "og:description",
        content:
          "Reliable residential, commercial and specialized cleaning services. Book a cleaning with PALMCLEANERS today.",
      },
    ],
  }),
  component: HomePage,
});

const reasons = [
  {
    icon: BadgeCheck,
    title: "Trained professional teams",
    text: "Our cleaners are trained, supervised and equipped to deliver consistent results in every space.",
  },
  {
    icon: ShieldCheck,
    title: "Safe, quality products",
    text: "We use professional-grade cleaning products and methods suited to your surfaces and fabrics.",
  },
  {
    icon: ClipboardList,
    title: "Trackable service tickets",
    text: "Every booking gets a unique ticket number so our team can locate your job and service history instantly.",
  },
  {
    icon: Clock,
    title: "Reliable and on time",
    text: "We confirm your preferred date and time, then show up prepared to finish the job properly.",
  },
];

const steps = [
  {
    title: "Send your booking request",
    text: "Fill the short booking form with your details, location and the cleaning you need.",
  },
  {
    title: "We confirm with you",
    text: "Our team reviews your request, confirms the date, time and scope, and advises on pricing.",
  },
  {
    title: "Our team arrives",
    text: "Trained cleaners arrive with the right equipment and products for your job.",
  },
  {
    title: "Final walkthrough",
    text: "We inspect the finished work with you to make sure you are satisfied before we leave.",
  },
];

const process = [
  "Assessment of the space, materials and problem areas.",
  "Preparation and protection of furniture and surfaces.",
  "Dust removal and dry cleaning before wet work.",
  "Deep cleaning, stain treatment and extraction.",
  "Sanitising of high-touch areas and washrooms.",
  "Final inspection, tidy-up and customer sign-off.",
];

const testimonials = [
  {
    name: "Amina H.",
    location: "Mikocheni",
    text: "They cleaned our sofa and carpet in one visit. The stains we thought were permanent came out completely.",
  },
  {
    name: "Joseph M.",
    location: "Makongo Juu",
    text: "Very professional team. They arrived on time, worked carefully and left the house spotless.",
  },
  {
    name: "Grace K.",
    location: "Mbezi Beach",
    text: "We use PALMCLEANERS for our office every month. Our workspace always looks presentable for clients.",
  },
];

function HomePage() {
  const featured = services.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-primary-soft/40">
        <div className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Professional cleaning services</p>
            <h1 className="mt-4 text-3xl leading-tight font-extrabold text-balance md:text-5xl">
              Professional cleaning for a cleaner, healthier space
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              From homes and offices to sofas, mattresses and carpets, {site.name} provides reliable
              professional cleaning services designed to keep your space fresh, hygienic and
              presentable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/book">Book a Cleaning</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/services">View Services</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" aria-hidden />
                {site.location}
              </span>
              <a className="flex items-center gap-2" href={`tel:${site.phoneIntl}`}>
                <Phone className="h-4 w-4 text-primary" aria-hidden />
                {site.phone}
              </a>
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4 text-accent" aria-hidden />
                Homes, offices &amp; commercial spaces
              </span>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="A PALMCLEANERS professional cleaning a bright modern living space"
              width={1600}
              height={1104}
              className="w-full rounded-3xl object-cover shadow-lift"
            />
            <div className="surface-card absolute -bottom-6 left-4 hidden max-w-[15rem] p-4 sm:block">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                Every booking gets a ticket
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Track your service with a number like PC-2026-00001.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <p className="eyebrow">Why choose us</p>
        <h2 className="mt-3 max-w-2xl text-2xl font-extrabold md:text-4xl">
          Why customers choose {site.name}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="surface-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <reason.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-bold">{reason.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{reason.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured services</p>
              <h2 className="mt-3 text-2xl font-extrabold md:text-4xl">
                Cleaning services we provide
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/services">See all services</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service) => (
              <article key={service.slug} className="surface-card flex flex-col p-6">
                <h3 className="text-base font-bold">{service.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.short}</p>
                <div className="mt-5 flex gap-2">
                  <Button asChild size="sm">
                    <Link to="/book" search={{ service: service.slug }}>
                      Book this service
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link to="/services" hash={service.slug}>
                      Details
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <p className="eyebrow">How booking works</p>
        <h2 className="mt-3 text-2xl font-extrabold md:text-4xl">Booking a cleaning is simple</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="surface-card p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="mt-4 text-base font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link to="/book">
              <CalendarCheck className="mr-2 h-4 w-4" aria-hidden />
              Book a Cleaning
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our cleaning process</p>
            <h2 className="mt-3 text-2xl font-extrabold md:text-4xl">
              A structured process, every single job
            </h2>
            <p className="mt-4 text-muted-foreground">
              We follow the same professional sequence whether we are cleaning a two-seater sofa or
              a full office floor, so results stay consistent.
            </p>
            <ul className="mt-6 space-y-3">
              {process.map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src={sofaImage}
              alt="Deep extraction cleaning of a fabric sofa"
              width={1200}
              height={900}
              loading="lazy"
              className="h-full w-full rounded-2xl object-cover shadow-soft"
            />
            <img
              src={officeImage}
              alt="Professional cleaning of a modern office floor"
              width={1200}
              height={900}
              loading="lazy"
              className="h-full w-full rounded-2xl object-cover shadow-soft"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <p className="eyebrow">Service areas</p>
            <h2 className="mt-3 text-2xl font-extrabold md:text-4xl">Areas we serve</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Based in {site.location}, we serve homes, offices and commercial spaces across{" "}
              {site.city}. Not sure if we cover your area? Send us a message.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
            {serviceAreas.map((area) => (
              <li
                key={area}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm"
              >
                <MapPin className="h-4 w-4 text-primary" aria-hidden />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container-page">
          <p className="eyebrow">Testimonials</p>
          <h2 className="mt-3 text-2xl font-extrabold md:text-4xl">What our customers say</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="surface-card p-6">
                <Quote className="h-6 w-6 text-primary" aria-hidden />
                <blockquote className="mt-4 text-sm text-muted-foreground">{item.text}</blockquote>
                <figcaption className="mt-5 flex items-center gap-2 text-sm font-semibold">
                  <Users className="h-4 w-4 text-primary" aria-hidden />
                  {item.name}
                  <span className="text-muted-foreground">· {item.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <div className="gradient-ink rounded-3xl px-6 py-12 text-ink-foreground md:px-12 md:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-2xl font-extrabold md:text-4xl">
                Ready for a cleaner, healthier space?
              </h2>
              <p className="mt-4 max-w-xl text-ink-foreground/75">
                Send a booking request and our team will confirm your date, time and scope. You will
                receive a ticket number to track your service.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/book">Book a Cleaning</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-ink-foreground/30 bg-transparent text-ink-foreground hover:bg-ink-foreground/10"
                >
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-ink-foreground/60">Phone</dt>
                <dd className="text-base font-semibold">
                  <a href={`tel:${site.phoneIntl}`}>{site.phone}</a>
                </dd>
              </div>
              <div>
                <dt className="text-ink-foreground/60">Email</dt>
                <dd className="text-base font-semibold">
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="text-ink-foreground/60">Location</dt>
                <dd className="text-base font-semibold">{site.location}</dd>
              </div>
              <div>
                <dt className="text-ink-foreground/60">Working hours</dt>
                <dd className="text-base font-semibold">{site.hours}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
