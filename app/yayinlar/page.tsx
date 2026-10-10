import {Articles,PageHeading,ContactBand} from '@/components/law-site';
export const metadata={title:'Hukuk Notları'};
export default function Page(){return <main id="main"><PageHeading label="Yayınlar" title="Hukuk notları." description="Hukuki süreçleri anlamak ve ilk görüşmeye hazırlanmak için genel bilgilendirme yazıları."/><section className="container section"><Articles/></section><ContactBand/></main>}
