import { Clock, BadgeCheck, Wallet, Headphones, Leaf, Truck } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Entrega Rápida',
    description: 'Tu volquete en menos de 24 horas. Coordinación simple y puntual para que tu obra avance.',
    color: 'text-blue-600',
    bg: 'bg-blue-50 group-hover:bg-blue-600 group-hover:text-white',
    border: 'group-hover:border-blue-200'
  },
  {
    icon: BadgeCheck,
    title: 'Experiencia Comprobada',
    description: 'Más de 5 años acompañando obras y hogares en la zona con trayectoria impecable.',
    color: 'text-purple-600',
    bg: 'bg-purple-50 group-hover:bg-purple-600 group-hover:text-white',
    border: 'group-hover:border-purple-200'
  },
  {
    icon: Wallet,
    title: 'Precios Competitivos',
    description: 'Tarifas claras y honestas, con presupuestos sin compromiso ni letras chicas.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white',
    border: 'group-hover:border-emerald-200'
  },
  {
    icon: Headphones,
    title: 'Atención Personalizada',
    description: 'Te escuchamos y te guiamos para elegir el tamaño justo para tu necesidad.',
    color: 'text-pink-600',
    bg: 'bg-pink-50 group-hover:bg-pink-600 group-hover:text-white',
    border: 'group-hover:border-pink-200'
  },
  {
    icon: Leaf,
    title: 'Compromiso Ambiental',
    description: 'Disposición responsable y cuidado real del entorno en cada retiro.',
    color: 'text-teal-600',
    bg: 'bg-teal-50 group-hover:bg-teal-600 group-hover:text-white',
    border: 'group-hover:border-teal-200'
  },
  {
    icon: Truck,
    title: 'Flota Moderna',
    description: 'Unidades cuidadas y seguras que protegen la imagen de tu frente de obra.',
    color: 'text-orange-600',
    bg: 'bg-orange-50 group-hover:bg-orange-600 group-hover:text-white',
    border: 'group-hover:border-orange-200'
  },
];

const WhyChooseUs = () => {
  return (
    <section data-reveal="fade-up" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="container-custom relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <div data-reveal="fade-up" className="text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-4">
          <span className="inline-block py-1 px-3 rounded-full bg-white border border-slate-200 text-tertiary font-bold uppercase tracking-widest text-xs shadow-sm">
            ¿Por qué nos eligen?
          </span>
          <h2 className="heading-secondary text-slate-800">
            Calidad y confianza para <span className="text-primary relative inline-block">
              tu obra
              <svg className="absolute w-full h-2 bottom-0 left-0 text-primary/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl font-medium leading-relaxed text-balance px-2">
            Nos diferenciamos por la puntualidad, el cuidado en los detalles y una atención cercana que resuelve.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              data-reveal="fade-up"
              data-reveal-delay={index * 100}
              className={`group p-6 sm:p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-bl-[60px] -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500 z-0`} />

              <div className="relative z-10 flex flex-col items-start h-full">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${benefit.bg} flex items-center justify-center mb-5 sm:mb-6 transition-all duration-300 shadow-sm group-hover:shadow-md ring-1 ring-slate-100 group-hover:ring-transparent`}>
                  <benefit.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${benefit.color} group-hover:text-white transition-colors duration-300`} />
                </div>

                <h4 className="font-bold text-slate-900 text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h4>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed group-hover:text-slate-700 transition-colors">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
