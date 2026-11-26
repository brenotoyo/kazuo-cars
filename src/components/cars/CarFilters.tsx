'use client';

import { SlidersHorizontal, Check } from 'lucide-react';
import { Car } from '@/src/types/car';
import { formatPrice } from '@/src/lib/utils';

export type Filters = {
  precoMin: number;
  precoMax: number;
  marcas: string[];
  modelos: string[];
  cores: string[];
};

export const PRICE_LIMITS = { min: 30000, max: 250000, step: 5000 };

export const initialFilters: Filters = {
  precoMin: PRICE_LIMITS.min,
  precoMax: PRICE_LIMITS.max,
  marcas: [],
  modelos: [],
  cores: [],
};

const colorMap: Record<string, string> = {
  Preto: '#111111',
  Prata: '#c9ccd1',
  Branco: '#ffffff',
  Cinza: '#6b7280',
  Vermelho: '#c1121f',
  Azul: '#1d4ed8',
  Verde: '#166534',
  Marrom: '#7c3f12',
  Bege: '#d8c7a0',
  Amarelo: '#eab308',
};

type Props = {
  cars: Car[];
  filters: Filters;
  onChange: (f: Filters) => void;
  activeCount: number;
  resultCount: number;
};

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

function Group({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-bordas border-t py-5">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      {hint && <p className="mt-0.5 text-xs text-gray-500">{hint}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function CarFilters({
  cars,
  filters,
  onChange,
  activeCount,
  resultCount,
}: Props) {
  // contagem por marca
  const marcas = Object.entries(
    cars.reduce<Record<string, number>>((acc, c) => {
      acc[c.marca] = (acc[c.marca] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  // modelos das marcas selecionadas (ou todos)
  const modelos = Object.entries(
    cars
      .filter(
        (c) => filters.marcas.length === 0 || filters.marcas.includes(c.marca),
      )
      .reduce<Record<string, number>>((acc, c) => {
        acc[c.modelo] = (acc[c.modelo] ?? 0) + 1;
        return acc;
      }, {}),
  );

  const cores = Array.from(new Set(cars.map((c) => c.cor)));

  return (
    <aside className="bg-card border-bordas h-fit rounded-2xl border p-5 lg:sticky lg:top-24">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <SlidersHorizontal size={16} className="text-principal-red" />
          <span className="font-bold">Filtros</span>
          {activeCount > 0 && (
            <span className="bg-principal-red/20 text-principal-red rounded-full px-2 text-xs font-bold">
              {activeCount}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onChange(initialFilters)}
          className="text-xs text-gray-400 transition hover:text-white"
        >
          Limpar tudo
        </button>
      </div>

      {/* Preço */}
      <Group title="Faixa de Preço" hint="Valor à vista do veículo">
        <div className="range-dual relative h-5">
          <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-white/10" />
          <div
            className="bg-principal-red absolute top-1/2 h-1 -translate-y-1/2 rounded"
            style={{
              left: `${((filters.precoMin - PRICE_LIMITS.min) / (PRICE_LIMITS.max - PRICE_LIMITS.min)) * 100}%`,
              right: `${100 - ((filters.precoMax - PRICE_LIMITS.min) / (PRICE_LIMITS.max - PRICE_LIMITS.min)) * 100}%`,
            }}
          />
          <input
            type="range"
            aria-label="Preço mínimo"
            {...PRICE_LIMITS}
            value={filters.precoMin}
            onChange={(e) =>
              onChange({
                ...filters,
                precoMin: Math.min(
                  +e.target.value,
                  filters.precoMax - PRICE_LIMITS.step,
                ),
              })
            }
          />
          <input
            type="range"
            aria-label="Preço máximo"
            {...PRICE_LIMITS}
            value={filters.precoMax}
            onChange={(e) =>
              onChange({
                ...filters,
                precoMax: Math.max(
                  +e.target.value,
                  filters.precoMin + PRICE_LIMITS.step,
                ),
              })
            }
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            { label: 'Mínimo', value: filters.precoMin },
            { label: 'Máximo', value: filters.precoMax },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-fundo-principal border-bordas rounded-lg border px-3 py-2"
            >
              <p className="text-[10px] tracking-wider text-gray-500 uppercase">
                {label}
              </p>
              <p className="text-sm font-bold text-white">
                {formatPrice(value)}
              </p>
            </div>
          ))}
        </div>
      </Group>

      {/* Marca */}
      <Group title="Marca">
        <ul className="space-y-3">
          {marcas.map(([marca, total]) => (
            <CheckItem
              key={marca}
              label={marca}
              count={total}
              checked={filters.marcas.includes(marca)}
              onChange={() =>
                onChange({ ...filters, marcas: toggle(filters.marcas, marca) })
              }
            />
          ))}
        </ul>
      </Group>

      {/* Modelo */}
      <Group title="Modelo" hint="Modelos das marcas selecionadas">
        <ul className="space-y-3">
          {modelos.map(([modelo, total]) => (
            <CheckItem
              key={modelo}
              label={modelo}
              count={total}
              checked={filters.modelos.includes(modelo)}
              onChange={() =>
                onChange({
                  ...filters,
                  modelos: toggle(filters.modelos, modelo),
                })
              }
            />
          ))}
        </ul>
      </Group>

      {/* Cor */}
      <Group title="Cor">
        <div className="flex flex-wrap gap-3">
          {cores.map((cor) => {
            const selected = filters.cores.includes(cor);
            return (
              <button
                key={cor}
                type="button"
                title={cor}
                aria-label={cor}
                aria-pressed={selected}
                onClick={() =>
                  onChange({ ...filters, cores: toggle(filters.cores, cor) })
                }
                className={`h-9 w-9 rounded-full border-2 p-0.5 transition ${
                  selected
                    ? 'border-principal-red'
                    : 'border-transparent hover:border-white/30'
                }`}
              >
                <span
                  className="block h-full w-full rounded-full border border-white/10"
                  style={{ backgroundColor: colorMap[cor] ?? '#444' }}
                />
              </button>
            );
          })}
        </div>
      </Group>

      <div className="border-bordas border-t pt-5">
        <span className="border-principal-red text-principal-red block rounded-lg border py-3 text-center text-sm font-semibold">
          Mostrar {resultCount} resultados
        </span>
      </div>
    </aside>
  );
}

function CheckItem({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <li>
      <label className="flex cursor-pointer items-center gap-3 text-sm text-white">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span className="peer-checked:bg-principal-red peer-checked:border-principal-red flex h-4 w-4 items-center justify-center rounded border border-white/30 peer-focus-visible:ring-2 peer-focus-visible:ring-white/40 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
          <Check size={12} strokeWidth={3} />
        </span>
        <span className="flex-1">{label}</span>
        <span className="text-xs text-gray-500">{count}</span>
      </label>
    </li>
  );
}
