import { Star, Sparkles } from 'lucide-react';

const BestPrice = () => {
  return (
    <section
      data-reveal="fade-up"
      className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-24 lg:pb-28 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white overflow-hidden"
    >
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="container-custom text-center relative z-10 px-4 sm:px-6">
        {/* Estrellas grandes con animación - más pequeñas en móvil */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 md:mb-8">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 fill-yellow-300 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.5)] animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>

        {/* Título principal - mejor escalado móvil */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
          <span className="block mb-1 sm:mb-2 text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.3)]">
            EL MEJOR PRECIO
          </span>
          <span className="block text-white drop-shadow-2xl">
            DEL MERCADO
          </span>
        </h2>

        {/* Subtítulo limpio y claro - optimizado móvil */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg mb-2 sm:mb-3 md:mb-4 px-2">
            PRECIO JUSTO, SERVICIO IMPECABLE
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 font-medium leading-relaxed px-4 sm:px-6">
            Precio claro en volquetes y tierra en Roldán, con atención rápida y sin sorpresas.
          </p>
        </div>

        {/* Beneficios - apilados en móvil, horizontal en desktop */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto">
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-white/40 shadow-lg hover:scale-105 transition-transform duration-300">
            <span className="text-xl sm:text-2xl">✓</span>
            <span className="font-bold text-sm sm:text-base md:text-lg whitespace-nowrap">Sin cargos ocultos</span>
          </div>
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-white/40 shadow-lg hover:scale-105 transition-transform duration-300">
            <span className="text-xl sm:text-2xl">✓</span>
            <span className="font-bold text-sm sm:text-base md:text-lg whitespace-nowrap">Atención inmediata</span>
          </div>
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-white/40 shadow-lg hover:scale-105 transition-transform duration-300">
            <span className="text-xl sm:text-2xl">✓</span>
            <span className="font-bold text-sm sm:text-base md:text-lg whitespace-nowrap">Calidad garantizada</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestPrice;
