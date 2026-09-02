import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { categoryLabels, services as hardcodedServices, type ServiceCategory } from "@/lib/services";
import { listServices } from "@/lib/services.functions";

export const Route = createFileRoute("/services")({
  loader: async () => {
    try {
      const live = await listServices();
      return { services: live ?? hardcodedServices };
    } catch {
      return { services: hardcodedServices };
    }
  },
  head: () => ({
    meta: [
      { title: "Cleaning Services | PALMCLEANERS" },
      {
        name: "description",
        content:
          "Residential, commercial and specialized cleaning services: deep house cleaning, sofa, mattress, carpet, curtain, office and post-construction cleaning.",
      },
      { property: "og:title", content: "Cleaning Services | PALMCLEANERS" },
      {
        property: "og:description",
        content:
          "See what is included in every PALMCLEANERS cleaning service and book the one you need.",
      },
    ],
  }),
  component: ServicesPage,
});

const order: ServiceCategory[] = ["residential", "commercial", "specialized"];

function ServicesPage() {
  const { services } = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Professional cleaning services built around your space"
        description="Every service below is delivered by trained teams using professional equipment and products. Choose a service to see exactly what is included."
      >
        <Button asChild size="lg">
          <Link to="/book">Book a Cleaning</Link>
        </Button>
      </PageHero>

      <div className="container-page py-14 md:py-20">
        <nav className="flex flex-wrap gap-2">
          {order.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary"
            >
              {categoryLabels[category]}
            </a>
          ))}
        </nav>

        {order.map((category) => (
          <section key={category} id={category} className="mt-14 scroll-mt-24">
            <h2 className="text-2xl font-extrabold md:text-3xl">{categoryLabels[category]}</h2>
            <div className="mt-8 space-y-6">
              {services
                .filter((service) => service.category === category)
                .map((service) => (
                  <article
                    key={service.slug}
                    id={service.slug}
                    className="surface-card scroll-mt-24 p-6 md:p-8"
                  >
                    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
                      <div>
                        <h3 className="text-xl font-extrabold">{service.name}</h3>
                        <p className="mt-3 text-sm font-medium text-primary">{service.short}</p>
                        <p className="mt-4 text-sm text-muted-foreground">{service.details}</p>
                        <Button asChild className="mt-6">
                          <Link to="/book" search={{ service: service.slug }}>
                            Book this service
                          </Link>
                        </Button>
                      </div>
                      <div className="rounded-2xl bg-secondary/60 p-5">
                        <h4 className="text-xs font-bold tracking-[0.16em] uppercase">
                          What's included
                        </h4>
                        <ul className="mt-4 space-y-2.5">
                          {service.included.map((item) => (
                            <li key={item} className="flex gap-2.5 text-sm">
                              <CheckCircle2
                                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                                aria-hidden
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
