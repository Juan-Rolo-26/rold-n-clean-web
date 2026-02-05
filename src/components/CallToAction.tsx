import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CallToAction = () => {
    return (
        <section data-reveal="fade-up" className="py-20 bg-gradient-to-r from-green-600 to-green-500 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div data-reveal="fade-up" className="container-custom relative z-10 text-center text-white space-y-8">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-white font-bold text-xs uppercase tracking-widest">Oferta Especial</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                    ¿Listo para comenzar tu proyecto?
                </h2>

                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                    Contáctanos ahora y recibe asesoramiento gratuito.
                </p>

                <div className="pt-2">
                    <a href="https://wa.me/5493413623232" target="_blank" rel="noopener noreferrer">
                        <Button className="bg-white hover:bg-slate-100 text-green-700 text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl font-bold transition-all duration-300 group">
                            Solicitar Presupuesto Gratis
                            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
