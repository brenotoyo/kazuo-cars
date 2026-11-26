import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Gauge, MapPin, Heart } from 'lucide-react';
import { Car } from '@/src/types/car';
import { formatKm, formatPrice } from '@/src/lib/utils';

export default function CarCard({
  car,
  variant = 'home',
}: {
  car: Car;
  variant?: 'home' | 'catalog';
}) {
  const isCatalog = variant === 'catalog';

  const info = [
    { icon: Calendar, text: `${car.anoFab}/${car.anoModelo}` },
    { icon: Gauge, text: formatKm(car.km) },
    { icon: MapPin, text: car.cidade },
  ];

  return (
    <article className="bg-fundo-principal border-bordas flex h-full flex-col overflow-hidden rounded-2xl border">
      {/* Imagem */}
      <div className="relative aspect-4/3 w-full">
        <Image
          src={car.imagem}
          alt={car.nome}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />

        {car.etiqueta && (
          <span
            className={`absolute top-4 left-4 rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase ${
              car.destaque && car.etiqueta === 'Mais vendido'
                ? 'bg-vermelho-principal'
                : 'bg-black/60 backdrop-blur'
            }`}
          >
            {car.etiqueta}
          </span>
        )}

        <button
          type="button"
          aria-label="Favoritar"
          className="hover:text-vermelho-principal absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition"
        >
          <Heart size={16} />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-white">{car.nome}</h3>
        <p className="mt-1 text-sm text-gray-400">
          {car.carroceria} · {car.cambio} · {car.combustivel}
        </p>

        {/* Chips: ano, km, cidade */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {info.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="bg-fundo-secundario flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-gray-300"
            >
              <Icon size={12} className="text-gray-500" />
              {text}
            </li>
          ))}
        </ul>

        {/* Preço + botão: sempre no final do card */}
        <div className="border-bordas mt-auto border-t pt-4">
          <div className={isCatalog ? '' : 'flex items-end justify-between'}>
            <div>
              {!isCatalog && (
                <p className="text-xs text-gray-500">Preço à vista</p>
              )}
              <p className="text-vermelho-principal text-2xl font-bold">
                {formatPrice(car.preco)}
              </p>
              <p className="text-xs text-gray-500">
                ou {car.parcelas}x de {formatPrice(car.valorParcela)}
              </p>
            </div>

            {isCatalog ? (
              <Link
                href={`/contato`}
                className="hover:bg-vermelho-principal mt-4 block rounded-lg bg-white/10 py-3 text-center text-sm font-semibold text-white transition"
              >
                Saiba Mais
              </Link>
            ) : (
              <Link
                href={`/carros-a-venda`}
                className="border-vermelho-principal hover:bg-vermelho-principal rounded-lg border px-4 py-2.5 text-sm font-semibold text-white transition"
              >
                Ver Detalhes
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
