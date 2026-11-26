export const formatPrice = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);

export const formatKm = (km: number) =>
  `${new Intl.NumberFormat('pt-BR').format(km)} km`;
