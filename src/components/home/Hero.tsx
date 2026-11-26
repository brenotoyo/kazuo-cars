import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  ShieldCheck,
  ClipboardCheck,
  HandCoins,
  ArrowLeftRight,
} from 'lucide-react';

const popularSearches = [
  { label: 'SUV', query: 'suv' },
  { label: 'Sedan', query: 'sedan' },
  { label: 'Hatch', query: 'hatch' },
  { label: 'Até R$ 80 mil', query: 'ate-80-mil' },
  { label: 'Automático', query: 'automatico' },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Garantia de 12 meses',
    text: 'Motor e câmbio cobertos',
  },
  {
    icon: ClipboardCheck,
    title: 'Laudo cautelar',
    text: '120 itens inspecionados',
  },
  {
    icon: HandCoins,
    title: 'Financiamento em 60x',
    text: 'Aprovação em 30 minutos',
  },
  {
    icon: ArrowLeftRight,
    title: 'Aceitamos seu usado',
    text: 'Avaliação na hora',
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-72px)] w-full flex-col overflow-hidden">
      {/* Imagem de fundo */}
      <Image
        src="/images/hero.png"
        alt="Fundo de carro esportivo"
        fill
        className="object-cover object-right"
        priority
        quality={90}
      />

      {/* Overlay: escurece topo, base e lado esquerdo */}
      <div className="from-fundo-principal/80 via-fundo-principal/40 to-fundo-principal absolute inset-0 bg-linear-to-b" />
      <div className="from-fundo-principal/70 absolute inset-0 bg-linear-to-r to-transparent" />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        {/* Título */}
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Encontre seu Carro{' '}
          <span className="text-vermelho-principal">Ideal</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-gray-300">
          Seminovos selecionados a dedo, com procedência garantida, garantia de
          12 meses e financiamento aprovado em até 30 minutos.
        </p>

        {/* Busca */}
        <form
          action="/carros-a-venda"
          method="get"
          className="border-bordas bg-fundo-principal/70 mt-8 flex w-full max-w-2xl items-center gap-2 rounded-xl border p-2 backdrop-blur"
        >
          <Search size={16} className="ml-3 shrink-0 text-gray-400" />
          <input
            type="text"
            name="busca"
            placeholder="Busque por marca, modelo ou ano — ex: Honda Civic 2021"
            className="flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="bg-vermelho-principal flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <Search size={14} />
            Buscar
          </button>
        </form>

        {/* Buscas populares */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-gray-400">Buscas populares:</span>
          {popularSearches.map(({ label, query }) => (
            <Link
              key={query}
              href={`/carros-a-venda?busca=${query}`}
              className="border-bordas bg-fundo-principal/60 hover:border-vermelho-principal rounded-full border px-3 py-1 text-gray-200 transition hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Barra de diferenciais */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-8">
        <ul className="border-bordas bg-fundo-principal/70 lg:divide-bordas grid grid-cols-1 rounded-xl border backdrop-blur sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
          {benefits.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3 p-4">
              <span className="bg-vermelho-principal/15 text-vermelho-principal flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <Icon size={18} />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-400">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
