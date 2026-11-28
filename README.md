# Maliyyə

Şəxsi və biznes maliyyə idarəetməsi: gəlir/xərc, hesablar, borclar, büdcə, təqvim, planlayıcı, abunəliklər, sənəd arxivi və PIN ilə qorunan seyf.

Tətbiq tək fayllı PWA-dır (`index.html`). Məlumatlar telefonda (IndexedDB) saxlanılır. İstəyə bağlı olaraq şifrəli bulud nüsxəsi, çek oxuma (OCR) və sərbəst AI Cloudflare Worker üzərindən işləyir.

## Fayllar

- `index.html` — bütün tətbiq
- `sw.js` — oflayn keş və yeniləmə
- `manifest.webmanifest` — quraşdırma məlumatı və qısayollar
- `icon-192.png`, `icon-512.png` — ikonlar
- `worker.js` — bulud nüsxəsi, çek oxuma və AI üçün server hissəsi
- `wrangler.jsonc` — Cloudflare qurulum ayarları (KV, AI, statik fayllar)

## Cloudflare-də qurulum

1. Workers & Pages → KV bölməsində yeni namespace yarat.
2. `wrangler.jsonc`-də `BAK` binding-inin həmin namespace-ə bağlı olduğunu yoxla.
3. Workers AI aktiv olmalıdır (`AI` binding).
4. Production üçün Deploy command: `npx wrangler deploy`

## Vacib qeydlər

- Bulud nüsxəsi açarı (bərpa açarı) yalnız sənin cihazında saxlanılır. İtsə, bulud nüsxəsini heç kim aça bilməz. Açarı təhlükəsiz yerdə saxla.
- Şəkil və sənədlər də nüsxəyə daxildir. Bulud nüsxəsi təxminən 24 MB limitinə yaxınlaşanda Ayar bölməsində xəbərdarlıq görünür.
- Telefon itərsə və ya brauzer məlumatı silinərsə, yalnız fayl nüsxəsi və ya bulud nüsxəsi ilə bərpa mümkündür. Ayar → Fayl nüsxəsi ilə müntəzəm nüsxə al.
- Sıfırla funksiyası hər dəyişiklikdən əvvəl tam arxiv yaradır. Arxivdən geri qaytarmaq olar.

## Yeniləmə

Yeni `index.html` yükləndikdən sonra tətbiqi 2 dəfə aç ki, yeni versiya tətbiq olunsun.
