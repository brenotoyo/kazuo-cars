import Link from 'next/link';
import Image from 'next/image';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="bg-fundo-principal border-bordas border-b px-32 py-4">
      <div className="relative flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
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

        <div className="flex h-full items-center gap-6">
          <Nav />
          <div className="bg-bordas h-6 w-px" />
          <a
            href="tel:+551140028922"
            className="hover:text-vermelho-principal flex items-center text-sm font-medium text-gray-200"
          >
            (11) 4002-8922
          </a>
        </div>
      </div>
    </header>
  );
}
