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
    <section id="inicio" className="relative min-h-screen w-full bg-emerald-900 overflow-hidden">

      {/* Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Mobile-friendly fallback background in case images fail or load slowly */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-green-900 z-0" />

        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${currentImageIndex === index ? "opacity-100" : "opacity-0"
              }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        {/* Neutral overlay for readability without tinting the image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/35 z-10" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-400 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-white rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-emerald-400 rounded-full blur-[80px] animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-20 container-custom min-h-screen flex flex-col justify-center items-center py-20 sm:py-24 md:py-32 lg:py-36 text-center px-4 sm:px-6">
        <div className="max-w-6xl w-full space-y-6 sm:space-y-8 md:space-y-10 flex flex-col items-center">

          {/* Badge - #1 en Roldán (Active BestPrice Design) */}
          <div className="flex justify-center animate-scale-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="relative flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-yellow-400 to-amber-500 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-2xl border-2 border-yellow-300/50">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-900 animate-pulse" />
                <span className="font-black text-yellow-900 text-xs sm:text-sm md:text-base tracking-wider uppercase">
                  #1 en Roldán
                </span>
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-900" />
              </div>
            </div>
          </div>

          {/* Main Title - BestPrice Design */}
          <div className="text-center">
            <div className="inline-block mb-2 sm:mb-4 animate-fade-in-left">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-2 sm:mb-4 leading-none">
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

            {/* Stars */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2 sm:mb-4 py-2 animate-scale-in delay-100">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 fill-yellow-300 text-yellow-300 animate-bounce"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '1.5s',
                    filter: 'drop-shadow(0 0 12px rgba(253, 224, 71, 0.8))'
                  }}
                />
              ))}
            </div>

            <div className="inline-block animate-fade-in-right delay-200">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-none py-2">
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

            <div className="mt-4 sm:mt-6 animate-fade-in-up delay-300">
              <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-white/95 tracking-wide drop-shadow-lg">
                DEL MERCADO
              </p>
            </div>
          </div>

          {/* Subtitle Box */}
          <div className="text-center w-full max-w-3xl mx-auto animate-fade-in-up delay-300">
            <div className="inline-block bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl px-6 sm:px-10 py-4 sm:py-6 border border-white/20 shadow-2xl w-full">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
                PRECIO JUSTO, SERVICIO IMPECABLE
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium leading-relaxed">
                Volquetes y tierra en Roldán al mejor precio. <br className="hidden sm:block" /> Atención rápida, sin sorpresas y con total confianza.
              </p>
            </div>
          </div>

          {/* Benefit Cards - Optimized for Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 w-full max-w-5xl px-2">

            <div className="group relative animate-fade-in-up delay-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all" />
              <div className="relative bg-black/20 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 hover:border-white/40 transition-all hover:-translate-y-1">
                <div className="flex flex-row sm:flex-col items-center gap-4 text-left sm:text-center">
                  <div className="bg-emerald-500/20 p-2.5 rounded-xl">
                    <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-300" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg mb-0.5">Sin Sorpresas</h3>
                    <p className="text-emerald-100/80 text-xs sm:text-sm font-medium">Precio final garantizado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative animate-fade-in-up delay-700">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all" />
              <div className="relative bg-black/20 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 hover:border-white/40 transition-all hover:-translate-y-1">
                <div className="flex flex-row sm:flex-col items-center gap-4 text-left sm:text-center">
                  <div className="bg-yellow-500/20 p-2.5 rounded-xl">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg mb-0.5">Rápido</h3>
                    <p className="text-yellow-100/80 text-xs sm:text-sm font-medium">Entrega inmediata</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative animate-fade-in-up delay-1000">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all" />
              <div className="relative bg-black/20 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 hover:border-white/40 transition-all hover:-translate-y-1">
                <div className="flex flex-row sm:flex-col items-center gap-4 text-left sm:text-center">
                  <div className="bg-blue-500/20 p-2.5 rounded-xl">
                    <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg mb-0.5">Confianza</h3>
                    <p className="text-blue-100/80 text-xs sm:text-sm font-medium">Servicio seguro</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* CTA Button */}
          <div className="w-full flex justify-center pt-4 sm:pt-6 animate-scale-in delay-500">
            <a href="tel:+5493413623232" className="w-full sm:w-auto transform hover:scale-105 transition-transform duration-300">
              <Button className="w-full sm:w-auto h-16 sm:h-20 px-8 sm:px-12 text-lg sm:text-2xl rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-yellow-950 font-black tracking-wide shadow-[0_0_40px_rgba(251,191,36,0.4)] border-4 border-yellow-300/50 hover:border-yellow-200">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 animate-bounce" strokeWidth={3} />
                LLAMAR AHORA
              </Button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
