(function(){
  var d=document,h=d.documentElement,rm=h.classList.contains('rm');
  var fine=window.matchMedia&&matchMedia('(pointer:fine)').matches;
  function $(s,c){return (c||d).querySelector(s)}
  function $$(s,c){return [].slice.call((c||d).querySelectorAll(s))}
  function raf(f){return requestAnimationFrame(f)}

  var links=$('#links'),burger=$('#burger');
  if(burger){
    burger.addEventListener('click',function(){var s=links.classList.toggle('show');burger.setAttribute('aria-expanded',s)});
    $$('a',links).forEach(function(a){a.addEventListener('click',function(){links.classList.remove('show');burger.setAttribute('aria-expanded','false')})});
  }

  $$('[data-split]').forEach(function(el){
    var words=el.textContent.trim().split(/\s+/);
    el.innerHTML=words.map(function(w,i){return '<span class="w"><span style="transition-delay:'+(0.06+i*0.06).toFixed(2)+'s">'+w+'</span></span>'}).join(' ');
    if(el.classList.contains('metal'))el.classList.add('split-done');
  });

  var pre=$('#pre'),readyDone=false,pct=$('#pct');
  if(pre&&(rm||h.classList.contains('nopre'))){pre.parentNode.removeChild(pre);pre=null}
  if(pre&&pct){var t0=performance.now();(function tick(t){var p=Math.min(1,(t-t0)/900),e=1-Math.pow(1-p,3);pct.textContent=String(Math.round(e*100)).padStart(2,'0');if(p<1&&!readyDone)raf(tick);else pct.textContent='100'})(t0)}
  function ready(){if(readyDone)return;readyDone=true;if(pct)pct.textContent='100';if(pre){pre.classList.add('done');setTimeout(function(){pre&&pre.parentNode&&pre.parentNode.removeChild(pre)},1300)}if(rm||!pre){raf(function(){h.classList.add('ready')})}else setTimeout(function(){h.classList.add('ready')},240)}
  if(rm||!pre){ready()}else{
    var minT=1000,st=performance.now(),go=function(){setTimeout(ready,Math.max(0,minT-(performance.now()-st)))};
    if(d.readyState==='complete')go();else window.addEventListener('load',go);
    setTimeout(ready,1800);
  }

  function fmt(n){return Math.round(n).toLocaleString('tr-TR')}
  function count(el){
    var to=+el.dataset.count,t0=null,dur=1600;
    function step(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,4);el.textContent=fmt(to*e);if(p<1)raf(step)}
    raf(step);
  }
  var counters=$$('[data-count]');
  if(!rm)counters.forEach(function(el){el.textContent='0'});

  var targets=$$('[data-r],[data-split]');
  if('IntersectionObserver' in window&&!rm){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.01});
    targets.forEach(function(t){io.observe(t)});
    var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var el=e.target;cio.unobserve(el);var go=function(){count(el)};readyDone?setTimeout(go,250):setTimeout(function w(){readyDone?setTimeout(go,400):setTimeout(w,100)},100)}})},{threshold:.4});
    counters.forEach(function(c){cio.observe(c)});
  }else{targets.forEach(function(t){t.classList.add('in')});counters.forEach(function(c){c.textContent=fmt(+c.dataset.count)})}

  var hdr=$('#hdr'),prog=$('#prog');
  var pin=$('#pin'),pinIn=$('#pinIn'),hz=$('#hz'),pinOn=false,pinDist=0;
  function setupPin(){
    if(!pin)return;
    var on=!rm&&innerWidth>1000;
    var dist=on?hz.scrollWidth-innerWidth+80:0,vh=innerHeight;
    pinOn=on;pinDist=dist;
    if(on){pin.style.height=(vh+Math.max(0,dist))+'px';pinIn.style.position='sticky';pinIn.style.top='0';pinIn.style.height='100vh'}
    else{pin.style.height='';pinIn.style.position='';pinIn.style.height='';hz.style.transform=''}
  }
  var tlw=$('#tl'),fill=$('#tlFill'),steps=$$('.tl li'),nums=steps.map(function(s){return s.querySelector('.n')});
  var stage=$('#stage'),tilt=$('#tilt');
  var heroTxt=$('.hero .wrap > div:first-child'),heroVis=$('.hero .wrap > div:last-child'),mqEl=$('.marquee'),lastY=window.scrollY||0,vel=0,settleT=0;
  if(heroTxt)heroTxt.classList.add('hero-x');if(heroVis)heroVis.classList.add('hero-x');
  var ticking=false;
  function update(){
    ticking=false;
    var y=window.scrollY||pageYOffset,vh=innerHeight,max=h.scrollHeight-vh;
    var pr=pinOn?pin.getBoundingClientRect():null,ph=pinOn?pin.offsetHeight:0;
    var tr=tlw&&fill?tlw.getBoundingClientRect():null;
    var nt=tr?nums.map(function(n){return n.getBoundingClientRect().top}):null;
    if(hdr)hdr.classList.toggle('scrolled',y>40);
    if(!rm){
      if(y<vh*1.2){var k=Math.min(1,y/vh);if(heroTxt){heroTxt.style.transform='translate3d(0,'+(y*.28).toFixed(1)+'px,0)';heroTxt.style.opacity=(1-k*.85).toFixed(3)}if(heroVis){heroVis.style.transform='translate3d(0,'+(y*.12).toFixed(1)+'px,0)'}}
      var v=y-lastY;lastY=y;vel+=(v-vel)*.25;var sk=Math.max(-8,Math.min(8,vel*.18));if(mqEl)mqEl.style.setProperty('--sk',sk.toFixed(2)+'deg');
      if(Math.abs(vel)>.2&&!settleT){settleT=setTimeout(function(){settleT=0;vel=0;if(mqEl)mqEl.style.setProperty('--sk','0deg')},140)}
    }
    if(prog)prog.style.transform='scaleX('+(max>0?y/max:0)+')';
    if(pr){var total=ph-vh,p=Math.min(1,Math.max(0,-pr.top/total));hz.style.transform='translate3d('+(-p*pinDist).toFixed(1)+'px,0,0)'}
    if(tr){
      var tp=Math.min(1,Math.max(0,(vh*.6-tr.top)/tr.height));
      if(!rm)fill.style.transform='scaleY('+tp+')';
      steps.forEach(function(s,i){s.classList.toggle('on',rm||nt[i]+29<vh*.6)});
    }
  }
  function onScroll(){if(!ticking){ticking=true;raf(update)}}
  var rzT=0;
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',function(){clearTimeout(rzT);rzT=setTimeout(function(){raf(function(){setupPin();update()})},120)});
  addEventListener('load',function(){raf(function(){setupPin();update()})});
  raf(function(){setupPin();update()});

  if(!rm&&fine){
    var hero=$('.hero'),auroraP=$('#auroraP');
    if(hero&&stage){
      var mq=0,mx=0,my=0;
      hero.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;if(mq)return;mq=raf(function(){mq=0;
        var r=stage.getBoundingClientRect(),hr=hero.getBoundingClientRect(),x=(mx-(r.left+r.width/2))/r.width,yv=(my-(r.top+r.height/2))/r.height;
        tilt.style.transform='rotateY('+(-14+x*14).toFixed(2)+'deg) rotateX('+(7-yv*10).toFixed(2)+'deg)';
        hero.style.setProperty('--gx',(mx-hr.left)+'px');hero.style.setProperty('--gy',(my-hr.top)+'px');hero.classList.add('lit');
        if(auroraP)auroraP.style.transform='translate3d('+((mx/hr.width-.5)*-40).toFixed(1)+'px,'+((my/hr.height-.5)*-30).toFixed(1)+'px,0)';
      })},{passive:true});
      hero.addEventListener('mouseleave',function(){tilt.style.transform='';hero.classList.remove('lit');if(auroraP)auroraP.style.transform=''});
    }
    $$('.spot').forEach(function(el){var q=0,ex=0,ey=0;el.addEventListener('mousemove',function(e){ex=e.clientX;ey=e.clientY;if(q)return;q=raf(function(){q=0;var r=el.getBoundingClientRect();el.style.setProperty('--mx',(ex-r.left)+'px');el.style.setProperty('--my',(ey-r.top)+'px')})},{passive:true})});
    $$('[data-mag]').forEach(function(el){
      var q=0,ex=0,ey=0;
      el.addEventListener('mousemove',function(e){ex=e.clientX;ey=e.clientY;if(q)return;q=raf(function(){q=0;var r=el.getBoundingClientRect();el.style.transform='translate('+((ex-r.left-r.width/2)*.22).toFixed(1)+'px,'+((ey-r.top-r.height/2)*.32).toFixed(1)+'px)'})},{passive:true});
      el.addEventListener('mouseleave',function(){el.style.transform=''});
    });
  }

  if(!rm){
    $$('.btn').forEach(function(b){b.addEventListener('pointerdown',function(e){var r=b.getBoundingClientRect(),sz=Math.max(r.width,r.height)*2.2,sp=d.createElement('span');sp.className='rip';sp.style.width=sp.style.height=sz+'px';sp.style.left=(e.clientX-r.left-sz/2)+'px';sp.style.top=(e.clientY-r.top-sz/2)+'px';b.appendChild(sp);setTimeout(function(){sp.remove()},700)})});
    $$('#ptbody tr').forEach(function(r,i){r.style.setProperty('--rd',(.12+i*.035).toFixed(3)+'s')});
    var fm=$('[data-fx-mark]');if(fm&&'IntersectionObserver' in window){var fo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){fm.classList.add('in');fo.disconnect()}})},{threshold:.3});fo.observe(fm)}else if(fm)fm.classList.add('in');
    var au=$('.aurora'),auHost=au&&au.closest('section');
    if(au&&auHost&&'IntersectionObserver' in window){var ais=$$('i',au);var ao=new IntersectionObserver(function(es){es.forEach(function(e){var st=e.isIntersecting?'running':'paused';au.style.animationPlayState=st;ais.forEach(function(i){i.style.animationPlayState=st})})});ao.observe(auHost)}
  }

  var urlform=$('#urlform'),biz=$('#biz');
  if(urlform&&biz){
    urlform.addEventListener('submit',function(e){e.preventDefault();location.hash='paketler'});
    biz.addEventListener('input',function(){
      var raw=biz.value.trim(),name=raw||'Firmanız';
      $('#mName').textContent=name;
      $('#mInit').textContent=name.charAt(0).toLocaleUpperCase('tr');
      $('#mTitle').textContent=name+(raw?' ile tanışın':"'a hoş geldiniz");
      var f=$('#firma');if(f)f.value=raw;
    });
    biz.addEventListener('keydown',function(e){var k=e.key;if(k&&k.length===1&&!/[a-zA-Z0-9çğıöşüÇĞİÖŞÜ\- ]/.test(k))e.preventDefault()});
  }

  $$('[data-pkg]').forEach(function(a){a.addEventListener('click',function(){var p=$('#paket');if(p)p.value=a.dataset.pkg})});

  var rows=$$('#ptbody tr');
  $$('.chip[data-f]').forEach(function(c){c.addEventListener('click',function(){
    $$('.chip[data-f]').forEach(function(x){x.setAttribute('aria-pressed',x===c)});
    var f=c.dataset.f;rows.forEach(function(r){r.hidden=!(f==='all'||r.dataset.f===f||r.dataset.f==='all')});
  })});
  rows.forEach(function(r,i){var b=r.querySelector('.track b');if(b)b.style.transitionDelay=(0.3+i*0.05).toFixed(2)+'s'});

  var refs=$$('.rf-item');
  $$('.chip[data-rf]').forEach(function(c){c.addEventListener('click',function(){
    $$('.chip[data-rf]').forEach(function(x){x.setAttribute('aria-pressed',x===c)});
    var f=c.dataset.rf;refs.forEach(function(r){var show=f==='all'||r.dataset.rf===f;r.hidden=!show;if(show&&!rm&&r.animate)r.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'none'}],{duration:500,easing:'cubic-bezier(.2,.8,.2,1)'})});
  })});

  $$('details').forEach(function(dt){
    var s=dt.querySelector('summary'),a=dt.querySelector('.ans');
    if(!s||!a)return;
    s.addEventListener('click',function(e){
      if(rm||!a.animate)return;e.preventDefault();
      if(dt.open){var hh=a.offsetHeight;a.animate([{height:hh+'px',opacity:1},{height:'0px',opacity:0}],{duration:380,easing:'cubic-bezier(.2,.8,.2,1)'}).onfinish=function(){dt.open=false};}
      else{dt.open=true;var hh2=a.offsetHeight;a.animate([{height:'0px',opacity:0},{height:hh2+'px',opacity:1}],{duration:480,easing:'cubic-bezier(.2,.8,.2,1)'})}
    });
  });

  var form=$('#form');
  if(form)form.addEventListener('submit',function(e){
    e.preventDefault();
    var msg=$('#msg'),bad=[];
    ['ad','tel','mail','detay'].forEach(function(id){
      var i=d.getElementById(id),ok=i.value.trim()&&(i.type!=='email'||/\S+@\S+\.\S+/.test(i.value));
      i.setAttribute('aria-invalid',!ok);if(!ok)bad.push(i);
    });
    if(bad.length){msg.className='msg err';msg.textContent='Teklif hazırlayabilmemiz için ad, telefon, geçerli bir e-posta ve proje bilgisi gerekli.';bad[0].focus();return}
    var g=function(id){return d.getElementById(id).value.trim()};
    var text='Merhaba, EGSU web sitesinden teklif istiyorum.\n\nAd soyad: '+g('ad')+'\nTelefon: '+g('tel')+'\nE-posta: '+g('mail')+(g('firma')?'\nFirma: '+g('firma'):'')+'\nPaket: '+g('paket')+'\n\nProje: '+g('detay');
    var url='https://wa.me/'+form.dataset.wa+'?text='+encodeURIComponent(text);
    msg.className='msg ok';
    msg.innerHTML='WhatsApp açılıyor. Mesajınız hazır, göndermek için WhatsApp\'ta gönder tuşuna basın. Açılmadıysa <a href="'+url+'" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">buraya dokunun</a>.';
    var w=window.open(url,'_blank');if(w){try{w.opener=null}catch(x){}}else{location.href=url}
  });
})();
