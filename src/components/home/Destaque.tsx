import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CarCard from '@/src/components/cars/CarCard';
import { cars } from '@/src/data/cars';

export default function Destaque() {
  const destaques = cars.filter((car) => car.destaque).slice(0, 3);

  return (
    <section className="bg-fundo-secundario py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h3 className="text-vermelho-principal text-xs font-bold tracking-[0.2em] uppercase">
              Destaques do mês
            </h3>
            <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              Mais Vendidos
            </h2>
            <p className="mt-4 text-gray-400">
              Os seminovos que mais saíram da nossa loja nos últimos 30 dias —
              revisados, higienizados e prontos para transferência.
            </p>
          </div>

          <Link
            href="/carros-a-venda"
            className="hover:text-vermelho-principal flex items-center gap-2 text-sm font-semibold text-white transition"
          >
            Ver todo o estoque
            <ArrowRight size={14} className="text-vermelho-principal" />
          </Link>
        </div>

        {/* Grade de cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destaques.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
