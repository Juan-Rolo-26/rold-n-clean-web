import { Star } from 'lucide-react';

const BestPrice = () => {
  return (
    <section
      data-reveal="fade-up"
      className="py-14 md:py-20 bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white"
    >
      <div className="container-custom text-center">
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-white text-white" />
          ))}
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-wide">
          PRECIO JUSTO, SERVICIO IMPECABLE
        </h2>
        <p className="mt-3 text-white/90 font-semibold text-lg md:text-xl font-medium">
          <span className="text-tertiary font-bold">Precio claro</span> en volquetes y tierra en Roldán, con atención rápida y sin sorpresas.
        </p>
      </div>
    </section>
  );
};

export default BestPrice;
