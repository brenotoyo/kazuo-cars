import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa6';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/carros-a-venda', label: 'Carros à Venda' },
  { href: '/sobre-nos', label: 'Sobre Nós' },
  { href: '/contato', label: 'Contato' },
];

const contacts = [
  {
    icon: MapPin,
    text: 'Av. dos Bandeirantes, 2450 - Vila Olímpia, São Paulo',
    href: undefined,
  },
  { icon: Phone, text: '(11) 4002-8922', href: 'tel:+551140028922' },
  {
    icon: Mail,
    text: 'contato@kazuocars.com.br',
    href: 'mailto:contato@kazuocars.com.br',
  },
];

const socials = [
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com' },
  { icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com' },
];

const headingClass =
  'mb-4 text-xs font-bold tracking-widest text-white/70 uppercase md:text-sm';

export default function Footer() {
  return (
    <footer className="bg-fundo-principal border-bordas border-t px-4 py-12 text-white md:px-8 lg:px-24">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Coluna 1 - Logo e descrição */}
          <div className="flex flex-col items-center text-center md:col-span-2 md:items-start md:text-left">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="bg-vermetext-vermelho-principal flex h-10 w-10 items-center justify-center rounded-xl">
                <div className="bg-vermelho-principal flex h-10 w-10 items-center justify-center rounded-xl">
                  <Image
                    src="/images/icons/logo-car.svg"
                    alt="Logo do carro"
                    width={20}
                    height={20}
                    quality={85}
                  />
                </div>
              </div>
              <span className="text-lg font-bold">
                KAZUO <span className="text-vermelho-principal">CARS</span>
              </span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-white/70">
              Seminovos com procedência, garantia e transparência em cada
              negociação desde 2009.
            </p>
          </div>

          {/* Coluna 2 - Links rápidos */}
          <nav aria-label="Links rápidos" className="text-center md:text-left">
            <h4 className={headingClass}>Links rápidos</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-vermelho-principal text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coluna 3 - Atendimento */}
          <div className="text-center md:text-left">
            <h4 className={headingClass}>Atendimento</h4>
            <ul className="space-y-3">
              {contacts.map(({ icon: Icon, text, href }) => {
                const content = (
                  <>
                    <Icon
                      size={16}
                      className="text-vermelho-principal mt-0.5 shrink-0"
                    />
                    <span className="text-sm leading-snug wrap-break-word text-white/70 hover:text-white">
                      {text}
                    </span>
                  </>
                );
                return (
                  <li key={text}>
                    {href ? (
                      <a
                        href={href}
                        className="flex items-start justify-center gap-3 transition-colors md:justify-start"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start justify-center gap-3 md:justify-start">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Coluna 4 - Redes sociais */}
          <div className="flex flex-col items-center md:col-span-2 md:items-start lg:col-span-1">
            <h4 className={headingClass}>Siga-nos</h4>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:bg-vermelho-principal flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divisória */}
        <div className="my-10 border-t border-white/10" />

        {/* Copyright */}
        <div className="flex flex-col items-center gap-4 text-center text-xs text-white/50 md:flex-row md:justify-between md:text-left">
          <p>© 2026 Kazuo Cars. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link
              href="/politica-privacidade"
              className="hover:text-vermelho-principal transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos-uso"
              className="hover:text-vermelho-principal transition-colors"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
