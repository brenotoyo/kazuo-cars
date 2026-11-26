import CarCatalog from '@/src/components/cars/CarCatalog';
import { cars } from '@/src/data/cars';

export default function Estoque() {
  return (
    <section className="bg-fundo-principal py-10">
      <div className="mx-auto max-w-7xl px-4">
        <CarCatalog cars={cars} />
      </div>
    </section>
  );
}
