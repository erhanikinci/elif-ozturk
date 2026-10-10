# Av. Elif Öztürk — GitHub ve Cloudflare yayını

Bu paket, önceki tam site tasarımının adalet terazisi görseliyle bağımsız Cloudflare Workers sürümüdür. WhatsApp paneli, telefon/e-posta, görüşme tercihleri, dört yayın ve SSS aktiftir. Görüşme tercihleri WhatsApp veya e-posta için mesaj taslağı hazırlar; gönderimi ziyaretçi kendi uygulamasında tamamlar. Hedef adres `https://elifozturk.av.tr` olarak ayarlanmıştır; alan adı satın alınmış veya bağlanmış değildir. Eski Sites deneme yönetimi, test kayıtları ve ChatGPT oturumu harici yayına aktarılmaz; Sites önizlemesinde korunur. Arama motoru indeksleme ayarı önceki sürümdeki gibi korunmuştur.

## 1. Bilgisayarında çalıştır

Node.js 24.19.0 ve pnpm 11.25.0 ile hazırlanmıştır. VSCode'da `package.json` bulunan klasörü aç:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Adres: `http://localhost:5174`. Port doluysa `pnpm dev --port 5175` kullan. Yayın öncesi kontrol:

```sh
pnpm typecheck
pnpm build
pnpm deploy:check
```

Son komut yerel paket kontrolüdür; siteyi yayımlamaz. Linux ortamında mevcut kilitli bağımlılıklarla kontrol edilmiştir. Yeni bilgisayarda ilk kurulum ve Cloudflare hesabındaki ilk yayın ayrıca doğrulanmalıdır.

## 2. Mevcut GitHub depoya aktar

Önce deponun doğru Elif Öztürk projesi olduğunu doğrula. Depoda başka işler veya kaydedilmemiş değişiklikler varsa yedekle; eski klasörü doğrudan silme. Boş veya bu siteye ayrılmış depoyu VSCode'un **Git: Clone** komutuyla bilgisayarına klonla. ZIP içindeki `elif-ozturk` klasörünün içeriğini klonun içine aktar; `package.json` kökte olmalı.

Mevcut depoda eski proje varsa bu paketi ayrı bir `site` klasörüne koyabilirsin. Cloudflare kök dizin ayarını o zaman `site` yap. Bu yöntem eski kaynakları korur. Harici yayına yalnızca bu paket bağlanmalı; eski yönetim veya API dosyalarını bu pakete karıştırma.

VSCode **Source Control** ekranında değişiklikleri incele, commit oluştur ve GitHub'a gönder. Depo dalının adını kontrol et; aşağıdaki kurulum `main` varsayar. Zorla gönderim (`push --force`) kullanma. `node_modules`, `dist`, `.env` veya hesap anahtarlarını depoya koyma.

## 3. Cloudflare ile otomatik yayın

Kendi Cloudflare hesabında **Workers & Pages** bölümünden GitHub deposunu bağlayan Worker oluşturma akışını aç. Cloudflare GitHub uygulamasına yalnızca bu depoya erişim ver. ChatGPT'nin GitHub bağlantısı, Cloudflare'nin GitHub yetkilendirmesinden ayrıdır.

| Ayar | Değer |
| --- | --- |
| Worker adı | `elif-ozturk` |
| Production branch | `main` veya gerçek ana dalın |
| Root directory | `package.json` bulunan dizin; kökteyse boş/`.` |
| Build command | `pnpm typecheck && pnpm build` |
| Deploy command | `pnpm deploy` |
| Build variable: `NODE_VERSION` | `24.19.0` |
| Build variable: `PNPM_VERSION` | `11.25.0` |

Cloudflare'nin otomatik bağımlılık kurulumunu açık bırak. Worker adı, `wrangler.jsonc` içindeki adla aynı olmalı. Üretim dışı dalların önizlemesini etkinleştirirsen preview deploy komutu `pnpm exec wrangler versions upload --config dist/server/wrangler.json` olabilir; üretim `pnpm deploy` komutunu bu dallara verme.

İlk derleme başarılı olduğunda Cloudflare'nin verdiği `workers.dev` adresinde sayfaları, telefon/e-posta bağlantılarını ve mobil menüyü dene. Ardından ana dala gönderdiğin her commit için Cloudflare yeni sürümü otomatik derleyip yayımlar. Kurulum tamamlanana kadar bu otomasyon aktif değildir. Hatalı derleme günlüğünü Cloudflare **Deployments/Builds** bölümünden incele.

