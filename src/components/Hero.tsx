import { useState, useEffect } from 'react';
import { Phone, Star, TrendingDown, Zap, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Importing assets
import cartelRoldan from '@/assets/cartel-roldan.png';
import volquetes3 from '@/assets/volquetes3.jpeg';
import camion1 from '@/assets/camion1.jpeg';
import camion2 from '@/assets/camion2.jpeg';
import camion3 from '@/assets/camion3.jpeg';
import volquetes4 from '@/assets/volquetes4.jpeg';
import volquetes5 from '@/assets/volquetes5.jpeg';
import volquetes6 from '@/assets/volquetes6.jpeg';
import volquetes7 from '@/assets/volquetes7.jpeg';
import imagen1 from '@/assets/imagen 1.jpeg';

const heroImages = [
  camion1,
  volquetes3,
  camion2,
  volquetes4,
  camion3,
  volquetes5,
  volquetes6,
  volquetes7,
  imagen1,
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen w-full bg-black">

      {/* Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10" /> {/* Overlay mejorado */}

        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${currentImageIndex === index ? "opacity-100" : "opacity-0"
              }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Efectos decorativos flotantes */}
      <div className="absolute inset-0 z-10 overflow-hidden opacity-20">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-400 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-white rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-green-400 rounded-full blur-[80px] animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Content - Fusión BestPrice + Hero */}
      <div className="relative z-20 container-custom min-h-screen flex flex-col justify-center items-center py-16 sm:py-20 md:py-24 lg:py-28 text-center px-4 sm:px-6">
        <div data-reveal="fade-up" className="max-w-6xl space-y-4 sm:space-y-5 md:space-y-7 lg:space-y-8 flex flex-col items-center w-full">

          {/* Badge superior flotante */}
          <div className="flex justify-center" data-reveal="zoom-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="relative flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-red-600 to-red-500 px-6 sm:px-10 py-2.5 sm:py-3 rounded-full shadow-2xl border-2 border-red-400/50">
                <span className="font-black text-white text-sm sm:text-base md:text-lg tracking-wider uppercase">
                  VOLQUETES ROLDAN
                </span>
              </div>
            </div>
          </div>

          {/* Título principal - EL MEJOR PRECIO */}
          <div className="text-center">
            <div className="inline-block mb-3 sm:mb-4" data-reveal="slide-right">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-3 sm:mb-4 leading-none">
                <span className="block relative">
                  <span className="absolute inset-0 text-yellow-400 blur-lg opacity-50">
                    EL MEJOR
                  </span>
                  <span className="relative text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                    EL MEJOR
                  </span>
                </span>
              </h1>
            </div>

            {/* Estrellas */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4"
              data-reveal="zoom-in">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 fill-yellow-300 text-yellow-300 animate-bounce"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '1.5s',
                    filter: 'drop-shadow(0 0 12px rgba(253, 224, 71, 0.8))'
                  }}
                />
              ))}
            </div>

            <div className="inline-block mb-3 sm:mb-4" data-reveal="slide-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none">
                <span className="block relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent blur-sm">
                    PRECIO
                  </span>
                  <span className="relative bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                    PRECIO
                  </span>
                </span>
              </h1>
            </div>

            <div data-reveal="fade-up">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white/95 tracking-wide drop-shadow-2xl">
                DEL MERCADO
              </p>
            </div>
          </div>

          {/* Subtítulo destacado */}
          <div className="text-center" data-reveal="fade-up">
            <div className="inline-block bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl px-6 sm:px-10 md:px-14 py-4 sm:py-5 md:py-6 border border-white/30 shadow-2xl">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
                PRECIO JUSTO, SERVICIO IMPECABLE
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium max-w-2xl">
                Precio claro en volquetes y tierra en Roldán, con atención rápida y sin sorpresas.
              </p>
            </div>
          </div>

          {/* Beneficios en cards 3D - Compactos para móvil */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 max-w-5xl mx-auto w-full px-2">

            {/* Card 1 */}
            <div className="group relative" data-reveal="slide-up">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-all" />
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-white/50">
                <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 md:gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-40" />
                    <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-3 sm:p-3.5 md:p-4 rounded-2xl">
                      <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 mb-1">
                      Sin Cargos Ocultos
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">
                      Transparencia total
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative" data-reveal="slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-all" />
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-white/50">
                <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 md:gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-500 rounded-full blur-md opacity-40" />
                    <div className="relative bg-gradient-to-br from-yellow-400 to-amber-600 p-3 sm:p-3.5 md:p-4 rounded-2xl">
                      <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 mb-1">
                      Atención Inmediata
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">
                      Respuesta al instante
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative sm:col-span-2 lg:col-span-1" data-reveal="slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-all" />
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-white/50">
                <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 md:gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-40" />
                    <div className="relative bg-gradient-to-br from-blue-400 to-cyan-600 p-3 sm:p-3.5 md:p-4 rounded-2xl">
                      <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 mb-1">
                      Calidad Garantizada
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">
                      Servicio confiable
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* CTA Button - Más destacado */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4 justify-center w-full max-w-md sm:max-w-none" data-reveal="fade-up">
            <a href="tel:+5493413623232" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-14 sm:h-14 md:h-16 px-8 sm:px-10 md:px-12 text-base sm:text-lg md:text-xl rounded-full bg-gradient-to-r from-primary via-emerald-500 to-primary hover:from-primary/90 hover:via-emerald-600 hover:to-primary/90 text-white font-bold tracking-wide shadow-2xl shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all ring-4 ring-white/30">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-3" strokeWidth={2.5} />
                Llamar y coordinar
              </Button>
            </a>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
