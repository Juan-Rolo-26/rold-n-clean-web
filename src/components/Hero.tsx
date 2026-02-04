import { Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-volquete.jpg';

const Hero = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/85 to-primary-dark/95" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium">Servicio disponible 24/7</span>
          </div>

          {/* Heading */}
          <h1 className="heading-primary text-white mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Volquetes{' '}
            <span className="text-secondary">Roldán Limpia</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-4 animate-slide-up font-light" style={{ animationDelay: '0.2s' }}>
            Alquiler de Volquetes, Limpieza y Retiro de Residuos
          </p>
          
          <p className="text-lg text-white/75 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Soluciones integrales para la gestión de residuos y venta de materiales de construcción. 
            Servicio rápido, confiable y a precios competitivos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <a 
              href="https://wa.me/5493412345678?text=Hola!%20Me%20interesa%20alquilar%20un%20volquete" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" className="btn-whatsapp text-lg px-8 py-6 w-full sm:w-auto">
                <MessageCircle className="w-5 h-5" />
                Contactar por WhatsApp
              </Button>
            </a>
            <a href="tel:+5493412345678">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 mr-2" />
                Llamar ahora
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            {[
              { value: '+500', label: 'Clientes satisfechos' },
              { value: '+10', label: 'Años de experiencia' },
              { value: '24hs', label: 'Respuesta rápida' },
              { value: '100%', label: 'Compromiso' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={() => handleScroll('#servicios')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
          aria-label="Scroll to services"
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
