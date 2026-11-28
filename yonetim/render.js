(function (root) {
  var SITE = 'https://egsudijital.com';
  var FONT = 'https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap';

  var ICONS = {
    check: '<polyline points="20 6 9 17 4 12"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    monitor: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8M12 18v3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8 11h6M11 8v6"/>',
    chart: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11v6M14 14h6"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    layout: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
    support: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m4.9 4.9 4.3 4.3M14.8 14.8l4.3 4.3M14.8 9.2l4.3-4.3M4.9 19.1l4.3-4.3"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'
  };
  var ICON_NAMES = {
    check: 'Onay işareti', lock: 'Kilit', phone: 'Telefon', calendar: 'Takvim', monitor: 'Ekran', search: 'Arama',
    chart: 'Yükselen grafik', pin: 'Konum', shield: 'Kalkan', clock: 'Saat', chat: 'Mesaj', users: 'Kişiler',
    trophy: 'Kupa', bolt: 'Şimşek', layout: 'Panel', support: 'Destek', cart: 'Sepet', star: 'Yıldız', mail: 'Zarf', globe: 'Dünya'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function icon(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.check) + '</svg>'; }
  function money(n) { return String(Math.round(+n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function digits(p) { return String(p || '').replace(/\D/g, ''); }
  function intl(p) { var d = digits(p); if (d.charAt(0) === '0') d = d.slice(1); if (d.indexOf('90') !== 0 || d.length === 10) d = '90' + d; return d; }
  function telHref(p) { return 'tel:+' + intl(p); }
  function telLd(p) { var d = intl(p); return '+' + d.slice(0, 2) + '-' + d.slice(2, 5) + '-' + d.slice(5, 8) + '-' + d.slice(8, 10) + '-' + d.slice(10); }
  function wa(data, text) { return 'https://wa.me/' + intl(data.contact.whatsapp) + (text ? '?text=' + encodeURIComponent(text) : ''); }
  function slug(s) {
    var m = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'İ': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'Ç': 'c', 'Ğ': 'g', 'Ö': 'o', 'Ş': 's', 'Ü': 'u' };
    return String(s || '').replace(/[çğıİöşüÇĞÖŞÜ]/g, function (c) { return m[c]; }).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'x';
  }
  function ldJson(o) { return JSON.stringify(o).replace(/</g, '\\u003c'); }
  function delay(i, step, base) { return ' style="--d:' + ((base || 0) + i * step).toFixed(2).replace(/0+$/, '').replace(/^0/, '') + 's"'; }

  function head(o) {
    var tag = /^(GTM|G|AW)-[A-Z0-9]+$/.test(o.tagId || '') ? o.tagId : '';
    var tagJs = tag ? '<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag(\'js\',new Date());' + (tag.indexOf('GTM-') === 0 ? '' : 'gtag(\'config\',\'' + tag + '\');') + '(function(){function l(){var s=document.createElement(\'script\');s.async=true;s.src=\'https://www.googletagmanager.com/' + (tag.indexOf('GTM-') === 0 ? 'gtm.js' : 'gtag/js') + '?id=' + tag + '\';document.head.appendChild(s)}if(document.readyState===\'complete\')setTimeout(l,1);else addEventListener(\'load\',function(){setTimeout(l,1)})})()</script>\n' : '';
    return '<!DOCTYPE html>\n<html lang="tr">\n<head>\n' + tagJs + '<meta charset="UTF-8">\n' +
      '<script>(function(h){h.classList.add(\'js\');if(window.matchMedia&&matchMedia(\'(prefers-reduced-motion: reduce)\').matches)h.classList.add(\'rm\');try{if(' + (o.pre ? 'innerWidth<=768||sessionStorage.getItem(\'egsu-pre\')' : 'true') + ')h.classList.add(\'nopre\');sessionStorage.setItem(\'egsu-pre\',\'1\')}catch(e){h.classList.add(\'nopre\')}})(document.documentElement)</script>\n' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<title>' + esc(o.title) + '</title>\n' +
      '<meta name="description" content="' + esc(o.description) + '">\n' +
      '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">\n' +
      '<link rel="canonical" href="' + o.url + '">\n' +
      '<link rel="alternate" hreflang="tr-TR" href="' + o.url + '">\n' +
      '<link rel="alternate" hreflang="x-default" href="' + o.url + '">\n' +
      '<meta name="author" content="EGSU">\n<meta name="theme-color" content="#0A132E">\n<meta name="format-detection" content="telephone=no">\n' +
      '<meta property="og:type" content="website">\n<meta property="og:locale" content="tr_TR">\n<meta property="og:site_name" content="EGSU">\n' +
      '<meta property="og:url" content="' + o.url + '">\n' +
      '<meta property="og:title" content="' + esc(o.shareTitle) + '">\n' +
      '<meta property="og:description" content="' + esc(o.shareDescription) + '">\n' +
      '<meta property="og:image" content="' + SITE + '/og-image.jpg?v=6">\n<meta property="og:image:secure_url" content="' + SITE + '/og-image.jpg?v=6">\n' +
      '<meta property="og:image:type" content="image/jpeg">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n' +
      '<meta property="og:image:alt" content="EGSU ana sayfası: kurumsal web sitesi tasarımı">\n' +
      '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:image" content="' + SITE + '/og-image.jpg?v=6">\n' +
      '<meta name="twitter:title" content="' + esc(o.shareTitle) + '">\n<meta name="twitter:description" content="' + esc(o.shareDescription) + '">\n' +
      '<link rel="icon" href="/favicon.ico" sizes="any">\n<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">\n' +
      '<link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n' +
      (o.preload || '') +
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
      '<link rel="preload" as="style" href="' + FONT + '">\n' +
      '<script>(function(){var l=document.createElement(\'link\');l.rel=\'stylesheet\';l.href=\'' + FONT + '\';document.head.appendChild(l)})();</script>\n' +
      '<noscript><link rel="stylesheet" href="' + FONT + '"></noscript>\n' +
      '<script type="application/ld+json">\n' + ldJson(o.ld) + '\n</script>\n' +
      '<style>\n' + o.css + '\n</style>\n</head>\n';
  }

  function gtmNs(data) { var t = data.seo.googleTagId || ''; return /^GTM-[A-Z0-9]+$/.test(t) ? '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=' + t + '" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>\n' : ''; }
  function navLinks(data, home) {
    var p = home ? '' : '/';
    var refs = '<a href="/referanslar/"' + (home ? '' : ' aria-current="page"') + '>' + esc(data.references.navLabel) + '</a>';
    return '<a href="' + p + '#hizmetler">Hizmetler</a><a href="' + p + '#paketler">Paketler</a><a href="' + p + '#fiyatlar">Fiyat listesi</a>' +
      (home ? '<a href="#surec">Süreç</a>' : '') + refs + '<a href="' + p + '#sss">Sorular</a>';
  }
  function header(data, home) {
    return '<header class="hdr" id="hdr">\n  <div class="wrap">\n    <nav class="bar" aria-label="Ana menü">\n' +
      '      <a href="' + (home ? '#top' : '/') + '" class="logo" aria-label="EGSU ana sayfa"><picture><source srcset="/logo.webp" type="image/webp"><img src="/logo.png" width="207" height="30" alt="EGSU"></picture></a>\n' +
      '      <div class="links" id="links">' + navLinks(data, home) + '<a href="' + (home ? '' : '/') + '#iletisim" class="btn btn-gold btn-sm" data-mag>Teklif al</a></div>\n' +
      '      <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="links">Menü</button>\n    </nav>\n  </div>\n</header>\n';
  }
  function footer(data, home) {
    var p = home ? '' : '/';
    var refs = '<a href="/referanslar/">' + esc(data.references.navLabel) + '</a>';
    return '<footer>\n  <div class="wrap">\n' +
      '    <picture><source srcset="/logo.webp" type="image/webp"><img class="f-mark" data-fx-mark src="/logo.png" width="441" height="64" alt="" loading="lazy" decoding="async"></picture>\n' +
      '    <div class="ft">\n      <a href="' + (home ? '#top' : '/') + '" class="logo" aria-label="EGSU ana sayfa"><picture><source srcset="/logo.webp" type="image/webp"><img src="/logo.png" width="207" height="30" alt="EGSU" loading="lazy"></picture></a>\n' +
      '      <nav aria-label="Alt menü"><a href="' + p + '#hizmetler">Hizmetler</a><a href="' + p + '#paketler">Paketler</a><a href="' + p + '#fiyatlar">Fiyat listesi</a>' + refs + '<a href="' + p + '#sss">Sorular</a><a href="' + p + '#iletisim">İletişim</a></nav>\n' +
      '      <p>' + esc(data.footer.copyright) + '</p>\n    </div>\n  </div>\n</footer>\n\n' +
      '<a href="' + esc(wa(data, data.contact.whatsappMessage)) + '" target="_blank" rel="noopener" class="float-wa" aria-label="WhatsApp ile yazın"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#wa"/></svg></a>\n\n' +
      '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">\n  <symbol id="wa" viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></symbol>\n</svg>\n';
  }

  function business(data) {
    var c = data.contact, s = data.seo;
    var areas = (s.cities || []).map(function (n) { return { '@type': 'City', name: n }; });
    areas.push({ '@type': 'Country', name: 'Türkiye' });
    return {
      '@type': ['ProfessionalService', 'LocalBusiness'], '@id': SITE + '/#isletme', name: 'EGSU',
      description: s.businessDescription, url: SITE + '/', logo: SITE + '/logo.png', image: SITE + '/og-image.jpg',
      telephone: c.phones[0] ? telLd(c.phones[0]) : undefined,
      contactPoint: c.phones.map(function (p, i) { return { '@type': 'ContactPoint', telephone: telLd(p), contactType: i ? 'sales' : 'customer service', areaServed: 'TR', availableLanguage: 'Turkish' }; }),
      email: c.email, priceRange: s.priceRange, currenciesAccepted: 'TRY',
      address: { '@type': 'PostalAddress', addressCountry: 'TR' }, areaServed: areas,
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: c.opens || '09:00', closes: c.closes || '18:00' }],
      knowsAbout: ['Web tasarım', 'Kurumsal web sitesi', 'E-ticaret sitesi', 'SEO', 'Google Ads', 'WordPress', 'Mobil uyumlu tasarım'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog', name: 'Web sitesi tasarım paketleri',
        itemListElement: data.packages.items.map(function (p) {
          return { '@type': 'Offer', name: p.name + ' web sitesi paketi', description: (p.extras ? p.listTitle + ' ' : '') + p.features.join(', ') + '.', price: String(p.price), priceCurrency: 'TRY', priceSpecification: { '@type': 'PriceSpecification', price: String(p.price), priceCurrency: 'TRY' }, itemOffered: { '@type': 'Service', name: p.name + ' web sitesi tasarımı', serviceType: 'Web tasarım' } };
        })
      }
    };
  }

  function renderHome(data, css, js, today) {
    var h = data.hero, c = data.contact;
    var groups = [];
    data.prices.rows.forEach(function (r) { if (r.group && r.group !== 'Hepsi' && groups.indexOf(r.group) < 0) groups.push(r.group); });
    var ld = {
      '@context': 'https://schema.org',
      '@graph': [
        business(data),
        { '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: 'EGSU', inLanguage: 'tr-TR', publisher: { '@id': SITE + '/#isletme' } },
        { '@type': 'WebPage', '@id': SITE + '/#sayfa', url: SITE + '/', name: data.seo.title, description: data.seo.description, inLanguage: 'tr-TR', isPartOf: { '@id': SITE + '/#site' }, about: { '@id': SITE + '/#isletme' }, dateModified: today, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.lead', '#kisaca .intro'] } },
        { '@type': 'FAQPage', '@id': SITE + '/#sss', mainEntity: data.faq.items.map(function (f) { return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }; }) }
      ]
    };
    var o = [];
    o.push(head({ tagId: data.seo.googleTagId, pre: true, title: data.seo.title, description: data.seo.description, shareTitle: data.seo.shareTitle, shareDescription: data.seo.shareDescription, url: SITE + '/', ld: ld, css: css,
      preload: '<link rel="preload" as="image" href="/logo.webp" type="image/webp" fetchpriority="high">\n' }));
    o.push('<body>\n' + gtmNs(data) + '<a class="skip" href="#icerik">İçeriğe geç</a>\n');
    o.push('<div id="pre" aria-hidden="true"><div class="cols"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="pl-in"><div class="lg"><img src="/logo.webp" width="441" height="64" alt="" fetchpriority="high"></div><div class="meta"><span class="bar"><i></i></span><span class="pct" id="pct">00</span></div></div></div>\n');
    o.push('<div id="prog" aria-hidden="true"></div>\n<div class="grain" aria-hidden="true"></div>\n\n');
    o.push(header(data, true));
    o.push('\n<main id="icerik">\n\n');

    o.push('<section class="hero" id="top" aria-labelledby="h1">\n  <div class="aurora-p" id="auroraP" aria-hidden="true"><div class="aurora"><i></i><i></i><i></i></div></div><span class="hline t" aria-hidden="true"></span><span class="hline b" aria-hidden="true"></span>\n  <div class="gridbg" aria-hidden="true"></div>\n  <div class="wrap">\n    <div>\n');
    o.push('      <p class="pill" data-r style="--d:.05s"><b></b>' + esc(h.pill) + '</p>\n');
    o.push('      <h1 id="h1" class="metal" data-split>' + esc(h.title) + '</h1>\n');
    o.push('      <p class="lead" data-r style="--d:.35s">' + esc(h.lead) + '</p>\n');
    o.push('      <div class="cta" data-r style="--d:.5s">\n        <a href="#paketler" class="btn btn-gold" data-mag>' + esc(h.button1) + '</a>\n        <a href="#iletisim" class="btn btn-ghost" data-mag>' + esc(h.button2) + '</a>\n      </div>\n    </div>\n\n');
    o.push('    <div data-r="scale" style="--d:.45s">\n      <div class="stage" id="stage">\n        <div class="tilt" id="tilt">\n');
    h.chips.slice(0, 4).forEach(function (ch, i) { o.push('          <span class="chip3d c' + (i + 1) + '" aria-hidden="true">' + icon(ch.icon) + esc(ch.text) + '</span>\n'); });
    o.push('          <div class="browser"><div class="browser-in">\n            <form class="chrome" id="urlform" role="search" aria-label="Site önizlemesi">\n              <div class="d" aria-hidden="true"><b></b><b></b><b></b></div>\n              <div class="addr">\n                <svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS.lock + '</svg>\n                <span aria-hidden="true">www.</span>\n                <label for="biz" class="sr-only">Firma adınızı yazın</label>\n                <input id="biz" maxlength="26" placeholder="firmanizinadi" autocomplete="organization" spellcheck="false">\n                <span aria-hidden="true">.com</span>\n              </div>\n            </form>\n');
    o.push('            <div class="page" aria-hidden="true">\n              <div class="p-nav"><div class="p-logo"><span id="mInit">F</span><em id="mName" style="font-style:normal">Firmanız</em></div><div class="p-menu"><b></b><b></b><b></b></div></div>\n              <div class="p-hero">\n                <div><div class="p-title" id="mTitle">Firmanız\'a hoş geldiniz</div><div class="p-line" style="width:92%"></div><div class="p-line" style="width:72%"></div><span class="p-cta">Randevu al</span></div>\n                <div class="p-img"></div>\n              </div>\n              <div class="p-row">\n                <div><b></b><div class="p-line" style="width:80%"></div><div class="p-line" style="width:55%"></div></div>\n                <div><b></b><div class="p-line" style="width:70%"></div><div class="p-line" style="width:60%"></div></div>\n                <div><b></b><div class="p-line" style="width:85%"></div><div class="p-line" style="width:45%"></div></div>\n              </div>\n              <div class="p-wa"><svg viewBox="0 0 24 24"><use href="#wa"/></svg></div>\n            </div>\n          </div></div>\n        </div>\n      </div>\n');
    o.push('      <p class="hint">' + esc(h.hint) + '</p>\n    </div>\n  </div>\n</section>\n\n');

    o.push('<div class="stats" aria-label="Öne çıkan bilgiler">\n  <div class="wrap">\n');
    data.stats.forEach(function (s, i) {
      var u = String(s.unit || ''), sp = /^[A-Za-zÇĞİÖŞÜçğıöşü]/.test(u) ? ' ' : '';
      o.push('    <div class="stat" data-r' + (i ? delay(i, .1) : '') + '><strong><span data-count="' + (+s.number || 0) + '">' + (+s.number || 0) + '</span>' + (u ? sp + '<em>' + esc(u) + '</em>' : '') + '</strong><span>' + esc(s.label) + '</span></div>\n');
    });
    o.push('  </div>\n</div>\n\n');

    function mq(arr) { var s = '<span>' + arr.map(function (t) { return esc(t) + '<i></i>'; }).join('') + '</span>'; return s + s; }
    o.push('<div class="marquee" aria-hidden="true">\n  <div class="mq">' + mq(data.marquee.row1) + '</div>\n  <div class="mq rev">' + mq(data.marquee.row2) + '</div>\n</div>\n\n');

    o.push('<section id="hizmetler" aria-labelledby="h-hizmet">\n  <div class="pin" id="pin">\n    <div class="pin-in" id="pinIn">\n      <div class="hz" id="hz">\n        <div class="hz-intro">\n');
    o.push('          <h2 class="sec-h" id="h-hizmet" data-split>' + esc(data.services.title) + '</h2>\n          <p class="sec-p" data-r style="--d:.3s">' + esc(data.services.text) + '</p>\n          <p class="hz-hint" aria-hidden="true"><i></i>Kaydırarak keşfedin</p>\n        </div>\n');
    data.services.items.forEach(function (s) {
      o.push('        <a class="svc spot" href="' + esc(s.link || '#iletisim') + '">\n          <span class="ic" aria-hidden="true">' + icon(s.icon) + '</span>\n          <h3>' + esc(s.title) + '</h3>\n          <p>' + esc(s.text) + '</p>\n          <span class="more">' + esc(s.linkText) + '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>\n          <span class="big" aria-hidden="true">' + esc(String(s.title || '').charAt(0).toLocaleUpperCase('tr')) + '</span>\n        </a>\n');
    });
    o.push('      </div>\n    </div>\n  </div>\n</section>\n\n');

    o.push('<section id="paketler" aria-labelledby="h-paket">\n  <div class="wrap">\n    <div class="pk-head">\n      <h2 class="sec-h metal" id="h-paket" data-split>' + esc(data.packages.title) + '</h2>\n      <p class="sec-p" data-r style="--d:.3s">' + esc(data.packages.text) + '</p>\n    </div>\n    <div class="plans">\n');
    data.packages.items.forEach(function (p) {
      o.push('      <div class="plan' + (p.highlight ? ' vip' : '') + '">\n        <div class="plan-in spot">\n');
      if (p.badge) o.push('          <span class="badge' + (p.highlight ? '' : ' soft') + '">' + esc(p.badge) + '</span>\n');
      o.push('          <h3>' + esc(p.name) + '</h3>\n          <p class="for">' + esc(p.desc) + '</p>\n          <p class="amount"><span class="num" data-count="' + (+p.price || 0) + '">' + money(p.price) + '</span><span>₺</span></p>\n          <p class="vat">' + esc(p.note) + '</p>\n          <div class="divider"></div>\n');
      o.push(p.extras ? '          <p class="inc">' + esc(p.listTitle) + '</p>\n' : '          <h4>' + esc(p.listTitle) + '</h4>\n');
      o.push('          <ul class="feat">\n' + p.features.map(function (f) { return '            <li' + (p.extras ? ' class="plus"' : '') + '>' + esc(f) + '</li>\n'; }).join('') + '          </ul>\n          <div class="acts">\n');
      o.push('            <a href="#iletisim" class="btn ' + (p.highlight ? 'btn-gold' : 'btn-ghost') + '" data-pkg="' + esc(p.name) + '"' + (p.highlight ? ' data-mag' : '') + '>' + esc(p.buttonText || (p.name + ' paketini seç')) + '</a>\n');
      if (p.highlight) o.push('            <a href="' + esc(wa(data, 'Merhaba, ' + p.name + ' web sitesi paketi (' + money(p.price) + ' ₺) hakkında bilgi almak istiyorum.')) + '" target="_blank" rel="noopener" class="btn btn-ghost btn-wa"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#wa"/></svg>WhatsApp\'tan yaz</a>\n');
      o.push('          </div>\n        </div>\n      </div>\n\n');
    });
    o.push('    </div>\n    <div class="assure" data-r>\n' + data.packages.assurances.map(function (a) { return '      <span>' + icon(a.icon) + esc(a.text) + '</span>\n'; }).join('') + '    </div>\n  </div>\n</section>\n\n');

    o.push('<section id="fiyatlar" class="light" aria-labelledby="h-fiyat">\n  <div class="wrap">\n    <h2 class="sec-h" id="h-fiyat" data-split>' + esc(data.prices.title) + '</h2>\n    <p class="sec-p" data-r style="--d:.3s">' + esc(data.prices.text) + '</p>\n');
    if (groups.length > 1) {
      o.push('    <div class="chips" role="group" aria-label="Site türü filtresi" data-r style="--d:.4s">\n      <button class="chip" type="button" data-f="all" aria-pressed="true">Hepsi</button>\n');
      groups.forEach(function (g) { o.push('      <button class="chip" type="button" data-f="' + slug(g) + '" aria-pressed="false">' + esc(g) + '</button>\n'); });
      o.push('    </div>\n');
    }
    o.push('    <table class="plist" id="plist" data-r>\n      <caption class="sr-only">Web sitesi fiyatları ve teslim süreleri</caption>\n      <thead><tr><th scope="col">Site türü</th><th scope="col">Fiyat</th><th scope="col">Teslim süresi (0–50 iş günü)</th></tr></thead>\n      <tbody id="ptbody">\n');
    data.prices.rows.forEach(function (r) {
      var f = (!r.group || r.group === 'Hepsi') ? 'all' : slug(r.group), mn = +r.daysMin || 0, mx = Math.max(mn, +r.daysMax || 0), days;
      if (mn > 0) {
        mn = Math.min(mn, 50); mx = Math.min(mx, 50);
        var left = mx > mn ? mn * 2 : mn * 2 - .8, width = mx > mn ? (mx - mn) * 2 : 1.6;
        left = Math.max(0, Math.min(100 - width, left));
        days = '<span class="track" aria-hidden="true"><b style="left:' + +left.toFixed(1) + '%;width:' + +width.toFixed(1) + '%"></b></span><span>' + (mx > mn ? mn + '–' + mx : mn) + ' iş günü</span>';
      } else days = '<span style="text-align:left;min-width:0">' + esc(r.daysNote || 'Projeye göre planlanır') + '</span>';
      o.push('        <tr data-f="' + f + '"><th scope="row">' + esc(r.name) + '</th><td class="pc">' + esc(r.price) + '</td><td class="days">' + days + '</td></tr>\n');
    });
    o.push('      </tbody>\n    </table>\n  </div>\n</section>\n\n');

    function pts(list) {
      return '        <ul class="pts">\n' + list.map(function (p, i) { return '          <li data-r' + (i ? delay(i, .08) : '') + '><span class="ic" aria-hidden="true">' + icon(p.icon) + '</span><div><strong>' + esc(p.title) + '</strong><span>' + esc(p.text) + '</span></div></li>\n'; }).join('') + '        </ul>\n';
    }
    o.push('<section aria-labelledby="h-neden">\n  <div class="wrap">\n    <h2 class="sec-h" id="h-neden" data-split>' + esc(data.why.title) + '</h2>\n    <div class="duo">\n      <div>\n        <h3 data-r>' + esc(data.why.leftTitle) + '</h3>\n' + pts(data.why.left) + '      </div>\n      <div>\n        <h3 data-r>' + esc(data.why.rightTitle) + '</h3>\n' + pts(data.why.right) + '      </div>\n    </div>\n  </div>\n</section>\n\n');

    o.push('<section id="surec" aria-labelledby="h-surec">\n  <div class="wrap">\n    <h2 class="sec-h" id="h-surec" data-split>' + esc(data.process.title) + '</h2>\n    <p class="sec-p" data-r style="--d:.3s">' + esc(data.process.text) + '</p>\n    <div class="tlw" id="tl"><div class="tl-line" aria-hidden="true"><i id="tlFill"></i></div>\n    <ol class="tl">\n');
    data.process.steps.forEach(function (s, i) { o.push('      <li><span class="n" aria-hidden="true">' + (i + 1) + '</span><div class="card" data-r="' + (i % 2 ? 'right' : 'left') + '"><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></div></li>\n'); });
    o.push('    </ol></div>\n  </div>\n</section>\n\n');

    o.push('<section id="sss" class="light" aria-labelledby="h-sss">\n  <div class="wrap">\n    <h2 class="sec-h" id="h-sss" data-split>' + esc(data.faq.title) + '</h2>\n    <div class="faq" data-r>\n');
    data.faq.items.forEach(function (f, i) { o.push('      <details' + (i ? '' : ' open') + '><summary><h3>' + esc(f.q) + '</h3></summary><div class="ans"><p>' + esc(f.a) + '</p></div></details>\n'); });
    o.push('    </div>\n  </div>\n</section>\n\n');

    o.push('<section id="kisaca" aria-labelledby="h-kisaca">\n  <div class="wrap">\n    <h2 class="sec-h" id="h-kisaca" data-split>' + esc(data.about.title) + '</h2>\n    <p class="intro" data-r style="--d:.2s">' + esc(data.about.intro) + '</p>\n    <dl class="facts">\n');
    data.about.facts.forEach(function (f, i) { o.push('      <div class="spot" data-r' + (i ? delay(i, .08) : '') + '><dt>' + esc(f.label) + '</dt><dd>' + esc(f.value) + '</dd></div>\n'); });
    o.push('    </dl>\n  </div>\n</section>\n\n');

    var cs = data.contactSection;
    o.push('<section id="iletisim" aria-labelledby="h-iletisim">\n  <div class="wrap">\n    <p class="mega" aria-hidden="true"><span class="metal" data-split>' + esc(cs.bigText) + '</span></p>\n    <div class="ct">\n      <div data-r>\n');
    o.push('        <h2 class="sec-h" id="h-iletisim" style="font-size:clamp(26px,2.6vw,36px)">' + esc(cs.title) + '</h2>\n        <p class="sec-p" style="margin-top:18px">' + esc(cs.text) + '</p>\n        <address class="lines">\n          <dl>\n');
    o.push('            <div><dt>Telefon</dt><dd>' + c.phones.map(function (p) { return '<a href="' + telHref(p) + '">' + esc(p) + '</a>'; }).join('<br>') + '</dd></div>\n');
    o.push('            <div><dt>WhatsApp</dt><dd><a href="' + esc(wa(data, c.whatsappMessage)) + '" target="_blank" rel="noopener">' + esc(c.whatsapp) + '</a></dd></div>\n');
    o.push('            <div><dt>E-posta</dt><dd><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></dd></div>\n');
    o.push('            <div><dt>Konum</dt><dd>' + esc(c.location) + '</dd></div>\n            <div><dt>Çalışma saatleri</dt><dd>' + esc(c.hours) + '</dd></div>\n          </dl>\n        </address>\n      </div>\n');
    o.push('      <form class="quote" id="form" novalidate data-r="scale" data-wa="' + intl(c.whatsapp) + '" style="--d:.15s">\n        <div class="q-in">\n          <div><label for="ad">Ad soyad</label><input id="ad" name="ad" required autocomplete="name"></div>\n          <div><label for="tel">Telefon</label><input id="tel" name="tel" type="tel" required autocomplete="tel" placeholder="05xx xxx xx xx"></div>\n          <div><label for="mail">E-posta</label><input id="mail" name="mail" type="email" required autocomplete="email"></div>\n          <div><label for="firma">Firma adı <em>(isteğe bağlı)</em></label><input id="firma" name="firma" autocomplete="organization"></div>\n');
    var hi = data.packages.items.filter(function (p) { return p.highlight; })[0];
    o.push('          <div class="full"><label for="paket">Paket</label>\n            <select id="paket" name="paket">' + data.packages.items.map(function (p) { return '<option' + (p === hi ? ' selected' : '') + '>' + esc(p.name) + '</option>'; }).join('') + '<option>Özel proje</option></select></div>\n');
    o.push('          <div class="full"><label for="detay">Projeniz hakkında</label><textarea id="detay" name="detay" required placeholder="Ne iş yapıyorsunuz, sitede neler olsun?"></textarea></div>\n          <div class="msg" id="msg" role="status" aria-live="polite"></div>\n          <button class="btn btn-gold full" type="submit" data-mag>' + esc(cs.button) + '</button>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n\n</main>\n\n');
    o.push(footer(data, true));
    o.push('\n<script>\n' + js + '\n</script>\n</body>\n</html>\n');
    return o.join('');
  }

  function renderRefs(data, css, js, today, imgSrc) {
    var R = data.references, items = R.items, url = SITE + '/referanslar/';
    imgSrc = imgSrc || function (p) { return '/' + p; };
    var sectors = [];
    items.forEach(function (r) { if (r.sector && sectors.indexOf(r.sector) < 0) sectors.push(r.sector); });
    var ld = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CollectionPage', '@id': url + '#sayfa', url: url, name: R.seoTitle, description: R.seoDescription, inLanguage: 'tr-TR', isPartOf: { '@id': SITE + '/#site' }, about: { '@id': SITE + '/#isletme' }, dateModified: today,
          breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: SITE + '/' }, { '@type': 'ListItem', position: 2, name: R.navLabel, item: url }] },
          mainEntity: { '@type': 'ItemList', numberOfItems: items.length, itemListElement: items.map(function (r, i) { var w = { '@type': 'CreativeWork', name: r.name, description: r.desc || undefined, creator: { '@id': SITE + '/#isletme' } }; if (r.url) w.url = r.url; if (r.image) w.image = SITE + '/' + r.image; if (r.year) w.dateCreated = String(r.year); return { '@type': 'ListItem', position: i + 1, item: w }; }) } },
        { '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: 'EGSU', inLanguage: 'tr-TR' },
        { '@type': ['ProfessionalService', 'LocalBusiness'], '@id': SITE + '/#isletme', name: 'EGSU', url: SITE + '/', telephone: data.contact.phones[0] ? telLd(data.contact.phones[0]) : undefined, email: data.contact.email }
      ]
    };
    var first = items[0] && items[0].image;
    var o = [];
    o.push(head({ tagId: data.seo.googleTagId, pre: false, title: R.seoTitle, description: R.seoDescription, shareTitle: R.seoTitle, shareDescription: R.seoDescription, url: url, ld: ld, css: css,
      preload: first ? '<link rel="preload" as="image" href="' + esc(imgSrc(first)) + '" fetchpriority="high">\n' : '' }));
    o.push('<body class="sub">\n' + gtmNs(data) + '<a class="skip" href="#icerik">İçeriğe geç</a>\n<div id="prog" aria-hidden="true"></div>\n<div class="grain" aria-hidden="true"></div>\n\n');
    o.push(header(data, false));
    o.push('\n<main id="icerik">\n<section class="rf-hero" aria-labelledby="h1">\n  <div class="aurora-p" aria-hidden="true"><div class="aurora"><i></i><i></i><i></i></div></div><span class="hline b" aria-hidden="true"></span>\n  <div class="wrap">\n');
    o.push('    <nav class="crumb" aria-label="Sayfa konumu" data-r><a href="/">Ana sayfa</a><span aria-hidden="true">/</span><span aria-current="page">' + esc(R.navLabel) + '</span></nav>\n');
    o.push('    <div class="rf-top">\n      <h1 id="h1" class="metal" data-split>' + esc(R.title) + '</h1>\n');
    if (items.length) o.push('      <p class="rf-count" data-r style="--d:.3s"><strong><span data-count="' + items.length + '">' + items.length + '</span></strong><span>yayındaki proje</span></p>\n');
    o.push('    </div>\n    <p class="lead" data-r style="--d:.25s">' + esc(R.intro) + '</p>\n');
    if (sectors.length > 1) {
      o.push('    <div class="chips rf-chips" role="group" aria-label="Sektöre göre filtrele" data-r style="--d:.4s">\n      <button class="chip" type="button" data-rf="all" aria-pressed="true">Hepsi</button>\n');
      sectors.forEach(function (s) { o.push('      <button class="chip" type="button" data-rf="' + slug(s) + '" aria-pressed="false">' + esc(s) + '</button>\n'); });
      o.push('    </div>\n');
    }
    o.push('  </div>\n</section>\n\n<section class="rf-list" aria-label="Referans projeler">\n  <div class="wrap">\n');
    if (!items.length) {
      o.push('    <div class="rf-empty" data-r><p>' + esc(R.emptyText) + '</p><a href="/#iletisim" class="btn btn-gold" data-mag>Teklif al</a></div>\n');
    } else {
      o.push('    <ul class="rf-grid">\n');
      items.forEach(function (r, i) {
        var host = '';
        try { host = r.url ? new URL(r.url).hostname.replace(/^www\./, '') : ''; } catch (e) { host = ''; }
        var shot = r.image ? '<img src="' + esc(imgSrc(r.image)) + '" width="' + (+r.imageWidth || 1200) + '" height="' + (+r.imageHeight || 750) + '" alt="' + esc(r.name) + ' web sitesi ekran görüntüsü"' + (i < 2 ? ' fetchpriority="' + (i ? 'auto' : 'high') + '"' : ' loading="lazy"') + ' decoding="async">' : '<span class="rf-ph" aria-hidden="true">' + esc(String(r.name || '?').charAt(0).toLocaleUpperCase('tr')) + '</span>';
        o.push('      <li class="rf-item" data-rf="' + slug(r.sector) + '" data-r' + delay(i % 2, .12) + '>\n        <article class="rf-card spot">\n');
        o.push('          <div class="rf-frame"><div class="rf-bar" aria-hidden="true"><b></b><b></b><b></b><span>' + esc(host || slug(r.name) + '.com') + '</span></div><div class="rf-shot' + (r.image ? '' : ' none') + '">' + shot + '</div></div>\n');
        o.push('          <div class="rf-body">\n            <p class="rf-meta">' + [r.sector, r.year].filter(Boolean).map(esc).join('<i aria-hidden="true"></i>') + '</p>\n            <h2>' + esc(r.name) + '</h2>\n');
        if (r.desc) o.push('            <p class="rf-desc">' + esc(r.desc) + '</p>\n');
        if (r.tags && r.tags.length) o.push('            <ul class="rf-tags">' + r.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>\n');
        if (r.url) o.push('            <a class="rf-link" href="' + esc(r.url) + '" target="_blank" rel="noopener">Siteyi ziyaret et<span class="sr-only"> (' + esc(r.name) + ', yeni sekmede açılır)</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></a>\n');
        o.push('          </div>\n        </article>\n      </li>\n');
      });
      o.push('    </ul>\n');
    }
    o.push('  </div>\n</section>\n\n<section class="rf-cta" aria-labelledby="h-rfcta">\n  <div class="wrap">\n    <h2 class="sec-h metal" id="h-rfcta" data-split>' + esc(R.ctaTitle) + '</h2>\n    <p class="sec-p" data-r style="--d:.25s">' + esc(R.ctaText) + '</p>\n    <div class="cta" data-r style="--d:.35s"><a href="/#iletisim" class="btn btn-gold" data-mag>Ücretsiz teklif al</a><a href="' + esc(wa(data, data.contact.whatsappMessage)) + '" target="_blank" rel="noopener" class="btn btn-ghost btn-wa"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#wa"/></svg>WhatsApp\'tan yaz</a></div>\n  </div>\n</section>\n</main>\n\n');
    o.push(footer(data, false));
    o.push('\n<script>\n' + js + '\n</script>\n</body>\n</html>\n');
    return o.join('');
  }

  function renderSitemap(data, today) {
    var u = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>' + SITE + '/</loc>\n    <lastmod>' + today + '</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n';
    u += '  <url>\n    <loc>' + SITE + '/referanslar/</loc>\n    <lastmod>' + today + '</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n';
    return u + '</urlset>\n';
  }

  function renderLlms(data) {
    var c = data.contact, L = [];
    L.push('# EGSU', '', '> ' + data.seo.businessDescription, '');
    L.push('## Paketler');
    data.packages.items.forEach(function (p) { L.push('- ' + p.name + ': ' + money(p.price) + ' ₺. ' + p.desc + ' ' + (p.extras ? p.listTitle + ' ' : '') + p.features.join(', ') + '.'); });
    L.push('', '## Site türüne göre fiyatlar');
    data.prices.rows.forEach(function (r) { var mn = +r.daysMin || 0, mx = Math.max(mn, +r.daysMax || 0); L.push('- ' + r.name + ': ' + r.price + (mn ? ', ' + (mx > mn ? mn + '–' + mx : mn) + ' iş günü' : (r.daysNote ? ', ' + r.daysNote : ''))); });
    L.push('', '## Sık sorulan sorular');
    data.faq.items.forEach(function (f) { L.push('- ' + f.q + ' ' + f.a); });
    if (data.references.items.length) {
      L.push('', '## Referanslar');
      data.references.items.forEach(function (r) { L.push('- ' + r.name + (r.sector ? ' (' + r.sector + (r.year ? ', ' + r.year : '') + ')' : '') + (r.url ? ': ' + r.url : '') + (r.desc ? '. ' + r.desc : '')); });
    }
    L.push('', '## İletişim', '- Web: ' + SITE + '/');
    L.push('- Referanslar: ' + SITE + '/referanslar/');
    L.push('- Telefon: ' + c.phones.join(', '), '- WhatsApp: ' + c.whatsapp, '- E-posta: ' + c.email, '- Konum: ' + c.location, '- Çalışma saatleri: ' + c.hours, '');
    return L.join('\n');
  }

  function renderAll(data, css, js, opts) {
    opts = opts || {};
    var today = opts.today || new Date().toISOString().slice(0, 10);
    return {
      'index.html': renderHome(data, css, js, today),
      'referanslar/index.html': renderRefs(data, css, js, today, opts.imgSrc),
      'sitemap.xml': renderSitemap(data, today),
      'llms.txt': renderLlms(data)
    };
  }

  var api = { renderAll: renderAll, ICONS: ICONS, ICON_NAMES: ICON_NAMES, slug: slug, money: money };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.EGSURender = api;
})(this);
