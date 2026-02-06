import { Ruler, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sizes = [
    {
        size: '1.5m³',
        title: 'Chico',
        description: 'Ideal para pequeñas limpiezas y reformas menores.',
        dimensions: '2m x 1.5m',
        features: ['Escombros limpios', 'Tierra', 'Poda pequeña'],
        recommended: false
    },
    {
        size: '3m³',
        title: 'Mediano',
        description: 'Perfecto para obras medianas, demoliciones parciales.',
        dimensions: '3m x 1.6m',
        features: ['Obra en general', 'Mezcla de residuos', 'Reformas'],
        recommended: false
    },
    {
        size: '6m³',
        title: 'Grande',
        description: 'Para grandes obras y volúmenes importantes.',
        dimensions: '3.4m x 1.75m',
        features: ['Grandes volúmenes', 'Construcción', 'Industria'],
        recommended: true
    },
    {
        size: '7m³',
        title: 'Con Barandas',
        description: 'Máxima capacidad. Ideal para grandes generadores.',
        dimensions: '3.8m x 1.8m',
        features: ['Máxima capacidad', 'Barandas de seguridad', 'Grandes obras'],
        recommended: false
    }
];

const ContainerSizes = () => {
    return (
        <section data-reveal="fade-up" className="section-padding bg-white relative overflow-hidden" id="tamanos">

            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-tertiary font-bold uppercase tracking-widest text-sm block mb-2">Capacidades</span>
                    <h2 className="heading-secondary text-slate-800 mb-4">
                        El tamaño ideal para <span className="text-primary">tu necesidad</span>
                    </h2>
                    <p className="text-slate-600">
                        Seleccioná el contenedor que mejor acompañe la magnitud de tu proyecto.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sizes.map((item, index) => (
                        <div
                            key={index}
                            data-reveal="fade-up"
                            data-reveal-delay={index * 90}
                            className={`relative rounded-2xl p-6 transition-all duration-300 border ${item.recommended
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105 z-10'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-accent hover:shadow-lg'
                                }`}
                        >
                            {/* Recommended Badge */}
                            {item.recommended && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tertiary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                                    <Sparkles className="w-3 h-3" /> Más elegido
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <div className={`inline-block p-4 rounded-xl mb-3 ${item.recommended ? 'bg-white/10' : 'bg-slate-100'}`}>
                                    <span className="text-4xl font-black block">{item.size}</span>
                                </div>
                                <h3 className={`text-2xl font-bold mb-2 ${item.recommended ? 'text-white' : 'text-slate-800'}`}>{item.title}</h3>
                                <p className={`text-base ${item.recommended ? 'text-slate-300' : 'text-slate-500'} h-12`}>
                                    {item.description}
                                </p>
                            </div>

                            <div className={`text-base rounded-lg p-3 mb-6 flex items-center justify-center gap-2 ${item.recommended ? 'bg-white/10' : 'bg-slate-50'}`}>
                                <Ruler className="w-5 h-5 opacity-70" />
                                <span className="font-mono">{item.dimensions}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {item.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-base">
                                        <Check className={`w-5 h-5 mt-0.5 ${item.recommended ? 'text-tertiary' : 'text-green-600'}`} />
                                        <span className={item.recommended ? 'text-slate-200' : 'text-slate-600'}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <a href={`https://wa.me/5493413623232?text=Hola!%20Me%20interesa%20el%20volquete%20de%20${encodeURIComponent(item.size)}`}>
                                <Button className={`w-full rounded-xl font-semibold text-base md:text-lg ${item.recommended
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
    );
};

export default ContainerSizes;
