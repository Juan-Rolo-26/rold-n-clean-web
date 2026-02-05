import { Clock, BadgeCheck, Wallet, Headphones, Leaf, Truck } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Entrega Rápida',
    description: 'Tu volquete en menos de 24 horas. Servicio ágil y puntual para no retrasar tu obra.',
  },
  {
    icon: BadgeCheck,
    title: 'Experiencia Comprobada',
    description: 'Más de 5 años en el rubro nos respaldan. Conocemos cada detalle del servicio.',
  },
  {
    icon: Wallet,
    title: 'Precios Competitivos',
    description: 'Las mejores tarifas del mercado sin sacrificar calidad. Presupuestos sin compromiso.',
  },
  {
    icon: Headphones,
    title: 'Atención Personalizada',
    description: 'Te asesoramos para elegir el volquete ideal según tu proyecto y necesidades.',
  },
  {
    icon: Leaf,
    title: 'Compromiso Ambiental',
    description: 'Disposición responsable de residuos cumpliendo todas las normativas vigentes.',
  },
  {
    icon: Truck,
    title: 'Flota Moderna',
    description: 'Equipos en excelente estado para garantizar un servicio confiable y seguro.',
  },
];

const WhyChooseUs = () => {
  return (
    <section data-reveal="fade-up" className="py-20 bg-white relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div data-reveal="fade-up" className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-accent font-bold uppercase tracking-widest text-sm">¿Por qué elegirnos?</span>
          <h2 className="heading-secondary text-slate-800">
            Calidad y Confianza para <span className="text-accent">tu proyecto</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Nos diferenciamos por nuestro compromiso con la puntualidad y la atención al cliente.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              data-reveal="fade-up"
              data-reveal-delay={index * 90}
              className="group flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-accent/40 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-7 h-7 text-green-600 group-hover:text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-lg mb-2">{benefit.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
