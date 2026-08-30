import { MessageCircle } from "lucide-react";

import { whatsappLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with PALMCLEANERS on WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
