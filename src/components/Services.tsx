import { Truck, Mountain, Recycle, Package, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: Truck,
    title: 'Alquiler de Volquetes',
    description: 'Volquetes de diferentes tamaños (4m³, 6m³, 8m³) para obras, mudanzas y limpiezas. Entrega y retiro en el día.',
    features: ['Múltiples tamaños', 'Entrega inmediata', 'Precios accesibles'],
  },
  {
    icon: Mountain,
    title: 'Venta de Materiales',
    description: 'Tierra negra, arena, piedra, cascote y todo tipo de materiales para construcción y jardinería.',
    features: ['Tierra y arena', 'Piedra y cascote', 'Entrega a domicilio'],
  },
  {
    icon: Recycle,
    title: 'Gestión de Residuos',
    description: 'Servicio integral de retiro, clasificación y disposición final de residuos de manera responsable.',
    features: ['Retiro programado', 'Disposición legal', 'Cuidado ambiental'],
  },
];

const features = [
  {
    icon: Clock,
    title: 'Respuesta Rápida',
    description: 'Entregamos tu volquete en menos de 24 horas',
  },
  {
    icon: Shield,
    title: 'Servicio Garantizado',
    description: 'Cumplimos con todos los permisos municipales',
  },
  {
    icon: Package,
    title: 'Variedad de Opciones',
    description: 'Volquetes de todos los tamaños para cada necesidad',
  },
];

const Services = () => {
  return (
    <section id="servicios" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Nuestros Servicios
          </span>
          <h2 className="heading-secondary text-foreground mb-6">
            Soluciones completas para{' '}
            <span className="text-primary">tus proyectos</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Ofrecemos servicios de alquiler de volquetes, venta de materiales y gestión 
            de residuos con la mejor calidad y atención personalizada.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group bg-card border-border hover:border-primary/30 card-hover"
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://wa.me/5493412345678?text=Hola!%20Me%20interesa%20el%20servicio%20de%20" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="w-full btn-primary">
                    Consultar precio
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Row */}
        <div className="bg-accent/50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
