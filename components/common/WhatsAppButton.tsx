import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "+966532175302";
  const message = "Hello, I would like to request a quotation.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      dir="ltr"
      className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600"
    >
      <FaWhatsapp className="h-10 w-10" />
      Request on WhatsApp
    </a>
  );
}