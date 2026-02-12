import { Truck, Mountain, Factory, ArrowRight, CheckCircle2, Ruler, Sparkles, Check, Shovel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import camion1 from '@/assets/camion1.jpeg';
import volquetes3 from '@/assets/volquetes3.jpeg';
import volquetes6 from '@/assets/volquetes6.jpeg';
import volqueteTierra from '@/assets/volquete de tierra.jpeg';

// --- DATA: Services ---
const serviceItems = [
  {
    icon: Truck,
    title: 'Alquiler de Volquetes',
    features: ['Chicos, medianos y grandes', 'Con y sin barandas', 'Entrega inmediata'],
    description: 'La flota más completa para tu obra, con entrega cuidada y puntual.',
    image: volquetes3,
    color: 'bg-green-600'
  },
  {
    icon: Mountain,
    title: 'Venta de Tierra',
    features: ['Tierra negra zarandeada', 'Tierra colorada', 'Relleno y nivelación'],
    description: 'Tierra de primera calidad para jardines y nivelaciones, entregada cuando la necesitás.',
    image: camion1,
    color: 'bg-amber-600'
  },
  {
    icon: Factory,
    title: 'Servicios de Obra',
    features: ['Retiro de escombros', 'Limpieza de obra', 'Gestión de residuos'],
    description: 'Retiro y limpieza de obra con orden, seguridad y disposición responsable.',
    image: volquetes6,
    color: 'bg-slate-700'
  }
];

// --- DATA: Sizes ---
const sizes = [
  {
    size: '1.5m³',
    title: 'Chico',
    description: 'Ideal para pequeñas limpiezas y reformas menores.',
    dimensions: '2m x 1.5m',
    features: ['Escombros limpios', 'Tierra', 'Poda pequeña'],
    recommended: false,
    orderMobile: 4
  },
  {
    size: '3m³',
    title: 'Mediano',
    description: 'Perfecto para obras medianas, demoliciones parciales.',
    dimensions: '3m x 1.6m',
    features: ['Obra en general', 'Mezcla de residuos', 'Reformas'],
    recommended: false,
    orderMobile: 3
  },
  {
    size: '6m³',
    title: 'Grande',
    description: 'Para grandes obras y volúmenes importantes.',
    dimensions: '3.4m x 1.75m',
    features: ['Grandes volúmenes', 'Construcción', 'Industria'],
    recommended: true,
    orderMobile: 2
  },
  {
    size: '7m³',
    title: 'Con Barandas',
    description: 'Máxima capacidad. Ideal para grandes generadores.',
    dimensions: '3.8m x 1.8m',
    features: ['Máxima capacidad', 'Barandas de seguridad', 'Grandes obras'],
    recommended: false,
    orderMobile: 1
  }
];

// --- DATA: Earth Types ---
const earthTypes = [
  {
    name: "Tierra Negra Zarandeada",
    description: "Ideal para jardinería fina, macetas y terminaciones. Libre de terrones e impurezas.",
    color: "bg-slate-800"
  },
  {
    name: "Tierra Negra Común",
    description: "Excelente para relleno de terrenos, nivelación de jardines y base de césped.",
    color: "bg-slate-700"
  },
  {
    name: "Tierra Colorada",
    description: "Perfecta para bases compactas, caminos y usos específicos de construcción.",
    color: "bg-amber-700"
  }
];

const Services = () => {
  return (
    <div className="flex flex-col gap-0">
      {/* --- SECTION 1: General Services --- */}
      <section id="servicios" data-reveal="fade-up" className="py-16 md:py-24 lg:py-32 bg-slate-50/95 sm:bg-slate-50 relative overflow-hidden">
        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <span className="text-tertiary font-bold uppercase tracking-widest text-xs sm:text-sm mb-2 block">Nuestra Oferta</span>
            <h2 className="heading-secondary text-slate-800 mb-4 sm:mb-6 px-2">Soluciones completas para tu obra</h2>
            <p className="text-slate-600 text-lg sm:text-xl font-medium px-2">
              Te acompañamos de principio a fin con logística, cuidado y trato cercano.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {serviceItems.map((service, index) => (
              <div
                key={index}
                data-reveal="fade-up"
                data-reveal-delay={index * 120}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full border border-slate-100"
              >
                <div className="h-48 sm:h-56 md:h-48 lg:h-56 overflow-hidden relative">
                  <div className={`absolute inset-0 ${service.color}/20 z-10 mix-blend-multiply transition-opacity group-hover:opacity-0`} />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white p-2 sm:p-3 rounded-2xl shadow-md z-20">
                    <service.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${service.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 sm:mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-4 sm:mb-6 flex-1 text-base sm:text-lg leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-tertiary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: Container Sizes --- */}
      <section id="tamanos" data-reveal="fade-up" className="py-16 md:py-24 lg:py-32 bg-white/95 sm:bg-white relative overflow-hidden border-t border-slate-100">
        <div className="container-custom px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <span className="text-tertiary font-bold uppercase tracking-widest text-xs sm:text-sm block mb-2">Capacidades</span>
            <h2 className="heading-secondary text-slate-800 mb-4 px-2">
              Tamaños pensados para <span className="text-primary">tu obra</span>
            </h2>
            <p className="text-slate-600 text-lg sm:text-xl font-medium px-2">
              Elegí el contenedor que mejor se adapta a tu proyecto y a tu tiempo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {sizes.map((item, index) => (
              <div
                key={index}
                data-reveal="fade-up"
                data-reveal-delay={index * 90}
                className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${item.orderMobile === 1 ? 'order-1' : item.orderMobile === 2 ? 'order-2' : item.orderMobile === 3 ? 'order-3' : 'order-4'} sm:order-none ${item.recommended
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-100 sm:scale-105 z-10 my-4 sm:my-0'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-tertiary/30 hover:shadow-xl hover:-translate-y-2'
                  }`}
              >
                {/* Recommended Badge */}
                {item.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tertiary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-md whitespace-nowrap z-20">
                    <Sparkles className="w-3 h-3" /> Más elegido
                  </div>
                )}

                <div className="text-center mb-4 sm:mb-6">
                  <div className={`inline-block p-3 sm:p-4 rounded-xl mb-3 ${item.recommended ? 'bg-white/10' : 'bg-slate-100'}`}>
                    <span className="text-3xl sm:text-4xl font-black block">{item.size}</span>
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${item.recommended ? 'text-white' : 'text-slate-800'}`}>{item.title}</h3>
                  <p className={`text-sm sm:text-base ${item.recommended ? 'text-slate-300' : 'text-slate-500'} h-auto sm:h-12`}>
                    {item.description}
                  </p>
                </div>

                <div className={`text-sm sm:text-base rounded-lg p-2 sm:p-3 mb-4 sm:mb-6 flex items-center justify-center gap-2 ${item.recommended ? 'bg-white/10' : 'bg-slate-50'}`}>
                  <Ruler className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
                  <span className="font-mono">{item.dimensions}</span>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                      <Check className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${item.recommended ? 'text-tertiary' : 'text-green-600'}`} />
                      <span className={item.recommended ? 'text-slate-200' : 'text-slate-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a href={`https://wa.me/5493413623232?text=Hola!%20Me%20interesa%20el%20volquete%20de%20${encodeURIComponent(item.size)}`} className="block mt-auto">
                  <Button className={`w-full rounded-xl font-semibold text-base md:text-lg py-6 ${item.recommended
                    ? 'bg-tertiary hover:bg-tertiary-dark text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }`}>
                    Elegir {item.title}
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: Earth Types --- */}
      <section id="tierras" data-reveal="fade-up" className="py-16 md:py-24 lg:py-32 bg-slate-50/95 sm:bg-slate-50 relative overflow-hidden border-t border-slate-100">
        <div className="container-custom px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div data-reveal="fade-right" className="relative rounded-3xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px]">
              <img
                src={volqueteTierra}
                alt="Movimiento de Tierra"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white pr-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary/90 rounded-full text-xs font-bold uppercase mb-2">
                  <Shovel className="w-3 h-3" /> Calidad Premium
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Venta y Movimiento de Tierra</h3>
              </div>
            </div>

            <div data-reveal="fade-left" className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="heading-secondary text-slate-800 mb-3 sm:mb-4 px-1">Tipos de <span className="text-tertiary">tierra</span></h2>
                <p className="text-slate-600 text-lg sm:text-xl font-medium px-1">
                  Abastecemos tu obra o jardín con tierra de calidad, a granel o en volquetes.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {earthTypes.map((earth, idx) => (
                  <div
                    key={idx}
                    data-reveal="fade-up"
                    data-reveal-delay={idx * 80}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${earth.color} flex items-center justify-center flex-shrink-0 text-white shadow-lg`}>
                      <Mountain className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-base sm:text-lg">{earth.name}</h4>
                      <p className="text-slate-600 text-sm">{earth.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="https://wa.me/5493413623232?text=Hola!%20Me%20interesa%20comprar%20tierra" className="inline-block mt-4 w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-6 rounded-xl text-lg hover:bg-slate-800 shadow-xl">
                  Consultar Precio de Tierra
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
