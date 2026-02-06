import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CallToAction = () => {
    return (
        <section data-reveal="fade-up" className="py-24 relative overflow-hidden group">
            {/* Background Gradient & Noise */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 z-0 transition-transform duration-[3s] group-hover:scale-105"></div>
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0"></div>

            {/* Animated Shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-tertiary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse-slow delay-700"></div>

            <div data-reveal="fade-up" className="container-custom relative z-10 text-center text-white space-y-10">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 animate-fade-in-down">
                    <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                    <span className="text-white font-bold text-xs uppercase tracking-widest shadow-sm">Respuesta inmediata</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-sm">
                    ¿Listo para ordenar <br className="hidden md:block" /> tu obra?
                </h2>

                <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
                    Escribinos directo por WhatsApp. Te asesoramos en el momento y coordinamos la entrega sin vueltas.
                </p>

                <div className="pt-4 animate-bounce-in delay-300">
                    <a href="https://wa.me/5493413623232" target="_blank" rel="noopener noreferrer">
                        <Button className="bg-white text-green-700 hover:bg-slate-100 text-lg md:text-xl px-10 py-7 rounded-2xl shadow-2xl hover:shadow-white/20 font-bold transition-all duration-300 hover:-translate-y-1 group">
                            Pedir presupuesto ahora
                            <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 text-tertiary" />
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
