import { contact } from './contact';

export type MeetingPreference = {
  area: string;
  mode: 'office' | 'online';
  date: string;
  time: string;
};

export function istanbulToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const value = (key: string) => parts.find(p => p.type === key)?.value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function preferenceError(data: MeetingPreference, today: string) {
  if (data.date) {
    const date = new Date(data.date + 'T12:00:00Z');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== data.date) return 'Lütfen geçerli bir tarih belirtin.';
    if (data.date < today) return 'Tercihiniz için bugün veya ileri bir tarih seçin.';
  }
  if (data.time && !data.date) return 'Saat tercihi belirtmek için önce bir tarih seçin.';
  if (data.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.time)) return 'Lütfen geçerli bir saat belirtin.';
  return '';
}

export function meetingMessage(data: MeetingPreference) {
  const topic = data.area === 'Genel görüşme' ? 'bir hukuki konu' : data.area;
  const method = data.mode === 'online' ? 'online' : 'ofiste';
  const when = data.date ? ` Tercih ettiğim tarih ${data.date.split('-').reverse().join('.')}${data.time ? `, saat ${data.time}` : ''}.` : '';
  return `Merhaba Av. Elif Öztürk, ${topic} hakkında ${method} görüşme planlamak istiyorum.${when} Uygunluğunuz hakkında bilgi verebilir misiniz?`;
}

export function meetingLinks(data: MeetingPreference) {
  const message = meetingMessage(data);
  return {
    whatsapp: `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`,
    email: `mailto:${contact.email}?subject=${encodeURIComponent('Görüşme talebi')}&body=${encodeURIComponent(message)}`,
  };
}
