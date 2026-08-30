-- Customers
CREATE TABLE public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone_number text NOT NULL UNIQUE,
  whatsapp_number text,
  email text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated;
GRANT ALL ON public.customers TO service_role;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated staff can read customers" ON public.customers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated staff can update customers" ON public.customers FOR UPDATE TO authenticated USING (true);

-- Ticket sequence
CREATE SEQUENCE public.booking_ticket_seq START 1;

CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number text NOT NULL UNIQUE,
  customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  business_id text NOT NULL DEFAULT 'palmcleaners',
  source text NOT NULL DEFAULT 'website',
  status text NOT NULL DEFAULT 'pending',
  priority text NOT NULL DEFAULT 'normal',
  area text NOT NULL,
  nearest_place text,
  bolt_location text,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  description text,
  notes text,
  amount_charged numeric(12,2),
  discount_amount numeric(12,2),
  discount_reason text,
  final_amount numeric(12,2),
  assigned_staff text,
  service_status text,
  internal_notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated staff can read bookings" ON public.bookings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated staff can update bookings" ON public.bookings FOR UPDATE TO authenticated USING (true);

CREATE INDEX bookings_customer_id_idx ON public.bookings(customer_id);
CREATE INDEX bookings_status_idx ON public.bookings(status);
CREATE INDEX bookings_preferred_date_idx ON public.bookings(preferred_date);

CREATE TABLE public.booking_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  service_slug text NOT NULL,
  service_name text NOT NULL
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.booking_services TO authenticated;
GRANT ALL ON public.booking_services TO service_role;
ALTER TABLE public.booking_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated staff can read booking services" ON public.booking_services FOR SELECT TO authenticated USING (true);
CREATE INDEX booking_services_booking_id_idx ON public.booking_services(booking_id);

-- Ticket number generation
CREATE OR REPLACE FUNCTION public.set_booking_ticket_number()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF new.ticket_number IS NULL OR new.ticket_number = '' THEN
    new.ticket_number := 'PC-' || to_char(now(), 'YYYY') || '-' ||
      lpad(nextval('public.booking_ticket_seq')::text, 5, '0');
  END IF;
  RETURN new;
END;
$$;

CREATE TRIGGER bookings_set_ticket_number
BEFORE INSERT ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.set_booking_ticket_number();

-- Products (admin-manageable later, publicly readable)
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price_text text NOT NULL DEFAULT 'Price on request',
  category text NOT NULL DEFAULT 'Cleaning products',
  image_url text,
  availability text NOT NULL DEFAULT 'in_stock',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Authenticated can view all products" ON public.products FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.products (name, description, price_text, category, availability, sort_order) VALUES
('Multi-Surface Cleaner (5L)', 'Professional-grade cleaner for floors, counters and general household surfaces. Leaves a streak-free, fresh finish.', 'TZS 25,000', 'Cleaning products', 'in_stock', 1),
('Fabric & Upholstery Shampoo (5L)', 'Deep-cleaning shampoo formulated for sofas, carpets and fabric upholstery. Lifts stains without damaging fibres.', 'TZS 38,000', 'Fabric cleaning products', 'in_stock', 2),
('Carpet Stain Remover (1L)', 'Fast-acting spot treatment for stubborn carpet and rug stains, safe for most fibres.', 'TZS 15,000', 'Fabric cleaning products', 'in_stock', 3),
('Disinfectant Concentrate (5L)', 'Hospital-grade disinfectant concentrate for high-touch surfaces, bathrooms and kitchens.', 'TZS 30,000', 'Home hygiene products', 'in_stock', 4),
('Glass & Window Cleaner (1L)', 'Streak-free glass cleaner for windows, mirrors and glass partitions.', 'TZS 9,000', 'Cleaning products', 'in_stock', 5),
('Microfibre Cloth Set (6 pcs)', 'Durable, lint-free microfibre cloths for dusting, polishing and general cleaning.', 'TZS 12,000', 'Cleaning supplies', 'in_stock', 6),
('Professional Mop & Bucket Set', 'Heavy-duty mop with wringer bucket, suited to homes, offices and commercial spaces.', 'TZS 45,000', 'Cleaning supplies', 'low_stock', 7),
('Air Freshener & Deodoriser (500ml)', 'Long-lasting room deodoriser that neutralises odours instead of masking them.', 'TZS 8,000', 'Home hygiene products', 'in_stock', 8);