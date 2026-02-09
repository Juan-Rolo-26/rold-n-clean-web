import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import mediosPago from '@/assets/medios-pago.png';
import logo from '@/assets/logotipo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-reveal="fade-up" className="bg-foreground text-white">
      {/* Main Footer */}
      <div data-reveal="fade-up" className="container-custom py-12 md:py-24 px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl p-2 flex items-center justify-center shadow-lg">
                <img src={logo} alt="Volquetes Roldan Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl leading-tight">Volquetes<br />Roldan</h3>
              </div>
            </div>
            <p className="text-white/80 mb-8 max-w-md text-base sm:text-lg leading-relaxed">
              Más de 5 años brindando soluciones en alquiler de volquetes, venta de
              materiales y gestión de residuos. Tu obra, nuestro orgullo.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/people/Volquetes-Roldan/pfbid022AskGpPV8grcr6HUkQo9Uz1RehpRD2H3GdvLcVn9uCfrpazi3Y36M9GfzpG5yahCl/?rdid=6gXA2SpcCb4qGQDD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17omZWa2Fh%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors hover:scale-110 transform duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://www.instagram.com/volquetesroldan/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors hover:scale-110 transform duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xl sm:text-2xl mb-6 sm:mb-8">Enlaces rápidos</h4>
            <ul className="space-y-3 sm:space-y-4">
              {['Inicio', 'Servicios', 'Galería', 'Nosotros', 'Contacto'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/80 hover:text-white transition-colors text-base sm:text-lg"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-xl sm:text-2xl mb-6 sm:mb-8">Contacto</h4>
            <ul className="space-y-4 sm:space-y-6">
              <li className="flex items-start gap-3 sm:gap-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base sm:text-lg">
                  Marcos Ateca 743<br />
                  Roldán, Santa Fe<br />
                  Argentina
                </span>
              </li>
              <li>
                <a
                  href="tel:+5493413623232"
                  className="flex items-center gap-3 sm:gap-4 text-white/80 hover:text-white transition-colors text-base sm:text-lg"
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  341 362-3232
                </a>
              </li>
              <li>
                <a
                  href="mailto:Mauricioandresbay123@hotmail.com"
                  className="flex items-center gap-3 sm:gap-4 text-white/80 hover:text-white transition-colors text-base sm:text-lg"
                >
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </span>
                  <span className="break-all sm:break-normal">Mauricioandresbay123@hotmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods Section - MUCHO MÁS GRANDE */}
        <div className="mt-12 sm:mt-20 pt-10 sm:pt-16 border-t border-white/10">
          <div className="text-center space-y-6 sm:space-y-10">
            <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wide">
              Medios de Pago
            </h4>
            <p className="text-white/80 text-lg sm:text-2xl max-w-2xl mx-auto px-2">
              Aceptamos todas las formas de pago para tu tranquilidad
            </p>
            <div className="bg-white/10 p-6 sm:p-12 md:p-16 rounded-3xl backdrop-blur-sm shadow-2xl max-w-5xl mx-auto border-2 sm:border-4 border-white/20 transform hover:scale-105 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.3)] mx-4 sm:mx-auto">
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
              © {currentYear} Volquetes Roldan. Todos los derechos reservados.
            </p>
            <p className="text-white/60 text-base">
              Diseñado con cariño para nuestros clientes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
