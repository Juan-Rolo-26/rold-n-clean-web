import { useState, useEffect } from 'react';
import { Phone, Star, Award, Sparkles } from 'lucide-react';
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
            className={`absolute inset-0 bg-center bg-no-repeat bg-[length:100%_100%] transition-opacity duration-1000 ease-in-out ${currentImageIndex === index ? "opacity-100" : "opacity-0"
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
