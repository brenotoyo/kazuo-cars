import { Eye, Award, ShieldCheck, Headset } from 'lucide-react';

const items = [
  {
    icon: Eye,
    title: 'Transparência',
    text: 'Histórico de manutenção, laudo cautelar e consulta de multas entregues antes de você assinar qualquer coisa.',
  },
  {
    icon: Award,
    title: 'Qualidade',
    text: '120 itens inspecionados na nossa oficina. Recusamos 6 em cada 10 carros avaliados para compra.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantia',
    text: '12 meses de garantia de motor e câmbio em todos os veículos, com opção de estender para 24 meses.',
  },
  {
    icon: Headset,
    title: 'Atendimento',
    text: 'Um consultor dedicado do primeiro contato ao pós-venda, por WhatsApp, telefone ou na loja.',
  },
];

export default function Diferenciais() {
  return (
    <section className="bg-fundo-secundario py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-vermelho-principal text-[11px] font-bold tracking-[0.2em] uppercase">
            Nossos diferenciais
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Por que comprar na Kazuo Cars
          </h2>
          <p className="mt-4 text-sm text-gray-400">
            Quatro compromissos que valem para cada carro do nosso estoque — do
            popular ao SUV premium.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="bg-fundo-principal border-bordas hover:border-vermelho-principal/50 rounded-xl border p-6 transition"
            >
              <span className="bg-vermelho-principal/15 text-vermelho-principal flex h-9 w-9 items-center justify-center rounded-lg">
                <Icon size={16} />
              </span>
              <h3 className="mt-5 text-sm font-bold text-white">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
