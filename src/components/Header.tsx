import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, Clock } from 'lucide-react';
import logo from '@/assets/logotipo.png';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'INICIO', path: '/' },
  { name: 'SERVICIOS', path: '/servicios' },
  { name: 'MEDIO AMBIENTE', path: '/medio-ambiente' },
  { name: 'CONTACTO', path: '/contacto' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Trigger entrance animations
    setIsLoaded(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeaderHeight = () => {
      const height = header.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    };

    updateHeaderHeight();

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => updateHeaderHeight());
      resizeObserver.observe(header);
      return () => resizeObserver.disconnect();
    }

    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header ref={headerRef} className="w-full z-50 fixed top-0 left-0 right-0">
      {/* Top Bar - Contact Info & Logo */}
      <div className={`bg-white/95 backdrop-blur-md border-b border-gray-100 hidden md:block transition-all duration-500 ${isScrolled ? 'py-1' : 'py-2'} ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="container-custom flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 transform transition-all duration-500 hover:scale-105 animate-fade-in-left">
            <img
              src={logo}
              alt="Volquetes Roldan"
              className={`object-contain transition-all duration-500 ${isScrolled ? 'h-14' : 'h-16'}`}
            />
          </Link>

          {/* Contact Details */}
          <div className="flex items-center gap-8 animate-fade-in-right delay-200">
            <div className="flex items-center gap-3 group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tertiary/10 to-tertiary/5 flex items-center justify-center text-tertiary transition-all duration-300 group-hover:from-tertiary group-hover:to-tertiary/80 group-hover:text-white group-hover:shadow-lg">
                <Mail className="w-5 h-5 transition-all duration-300 group-hover:text-white" />
              </div>
              <div className="text-sm leading-tight">
                <p className="font-bold text-primary text-xs uppercase tracking-wide">EMAIL</p>
                <p className="text-gray-600 font-medium text-xs lg:text-sm">Mauricioandresbay123@hotmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center text-accent transition-all duration-300 group-hover:from-accent group-hover:to-accent/80 group-hover:shadow-lg">
                <Phone className="w-5 h-5 transition-all duration-300 group-hover:text-white" />
              </div>
              <div className="text-sm leading-tight">
                <p className="font-bold text-primary text-xs uppercase tracking-wide">TELÉFONO</p>
                <p className="text-gray-600 font-medium text-sm lg:text-base">341 362-3232</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-help transform transition-all duration-300 hover:scale-105">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tertiary/15 to-tertiary/5 flex items-center justify-center text-tertiary transition-all duration-300 group-hover:from-tertiary group-hover:to-tertiary/80 group-hover:text-white group-hover:shadow-lg">
                <Clock className="w-5 h-5 transition-all duration-300 group-hover:text-white" />
              </div>
              <div className="text-sm leading-tight">
                <p className="font-bold text-primary text-xs uppercase tracking-wide">HORARIOS</p>
                <p className="text-gray-600 font-medium text-xs lg:text-sm">Atención las 24hs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className={`w-full transition-all duration-500 shadow-2xl bg-gradient-to-r from-primary via-emerald-500 to-primary backdrop-blur-sm ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} delay-100`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-16">

            {/* Mobile Logo - Super visible */}
            <Link to="/" className="md:hidden flex items-center gap-2 animate-fade-in-left">
              <img
                src={logo}
                alt="Volquetes Roldan"
                className="h-10 object-contain filter brightness-110 contrast-125"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5)) drop-shadow(0 0 2px rgba(255,255,255,0.8))' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2 w-full justify-center">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    relative px-7 py-3 font-bold text-base uppercase tracking-wide 
                    transition-all duration-700 ease-out
                    transform hover:-translate-y-1 hover:scale-105
                    animate-fade-in-down group
                    ${location.pathname === link.path
                      ? 'text-primary'
                      : 'text-white hover:text-white'
                    }
                  `}
                  style={{ animationDelay: `${300 + idx * 100}ms` }}
                >
                  {/* Fondo activo con efecto de pulso suave */}
                  {location.pathname === link.path && (
                    <>
                      <span className="absolute inset-0 bg-white rounded-2xl shadow-2xl shadow-white/30 animate-pulse-slow"></span>
                    </>
                  )}

                  {/* Fondo hover limpio y moderno - SIN barrita */}
                  {location.pathname !== link.path && (
                    <span className="absolute inset-0 bg-white/15 backdrop-blur-md rounded-2xl scale-95 group-hover:scale-100 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 shadow-lg group-hover:shadow-white/20"></span>
                  )}

                  {/* Texto con mejor legibilidad */}
                  <span className="relative z-10 drop-shadow-lg">{link.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button - MÁXIMA VISIBILIDAD */}
            <button
              className="md:hidden p-3 bg-white/90 backdrop-blur-sm text-primary rounded-xl hover:bg-white transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white shadow-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7 text-primary" strokeWidth={3} /> : <Menu className="w-7 h-7 text-primary" strokeWidth={3} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - COMPLETAMENTE REDISEÑADO para máxima visibilidad */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t-4 border-primary animate-slide-down shadow-2xl">
            <div className="container-custom py-6 px-4 flex flex-col gap-3">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    font-bold text-base py-4 px-6 rounded-2xl 
                    transform transition-all duration-300 active:scale-95 
                    animate-fade-in-up text-center shadow-md
                    ${location.pathname === link.path
                      ? 'bg-gradient-to-r from-primary via-emerald-500 to-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200'
                    }
                  `}
                  style={{ animationDelay: `${idx * 75}ms` }}
                >
                  {link.name}
                </Link>
              ))}

              {/* Sección de contacto mejorada para móvil */}
              <div className="flex flex-col gap-3 mt-4 pt-5 border-t border-gray-200">
                {/* Botón de Llamada CTA - Verde destacado */}
                <a
                  href="tel:+5493413623232"
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-emerald-600 text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-xl shadow-primary/30 active:scale-95 transition-transform duration-200 border-2 border-white/50"
                >
                  <div className="bg-white/20 p-2 rounded-full">
                    <Phone className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <span>341 362-3232</span>
                </a>

                {/* Email con mejor contraste */}
                <a
                  href="mailto:Mauricioandresbay123@hotmail.com"
                  className="flex items-center justify-center gap-3 bg-gray-100 text-gray-800 font-semibold text-sm py-3.5 px-4 rounded-xl border border-gray-300 active:bg-gray-200 transition-all duration-200 shadow-sm"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-primary" strokeWidth={2.5} />
                  <span className="truncate">Mauricioandresbay123@hotmail.com</span>
                </a>

                {/* Horario */}
                <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 text-gray-800 font-semibold text-sm py-3 px-4 rounded-xl border border-yellow-200">
                  <Clock className="w-4 h-4 flex-shrink-0 text-yellow-600" strokeWidth={2.5} />
                  <span>Atención las 24hs</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
