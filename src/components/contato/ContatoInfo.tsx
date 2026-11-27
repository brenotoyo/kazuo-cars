import { MapPin, Mail, Phone, ArrowRight, ParkingCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

const whatsapp = {
  display: '(11) 98366-4702',
  href: 'https://wa.me/5511983664702',
};

const endereco =
  'Av. dos Bandeirantes, 2450 — Vila Olímpia, São Paulo/SP — 04553-012';

const infos = [
  {
    icon: MapPin,
    label: 'Endereço',
    lines: [
      'Av. dos Bandeirantes, 2450 — Vila Olímpia',
      'São Paulo/SP · 04553-012',
    ],
    action: {
      label: 'Ver no mapa',
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`,
    },
  },
  {
    icon: Mail,
    label: 'E-mail',
    lines: ['contato@kazuocars.com.br'],
    sub: 'Respondemos em até 2 horas úteis',
    href: 'mailto:contato@kazuocars.com.br',
  },
  {
    icon: Phone,
    label: 'Telefone',
    lines: ['(11) 4002-8922'],
    sub: 'Seg a Sex 9h–19h · Sáb 9h–15h',
    href: 'tel:+551140028922',
  },
];

export default function ContatoInfo() {
  return (
    <div className="min-w-0 space-y-6">
      {/* WhatsApp */}
      <div className="bg-card rounded-2xl border border-green-500/30 p-6">
        <p className="text-[11px] font-bold tracking-[0.2em] text-green-400 uppercase">
          Atendimento imediato
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">
          Prefere conversar agora?
        </h2>
        <p className="mt-2 text-xs text-gray-400">
          Envie fotos, peça vídeos do carro e simule o financiamento direto pelo
          WhatsApp.
        </p>

        <a
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center gap-3 rounded-xl bg-[#25d366] p-4 text-black transition hover:brightness-110"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/10">
            <FaWhatsapp size={24} />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-bold">Fale conosco agora</span>
            <span className="block text-xs">{whatsapp.display}</span>
          </span>
          <ArrowRight size={18} />
        </a>
      </div>

      {/* Informações */}
      <ul className="bg-card border-bordas divide-bordas divide-y rounded-2xl border">
        {infos.map(({ icon: Icon, label, lines, sub, href, action }) => {
          const text = (
            <>
              {lines.map((l) => (
                <span
                  key={l}
                  className="block text-sm font-semibold text-white"
                >
                  {l}
                </span>
              ))}
              {sub && (
                <span className="mt-0.5 block text-[11px] text-gray-500">
                  {sub}
                </span>
              )}
            </>
          );
          return (
            <li key={label} className="flex items-start gap-3 p-5">
              <span className="bg-vermelho-principal/15 text-vermelho-principal flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Icon size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-vermelho-principal text-[10px] font-bold tracking-wider uppercase">
                  {label}
                </p>
                {href ? (
                  <a href={href} className="hover:text-vermelho-principal">
                    {text}
                  </a>
                ) : (
                  <div>{text}</div>
                )}
              </div>
              {action && (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vermelho-principal shrink-0 text-[11px] font-semibold hover:underline"
                >
                  {action.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {/* Mapa */}
      <div className="border-bordas bg-fundo-secundario relative h-36 overflow-hidden rounded-2xl border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.7890544693414!2d-46.67365230000001!3d-23.611897100000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce50a658404eff%3A0x5da028b20f088ef!2sAv.%20dos%20Bandeirantes%2C%202450%20-%20Planalto%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004553-003!5e0!3m2!1spt-BR!2sbr!4v1795727941140!5m2!1spt-BR!2sbr"
          width="100%"
          className="h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização do Kazuo Cars"
        ></iframe>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/70 px-2.5 py-1.5 text-[11px] text-white backdrop-blur">
          <ParkingCircle size={12} />
          Estacionamento gratuito para clientes
        </div>
      </div>
    </div>
  );
}
