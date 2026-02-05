import { useEffect, useState, useRef } from 'react';
import { Truck, Users, MapPin, Building2, Clock, Award } from 'lucide-react';

const stats = [
    {
        icon: Truck,
        value: 4000,
        label: 'Volquetes Entregados',
        suffix: '+'
    },
    {
        icon: Users,
        value: 500,
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
        <section ref={sectionRef} data-reveal="fade-up" className="py-20 bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="heading-secondary text-slate-800 mb-2">
                        Números que nos <span className="text-accent">respaldan</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            stat={stat}
                            isVisible={isVisible}
                            delay={index * 200}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const StatItem = ({ stat, isVisible, delay }: { stat: any, isVisible: boolean, delay: number }) => {
    const count = useCounter(stat.value, 2500, isVisible);

    return (
        <div
            className={`flex flex-col items-center text-center transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-4 shadow-sm">
                <stat.icon className="w-8 h-8" />
            </div>

            <div className="space-y-1">
                <h3 className="text-4xl font-black text-slate-800 tabular-nums">
                    {isVisible ? count.toLocaleString('es-AR') : '0'}{stat.suffix}
                </h3>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    {stat.label}
                </p>
            </div>
        </div>
    );
};

export default Stats;
