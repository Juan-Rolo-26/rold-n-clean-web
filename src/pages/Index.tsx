import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BestPrice from '@/components/BestPrice';
import Services from '@/components/Services';
import Environment from '@/components/Environment';
import Stats from '@/components/Stats';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CallToAction from '@/components/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="main-offset">
        <Hero />
        <BestPrice />
        <Services />
        <Environment />
        <Stats />
        <WhyChooseUs />
        <Testimonials />
        <About />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
