import { Link, createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact PALMCLEANERS | Cleaning Services Enquiries" },
      {
        name: "description",
        content:
          "Contact PALMCLEANERS on 0693 816 261 or palmharan3@gmail.com. Located at Makongo Juu, Oryx. Call, email or send a WhatsApp message.",
      },
      { property: "og:title", content: "Contact PALMCLEANERS" },
      {
        property: "og:description",
        content: "Phone, email, WhatsApp and enquiry form for PALMCLEANERS cleaning services.",
      },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  message: z.string().trim().min(5, "Please tell us how we can help").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    const { name, phone, message } = parsed.data;
    const text = `Enquiry for ${site.name}\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp so you can send your enquiry to our team.");
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to PALMCLEANERS"
        description="Call, email or send us a WhatsApp message. For cleaning appointments, the booking form is the fastest way to reach our team."
      >
        <Button asChild size="lg">
          <Link to="/book">Book a Cleaning</Link>
        </Button>
      </PageHero>

      <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <a href={`tel:${site.phoneIntl}`} className="surface-card flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Phone className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground uppercase">Call us</span>
              <span className="block font-semibold">{site.phone}</span>
            </span>
          </a>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="surface-card flex items-center gap-4 p-5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <MessageCircle className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground uppercase">WhatsApp</span>
              <span className="block font-semibold">Chat with our team</span>
            </span>
          </a>

          <a href={`mailto:${site.email}`} className="surface-card flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Mail className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground uppercase">Email</span>
              <span className="block font-semibold break-all">{site.email}</span>
            </span>
          </a>

          <div className="surface-card flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <MapPin className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground uppercase">Location</span>
              <span className="block font-semibold">{site.location}</span>
              <span className="block text-sm text-muted-foreground">{site.city}</span>
            </span>
          </div>

          <p className="text-sm text-muted-foreground">{site.hours}</p>
        </div>

        <form onSubmit={handleSubmit} className="surface-card space-y-5 p-6 md:p-8">
          <div>
            <h2 className="text-xl font-extrabold">Send an enquiry</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in your details and we will open WhatsApp with your message ready to send to our
              team.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={form.name}
              maxLength={100}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              value={form.phone}
              maxLength={30}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              placeholder="0693 816 261"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">How can we help?</Label>
            <Textarea
              id="message"
              rows={5}
              maxLength={1000}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              placeholder="Tell us what you would like cleaned and where you are located."
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            <Send className="mr-2 h-4 w-4" aria-hidden />
            Send enquiry via WhatsApp
          </Button>
        </form>
      </div>
    </>
  );
}
