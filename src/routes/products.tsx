import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Package, Phone } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listProducts } from "@/lib/booking.functions";
import { site, whatsappLink } from "@/lib/site";

const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProducts(),
});

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Cleaning Products & Supplies | PALMCLEANERS" },
      {
        name: "description",
        content:
          "Professional cleaning products, fabric care and home hygiene supplies from PALMCLEANERS. Enquire by phone or WhatsApp for pricing and availability.",
      },
      { property: "og:title", content: "Cleaning Products & Supplies | PALMCLEANERS" },
      {
        property: "og:description",
        content: "Browse the PALMCLEANERS product catalogue and enquire about any item.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQuery);
  },
  errorComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="text-xl font-semibold">Products could not be loaded</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Please refresh the page, or contact us on {site.phone}.
      </p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="text-xl font-semibold">Page not found</h1>
    </div>
  ),
  component: ProductsPage,
});

const availabilityLabels: Record<string, string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Out of stock",
  on_order: "Available on order",
};

function ProductsPage() {
  const { data: products } = useSuspenseQuery(productsQuery);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Cleaning products and supplies"
        description="Professional-grade products and supplies used by our own teams. Prices shown are indicative — contact us to confirm current pricing and availability."
      >
        <Button asChild size="lg">
          <a href={whatsappLink(`Hello ${site.name}, I would like to enquire about your products.`)} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" aria-hidden />
            Enquire on WhatsApp
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={`tel:${site.phoneIntl}`}>
            <Phone className="mr-2 h-4 w-4" aria-hidden />
            {site.phone}
          </a>
        </Button>
      </PageHero>

      <div className="container-page py-14 md:py-20">
        {products.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Our product catalogue is being updated. Please contact us for what you need.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="surface-card flex flex-col overflow-hidden">
                <div className="flex h-40 items-center justify-center bg-primary-soft/60">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package className="h-10 w-10 text-primary" aria-hidden />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {product.category}
                  </p>
                  <h2 className="mt-1 text-base font-bold">{product.name}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="font-display text-base font-bold">{product.price_text}</span>
                    <Badge variant={product.availability === "in_stock" ? "default" : "secondary"}>
                      {availabilityLabels[product.availability] ?? product.availability}
                    </Badge>
                  </div>
                  <Button asChild size="sm" className="mt-4">
                    <a
                      href={whatsappLink(
                        `Hello ${site.name}, I would like to enquire about: ${product.name}`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enquire about this product
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-10 text-xs text-muted-foreground">
          Products are managed by {site.name} and updated regularly. Online payment is not available
          on this website — orders are confirmed directly with our team.
        </p>
      </div>
    </>
  );
}
