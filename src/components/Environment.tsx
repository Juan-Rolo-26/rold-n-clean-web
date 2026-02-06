import { Leaf, Recycle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import roldanImg from '@/assets/roldan.jpg';

const Environment = () => {
    return (
        <section id="medio-ambiente" data-reveal="fade-up" className="section-padding bg-emerald-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-16 items-center">

                <div data-reveal="fade-right" className="order-2 lg:order-1 relative">
                    <div className="absolute -inset-4 bg-tertiary/20 rounded-[2rem] blur-xl transform -rotate-2"></div>
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-emerald-800/50">
                        <img
                            src={roldanImg}
                            alt="Funes y Roldán Limpios"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                            <p className="font-bold text-xl text-white flex items-center gap-2">
                                <MapPin className="text-tertiary" /> Funes y Roldán
                            </p>
                        </div>
                    </div>
                </div>

                <div data-reveal="fade-left" className="space-y-8 order-1 lg:order-2">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/50 border border-emerald-700 text-emerald-300 text-sm font-semibold mb-6">
                            <Leaf className="w-4 h-4" />
                            <span>Cuidado del entorno</span>
                        </div>
                        <h2 className="heading-primary text-white mb-6">Cuidamos nuestro <br /><span className="text-tertiary">Lugar en el Mundo</span></h2>
                        <p className="text-emerald-100 text-xl font-medium leading-relaxed max-w-xl">
                            No solo retiramos residuos: cuidamos el futuro de nuestra comunidad con prácticas responsables en cada servicio.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div data-reveal="fade-up" data-reveal-delay="100" className="bg-emerald-800/30 p-6 rounded-2xl border border-emerald-700/50 hover:bg-emerald-800/50 transition-colors">
                            <Recycle className="w-8 h-8 text-tertiary mb-4" />
                            <h4 className="font-bold text-white mb-2">Disposición Final</h4>
                            <p className="text-emerald-200 text-sm">Residuos depositados solo en plantas habilitadas y certificadas.</p>
                        </div>
                        <div data-reveal="fade-up" data-reveal-delay="200" className="bg-emerald-800/30 p-6 rounded-2xl border border-emerald-700/50 hover:bg-emerald-800/50 transition-colors">
                            <Leaf className="w-8 h-8 text-tertiary mb-4" />
                            <h4 className="font-bold text-white mb-2">Flota Eficiente</h4>
                            <p className="text-emerald-200 text-sm">Unidades modernas con menor emisión de CO2.</p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <a href="#contacto">
                            <Button className="bg-tertiary hover:bg-tertiary-dark text-white px-8 py-6 rounded-xl text-lg font-bold shadow-lg shadow-tertiary/20">
                                Sumate al cuidado
                            </Button>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Environment;
