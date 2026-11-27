import Image from 'next/image';
import { Store } from 'lucide-react';

const timeline = [
  {
    title: '2009 — Fundação',
    text: 'Primeira loja com 12 carros no pátio.',
    active: true,
  },
  {
    title: '2016 — Oficina própria',
    text: 'Inspeção e revisão 100% feitas em casa.',
    active: false,
  },
  {
    title: '2024 — Novo showroom',
    text: 'Sede de 4.200 m² na Av. dos Bandeirantes.',
    active: false,
  },
];

export default function QuemSomos() {
  return (
    <section className="bg-fundo-principal py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 md:grid-cols-2 md:gap-12">
        {/* Imagem */}
        <div className="relative">
          <div className="border-bordas relative aspect-4/3 overflow-hidden rounded-2xl border">
            <Image
              src="/images/sobre/showroom.png"
              alt="Showroom da Kazuo Cars"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="bg-card border-bordas absolute right-4 -bottom-6 left-4 flex items-center gap-3 rounded-xl border p-3 pr-5 shadow-xl sm:right-auto sm:left-6 md:left-10">
            <span className="bg-vermelho-principal flex h-10 w-10 items-center justify-center rounded-lg text-white">
              <Store size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-white">4.200 m²</p>
              <p className="text-[11px] text-gray-400">
                de showroom coberto e oficina própria
              </p>
            </div>
          </div>
        </div>

        {/* Texto */}
        <div>
          <p className="text-vermelho-principal text-[11px] font-bold tracking-[0.2em] uppercase">
            Quem somos
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-bold text-white md:text-4xl">
            De uma garagem na Vila Olímpia a referência em seminovos
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-gray-400">
            <p>
              Tudo começou com Kazuo Tanaka, mecânico por formação, vendendo
              cinco carros por mês em uma pequena garagem. Cada veículo passava
              pelas mãos dele antes de ir para o cliente — e esse cuidado virou
              nossa marca.
            </p>
            <p>
              Hoje somos uma equipe de 46 pessoas, com oficina própria,
              laboratório de estética automotiva e parceria com 12 bancos. Mas o
              processo continua o mesmo: nenhum carro entra no nosso estoque sem
              passar por 120 itens de inspeção.
            </p>
          </div>

          {/* Linha do tempo */}
          <ol className="border-bordas mt-8 ml-1.5 space-y-6 border-l md:space-y-5">
            {timeline.map(({ title, text, active }) => (
              <li key={title} className="relative pl-5 md:pl-6">
                <span
                  className={`absolute top-1 -left-1.75 h-3 w-3 rounded-full border-2 ${
                    active
                      ? 'bg-vermelho-principal border-vermelho-principal'
                      : 'bg-fundo-principal border-vermelho-principal'
                  }`}
                />
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-xs text-gray-500">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
