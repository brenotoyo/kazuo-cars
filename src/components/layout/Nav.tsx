'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/carros-a-venda', label: 'Carros à Venda' },
  { href: '/sobre-nos', label: 'Sobre Nós' },
  { href: '/contato', label: 'Contato' },
];

type NavProps = {
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
};

export default function Nav({
  orientation = 'horizontal',
  onNavigate,
}: NavProps) {
  const pathname = usePathname();

  if (orientation === 'vertical') {
    return (
      <nav aria-label="Navegação principal">
        <ul className="flex flex-col">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href} className="border-bordas border-b last:border-b-0">
                <Link
                  href={href}
                  onClick={onNavigate}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center border-l-2 py-3.5 pl-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-vermelho-principal text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Navegação principal" className="h-full">
      <ul className="flex h-full items-center gap-8">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="h-full">
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex h-full items-center border-b-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-vermelho-principal text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
