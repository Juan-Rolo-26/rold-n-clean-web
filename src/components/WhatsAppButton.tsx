import React from 'react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5493413623232?text=Hola!%20Me%20interesa%20alquilar%20un%20volquete"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group transition-transform hover:scale-110 active:scale-95 duration-300"
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative filter drop-shadow-2xl">
        <svg
          viewBox="0 0 60 60"
          className="w-16 h-16 md:w-20 md:h-20 fill-[#25D366]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="30" cy="30" r="30" fill="#25D366" />
          <path fill="white" d="M44.3 16.4C40.6 12.7 35.6 10.6 30.3 10.6 19.5 10.6 10.7 19.4 10.7 30.2c0 3.5.9 6.8 2.6 9.8L10.6 49l9.3-2.4c2.8 1.5 6 2.4 9.3 2.4h.1c10.8 0 19.6-8.8 19.6-19.6.1-5.2-2-10.1-5.7-13.8zM30.4 46.3h-.1c-2.9 0-5.7-.8-8.2-2.3l-.6-.4-6.1 1.6 1.6-5.9-.4-.6C15 36.2 14 33.3 14 30.3c0-9 7.3-16.3 16.3-16.3 4.4 0 8.5 1.7 11.6 4.8 3.1 3.1 4.8 7.2 4.8 11.6 0 9-7.3 16.3-16.3 15.9zm8.9-11.9c-.5-.2-2.9-1.4-3.3-1.6-.4-.2-.7-.3-1 .2-.3.5-1.1 1.4-1.4 1.7-.2.3-.5.3-1 .1-.5-.2-2-.7-3.8-2.3-1.4-1.3-2.4-2.8-2.6-3.3-.3-.5 0-.8.2-1 .2-.2.5-.5.7-.8.2-.2.3-.4.5-.6.2-.2.1-.4 0-.6-.1-.2-1-2.4-1.3-3.2-.4-.9-.8-.8-1.1-.8h-.9c-.3 0-.8.1-1.2.6-.4.5-1.6 1.6-1.6 3.8 0 2.2 1.6 4.4 1.8 4.7.2.3 3.1 4.7 7.6 6.6 3 1.3 3.6 1 4.9.9 1.1-.1 2.9-1.2 3.3-2.3.4-1.1.4-2.1.3-2.3-.2-.1-.5-.2-1-.4z" />
        </svg>
      </div>

      {/* Tooltip */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-800 text-sm font-bold py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
        ¡Escribinos!
      </span>
    </a>
  );
};

export default WhatsAppButton;
