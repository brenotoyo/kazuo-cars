'use client';

import { useMemo, useState } from 'react';
import {
  X,
  LayoutGrid,
  List,
  ChevronDown,
  SlidersHorizontal,
} from 'lucide-react';
import { Car } from '@/src/types/car';
import { formatPrice } from '@/src/lib/utils';
import CarCard from './CarCard';
import CarFilters, {
  Filters,
  initialFilters,
  PRICE_LIMITS,
} from './CarFilters';

const sortOptions = [
  { value: 'relevantes', label: 'Mais relevantes' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'menor-km', label: 'Menor km' },
  { value: 'mais-novos', label: 'Mais novos' },
];

export default function CarCatalog({ cars }: { cars: Car[] }) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sort, setSort] = useState('relevantes');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const priceChanged =
    filters.precoMin !== PRICE_LIMITS.min ||
    filters.precoMax !== PRICE_LIMITS.max;

  const activeCount =
    (priceChanged ? 1 : 0) +
    filters.marcas.length +
    filters.modelos.length +
    filters.cores.length;

  const result = useMemo(() => {
    const list = cars.filter(
      (c) =>
        c.preco >= filters.precoMin &&
        c.preco <= filters.precoMax &&
        (filters.marcas.length === 0 || filters.marcas.includes(c.marca)) &&
        (filters.modelos.length === 0 || filters.modelos.includes(c.modelo)) &&
        (filters.cores.length === 0 || filters.cores.includes(c.cor)),
    );

    return [...list].sort((a, b) => {
      switch (sort) {
        case 'menor-preco':
          return a.preco - b.preco;
        case 'maior-preco':
          return b.preco - a.preco;
        case 'menor-km':
          return a.km - b.km;
        case 'mais-novos':
          return b.anoModelo - a.anoModelo;
        default:
          return Number(!!b.destaque) - Number(!!a.destaque);
      }
    });
  }, [cars, filters, sort]);

  // chips dos filtros ativos
  const chips: { label: string; remove: () => void }[] = [
    ...(priceChanged
      ? [
          {
            label: `${formatPrice(filters.precoMin)} – ${formatPrice(filters.precoMax)}`,
            remove: () =>
              setFilters({
                ...filters,
                precoMin: PRICE_LIMITS.min,
                precoMax: PRICE_LIMITS.max,
              }),
          },
        ]
      : []),
    ...filters.marcas.map((m) => ({
      label: m,
      remove: () =>
        setFilters({
          ...filters,
          marcas: filters.marcas.filter((v) => v !== m),
        }),
    })),
    ...filters.modelos.map((m) => ({
      label: m,
      remove: () =>
        setFilters({
          ...filters,
          modelos: filters.modelos.filter((v) => v !== m),
        }),
    })),
    ...filters.cores.map((c) => ({
      label: c,
      remove: () =>
        setFilters({ ...filters, cores: filters.cores.filter((v) => v !== c) }),
    })),
  ];

  return (
    <div className="grid gap-4 md:gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
      {/* Botão "Filtros" — visível apenas em mobile e tablet */}
      <button
        type="button"
        aria-expanded={filtersOpen}
        aria-controls="filtros-veiculos"
        onClick={() => setFiltersOpen((open) => !open)}
        className="bg-card border-bordas flex w-full items-center justify-between rounded-xl border px-4 py-3 text-white lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-vermelho-principal" />
          <span className="font-bold">Filtros</span>
          {activeCount > 0 && (
            <span className="bg-vermelho-principal/20 text-vermelho-principal rounded-full px-2 text-xs font-bold">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform ${filtersOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <CarFilters
        cars={cars}
        filters={filters}
        onChange={setFilters}
        activeCount={activeCount}
        resultCount={result.length}
        mobileOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />

      <div className="min-w-0">
        {/* Barra superior */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            <strong className="text-white">{result.length} veículos</strong>{' '}
            encontrados
          </p>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <label className="bg-card border-bordas relative flex min-w-0 flex-1 items-center rounded-lg border px-3 py-2 text-sm text-gray-500 sm:flex-initial">
              <span className="shrink-0">Ordenar por:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="ml-2 min-w-0 flex-1 appearance-none bg-transparent pr-5 font-semibold text-white outline-none sm:flex-initial"
              >
                {sortOptions.map((o) => (
                  <option
                    key={o.value}
                    value={o.value}
                    className="bg-fundo-principal"
                  >
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3"
              />
            </label>

            <div className="bg-card border-bordas flex rounded-lg border p-1">
              {(
                [
                  ['grid', LayoutGrid],
                  ['list', List],
                ] as const
              ).map(([mode, Icon]) => (
                <button
                  key={mode}
                  type="button"
                  aria-label={mode === 'grid' ? 'Ver em grade' : 'Ver em lista'}
                  aria-pressed={view === mode}
                  onClick={() => setView(mode)}
                  className={`rounded-md p-2 transition ${
                    view === mode
                      ? 'bg-white/10 text-white'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chips */}
        {chips.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip.label}>
                <button
                  type="button"
                  onClick={chip.remove}
                  className="bg-card border-bordas hover:border-principal-red flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs text-white transition"
                >
                  {chip.label}
                  <X size={12} className="text-gray-500" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Grade */}
        {result.length > 0 ? (
          <div
            className={`mt-6 grid gap-6 ${
              view === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {result.map((car) => (
              <CarCard key={car.id} car={car} variant="catalog" />
            ))}
          </div>
        ) : (
          <div className="border-bordas mt-6 rounded-2xl border border-dashed py-16 text-center">
            <p className="font-semibold text-white">
              Nenhum veículo encontrado
            </p>
            <button
              type="button"
              onClick={() => setFilters(initialFilters)}
              className="text-principal-red mt-2 text-sm hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
