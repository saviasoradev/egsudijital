# EGSU – öğrenilenler

- Site statik (GitHub Pages). İçerik `data/site.json` içinde, sayfalar `yonetim/render.js` ile üretilir. Elle `index.html` düzenlemeyin; `_src/site.css`, `_src/site.js` ve `data/site.json` değiştirip `node build.js` çalıştırın.
- Yönetim paneli `/yonetim/`: GitHub ince ayarlı erişim anahtarı (sadece egsudijital, Contents okuma/yazma) ile giriş, tek commit ile sayfaları, veriyi ve görselleri gönderir. Şifre kodda yok, anahtar kullanıcının tarayıcısında.
- Hız: LCP önyükleme ekranı yüzünden gecikiyordu. Önyükleyici telefonda ve aynı oturumdaki ikinci sayfada gösterilmiyor; hero metni ilk karede bulanık ama görünür boyanıyor (opacity 0 LCP'yi erteler).
- Kaydırma kodunda önce tüm ölçümler, sonra tüm yazmalar yapılır (zorunlu yeniden düzenleme uyarısı).
- Syne çok geniş: büyük başlıklarda dar ekranda taşmayı kontrol et (Referanslar başlığı 7.6vw).
- GitHub Pages önbellek süresi 10 dk, değiştirilemez (Lighthouse "verimli önbellek" uyarısı bu yüzden kalır).
