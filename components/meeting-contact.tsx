"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { areas } from '@/lib/content';
import { contact } from '@/lib/contact';
import { istanbulToday, meetingLinks, meetingMessage, preferenceError, type MeetingPreference } from '@/lib/meeting';

export function MeetingContactDialog({ open, onOpenChange, initialArea }: { open: boolean; onOpenChange: (value: boolean) => void; initialArea: string }) {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState('Genel görüşme');
  const [mode, setMode] = useState<'office' | 'online'>('office');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    setStep(1); setArea(initialArea || 'Genel görüşme'); setMode('office'); setDate(''); setTime(''); setError('');
  }, [open, initialArea]);
  const today = istanbulToday();
  const data: MeetingPreference = { area, mode, date, time };
  const links = meetingLinks(data);
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="meeting-dialog contact-meeting-dialog">
      <span className="eyebrow">AV. ELİF ÖZTÜRK · İLETİŞİM</span>
      <DialogTitle>{step === 1 ? 'Görüşme için iletişim.' : 'Tercihlerinizi iletin.'}</DialogTitle>
      <DialogDescription>{step === 1 ? 'Görüşme tercihinizi belirleyip telefon, WhatsApp veya e-posta üzerinden iletişime geçebilirsiniz.' : 'Hazırlanan mesajı seçtiğiniz uygulamada inceleyip gönderebilirsiniz.'}</DialogDescription>
      <div className="step-indicator" aria-label={`Adım ${step} / 2`}><span className={step === 1 ? 'current' : ''}>01 · Tercihleriniz</span><span className={step === 2 ? 'current' : ''}>02 · İletişim kanalı</span></div>
      {step === 1 ? <form className="meeting-form" onSubmit={event => {
        event.preventDefault();
        const problem = preferenceError(data, today); setError(problem);
        if (!problem) setStep(2);
      }}>
        <label>Görüşme konusu<Select value={area} onValueChange={setArea}><SelectTrigger className="form-select" aria-label="Görüşme konusu"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Genel görüşme">Genel görüşme / Emin değilim</SelectItem>{areas.map(item => <SelectItem key={item.slug} value={item.title}>{item.title}</SelectItem>)}</SelectContent></Select></label>
        <label>Görüşme tercihi<Select value={mode} onValueChange={value => setMode(value as 'office' | 'online')}><SelectTrigger className="form-select" aria-label="Görüşme tercihi"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="office">Ofis görüşmesi</SelectItem><SelectItem value="online">Online görüşme</SelectItem></SelectContent></Select></label>
        <div className="form-row"><label>Tarih <span className="optional-label">İsteğe bağlı</span><input type="date" min={today} value={date} onChange={event => setDate(event.target.value)} /></label><label>Saat <span className="optional-label">İsteğe bağlı</span><input type="time" value={time} onChange={event => setTime(event.target.value)} /></label></div>
        <p className="form-note">Tarih ve saat bir tercih bildirir; müsaitlik gösterimi veya kesin rezervasyon değildir.</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button primary" type="submit">İletişim kanalını seçin</button>
      </form> : <div className="meeting-form">
        <div className="meeting-draft"><span className="eyebrow">MESAJ TASLAĞINIZ</span><p>{meetingMessage(data)}</p><button className="text-link" type="button" onClick={() => setStep(1)}>Tercihleri düzenleyin</button></div>
        <a className="button whatsapp-button" href={links.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />WhatsApp'ta aç</a>
        <a className="button secondary" href={links.email}><Mail size={18} />E-posta uygulamasında aç</a>
        <p className="form-note" role="status">Mesaj henüz gönderilmedi. Gönderimi açılan uygulamada tamamlarsınız. Görüşme tarihi ayrıca teyit edilir.</p>
      </div>}
      <a className="dialog-phone" href={contact.mobileHref}><Phone size={17} /><span>Telefonla iletişim<strong>{contact.mobile}</strong></span></a>
      <div className="dialog-privacy"><ShieldCheck size={16} /><p>Bu tercihler siteye kaydedilmez. İlk mesajınıza kimlik numarası, dava ayrıntısı veya belge eklemeyin. <Link href="/gizlilik" onClick={() => onOpenChange(false)}>Gizlilik bilgileri</Link></p></div>
    </DialogContent>
  </Dialog>;
}
