export type ServiceCategory = "residential" | "commercial" | "specialized";

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  short: string;
  details: string;
  included: string[];
  icon: string;
};

export const categoryLabels: Record<ServiceCategory, string> = {
  residential: "Residential Cleaning",
  commercial: "Commercial Cleaning",
  specialized: "Specialized Cleaning",
};

export const services: Service[] = [
  {
    slug: "deep-house-cleaning",
    name: "Deep House Cleaning",
    category: "residential",
    icon: "Home",
    short: "A thorough top-to-bottom clean that resets your entire home.",
    details:
      "A complete deep clean of your home, covering every room, surface and high-touch area. Ideal before moving in, after an event, or when your home needs a full reset.",
    included: [
      "Detailed cleaning of all rooms, including bedrooms, living areas and hallways.",
      "Kitchen cleaning: counters, cabinet fronts, sinks, tiles and appliance exteriors.",
      "Bathroom deep cleaning and descaling of showers, sinks and toilets.",
      "Dusting and wiping of furniture, shelves and decorative items.",
      "Skirting board cleaning to remove dust buildup along walls and floors.",
      "Door handles and light switches wiped for hygiene in high-touch areas.",
      "Interior window cleaning for bright, clear views.",
      "Floor hoovering and mopping throughout the house.",
      "Emptying bins and tidying waste for a fresh finish.",
    ],
  },
  {
    slug: "sofa-upholstery-cleaning",
    name: "Sofa / Upholstery Cleaning",
    category: "residential",
    icon: "Sofa",
    short: "Deep fabric extraction that lifts dirt, stains and odours from your seating.",
    details:
      "Professional upholstery cleaning for sofas, armchairs, dining chairs and fabric furniture using deep extraction methods that clean inside the fabric, not just the surface.",
    included: [
      "Inspection of fabric type and problem areas before treatment.",
      "Dry vacuuming to remove loose dust, crumbs and debris.",
      "Pre-treatment of stains, marks and heavily used areas.",
      "Deep shampoo and hot-water extraction cleaning of cushions and frames.",
      "Cleaning of cushion covers, seams, arms and backrests.",
      "Odour treatment to leave the furniture smelling fresh.",
      "Controlled moisture extraction to speed up drying time.",
      "Final grooming of the fabric and clean-up of the work area.",
    ],
  },
  {
    slug: "mattress-cleaning",
    name: "Mattress Cleaning",
    category: "residential",
    icon: "BedDouble",
    short: "Hygienic mattress cleaning for healthier, fresher sleep.",
    details:
      "Deep mattress cleaning that removes dust, sweat residue, stains and allergens that build up over time, leaving your bed hygienic and fresh.",
    included: [
      "Deep vacuuming of the mattress surface, sides and seams.",
      "Pre-treatment of visible stains and discoloured areas.",
      "Deep shampoo cleaning with extraction of dirt and residue.",
      "Sanitising treatment to reduce bacteria, dust mites and allergens.",
      "Odour neutralising for a fresh sleeping surface.",
      "Both sides cleaned where the mattress allows.",
      "Moisture extraction to reduce drying time.",
    ],
  },
  {
    slug: "carpet-cleaning",
    name: "Carpet Cleaning",
    category: "residential",
    icon: "Layers",
    short: "Carpet and rug deep cleaning that restores colour and texture.",
    details:
      "Professional carpet and rug cleaning for homes and offices, removing embedded dirt, stains and odours while protecting the fibres.",
    included: [
      "Assessment of carpet material and stained areas.",
      "Thorough hoovering to remove dry soil and dust.",
      "Targeted pre-treatment of stains and traffic lanes.",
      "Deep shampoo cleaning with hot-water extraction.",
      "Edge and corner cleaning where dirt collects.",
      "Odour treatment and deodorising.",
      "Pile grooming and moisture extraction for faster drying.",
    ],
  },
  {
    slug: "curtain-cleaning",
    name: "Curtain Cleaning",
    category: "residential",
    icon: "Blinds",
    short: "Curtain and drapery cleaning that removes dust and restores freshness.",
    details:
      "Careful curtain cleaning suited to the fabric, removing dust, smoke residue and odours that collect in drapery over time.",
    included: [
      "Careful removal and inspection of curtains and fabric type.",
      "Dust extraction before washing to protect the fabric.",
      "Appropriate deep cleaning method selected for the material.",
      "Stain treatment where required.",
      "Odour removal and freshening.",
      "Proper drying to protect shape and colour.",
      "Re-hanging of curtains and tidy-up of the area.",
    ],
  },
  {
    slug: "deep-office-workspace-cleaning",
    name: "Deep Office & Workspace Cleaning",
    category: "commercial",
    icon: "Building2",
    short: "Professional deep cleaning that keeps offices hygienic and presentable.",
    details:
      "Professional deep cleaning designed to keep offices and workspaces clean, hygienic, fresh and presentable.",
    included: [
      "Thorough surface cleaning, including wiping down office desks, counters and tables to eliminate dust and stains.",
      "Skirting board cleaning to remove dust buildup along the edges of walls and floors.",
      "Furniture cleaning and dusting, ensuring that desks, chairs and office items remain clean and presentable.",
      "Cleaning of door handles and surrounding areas to maintain hygiene throughout the office.",
      "Window cleaning from the inside to ensure bright and clear views in office areas.",
      "Light switch wiping for improved cleanliness and hygiene in high-touch areas.",
      "Comprehensive office floor cleaning, including hoovering and mopping where applicable.",
      "Dusting decorative objects and office equipment.",
      "Emptying bins to ensure proper waste management and a tidy office space.",
    ],
  },
  {
    slug: "office-maintenance-cleaning",
    name: "Office Maintenance Cleaning",
    category: "commercial",
    icon: "CalendarCheck",
    short: "Scheduled routine cleaning that keeps your workplace consistently clean.",
    details:
      "Regular scheduled cleaning visits, daily, weekly or monthly, that keep your office consistently presentable without disrupting work.",
    included: [
      "Routine desk, counter and shared surface wiping.",
      "Daily or scheduled floor hoovering and mopping.",
      "Bin emptying and waste management.",
      "Washroom cleaning, restocking checks and sanitising.",
      "Kitchen and staff area cleaning.",
      "High-touch point disinfection: handles, switches and shared equipment.",
      "Reception and meeting-room presentation checks.",
      "Reporting of cleaning issues to management.",
    ],
  },
  {
    slug: "shop-commercial-space-cleaning",
    name: "Shop & Commercial Space Cleaning",
    category: "commercial",
    icon: "Store",
    short: "Retail and commercial cleaning that keeps customer areas spotless.",
    details:
      "Cleaning for shops, showrooms, salons, restaurants and commercial spaces, focused on the areas your customers notice first.",
    included: [
      "Entrance, glass door and display window cleaning.",
      "Shelf, display and counter dusting and wiping.",
      "Floor hoovering, mopping and stain removal.",
      "Fitting rooms, seating and customer area cleaning.",
      "Washroom cleaning and sanitising.",
      "Bin emptying and back-of-house tidying.",
      "High-touch surface disinfection throughout the space.",
    ],
  },
  {
    slug: "post-construction-cleaning",
    name: "Post-Construction Cleaning",
    category: "specialized",
    icon: "HardHat",
    short: "Heavy-duty cleaning that turns a finished site into a ready space.",
    details:
      "Intensive cleaning after building, renovation or painting work, removing dust, cement residue and debris so the space is ready to use.",
    included: [
      "Removal of construction debris and leftover packaging.",
      "Heavy dust extraction from floors, walls, ceilings and fittings.",
      "Cement, paint and adhesive residue removal from surfaces.",
      "Detailed window, frame and glass cleaning inside.",
      "Cleaning of doors, handles, sockets and switches.",
      "Bathroom and kitchen fitting deep cleaning and descaling.",
      "Multi-stage floor cleaning: sweeping, hoovering and mopping.",
      "Final inspection and presentation clean.",
    ],
  },
  {
    slug: "deep-sanitisation",
    name: "Deep Sanitisation",
    category: "specialized",
    icon: "ShieldCheck",
    short: "Disinfection of high-touch areas for healthier homes and workplaces.",
    details:
      "Targeted sanitisation and disinfection service for homes, offices and commercial spaces where hygiene is a priority.",
    included: [
      "Assessment of high-risk and high-touch areas.",
      "Surface cleaning before disinfection for full effectiveness.",
      "Application of professional-grade disinfectant to surfaces.",
      "Disinfection of handles, switches, rails, desks and shared equipment.",
      "Washroom and kitchen sanitising.",
      "Floor disinfection where applicable.",
      "Odour neutralising and final freshening.",
    ],
  },
  {
    slug: "custom-cleaning-requests",
    name: "Custom Cleaning Requests",
    category: "specialized",
    icon: "Sparkles",
    short: "Tell us what needs cleaning and we will build the service around it.",
    details:
      "Not every job fits a standard package. Describe what you need cleaned and our team will assess the work, advise you and quote accordingly.",
    included: [
      "Free consultation about your cleaning requirement.",
      "Assessment of the space, materials and level of work needed.",
      "A clear plan and quotation before work starts.",
      "Trained staff and equipment suited to the job.",
      "Careful handling of delicate items and surfaces.",
      "Final walkthrough to confirm you are satisfied.",
    ],
  },
];

export const bookingServiceOptions = [
  { slug: "deep-house-cleaning", name: "Deep House Cleaning" },
  { slug: "sofa-upholstery-cleaning", name: "Sofa Cleaning" },
  { slug: "mattress-cleaning", name: "Mattress Cleaning" },
  { slug: "carpet-cleaning", name: "Carpet Cleaning" },
  { slug: "curtain-cleaning", name: "Curtain Cleaning" },
  { slug: "deep-office-workspace-cleaning", name: "Office Cleaning" },
  { slug: "office-maintenance-cleaning", name: "Workspace Cleaning" },
  { slug: "post-construction-cleaning", name: "Post-Construction Cleaning" },
  { slug: "other", name: "Other" },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
