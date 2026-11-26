import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function ContatoHero() {
  return (
    <section className="bg-fundo-secundario border-bordas mb-10 border-b py-10">
      <div className="mx-auto max-w-6xl px-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-gray-500"
        >
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-white">Contato</span>
        </nav>

        <p className="text-vermelho-principal mt-6 text-[11px] font-bold tracking-[0.2em] uppercase">
          Contato
        </p>
        <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
          Fale com a Kazuo Cars
        </h1>
        <p className="mt-3 max-w-xl text-sm text-gray-400">
          Dúvidas sobre um veículo, simulação de financiamento ou avaliação do
          seu usado? Nossa equipe responde em até 15 minutos no horário
          comercial.
        </p>
      </div>
    </section>
  );
}
