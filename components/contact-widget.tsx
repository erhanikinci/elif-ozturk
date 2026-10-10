'use client';
import {useState} from 'react';
import Link from 'next/link';
import {MessageCircle,Phone,X,UserRound,MapPin} from 'lucide-react';
import {Popover,PopoverTrigger,PopoverContent} from '@/components/ui/popover';
import {contact,whatsappHref} from '@/lib/contact';

export function ContactWidget(){
 const [open,setOpen]=useState(false);
 return <div className="floating-contact"><Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild><button className="contact-launcher" aria-label={open?'İletişim kutusunu kapat':'WhatsApp ve telefon iletişim seçeneklerini aç'}>{open?<X size={21}/>:<MessageCircle size={23} strokeWidth={1.6}/>}<span>WhatsApp İletişim</span></button></PopoverTrigger>
  <PopoverContent side="top" align="end" sideOffset={14} collisionPadding={12} className="contact-popover" aria-labelledby="contact-widget-title">
   <div className="contact-widget-heading"><div><span>RANDEVU & İLETİŞİM</span><h2 id="contact-widget-title">Bir görüşmeyle<br/>başlayalım.</h2><p>Görüşme ve randevu talepleriniz için iletişime geçebilirsiniz.</p></div><button className="contact-widget-close" onClick={()=>setOpen(false)} aria-label="İletişim kutusunu kapat"><X size={18}/></button></div>
   <div className="contact-widget-body"><div className="contact-person"><span className="person-icon"><UserRound size={24} strokeWidth={1.25}/></span><div><span>AVUKAT</span><h3>Elif Öztürk</h3><p>Arnavutköy, İstanbul</p></div></div>
    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="button whatsapp-button"><MessageCircle size={19}/>WhatsApp ile yazın</a>
    <a href={contact.mobileHref} className="widget-phone-link"><Phone size={19}/><span>Telefonla arayın<strong>{contact.mobile}</strong></span></a>
    <div className="widget-office"><span>Ofis telefonu</span><a href={contact.officeHref}>{contact.office}</a></div>
    <Link className="widget-details" href="/iletisim" onClick={()=>setOpen(false)}><MapPin size={15}/>Adres ve tüm iletişim bilgileri</Link>
   </div>
  </PopoverContent>
 </Popover></div>
}
