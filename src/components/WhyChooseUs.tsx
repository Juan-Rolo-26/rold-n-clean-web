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
    description: 'Más de 10 años en el rubro nos respaldan. Conocemos cada detalle del servicio.',
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
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            ¿Por qué elegirnos?
          </span>
          <h2 className="heading-secondary text-foreground mb-6">
            La mejor opción para{' '}
            <span className="text-primary">tu proyecto</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Nos diferenciamos por nuestro compromiso con la calidad, puntualidad 
            y atención al cliente. Tu satisfacción es nuestra prioridad.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group flex gap-5 p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                <benefit.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-lg mb-2">{benefit.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-center">
          <h3 className="heading-tertiary text-white mb-4">
            ¿Listo para comenzar tu proyecto?
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Contáctanos ahora y recibe asesoramiento gratuito. Te ayudamos a elegir 
            el volquete perfecto para tus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/5493412345678?text=Hola!%20Quiero%20solicitar%20un%20presupuesto" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex justify-center"
            >
              Solicitar presupuesto gratis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
