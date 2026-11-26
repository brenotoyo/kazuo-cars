'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/carros-a-venda', label: 'Carros à Venda' },
  { href: '/sobre-nos', label: 'Sobre Nós' },
  { href: '/contato', label: 'Contato' },
];

export default function Nav() {
  const pathname = usePathname();

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
