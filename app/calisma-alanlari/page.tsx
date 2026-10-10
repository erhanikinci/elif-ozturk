import {AreaGrid,ContactBand,PageHeading} from '@/components/law-site';
export const metadata={title:'Çalışma Alanları'};
export default function Page(){return <main id="main"><PageHeading label="Çalışma Alanları" title="Her meseleye, kendi koşulları içinde." description="Bireysel ve kurumsal hukuki konuların kapsamını keşfedin."/><section className="container section"><AreaGrid/></section><ContactBand/></main>}
