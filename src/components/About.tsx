import { Target, Heart, Users, Award } from 'lucide-react';
import volquetes3 from '@/assets/volquetes3.jpeg';

const values = [
  {
    icon: Target,
    title: 'Compromiso',
    description: 'Cumplimos lo prometido, siempre en tiempo y forma.',
  },
  {
    icon: Heart,
    title: 'Responsabilidad',
    description: 'Cuidamos el ambiente y a nuestra comunidad.',
  },
  {
    icon: Users,
    title: 'Cercanía',
    description: 'Atención cercana y trato humano con cada cliente.',
  },
  {
    icon: Award,
    title: 'Calidad',
    description: 'Equipos cuidados y servicio de excelencia.',
  },
];

const About = () => {
  return (
    <section id="nosotros" data-reveal="fade-up" className="section-padding bg-background/95 sm:bg-background">
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
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-tertiary/15 rounded-full -z-10" />
          </div>

          {/* Content Side */}
          <div data-reveal="fade-left">
            <span className="inline-block text-tertiary font-semibold text-sm uppercase tracking-wider mb-4">
              Sobre Nosotros
            </span>
            <h2 className="heading-secondary text-foreground mb-6">
              Una empresa familiar que{' '}
              <span className="text-primary">cuida tu obra</span>
            </h2>

            <div className="space-y-4 text-muted-foreground mb-8">
              <p className="text-xl font-medium text-muted-foreground/90">
                <strong className="text-foreground">Volquetes Roldán Limpia</strong> nació hace más de
                5 años con un sueño simple: hacer más fácil la vida de quienes construyen y ordenan su hogar.
              </p>
              <p>
                Somos una empresa familiar que creció gracias a la confianza del barrio.
                Empezamos con un solo volquete y hoy contamos con una flota completa para atender obras de cualquier tamaño.
              </p>
              <p>
                Nuestra <strong className="text-foreground">misión</strong> es acompañarte con un servicio confiable,
                puntual y humano, cuidando siempre el ambiente.
              </p>
            </div>

            {/* Values */}
            {/* Values */}
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((value, index) => (
                <div
                  key={index}
                  data-reveal="fade-up"
                  data-reveal-delay={index * 100}
                  className="group p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tertiary/10 to-tertiary/5 flex items-center justify-center mb-4 group-hover:from-tertiary group-hover:to-tertiary-light group-hover:text-white transition-all duration-300">
                    <value.icon className="w-6 h-6 text-tertiary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">{value.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{value.description}</p>
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
