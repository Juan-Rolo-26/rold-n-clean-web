import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5493412345678?text=Hola!%20Me%20interesa%20alquilar%20un%20volquete"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-30" />
      
      {/* Button */}
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-whatsapp shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
        <MessageCircle className="w-8 h-8 text-white" />
      </div>

      {/* Tooltip */}
      <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-foreground text-white text-sm py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        ¡Chateá con nosotros!
      </span>
    </a>
  );
};

export default WhatsAppButton;
