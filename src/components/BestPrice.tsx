import { Star, TrendingDown, Zap, ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';

const BestPrice = () => {
  return (
    <section
      data-reveal="fade-up"
      className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Fondo con gradiente diagonal dinámico */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-600">
        <div className="absolute inset-0 bg-gradient-to-tl from-green-900/30 via-transparent to-emerald-500/20" />
      </div>

      {/* Formas geométricas flotantes animadas */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-400 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-white rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-green-300 rounded-full blur-[80px] animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Líneas diagonales decorativas */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-12 translate-y-32" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-12 translate-y-64" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent transform -rotate-12 translate-y-96" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Badge superior flotante */}
          <div className="flex justify-center mb-6 sm:mb-8 md:mb-10"
            data-reveal="zoom-in">
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

          {/* Título principal con diseño asimétrico */}
          <div className="text-center mb-8 sm:mb-10 md:mb-14">
            <div className="inline-block" data-reveal="slide-right">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-3 sm:mb-4 leading-none">
                <span className="block relative">
                  <span className="absolute inset-0 text-yellow-400 blur-lg opacity-50">
                    EL MEJOR
                  </span>
                  <span className="relative text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    EL MEJOR
                  </span>
                </span>
              </h2>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4"
              data-reveal="zoom-in">
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

            <div className="inline-block" data-reveal="slide-left">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none">
                <span className="block relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent blur-sm">
                    PRECIO
                  </span>
                  <span className="relative bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                    PRECIO
                  </span>
                </span>
              </h2>
            </div>

            <div className="mt-4 sm:mt-6" data-reveal="fade-up">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white/90 tracking-wide">
                DEL MERCADO
              </p>
            </div>
          </div>

          {/* Subtítulo destacado */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16" data-reveal="fade-up">
            <div className="inline-block bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl px-6 sm:px-10 md:px-14 py-4 sm:py-5 md:py-6 border border-white/20 shadow-2xl">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
                PRECIO JUSTO, SERVICIO IMPECABLE
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium max-w-2xl">
                Precio claro en volquetes y tierra en Roldán, con atención rápida y sin sorpresas.
              </p>
            </div>
          </div>

          {/* Beneficios en cards 3D */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">

            {/* Card 1 */}
            <div className="group relative" data-reveal="slide-up">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-all" />
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-white/50">
                <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-40" />
                    <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-3 sm:p-4 rounded-2xl">
                      <TrendingDown className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg md:text-xl text-gray-900 mb-1">
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
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-white/50">
                <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-500 rounded-full blur-md opacity-40" />
                    <div className="relative bg-gradient-to-br from-yellow-400 to-amber-600 p-3 sm:p-4 rounded-2xl">
                      <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg md:text-xl text-gray-900 mb-1">
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
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-white/50">
                <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-40" />
                    <div className="relative bg-gradient-to-br from-blue-400 to-cyan-600 p-3 sm:p-4 rounded-2xl">
                      <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg md:text-xl text-gray-900 mb-1">
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

        </div>
      </div>
    </section>
  );
};

export default BestPrice;
