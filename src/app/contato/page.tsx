// src/app/carros-a-venda/page.tsx

import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import ContatoHero from '@/src/components/contato/ContatoHero';
import ContatoForm from '@/src/components/contato/ContatoForm';
import ContatoInfo from '@/src/components/contato/ContatoInfo';

export const metadata = {
  title: 'Contato',
  description:
    'Fale com a Kazuo Cars: dúvidas, financiamento e avaliação do seu usado.',
};

export default function CarrosVenda() {
  return (
    <>
      <Header />
      <ContatoHero />
      <section className="bg-fundo-principal pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[1.2fr_1fr]">
          <ContatoForm />
          <ContatoInfo />
        </div>
      </section>
      <Footer />
    </>
  );
}
