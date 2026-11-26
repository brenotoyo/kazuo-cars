import SobreHero from '@/src/components/sobre-nos/SobreHero';
import QuemSomos from '@/src/components/sobre-nos/QuemSomos';
import Diferenciais from '@/src/components/sobre-nos/Diferenciais';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';

export const metadata = {
  title: 'Sobre nós',
  description:
    'Conheça a história da Kazuo Cars, referência de seminovos em São Paulo.',
};

export default function SobreNos() {
  return (
    <>
      <Header />
      <SobreHero />
      <QuemSomos />
      <Diferenciais />
      <Footer />
    </>
  );
}
