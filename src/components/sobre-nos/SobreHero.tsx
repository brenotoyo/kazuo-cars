import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const stats = [
  { value: '17', suffix: '+', label: 'anos no mercado de seminovos' },
  { value: '8.500', suffix: '+', label: 'carros entregues a famílias' },
  {
    value: '4,9',
    suffix: '★',
    label: 'nota média em 1.340 avaliações no Google',
  },
  { value: '352', suffix: '', label: 'seminovos disponíveis hoje' },
];

export default function SobreHero() {
  return (
    <section className="bg-fundo-secundario py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-gray-500"
        >
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-white">Sobre Nós</span>
        </nav>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-vermelho-principal text-[11px] font-bold tracking-[0.2em] uppercase">
              Desde 2009 em São Paulo
            </p>
            <h1 className="mt-3 text-5xl font-bold text-white md:text-6xl">
              Nossa <span className="text-vermelho-principal">História</span>
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-gray-300 md:text-base">
            A Kazuo Cars nasceu de uma ideia simples: comprar um carro usado não
            deveria ser um ato de fé. Há 17 anos selecionamos, inspecionamos e
            entregamos seminovos com a mesma transparência que gostaríamos de
            receber.
          </p>
        </div>

        {/* Estatísticas */}
        <ul className="border-bordas bg-card lg:divide-bordas mt-10 grid grid-cols-2 rounded-xl border lg:grid-cols-4 lg:divide-x">
          {stats.map(({ value, suffix, label }) => (
            <li key={label} className="p-5">
              <p className="text-2xl font-bold text-white md:text-3xl">
                {value}
                <span className="text-vermelho-principal">{suffix}</span>
              </p>
              <p className="mt-1 text-xs text-gray-400">{label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
