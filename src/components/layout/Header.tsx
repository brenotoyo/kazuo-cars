'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Phone, X } from 'lucide-react';
import Nav from './Nav';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-fundo-principal border-bordas relative z-50 border-b px-4 py-4 md:px-8 lg:px-32">
      <div className="relative flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2"
        >
          <div className="bg-vermelho-principal flex h-10 w-10 items-center justify-center rounded-xl">
            <Image
              src="/images/icons/logo-car.svg"
              alt="Logo do carro"
              width={20}
              height={20}
              quality={85}
            />
          </div>
          <p className="text-lg font-bold text-white">
            KAZUO<span className="text-vermelho-principal">CARS</span>
          </p>
        </Link>

        {/* Desktop (≥1024px): layout original */}
        <div className="hidden h-full items-center gap-6 lg:flex">
          <Nav />
          <div className="bg-bordas h-6 w-px" />
          <a
            href="tel:+551140028922"
            className="hover:text-vermelho-principal flex items-center text-sm font-medium text-gray-200"
          >
            (11) 4002-8922
          </a>
        </div>

        {/* Mobile e tablet (<1024px): telefone + botão hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:+551140028922"
            aria-label="Ligar para (11) 4002-8922"
            className="hover:text-vermelho-principal flex h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium text-gray-200"
          >
            <Phone size={18} className="text-vermelho-principal" />
            <span className="hidden md:inline">(11) 4002-8922</span>
          </a>
          <button
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen((open) => !open)}
            className="border-bordas flex h-10 w-10 items-center justify-center rounded-lg border text-white transition hover:bg-white/10"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menu colapsável (mobile e tablet) */}
      <div
        id="menu-mobile"
        className={`bg-fundo-principal border-bordas absolute inset-x-0 top-full border-b px-4 pb-4 md:px-8 lg:hidden ${
          menuOpen ? 'block' : 'hidden'
        }`}
      >
        <Nav orientation="vertical" onNavigate={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}