Kaynaklar: [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/), [Build configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/), [Build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/).

## 4. elifozturk.av.tr alan adını al ve bağla

`.av.tr` belgeli tahsis kapsamındadır. TRABIS'in güncel listesine göre bireysel başvuruda avukatın kayıtlı olduğu barodan alınmış güncel belge veya noter onaylı sureti istenir. Elindeki ruhsatın tek başına yeterli olduğunu varsayma; başvuracağın kayıt kuruluşunun belge listesini doğrula. Ücret, müsaitlik ve satın alma işlemi bu paketin kapsamında tamamlanmış değildir. [TRABIS — Belgeli alan adları](https://www.trabis.gov.tr/content/Belgeli).

Alan adını aldıktan sonra Cloudflare hesabına `elifozturk.av.tr` alan adını ekle. Cloudflare'nin sana özel verdiği nameserver adreslerini kayıt kuruluşunda ayarla. Önceden e-posta kullanıyorsan MX/TXT kayıtlarını koru. Zone durumu **Active** olduktan sonra `wrangler.jsonc` içindeki `routes` alanını şöyle güncelle:

```json
"routes": [
  {"pattern": "elifozturk.av.tr", "custom_domain": true},
  {"pattern": "www.elifozturk.av.tr", "custom_domain": true}
]
```

Değişikliği ana dala gönder. Cloudflare Custom Domains alan adını Worker'a bağlar ve gerekli DNS/sertifika işlemlerini yönetir. `www` adresini Worker kalıcı olarak ana adrese yönlendirir. Cloudflare panelinde **Settings → Domains & Routes** bölümünden iki alan adının ve SSL sertifikasının durumunu kontrol et. Elle tahmini IP kaydı oluşturma. Panelden eklediğin alan adlarını da `wrangler.jsonc` ile eşleştir; kaynakta boş `routes` bırakma.

Kaynak: [Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

## 5. Sonraki güncellemeler

| İçerik | Dosya |
| --- | --- |
| Telefon, e-posta, adres | `lib/contact.ts` |
| Sicil ve mesleki bilgiler | `lib/profile.ts` |
| Ana sayfa | `app/page.tsx` |
| Çalışma alanları | `lib/content.ts`, `app/calisma-alanlari/` |
| Genel görünüm | `app/globals.css`, `components/law-site.tsx` |
| Gizlilik açıklaması | `app/gizlilik/page.tsx` |

Değişiklik yap → `pnpm typecheck` ve `pnpm build` çalıştır → commit oluştur → ana dala gönder → Cloudflare yayınını kontrol et. Buradaki Sites sürümünde yaptığın değişiklikler kendi GitHub depona kendiliğinden aktarılmaz; kendi depona kaydedip gönderdiğin değişiklikler otomatik yayımlanır.

Görüşme akışı sunucuda rezervasyon veya kayıt oluşturmaz; tarih ve saat ayrıca teyit edilir. `/api/randevu` eski Sites deneme formuna aittir; harici yayında ana görüşme akışı bu uç noktayı kullanmaz. Arama motoru indekslemesi için hem `app/layout.tsx` robots metadata'sı hem `public/robots.txt` birlikte değerlendirilmelidir.

Bir güncelleme sorun çıkarırsa Cloudflare'nin önceki başarılı sürümüne dön; sonra GitHub'da hatalı commit'i geri alan yeni bir commit gönder. Böylece sonraki otomatik yayın düzeltmeyi korur.

## Yayında doğrula

- Ana sayfa, hakkımda, altı çalışma alanı, dört yayın, iletişim ve gizlilik sayfaları açılıyor.
- Mobil menü, klavye ile gezinme ve telefon/e-posta bağlantıları çalışıyor.
- HTTPS aktif; `www` ana adrese yönleniyor.
- WhatsApp paneli, görüşme tercihleri ve mesaj taslakları çalışıyor; mesajı kullanıcı gönderiyor.
- `/yonetim` ve `/api/randevu` Sites'e ait test uçlarıdır; harici yayında kullanılmıyor.
- Son gönderilen commit Cloudflare'de başarılı görünüyor.
- Mesleki bilgiler ve gizlilik açıklaması site sahibi tarafından gözden geçirildi.
