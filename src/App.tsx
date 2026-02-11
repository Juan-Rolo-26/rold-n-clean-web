import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot';
import Hero from './components/Hero';
import Services from './components/Services';
import Environment from './components/Environment';
import Stats from './components/Stats';
import WhyChooseUs from './components/WhyChooseUs';
import ContainerSizes from './components/ContainerSizes';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import About from './components/About';

// Page Components with Advanced Entry Animations
const HomePage = () => (
  <main className="main-offset animate-slide-up-fade">
    <Hero />
    <Stats />
    <WhyChooseUs />
  </main>
);

const ServicesPage = () => (
  <main className="main-offset animate-reveal-scale">
    <Services />
  </main>
);

const SizesPage = () => (
  <main className="main-offset animate-slide-in-right-smooth">
    <ContainerSizes />
  </main>
);

const EnvironmentPage = () => (
  <main className="main-offset animate-fade-in">
    <Environment />
    <div className="section-padding bg-tertiary/5">
      <div className="container-custom text-center animate-slide-up-fade delay-200">
        <h3 className="heading-secondary mb-8">Nuestra Huella de Cuidado</h3>
        <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-loose">
          Cada volquete que retiramos es un paso más hacia una ciudad más limpia y amable.
          Colaboramos con plantas de reciclaje certificadas para que los residuos se traten
          con la responsabilidad que nuestro planeta merece.
        </p>
      </div>
    </div>
  </main>
);

const ContactPage = () => (
  <main className="main-offset animate-slide-in-left-smooth">
    <Contact />
    <Testimonials />
    <About />
  </main>
);

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <ScrollReveal />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/tamanos" element={<SizesPage />} />
          <Route path="/medio-ambiente" element={<EnvironmentPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
        <ChatBot />
      </div>
    </BrowserRouter>
  );
};

export default App;

const ScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!elements.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    elements.forEach((el) => {
      const delay = el.getAttribute('data-reveal-delay');
      if (delay) {
        el.style.setProperty('--reveal-delay', `${delay}ms`);
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
};
