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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary transition-all duration-300 group-hover:from-primary group-hover:to-primary/80 group-hover:shadow-lg">
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/30 to-secondary/15 flex items-center justify-center text-primary transition-all duration-300 group-hover:from-secondary group-hover:to-secondary/80 group-hover:shadow-lg">
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
      <div className={`w-full transition-all duration-500 shadow-xl bg-gradient-to-r from-primary via-primary/95 to-primary backdrop-blur-sm ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} delay-100`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-14 md:h-14">

            {/* Mobile Logo */}
            <Link to="/" className="md:hidden flex items-center gap-2 animate-fade-in-left">
              <span className="text-white font-extrabold text-xl tracking-tight">Volquetes Roldan</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 w-full justify-center">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-6 py-2 rounded-xl font-bold text-base uppercase tracking-wide transition-all duration-500 transform hover:-translate-y-0.5 animate-fade-in-down relative overflow-hidden group ${location.pathname === link.path
                    ? 'bg-white text-primary shadow-lg scale-105'
                    : 'text-white hover:bg-white/10 hover:text-white'
                    }`}
                  style={{ animationDelay: `${300 + idx * 100}ms` }}
                >
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 text-white rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-110 active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-primary to-primary/95 border-t border-white/10 animate-slide-down backdrop-blur-md">
            <div className="container-custom py-6 flex flex-col gap-4">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-bold text-base py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-105 animate-fade-in-up ${location.pathname === link.path
                    ? 'bg-white text-primary shadow-xl'
                    : 'text-white hover:bg-white/15 backdrop-blur-sm'
                    }`}
                  style={{ animationDelay: `${idx * 75}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-5 mt-4 pt-5 border-t border-white/20 text-white text-base px-6">
                <div className="flex items-center gap-4 hover:bg-white/10 p-3 rounded-xl transition-all duration-300">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Mauricioandresbay123@hotmail.com</span>
                </div>
                <div className="flex items-center gap-4 hover:bg-white/10 p-3 rounded-xl transition-all duration-300">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium text-lg">341 362-3232</span>
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
