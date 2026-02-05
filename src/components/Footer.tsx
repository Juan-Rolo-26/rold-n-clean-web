import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import mediosPago from '@/assets/medios-pago.png';
import logo from '@/assets/logotipo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-reveal="fade-up" className="bg-foreground text-white">
      {/* Main Footer */}
      <div data-reveal="fade-up" className="container-custom py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-24 h-24 bg-white rounded-2xl p-2 flex items-center justify-center shadow-lg">
                <img src={logo} alt="Volcadores Roldan Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-4xl leading-tight">Volcadores<br />Roldan</h3>
              </div>
            </div>
            <p className="text-white/80 mb-8 max-w-md text-lg leading-relaxed">
              Más de 5 años brindando soluciones en alquiler de volquetes, venta de
              materiales y gestión de residuos. Tu proyecto, nuestra prioridad.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/people/Volquetes-Roldan/pfbid022AskGpPV8grcr6HUkQo9Uz1RehpRD2H3GdvLcVn9uCfrpazi3Y36M9GfzpG5yahCl/?rdid=6gXA2SpcCb4qGQDD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17omZWa2Fh%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors hover:scale-110 transform duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/volquetesroldan/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors hover:scale-110 transform duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-2xl mb-8">Enlaces rápidos</h4>
            <ul className="space-y-4">
              {['Inicio', 'Servicios', 'Galería', 'Nosotros', 'Contacto'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/80 hover:text-white transition-colors text-lg"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-2xl mb-8">Contacto</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <span className="text-white/80 text-lg">
                  Marcos Ateca 743<br />
                  Roldán, Santa Fe<br />
                  Argentina
                </span>
              </li>
              <li>
                <a
                  href="tel:+5493413623232"
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors text-lg"
                >
                  <Phone className="w-6 h-6 text-primary" />
                  341 362-3232
                </a>
              </li>
              <li>
                <a
                  href="mailto:Mauricioandresbay123@hotmail.com"
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors text-lg"
                >
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </span>
                  <span>Mauricioandresbay123@hotmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods Section - MUCHO MÁS GRANDE */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="text-center space-y-10">
            <h4 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wide">
              Medios de Pago
            </h4>
            <p className="text-white/80 text-2xl max-w-2xl mx-auto">
              Aceptamos todas las formas de pago para tu comodidad
            </p>
            <div className="bg-white/10 p-12 md:p-16 rounded-3xl backdrop-blur-sm shadow-2xl max-w-5xl mx-auto border-4 border-white/20 transform hover:scale-105 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.3)]">
              <img
                src={mediosPago}
                alt="Medios de Pago: Visa, Mastercard, MercadoPago"
                className="w-full h-auto object-contain brightness-110 contrast-110"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-base text-center md:text-left">
              © {currentYear} Volcadores Roldan. Todos los derechos reservados.
            </p>
            <p className="text-white/60 text-base">
              Diseñado con ❤️ para nuestros clientes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
