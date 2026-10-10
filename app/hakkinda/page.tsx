import { PageHeading, ContactBand, MeetingButton } from '@/components/law-site';
import { profile } from '@/lib/profile';
import { CalendarDays, FileText, Scale } from 'lucide-react';
export const metadata = { title: 'Hakkında', description: 'Av. Elif Öztürk. İstanbul Barosu sicil no. 96132, Türkiye Barolar Birliği sicil no. 248443. Mesleki bilgiler ve çalışma yaklaşımı.' };
export default function Page() { return <main id="main">
  <PageHeading label="Hakkında" title="Av. Elif Öztürk" description="Mesleki kimlik ve çalışma yaklaşımı." />
  <section className="container section about-page-grid">
    <div className="prose"><span className="eyebrow">MESLEKİ BİLGİLER</span><p className="intro">Av. Elif Öztürk, İstanbul Barosu'na kayıtlı olarak Arnavutköy, İstanbul'da avukatlık faaliyeti yürütmektedir.</p>
      <dl className="professional-record"><div><dt><Scale size={18}/>Kayıtlı olduğu baro</dt><dd>{profile.bar}</dd></div><div><dt><FileText size={18}/>Baro sicil numarası</dt><dd>{profile.barNumber}</dd></div><div><dt><FileText size={18}/>Türkiye Barolar Birliği sicili</dt><dd>{profile.unionNumber}</dd></div></dl>
      <h2>Konuyu bütün olarak ele almak.</h2><p>Her hukuki mesele, kendine özgü olaylar ve dikkatle değerlendirilmesi gereken ayrıntılar içerir. Değerlendirmede olayların bütünü, ilgili belgeler ve kişisel ya da kurumsal ihtiyaçlar birlikte ele alınır.</p>
      <h2>Açık bir çalışma çerçevesi.</h2><p>Hukuki seçenekler, çalışmanın kapsamı ve izlenebilecek adımlar görüşmede açıklanır. Gerekli belgeler, çalışma koşulları ve görüşme yöntemi konunun niteliğine göre ayrıca belirlenir.</p>
      <h2>Gizlilik ve mesleki özen.</h2><p>Görüşmelerin ve hukuki değerlendirmelerin mesleki gizlilik çerçevesinde yürütülmesi esastır. İlk iletişimde ayrıntılı dava bilgileri veya özel nitelikli kişisel veriler paylaşmak yerine görüşme planlaması yapılabilir.</p>
    </div>
    <aside className="statement"><div className="statement-image"><img src="/adalet-terazisi.webp" width={1122} height={1402} alt="Lacivert fonda dengeli pirinç adalet terazisi" loading="lazy"/></div><div className="statement-copy"><span className="eyebrow">ÇALIŞMA YAKLAŞIMI</span><h2>Dinlemek.<br/>İncelemek.<br/>Değerlendirmek.</h2><p>Olaylar, belgeler ve hukuki seçenekler üzerinde dikkatli bir çalışma.</p><MeetingButton className="button quiet-light"><CalendarDays size={18}/>Görüşme İçin İletişim</MeetingButton></div></aside>
  </section><ContactBand/>
</main>; }
