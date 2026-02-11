import { useEffect, useState, useRef } from 'react';
import { Truck, Users, MapPin, Building2, Clock, Award } from 'lucide-react';

const stats = [
    {
        icon: Truck,
        value: 6000,
        label: 'Volquetes Entregados',
        suffix: '+'
    },
    {
        icon: Users,
        value: 4000,
        label: 'Clientes Felices',
        suffix: '+'
    },
    {
        icon: MapPin,
        value: 24,
        label: 'Rutas Diarias',
        suffix: ''
    },
    {
        icon: Award,
        value: 5,
        label: 'Años de Experiencia',
        suffix: '+'
    }
];

const useCounter = (end: number, duration: number = 2000, start = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [end, duration, start]);

    return count;
};

const Stats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} data-reveal="fade-up" className="py-16 md:py-24 bg-white/95 sm:bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#4d7c0f_1px,transparent_1px)] [background-size:24px_24px]"></div>

            <div className="container-custom relative z-10 px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
                    <h2 className="heading-secondary text-slate-800 mb-2 px-2">
                        Números que hablan de <span className="text-tertiary relative inline-block">
                            confianza
                            <svg className="absolute w-full h-1.5 bottom-1 left-0 text-tertiary/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h2>
                    <p className="text-slate-600 mt-2 sm:mt-4 max-w-2xl mx-auto text-lg sm:text-xl font-medium px-2">
                        Resultados reales que respaldan nuestro compromiso con cada cliente.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center text-center transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <StatItemIcon icon={stat.icon} />

                            <div className="space-y-1 sm:space-y-2">
                                <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tabular-nums tracking-tight">
                                    <StatCounter value={stat.value} isVisible={isVisible} />
                                    <span className="text-tertiary text-2xl sm:text-4xl align-top">{stat.suffix}</span>
                                </h3>
                                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500 px-1">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const StatItemIcon = ({ icon: Icon }: { icon: any }) => (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mb-4 sm:mb-6 shadow-sm border border-green-100 hover:shadow-md hover:scale-110 transition-all duration-300 group">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:text-tertiary transition-colors duration-300" />
    </div>
);

const StatCounter = ({ value, isVisible }: { value: number, isVisible: boolean }) => {
    const count = useCounter(value, 2000, isVisible);
    return <>{isVisible ? count.toLocaleString('es-AR') : '0'}</>;
};

export default Stats;
