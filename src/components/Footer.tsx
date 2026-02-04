import { MapPin, Phone, Mail, Facebook, Instagram, Truck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">Volquetes</h3>
                <p className="text-sm text-white/70">Roldán Limpia</p>
              </div>
            </div>
            <p className="text-white/70 mb-6 max-w-sm">
              Más de 10 años brindando soluciones en alquiler de volquetes, venta de 
              materiales y gestión de residuos. Tu proyecto, nuestra prioridad.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Enlaces rápidos</h4>
            <ul className="space-y-3">
              {['Inicio', 'Servicios', 'Galería', 'Nosotros', 'Contacto'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/70">
                  Av. San Martín 1234<br />
                  Roldán, Santa Fe<br />
                  Argentina
                </span>
              </li>
              <li>
                <a 
                  href="tel:+5493412345678" 
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  +54 9 341 234 5678
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@volquetesroldanlimpia.com" 
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  info@volquetesroldanlimpia.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {currentYear} Volquetes Roldán Limpia. Todos los derechos reservados.
            </p>
            <p className="text-white/50 text-sm">
              Diseñado con ❤️ para nuestros clientes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
