'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import {CalendarDays,Menu,Scale,Users,BriefcaseBusiness,Building2,Landmark,FileText,ShieldCheck,Check,Clock3,Search,Video,MapPin,Plus,Phone,MessageCircle} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {Sheet,SheetContent,SheetTitle,SheetDescription,SheetTrigger,SheetClose} from '@/components/ui/sheet';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@/components/ui/accordion';
import {areas,articles,faqs} from '@/lib/content';
import {contact,whatsappHref} from '@/lib/contact';
import {ContactWidget} from '@/components/contact-widget';
import {MeetingContactDialog} from '@/components/meeting-contact';
import {profile} from '@/lib/profile';

const DemoMeetingContext=createContext<()=>void>(()=>{});
export function DemoMeetingButton(){const launch=useContext(DemoMeetingContext);return <button className="button secondary" onClick={launch}>Deneme kaydı oluştur</button>}

const MeetingContext=createContext<(area?:string)=>void>(()=>{});
export function MeetingButton({children='Görüşme İçin İletişim',area,className='button primary'}:{children?:ReactNode;area?:string;className?:string}){
 const open=useContext(MeetingContext);return <button className={className} onClick={()=>open(area)}>{children}</button>
}
const navigation=[['Hakkında','/hakkinda'],['Çalışma Alanları','/calisma-alanlari'],['Yayınlar','/yayinlar'],['İletişim','/iletisim']];
export function SiteShell({children}:{children:ReactNode}){
 const [open,setOpen]=useState(false),[selected,setSelected]=useState(''),[mobile,setMobile]=useState(false),[demo,setDemo]=useState(false);
 const path=usePathname();
 useEffect(()=>{setMobile(false);setOpen(false);setDemo(false)},[path]);
 const launch=(area?:string)=>{setSelected(area||'');setOpen(true)};
 useEffect(()=>{
  const context=(document as unknown as {modelContext?:{registerTool:(tool:unknown,options:unknown)=>void}}).modelContext;
  if(!context?.registerTool)return;const lifecycle=new AbortController();
  try{void Promise.resolve(context.registerTool({name:'start_meeting_request',title:'Görüşme iletişimini aç',description:'Görüşme tercihleri penceresini açar; mesaj göndermez veya randevu oluşturmaz.',inputSchema:{type:'object',properties:{area:{type:'string',enum:areas.map(a=>a.title)}},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:(input:unknown)=>{
   const data=input as {area?:unknown};if(!data||typeof data!=='object'||Object.keys(data).some(k=>k!=='area')||(data.area!==undefined&&!areas.some(a=>a.title===data.area)))throw new Error('Geçersiz çalışma alanı');
   launch(data.area as string|undefined);return {opened:true,area:data.area||null,submitted:false};
  }},{signal:lifecycle.signal})).catch(e=>console.warn('Meeting tool unavailable',e))}catch(e){console.warn('Meeting tool unavailable',e)}return ()=>lifecycle.abort();
 },[]);
 return <MeetingContext.Provider value={launch}><DemoMeetingContext.Provider value={()=>setDemo(true)}>
  <a className="skip-link" href="#main">İçeriğe geç</a>
  <div className="topline"><div className="container top-inner"><span>İSTANBUL BAROSU <span className="topline-separator">·</span> SİCİL NO. {profile.barNumber}</span><a className="top-right top-phone" href={contact.mobileHref}><Phone size={13}/>{contact.mobile}</a></div></div>
  <header className="site-header"><div className="container header-inner">
   <Link href="/" className="wordmark" aria-label="Elif Öztürk ana sayfa"><span>ELİF ÖZTÜRK</span><small>AVUKAT</small></Link>
   <nav className="desktop-nav" aria-label="Ana menü">{navigation.map(([name,href])=><Link key={href} href={href} className={path.startsWith(href)?'active':''} aria-current={path.startsWith(href)?'page':undefined}>{name}</Link>)}</nav>
   <div className="header-actions"><MeetingButton className="button header-cta"><CalendarDays size={16}/><span className="header-label">Görüşme</span><span className="header-label-mobile">Randevu</span></MeetingButton>
    <Sheet open={mobile} onOpenChange={setMobile}><SheetTrigger asChild><button className="menu-toggle" aria-label="Menüyü aç"><Menu/></button></SheetTrigger>
     <SheetContent className="mobile-sheet"><SheetTitle className="wordmark">ELİF ÖZTÜRK</SheetTitle><SheetDescription>Avukatlık & Hukuki Danışmanlık</SheetDescription><nav>{navigation.map(([name,href])=><SheetClose asChild key={href}><Link href={href} aria-current={path.startsWith(href)?'page':undefined}>{name}</Link></SheetClose>)}</nav><button className="button primary" onClick={()=>{setMobile(false);launch()}}>Görüşme İçin İletişim</button><div className="mobile-contact-links"><a href={contact.mobileHref}><Phone size={18}/>{contact.mobile}</a><a href={whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>WhatsApp ile iletişim</a></div></SheetContent>
    </Sheet>
   </div>
  </div></header>
  {children}
  <footer className="site-footer"><div className="container footer-grid"><div><Link href="/" className="wordmark light"><span>ELİF ÖZTÜRK</span><small>AVUKAT</small></Link><p>İstanbul Barosu · Sicil {profile.barNumber}<br/>TBB Sicil {profile.unionNumber}</p></div><div><h3>Keşfedin</h3>{navigation.map(([name,href])=><Link key={href} href={href}>{name}</Link>)}</div><div><h3>Çalışma Alanları</h3>{areas.slice(0,4).map(a=><Link key={a.slug} href={'/calisma-alanlari/'+a.slug}>{a.title}</Link>)}</div><div className="footer-contact"><h3>İletişim</h3><a href={contact.mobileHref}>{contact.mobile}</a><a href={contact.officeHref}>{contact.office}</a><a href={"mailto:"+contact.email}>{contact.email}</a><p>{contact.address}</p><a href={whatsappHref} className="footer-whatsapp" target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/>WhatsApp ile iletişim</a></div></div>
   <div className="container footer-bottom"><span>© {new Date().getFullYear()} Av. Elif Öztürk</span><div><Link href="/gizlilik">Gizlilik ve Site Kullanımı</Link><Link href="/gizlilik#cerezler">Çerez Bilgileri</Link></div></div>
   <div className="container legal-note">Bu sitedeki içerikler genel bilgilendirme amaçlıdır. Somut bir olaya ilişkin hukuki görüş veya sonuç taahhüdü içermez.</div>
  </footer>
  {!open&&!mobile&&!demo&&<ContactWidget/>}
  <MeetingContactDialog open={open} onOpenChange={setOpen} initialArea={selected}/>
  <MeetingDialog open={demo} onOpenChange={setDemo} initialArea=""/>
 </DemoMeetingContext.Provider></MeetingContext.Provider>
}

const icons=[Users,BriefcaseBusiness,Building2,Landmark,Scale,FileText];
export function AreaGrid({limit=6}:{limit?:number}){
 return <div className="area-grid">{areas.slice(0,limit).map((area,i)=>{const Icon=icons[i];return <Link href={'/calisma-alanlari/'+area.slug} className="area-card" key={area.slug}><div className="area-top"><Icon size={27} strokeWidth={1.25}/><span>0{i+1}</span></div><h3>{area.title}</h3><p>{area.short}</p><span className="text-link">Detaylı bilgi <Plus size={15}/></span></Link>})}</div>
}
export function Articles({home=false}:{home?:boolean}){
 const [query,setQuery]=useState(''),[category,setCategory]=useState('Tümü');
 const list=articles.filter(a=>(category==='Tümü'||a.category===category)&&(a.title+' '+a.summary).toLocaleLowerCase('tr').includes(query.trim().toLocaleLowerCase('tr'))).slice(0,home?3:4);
 return <>{!home&&<div className="article-controls"><div className="search-box"><Search size={18}/><input aria-label="Yayınlarda ara" placeholder="Yayınlarda ara..." value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="filter-group">{['Tümü','HUKUKİ SÜREÇ','SÖZLEŞMELER','KİŞİSEL VERİLER'].map(c=><button key={c} className={category===c?'selected':''} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c==='Tümü'?c:c==='HUKUKİ SÜREÇ'?'Hukuki süreç':c==='SÖZLEŞMELER'?'Sözleşmeler':'Kişisel veriler'}</button>)}</div></div>}
 <div className={'article-grid '+(!home?'full':'')}>{list.map(a=><Link key={a.slug} href={'/yayinlar/'+a.slug} className="article-card"><div className="article-cover"><div className="cover-heading"><span>ELİF ÖZTÜRK</span><small>HUKUK NOTLARI</small></div><span className="cover-category">{a.category}</span><span className="cover-index">0{articles.indexOf(a)+1}</span></div><div className="article-meta"><span>{a.category}</span><span>{a.time}</span></div><h3>{a.title}</h3><p>{a.summary}</p><span className="text-link">Yazıyı okuyun <Plus size={15}/></span></Link>)}</div>
 {list.length===0&&<div className="empty-state"><Search/><h3>Bu aramada yayın bulunamadı.</h3><p>Başka bir kelime deneyebilir veya filtreleri temizleyebilirsiniz.</p><button className="button secondary" onClick={()=>{setQuery('');setCategory('Tümü')}}>Filtreleri temizle</button></div>}</>
}
export function Faq(){return <Accordion type="single" collapsible className="faq-list">{faqs.map(([q,a],i)=><AccordionItem key={q} value={'faq-'+i}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion>}
export function ContactBand(){return <section className="contact-band"><div className="container contact-band-inner"><div><span className="eyebrow">BİRLİKTE DEĞERLENDİRELİM</span><h2>Görüşme ve iletişim.</h2><p>Görüşme yöntemi ve randevu planlaması için iletişim bilgileri.</p></div><div className="contact-band-actions"><MeetingButton className="button ivory"><CalendarDays size={18}/>Görüşme İçin İletişim</MeetingButton><a href={contact.mobileHref} className="contact-band-phone"><Phone size={16}/>{contact.mobile}</a></div></div></section>}
export function HomePage(){
 return <main id="main">
  <section className="hero"><div className="container hero-grid"><div className="hero-copy">
    <div className="hero-overline"><span className="eyebrow"><span className="small-line"/>AVUKATLIK & HUKUKİ DANIŞMANLIK</span></div>
    <div className="hero-intro">İstanbul Barosu · Arnavutköy</div>
    <h1>Elif <em>Öztürk</em><span className="hero-title">Avukat</span></h1>
    <p>Hukuki konuların dikkatle değerlendirildiği,<br className="desktop-break"/> açık iletişime dayanan bir çalışma yaklaşımı.</p>
    <div className="hero-buttons"><MeetingButton><CalendarDays size={18}/>Görüşme İçin İletişim</MeetingButton><Link href="/calisma-alanlari" className="button secondary">Çalışma Alanları</Link></div>
    <div className="hero-registration"><div><span>BARO SİCİL NO.</span><strong>{profile.barNumber}</strong></div><div><span>TBB SİCİL NO.</span><strong>{profile.unionNumber}</strong></div><Link href="/hakkinda" className="hero-profile-link">Mesleki bilgiler <Plus size={16}/></Link></div>
  </div><div className="hero-visual"><img src="/adalet-terazisi.webp" alt="Lacivert fonda dengeli pirinç adalet terazisi" width={1122} height={1402} fetchPriority="high"/><div className="image-label"><span>MESLEKİ YAKLAŞIM</span><strong>Özenli değerlendirme.<br/>Açık iletişim.</strong></div></div></div></section>
  <div className="principle-strip"><div className="container principles"><span><ShieldCheck/>Gizlilik</span><span><FileText/>Dikkatli inceleme</span><span><Users/>Açık iletişim</span><span><Scale/>Mesleki sorumluluk</span></div></div>
  <section className="section container" id="alanlar"><div className="section-heading"><div><span className="eyebrow">ÇALIŞMA ALANLARI</span><h2>Hukuki çalışma<br/><em>alanları.</em></h2></div><p>Hukuki konuların kapsamı, mevcut belgeler ve somut olayın koşulları birlikte değerlendirilir.</p></div><AreaGrid/><p className="section-footnote">Bu başlıklar uzmanlık unvanı ifade etmez. Her hukuki konu kendi koşulları içinde ele alınır.</p></section>
  <section className="about-home"><div className="container about-grid"><div className="about-heading"><span className="eyebrow">MESLEKİ KİMLİK</span><h2>Av. Elif Öztürk.<br/><em>İstanbul Barosu.</em></h2><Link className="button quiet-light" href="/hakkinda">Hakkında ve mesleki bilgiler</Link></div><div className="about-copy"><p className="lead">Hukuki bir değerlendirme,<br/>önce konuyu anlamakla başlar.</p><p>Olayların, belgelerin ve ilgili hukuki çerçevenin birlikte incelenmesi; çalışma kapsamının ve izlenebilecek adımların açıkça konuşulması esastır.</p><div className="about-values"><div><span>01 · İNCELEME</span><h3>Konunun bütünü</h3><p>Olaylar, önemli tarihler ve ilgili belgeler.</p></div><div><span>02 · İLETİŞİM</span><h3>Çalışmanın kapsamı</h3><p>Görüşme, yöntem ve sonraki adımlar.</p></div></div></div></div></section>
  <section className="section container process-section"><div className="section-heading"><div><span className="eyebrow">GÖRÜŞME ÖNCESİ</span><h2>İlk görüşme için<br/><em>hazırlık.</em></h2></div><Link href="/yayinlar/ilk-avukat-gorusmesine-hazirlik" className="text-link">Hazırlık notlarını okuyun <Plus size={16}/></Link></div><div className="process-grid">{[['İletişime geçin','Telefon, WhatsApp veya e-posta üzerinden görüşme planlaması yapın.'],['Belgeleri hazırlayın','İlgili belgeleri, tebligatları ve önemli tarihleri düzenleyin.'],['Konuyu değerlendirin','Görüşmede olayların bütününü ve hukuki çerçeveyi ele alın.'],['Kapsamı belirleyin','Çalışma koşulları ve sonraki adımlar ayrıca değerlendirilir.']].map(([title,body],i)=><div className="process-item" key={title}><div className="process-marker"><span className="process-number">0{i+1}</span><span className="process-line"/></div><h3>{title}</h3><p>{body}</p></div>)}</div></section>
  <section className="publications-home"><div className="container section"><div className="section-heading"><div><span className="eyebrow">BİLGİLENDİRME</span><h2>Görüşme öncesi<br/><em>notlar.</em></h2></div><Link href="/yayinlar" className="text-link">Tüm notlar <Plus size={16}/></Link></div><Articles home/></div></section>
  <section className="section container faq-section"><div><span className="eyebrow">SIK SORULAN SORULAR</span><h2>Görüşme<br/><em>hakkında.</em></h2><p>İletişim ve görüşme öncesine<br/>ilişkin temel bilgiler.</p></div><Faq/></section><ContactBand/>
 </main>
}
export function PageHeading({label,title,description}:{label:string;title:string;description?:string}){return <section className="page-heading"><div className="container"><div className="breadcrumb"><Link href="/">Ana Sayfa</Link><span>/</span><span>{label}</span></div><div className="page-heading-content"><div><span className="eyebrow">{label.toLocaleUpperCase('tr')}</span><h1>{title}</h1>{description&&<p>{description}</p>}</div><span className="page-heading-line" aria-hidden="true"/></div></div></section>}

function MeetingDialog({open,onOpenChange,initialArea}:{open:boolean;onOpenChange:(b:boolean)=>void;initialArea:string}){
 const [step,setStep]=useState(1),[area,setArea]=useState(''),[mode,setMode]=useState('online'),[date,setDate]=useState(''),[time,setTime]=useState(''),[consent,setConsent]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(''),[saved,setSaved]=useState('');
 const [name,setName]=useState(''),[email,setEmail]=useState(''),[phone,setPhone]=useState('');
 useEffect(()=>{if(open){setStep(1);setArea(initialArea);setSaved('');setError('');setConsent(false)}},[open,initialArea]);
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 async function send(e:React.FormEvent){e.preventDefault();setError('');if(!consent){setError('Lütfen bilgilendirme metnini okuyup onaylayın.');return}setBusy(true);
  try{const res=await fetch('/api/randevu',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,phone,area,mode,date,time,consent})});const data=await res.json() as {id?:string;error?:string};if(!res.ok)throw new Error(data.error||'Talep kaydedilemedi.');setSaved(data.id!);setStep(3)}catch(e){setError(e instanceof Error?e.message:'Bir bağlantı sorunu oluştu. Tekrar deneyin.')}finally{setBusy(false)}
 }
 return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="meeting-dialog"><DialogTitle>{step===3?'Talebiniz kaydedildi':'Bir görüşme planlayalım'}</DialogTitle><DialogDescription>{step===3?'Görüşme talebiniz kayıt altına alındı.':'Konunuzu ve uygun olduğunuz zamanı paylaşın.'}</DialogDescription>
 {step<3&&<><div className="step-indicator"><span className={step===1?'current':''}>01 · Görüşme</span><span className={step===2?'current':''}>02 · İletişim</span></div><div className="preview-notice">Ön izleme sürümü: lütfen yalnızca test bilgileri kullanın.</div></>}
 {step===1&&<form className="meeting-form" onSubmit={e=>{e.preventDefault();if(!area||!date||!time){setError('Lütfen konu, tarih ve saat seçin.');return}if(date<today){setError('Geçmiş bir tarih seçilemez.');return}setStep(2);setError('')}}><label>Görüşme konusu<Select value={area} onValueChange={setArea}><SelectTrigger aria-label="Görüşme konusu" className="form-select"><SelectValue placeholder="Çalışma alanını seçin"/></SelectTrigger><SelectContent>{areas.map(a=><SelectItem value={a.title} key={a.slug}>{a.title}</SelectItem>)}<SelectItem value="Diğer">Diğer / Emin değilim</SelectItem></SelectContent></Select></label>
 <label>Görüşme yöntemi<Select value={mode} onValueChange={setMode}><SelectTrigger className="form-select" aria-label="Görüşme yöntemi"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="online">Online görüşme</SelectItem><SelectItem value="office">Ofis görüşmesi</SelectItem></SelectContent></Select></label>
 <div className="form-row"><label>Tercih ettiğiniz tarih<input type="date" required min={today} max="2030-12-31" value={date} onChange={e=>setDate(e.target.value)}/></label><label>Tercih ettiğiniz saat<Select value={time} onValueChange={setTime}><SelectTrigger className="form-select" aria-label="Tercih ettiğiniz saat"><SelectValue placeholder="Saat seçin"/></SelectTrigger><SelectContent>{['09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00'].map(t=><SelectItem value={t} key={t}>{t}</SelectItem>)}</SelectContent></Select></label></div><p className="form-note">Bu saatler bir tercih bildirir. Randevu, ayrıca teyit edildiğinde kesinleşir.</p>{error&&<p role="alert" className="form-error">{error}</p>}<button className="button primary" type="submit">İletişim bilgilerine geç</button></form>}
 {step===2&&<form className="meeting-form" onSubmit={send}><div className="meeting-summary"><CalendarDays size={18}/><span>{date} · {time}<br/><small>{area} · {mode==='online'?'Online':'Ofis'}</small></span><button type="button" onClick={()=>setStep(1)}>Değiştir</button></div><label>Adınız ve soyadınız<input autoComplete="name" value={name} onChange={e=>setName(e.target.value)} required minLength={3} maxLength={100} placeholder="Ad Soyad"/></label><div className="form-row"><label>E-posta adresiniz<input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={180} placeholder="ad@ornek.com"/></label><label>Telefon numaranız<input type="tel" autoComplete="tel" value={phone} onChange={e=>setPhone(e.target.value)} required minLength={10} maxLength={25} placeholder="05XX XXX XX XX"/></label></div>
 <div className="consent-row"><Checkbox id="meeting-consent" checked={consent} onCheckedChange={v=>setConsent(v===true)}/><label htmlFor="meeting-consent">Ön izleme bilgilendirmesini okudum. Yalnızca test bilgileri kullanıyorum. <Link href="/gizlilik" target="_blank">Gizlilik ve aydınlatma</Link></label></div>{error&&<p role="alert" className="form-error">{error}</p>}<button className="button primary" disabled={busy} type="submit">{busy?'Kaydediliyor…':'Görüşme talebini gönder'}</button><p className="form-note">Form gönderimi, avukatlık ilişkisi veya kesinleşmiş randevu oluşturmaz.</p></form>}
 {step===3&&<div className="success-state"><div className="success-icon"><Check/></div><h3>Görüşme talebiniz alındı.</h3><p>{date} · {time}<br/>{area} · {mode==='online'?'Online görüşme':'Ofis görüşmesi'}</p><div className="reference">Talep numarası: <strong>{saved}</strong></div><p className="form-note">Randevu henüz kesinleşmedi. Bu ön izleme sürümünde e-posta veya SMS bildirimi gönderilmez.</p><button className="button primary" onClick={()=>onOpenChange(false)}>Tamam</button></div>}
 </DialogContent></Dialog>
}
