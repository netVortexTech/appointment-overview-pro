import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/lib/booking.functions";
import { bookingServiceOptions } from "@/lib/services";
import { site } from "@/lib/site";

const searchSchema = z.object({
  service: z.string().max(80).optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Book a Cleaning | PALMCLEANERS" },
      {
        name: "description",
        content:
          "Book a professional cleaning with PALMCLEANERS. Share your details, location and preferred date, then receive a ticket number to track your booking.",
      },
      { property: "og:title", content: "Book a Cleaning | PALMCLEANERS" },
      {
        property: "og:description",
        content: "A simple 5-step booking request for home, office and specialized cleaning.",
      },
    ],
  }),
  component: BookPage,
});

const steps = [
  "Customer details",
  "Location",
  "Select service",
  "Booking details",
  "Communication",
];

const timeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
];

type FormState = {
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
  area: string;
  nearestPlace: string;
  boltLocation: string;
  services: string[];
  description: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  priority: "normal" | "urgent";
};

function BookPage() {
  const { service } = Route.useSearch();
  const navigate = useNavigate();
  const submitBooking = useServerFn(createBooking);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    area: "",
    nearestPlace: "",
    boltLocation: "",
    services: service && bookingServiceOptions.some((o) => o.slug === service) ? [service] : [],
    description: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
    priority: "normal",
  });

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function toggleService(slug: string) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(slug)
        ? prev.services.filter((item) => item !== slug)
        : [...prev.services, slug],
    }));
  }

  function validateStep(index: number) {
    if (index === 0) {
      if (form.fullName.trim().length < 2) return "Please enter your full name";
      if (form.phoneNumber.trim().length < 7) return "Please enter a valid phone number";
      if (form.email && !z.string().email().safeParse(form.email.trim()).success)
        return "Please enter a valid email address or leave it empty";
    }
    if (index === 1 && form.area.trim().length < 2) return "Please enter your area";
    if (index === 2) {
      if (form.services.length === 0) return "Please select at least one service";
      if (form.services.includes("other") && form.description.trim().length < 5)
        return "Please describe the service you need";
    }
    if (index === 3) {
      if (!form.preferredDate) return "Please choose a preferred date";
      if (!form.preferredTime) return "Please choose a preferred time";
    }
    return null;
  }

  function next() {
    const error = validateStep(step);
    if (error) {
      toast.error(error);
      return;
    }
    setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  async function handleSubmit() {
    for (let index = 0; index < steps.length; index += 1) {
      const error = validateStep(index);
      if (error) {
        setStep(index);
        toast.error(error);
        return;
      }
    }

    setSubmitting(true);
    try {
      const result = await submitBooking({
        data: {
          fullName: form.fullName.trim(),
          phoneNumber: form.phoneNumber.trim(),
          whatsappNumber: form.whatsappNumber.trim(),
          email: form.email.trim(),
          area: form.area.trim(),
          nearestPlace: form.nearestPlace.trim(),
          boltLocation: form.boltLocation.trim(),
          services: form.services.map((slug) => ({
            slug,
            name: bookingServiceOptions.find((option) => option.slug === slug)?.name ?? slug,
          })),
          description: form.description.trim(),
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          notes: form.notes.trim(),
          priority: form.priority,
        },
      });
      await navigate({ to: "/booking/$ticket", params: { ticket: result.ticketNumber } });
    } catch {
      toast.error("We could not submit your booking. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Book a cleaning"
        title="Request your cleaning in five short steps"
        description="Tell us who you are, where you are, and what needs cleaning. Our team confirms your booking and sends you a ticket number."
      />

      <div className="container-page py-12 md:py-16">
        <ol className="mb-8 grid gap-2 sm:grid-cols-5">
          {steps.map((label, index) => (
            <li
              key={label}
              className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                index === step
                  ? "border-primary bg-primary-soft text-secondary-foreground"
                  : index < step
                    ? "border-border bg-card text-muted-foreground"
                    : "border-border bg-card text-muted-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                {index < step ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
                ) : (
                  <span className="text-primary">{index + 1}.</span>
                )}
                {label}
              </span>
            </li>
          ))}
        </ol>

        <div className="surface-card p-6 md:p-8">
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-xl font-extrabold">Customer details</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name *</Label>
                  <Input
                    id="fullName"
                    maxLength={120}
                    value={form.fullName}
                    onChange={(event) => set("fullName", event.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone number *</Label>
                  <Input
                    id="phoneNumber"
                    inputMode="tel"
                    maxLength={30}
                    value={form.phoneNumber}
                    onChange={(event) => set("phoneNumber", event.target.value)}
                    placeholder="07XX XXX XXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber">WhatsApp number</Label>
                  <Input
                    id="whatsappNumber"
                    inputMode="tel"
                    maxLength={30}
                    value={form.whatsappNumber}
                    onChange={(event) => set("whatsappNumber", event.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    maxLength={160}
                    value={form.email}
                    onChange={(event) => set("email", event.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-extrabold">Location</h2>
              <p className="text-sm text-muted-foreground">
                This information helps our staff locate you accurately.
              </p>
              <div className="space-y-2">
                <Label htmlFor="area">Area *</Label>
                <Input
                  id="area"
                  maxLength={160}
                  value={form.area}
                  onChange={(event) => set("area", event.target.value)}
                  placeholder="Makongo Juu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nearestPlace">Nearest place to it (optional)</Label>
                <Input
                  id="nearestPlace"
                  maxLength={160}
                  value={form.nearestPlace}
                  onChange={(event) => set("nearestPlace", event.target.value)}
                  placeholder="Near Oryx"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="boltLocation">Bolt location (optional)</Label>
                <Input
                  id="boltLocation"
                  maxLength={160}
                  value={form.boltLocation}
                  onChange={(event) => set("boltLocation", event.target.value)}
                  placeholder="Oryx Petrol Station"
                />
                <p className="text-xs text-muted-foreground">
                  Enter a location name that can be searched on Bolt, or a nearby searchable
                  location.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-extrabold">Select service</h2>
              <p className="text-sm text-muted-foreground">
                Choose one or more cleaning services you need.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {bookingServiceOptions.map((option) => {
                  const checked = form.services.includes(option.slug);
                  return (
                    <label
                      key={option.slug}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                        checked ? "border-primary bg-primary-soft" : "border-border bg-card"
                      }`}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleService(option.slug)}
                      />
                      <span className="font-medium">{option.name}</span>
                    </label>
                  );
                })}
              </div>

              {form.services.includes("other") && (
                <div className="space-y-2">
                  <Label htmlFor="description">Describe the service you need *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    maxLength={2000}
                    value={form.description}
                    onChange={(event) => set("description", event.target.value)}
                    placeholder="Tell us what you would like cleaned and any important details."
                  />
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-extrabold">Booking details</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={form.preferredDate}
                    onChange={(event) => set("preferredDate", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred time *</Label>
                  <select
                    id="preferredTime"
                    value={form.preferredTime}
                    onChange={(event) => set("preferredTime", event.target.value)}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional notes (optional)</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  maxLength={2000}
                  value={form.notes}
                  onChange={(event) => set("notes", event.target.value)}
                  placeholder="Anything our team should know before arriving."
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-xl font-extrabold">Would you like immediate assistance?</h2>
              <RadioGroup
                value={form.priority}
                onValueChange={(value) => set("priority", value as FormState["priority"])}
                className="gap-3"
              >
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm">
                  <RadioGroupItem value="normal" className="mt-0.5" />
                  <span>
                    <span className="block font-semibold">No, I can wait for an agent</span>
                    <span className="block text-muted-foreground">
                      Our team will review your request and get back to you.
                    </span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm">
                  <RadioGroupItem value="urgent" className="mt-0.5" />
                  <span>
                    <span className="block font-semibold">
                      Yes, I want to speak with customer care
                    </span>
                    <span className="block text-muted-foreground">
                      Your request will be marked urgent for our team.
                    </span>
                  </span>
                </label>
              </RadioGroup>

              {form.priority === "urgent" && (
                <p className="rounded-xl bg-primary-soft p-4 text-sm">
                  Our customer care assistant will receive your request and a {site.name}{" "}
                  representative will contact you as soon as possible.
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => setStep((value) => Math.max(value - 1, 0))}
              disabled={step === 0 || submitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
              Back
            </Button>

            {step < steps.length - 1 ? (
              <Button onClick={next}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting} size="lg">
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
                Submit booking request
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
