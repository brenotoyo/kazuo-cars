// src/app/carros-a-venda/page.tsx

import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import Estoque from '@/src/components/carros-a-venda/Estoque';

export const metadata = {
  title: 'Carros à venda',
  description: 'Encontre seu carro',
};

export default function CarrosVenda() {
  return (
    <>
      <Header />
      <Estoque />
      <Footer />
    </>
  );
}
