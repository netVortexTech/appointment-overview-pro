import { createServerFn } from "@tanstack/react-start";

export const listServices = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: cats } = await supabaseAdmin.from("service_categories").select("id, name").order("sort_order");
  const { data: services } = await supabaseAdmin
    .from("services")
    .select("id, name, description, whats_included, is_active, category_id, service_categories(name)")
    .eq("is_active", true)
    .order("created_at");

  if (!services || services.length === 0) return null; // fallback to hardcoded

  // Map admin DB shape to website shape
  const catMap = new Map((cats ?? []).map((c: any) => [c.id, c.name.toLowerCase().includes("residential") ? "residential" : c.name.toLowerCase().includes("commercial") ? "commercial" : "specialized"]));
  return services.map((s: any) => {
    const cat = catMap.get(s.category_id) ?? "specialized";
    const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const included: string[] = (s.whats_included ?? "").split(";").map((x: string) => x.trim()).filter(Boolean);
    return {
      slug,
      name: s.name,
      category: cat as "residential" | "commercial" | "specialized",
      short: s.description ?? "",
      details: s.description ?? "",
      included: included.length ? included : [s.description ?? ""],
      icon: cat === "residential" ? "Home" : cat === "commercial" ? "Building2" : "Sparkles",
    };
  });
});
