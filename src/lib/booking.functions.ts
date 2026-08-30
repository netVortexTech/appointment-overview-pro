import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const bookingSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phoneNumber: z.string().trim().min(7).max(30),
  whatsappNumber: z.string().trim().max(30).optional().or(z.literal("")),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  area: z.string().trim().min(2).max(160),
  nearestPlace: z.string().trim().max(160).optional().or(z.literal("")),
  boltLocation: z.string().trim().max(160).optional().or(z.literal("")),
  services: z
    .array(z.object({ slug: z.string().min(1).max(80), name: z.string().min(1).max(120) }))
    .min(1)
    .max(12),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferredTime: z.string().trim().min(2).max(40),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  priority: z.enum(["normal", "urgent"]),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const phone = data.phoneNumber.replace(/\s+/g, "");

    const { data: existing } = await supabaseAdmin
      .from("customers")
      .select("id")
      .eq("phone_number", phone)
      .maybeSingle();

    let customerId = existing?.id ?? null;

    if (!customerId) {
      const { data: inserted, error } = await supabaseAdmin
        .from("customers")
        .insert({
          full_name: data.fullName,
          phone_number: phone,
          whatsapp_number: data.whatsappNumber || null,
          email: data.email || null,
        })
        .select("id")
        .single();
      if (error) throw new Error("Could not save your details. Please try again.");
      customerId = inserted.id;
    } else {
      await supabaseAdmin
        .from("customers")
        .update({
          full_name: data.fullName,
          whatsapp_number: data.whatsappNumber || null,
          email: data.email || null,
        })
        .eq("id", customerId);
    }

    const { data: booking, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .insert({
        ticket_number: "",
        customer_id: customerId,
        source: "website",
        status: "pending",
        priority: data.priority,
        area: data.area,
        nearest_place: data.nearestPlace || null,
        bolt_location: data.boltLocation || null,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        description: data.description || null,
        notes: data.notes || null,
      })
      .select("id, ticket_number")
      .single();

    if (bookingError || !booking) throw new Error("Could not save your booking. Please try again.");

    await supabaseAdmin.from("booking_services").insert(
      data.services.map((service) => ({
          booking_id: booking.id,
          service_slug: service.slug,
          service_name: service.name,
      })),
    );

    return { ticketNumber: booking.ticket_number };
  });

export const getBookingByTicket = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z.object({ ticket: z.string().trim().min(4).max(40) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: booking } = await supabaseAdmin
      .from("bookings")
      .select(
        "ticket_number, status, priority, area, nearest_place, bolt_location, preferred_date, preferred_time, created_at, customers(full_name), booking_services(service_name)",
      )
      .eq("ticket_number", data.ticket.toUpperCase())
      .maybeSingle();

    if (!booking) return null;

    // Only non-sensitive, customer-facing fields are returned. Internal
    // financial and staff fields stay in the database for the admin panel.
    return {
      ticketNumber: booking.ticket_number,
      status: booking.status,
      priority: booking.priority,
      area: booking.area,
      nearestPlace: booking.nearest_place,
      boltLocation: booking.bolt_location,
      preferredDate: booking.preferred_date,
      preferredTime: booking.preferred_time,
      createdAt: booking.created_at,
      customerName: booking.customers?.full_name ?? "",
      services: (booking.booking_services ?? []).map((s) => s.service_name),
    };
  });

export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data } = await supabaseAdmin
    .from("products")
    .select("id, name, description, price_text, category, image_url, availability, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return data ?? [];
});
