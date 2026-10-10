export const contact = {
 name: 'Av. Elif Öztürk',
 mobile: '0533 424 11 89',
 mobileHref: 'tel:+905334241189',
 office: '0212 597 00 10',
 officeHref: 'tel:+902125970010',
 email: 'elifozturkch@gmail.com',
 address: 'Arnavutköy Merkez Mah. Sultan Murat Sk. Park Ofis No: 27 Daire: 2, Arnavutköy / İstanbul',
 whatsappNumber: '905334241189'
};
export const whatsappHref = 'https://wa.me/' + contact.whatsappNumber + '?text=' +
 encodeURIComponent('Merhaba Av. Elif Öztürk, görüşme ve randevu talebim hakkında iletişime geçmek istiyorum.');
export const mapHref = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(contact.address);
