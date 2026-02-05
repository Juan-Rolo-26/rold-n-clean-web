import { Target, Heart, Users, Award } from 'lucide-react';
import volquetes3 from '@/assets/volquetes3.jpeg';

const values = [
  {
    icon: Target,
    title: 'Compromiso',
    description: 'Cumplimos con lo prometido, siempre en tiempo y forma.',
  },
  {
    icon: Heart,
    title: 'Responsabilidad',
    description: 'Cuidamos el medio ambiente y a nuestra comunidad.',
  },
  {
    icon: Users,
    title: 'Cercanía',
    description: 'Atención personalizada y trato humano con cada cliente.',
  },
  {
    icon: Award,
    title: 'Calidad',
    description: 'Equipos en óptimas condiciones y servicio de excelencia.',
  },
];

const About = () => {
  return (
    <section id="nosotros" data-reveal="fade-up" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div data-reveal="fade-right" className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={volquetes3}
                alt="Volquetes Roldán"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-xl shadow-lg hidden md:block">
              <div className="text-4xl font-bold">5</div>
              <div className="text-sm text-white/80">Años de experiencia</div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full -z-10" />
          </div>

          {/* Content Side */}
          <div data-reveal="fade-left">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Sobre Nosotros
            </span>
            <h2 className="heading-secondary text-foreground mb-6">
              Una empresa familiar con{' '}
              <span className="text-primary">vocación de servicio</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                <strong className="text-foreground">Volquetes Roldán Limpia</strong> nació hace más de 
                5 años con el objetivo de brindar soluciones integrales en alquiler de volquetes 
                y gestión de residuos para la zona de Roldán y alrededores.
              </p>
              <p>
                Somos una empresa familiar que creció gracias a la confianza de nuestros clientes. 
                Comenzamos con un solo volquete y hoy contamos con una flota completa para atender 
                obras de cualquier tamaño.
              </p>
              <p>
                Nuestra <strong className="text-foreground">misión</strong> es facilitar el trabajo 
                de constructores, empresas y particulares, ofreciendo un servicio confiable, 
                puntual y a precios justos, siempre cuidando el medio ambiente.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  data-reveal="fade-up"
                  data-reveal-delay={index * 80}
                  className="flex items-start gap-3 p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{value.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
