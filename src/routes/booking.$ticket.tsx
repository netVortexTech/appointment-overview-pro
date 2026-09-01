import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, CheckCircle2, Copy, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBookingByTicket } from "@/lib/booking.functions";
import { site, whatsappLink } from "@/lib/site";

const bookingQuery = (ticket: string) =>
  queryOptions({
    queryKey: ["booking", ticket],
    queryFn: () => getBookingByTicket({ data: { ticket } }),
  });

export const Route = createFileRoute("/booking/$ticket")({
  head: () => ({
    meta: [
      { title: "Booking Confirmation | PALMCLEANERS" },
      {
        name: "description",
        content:
          "Your PALMCLEANERS booking request has been received. Save your ticket number so our team can locate your booking.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Booking Confirmation | PALMCLEANERS" },
      { property: "og:description", content: "Your cleaning booking request has been received." },
    ],
  }),
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(bookingQuery(params.ticket));
  },
  errorComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="text-xl font-semibold">We could not load this booking</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Please contact us on {site.phone} with your ticket number.
      </p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="text-xl font-semibold">Booking not found</h1>
    </div>
  ),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { ticket } = Route.useParams();
  const { data: booking } = useSuspenseQuery(bookingQuery(ticket));
  const [copied, setCopied] = useState(false);

  if (!booking) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-extrabold">Booking not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          We could not find ticket {ticket}. Please check the number or contact us on {site.phone}.
        </p>
        <Button asChild className="mt-6">
          <Link to="/book">Make a booking</Link>
        </Button>
      </div>
    );
  }

  async function copyTicket() {
    try {
      await navigator.clipboard.writeText(booking!.ticketNumber);
      setCopied(true);
      toast.success("Ticket number copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy. Please write the ticket number down.");
    }
  }

  return (
    <div className="container-page max-w-3xl py-14 md:py-20">
      <div className="surface-card p-6 md:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </span>
        <h1 className="mt-5 text-2xl font-extrabold md:text-3xl">Booking request received!</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you for choosing {site.name}. Our team will review your request and contact you to
          confirm.
        </p>

        <div className="mt-7 rounded-2xl bg-primary-soft p-5">
          <p className="text-xs font-bold tracking-[0.16em] uppercase">Your booking ticket number</p>
          <p className="mt-2 font-display text-2xl font-extrabold md:text-3xl">
            {booking.ticketNumber}
          </p>
          <Button onClick={copyTicket} size="sm" variant="secondary" className="mt-4">
            {copied ? (
              <Check className="mr-2 h-4 w-4" aria-hidden />
            ) : (
              <Copy className="mr-2 h-4 w-4" aria-hidden />
            )}
            Copy ticket number
          </Button>
          <p className="mt-4 text-sm">
            Please save your ticket number. It can be used by our team to quickly locate your booking
            and service history.
          </p>
        </div>

        <dl className="mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Customer name
            </dt>
            <dd className="mt-1 font-semibold">{booking.customerName}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Selected services
            </dt>
            <dd className="mt-1 font-semibold">{booking.services.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Location / area
            </dt>
            <dd className="mt-1 font-semibold">
              {booking.area}
              {booking.nearestPlace ? ` · ${booking.nearestPlace}` : ""}
              {booking.boltLocation ? ` · Bolt: ${booking.boltLocation}` : ""}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Preferred date
            </dt>
            <dd className="mt-1 font-semibold">{booking.preferredDate}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Preferred time
            </dt>
            <dd className="mt-1 font-semibold">{booking.preferredTime}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Booking status
            </dt>
            <dd className="mt-1">
              <Badge variant="secondary" className="uppercase">
                {booking.status}
              </Badge>
              {booking.priority === "urgent" && (
                <Badge className="ml-2 uppercase">Urgent assistance</Badge>
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a
              href={whatsappLink(
                `Hello ${site.name}, I have submitted booking ${booking.ticketNumber}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden />
              Contact us on WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/book">Make another booking</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
