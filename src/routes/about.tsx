import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import aboutImage from "@/assets/about-team.jpg";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PALMCLEANERS | Professional Cleaning Company" },
      {
        name: "description",
        content:
          "PALMCLEANERS is a professional cleaning company in Dar es Salaam delivering reliable, hygienic and high-quality residential and commercial cleaning.",
      },
      { property: "og:title", content: "About PALMCLEANERS" },
      {
        property: "og:description",
        content:
          "Our mission, our standards and how we deliver professional cleaning for homes and businesses.",
      },
    ],
  }),
  component: AboutPage,
});

const commitments = [
  "Trained, supervised cleaning teams on every job.",
  "Professional equipment and surface-appropriate products.",
  "Clear scope and pricing agreed before work begins.",
  "Careful handling of furniture, fabrics and finishes.",
  "Consistent process so results do not vary between visits.",
  "Final walkthrough and follow-up after every service.",
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={`${site.name} is a professional cleaning company built on reliability`}
        description="We provide residential, commercial and specialized cleaning services with a simple promise: clean, hygienic spaces delivered by people who take the work seriously."
      >
        <Button asChild size="lg">
          <Link to="/book">Book a Cleaning</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/services">View Services</Link>
        </Button>
      </PageHero>

      <section className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold md:text-3xl">Who we are</h2>
          <p className="mt-4 text-muted-foreground">
            {site.name} is a professional cleaning company based in {site.location},{" "}
            {site.city}. We serve households, offices, shops and commercial spaces that need
            cleaning done properly, on time and without disruption.
          </p>
          <p className="mt-4 text-muted-foreground">
            From deep house cleaning and upholstery care to office maintenance and
            post-construction cleaning, our teams work to a defined process with the right products
            for each surface and fabric.
          </p>
          <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">Our mission</h2>
          <p className="mt-4 text-muted-foreground">
            To make professional cleaning accessible and dependable, helping our customers keep
            spaces that are hygienic, fresh and presentable, so they can focus on living and
            working comfortably.
          </p>
        </div>
        <img
          src={aboutImage}
          alt="The PALMCLEANERS cleaning team with professional equipment"
          width={1200}
          height={900}
          loading="lazy"
          className="w-full rounded-3xl object-cover shadow-lift"
        />
      </section>

      <section className="bg-secondary/50 py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">Our commitment to quality</h2>
            <p className="mt-4 text-muted-foreground">
              Quality is a process, not a promise. These are the standards we hold on every booking,
              whether it is a single sofa or an entire office floor.
            </p>
          </div>
          <ul className="space-y-3">
            {commitments.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl bg-card p-4 text-sm shadow-soft">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="surface-card p-6">
            <h3 className="text-base font-bold">Residential cleaning</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Homes, apartments and family spaces: deep cleaning, sofas, mattresses, carpets and
              curtains handled with care.
            </p>
          </div>
          <div className="surface-card p-6">
            <h3 className="text-base font-bold">Commercial cleaning</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Offices, shops and workspaces cleaned to a standard your staff and customers notice,
              on a schedule that suits you.
            </p>
          </div>
          <div className="surface-card p-6">
            <h3 className="text-base font-bold">Customer satisfaction</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Every booking carries a ticket number, so our team can trace your service history and
              follow up properly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
