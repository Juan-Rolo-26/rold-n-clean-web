import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Méndez',
    role: 'Contratista de obras',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    content: 'Excelente servicio. Siempre puntuales con la entrega y el retiro. Los he contratado varias veces para distintas obras y nunca me fallaron.',
    rating: 5,
  },
  {
    name: 'María González',
    role: 'Propietaria',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    content: 'Contraté el servicio para limpiar mi casa después de una refacción. Muy profesionales y el precio fue muy accesible. Totalmente recomendados.',
    rating: 5,
  },
  {
    name: 'Roberto Álvarez',
    role: 'Arquitecto',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
    content: 'Trabajo con ellos hace años. La variedad de tamaños de volquetes y la rapidez en la respuesta hacen que sean mi primera opción siempre.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section data-reveal="fade-up" className="section-padding bg-muted">
      <div className="container-custom">
        {/* Section Header */}
        <div data-reveal="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-tertiary font-semibold text-sm uppercase tracking-wider mb-4">
            Testimonios
          </span>
          <h2 className="heading-secondary text-foreground mb-6">
            Lo que dicen nuestros{' '}
            <span className="text-primary">clientes</span>
          </h2>
          <p className="text-muted-foreground text-xl font-medium">
            La confianza de nuestros clientes es nuestra mayor recompensa.
            Conocé sus experiencias trabajando con nosotros.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-reveal="fade-up"
              data-reveal-delay={index * 120}
              className="bg-card rounded-2xl p-8 shadow-soft card-hover relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-primary/10">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-tertiary text-tertiary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-8 relative z-10 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
