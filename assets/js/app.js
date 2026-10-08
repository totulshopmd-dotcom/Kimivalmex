/* Valmex.md — App v3 · Conversion-first */
(function(){
'use strict';

/* 1. TEXT ROTATIV în H1 */
(function(){
  const el = document.getElementById('rotWord');
  if(!el) return;
  let words = [];
  try{ words = JSON.parse(el.dataset.words || '[]'); }catch(e){}
  if(!words.length) return;
  let i = 0;
  setInterval(()=>{
    el.classList.add('out');
    setTimeout(()=>{ i=(i+1)%words.length; el.textContent = words[i]; el.classList.remove('out'); }, 460);
  }, 3200);
})();

/* 2. BANNER OFERTE — text care se schimbă */
(function(){
  const el = document.getElementById('offerText');
  if(!el) return;
  let offers = [];
  try{ offers = JSON.parse(el.dataset.offers || '[]'); }catch(e){}
  if(!offers.length) return;
  let i = 0;
  setInterval(()=>{
    el.classList.add('out');
    setTimeout(()=>{ i=(i+1)%offers.length; el.textContent = offers[i]; el.classList.remove('out'); }, 400);
  }, 5000);
})();

/* 3. Countdown */
(function(){
  const els = document.querySelectorAll('[data-countdown]');
  if(!els.length) return;
  const target = new Date(new Date().getFullYear(), new Date().getMonth()+1, 1);
  function tick(){
    const diff = target - new Date();
    if(diff <= 0){ els.forEach(e=>e.textContent='—'); return; }
    const d=Math.floor(diff/864e5), h=Math.floor(diff%864e5/36e5), m=Math.floor(diff%36e5/6e4);
    els.forEach(e=>e.textContent = d+'z '+h+'h '+m+'m');
  }
  tick(); setInterval(tick, 30000);
})();

/* 4. Header scroll */
const header = document.getElementById('mainHeader');
if(header) addEventListener('scroll', ()=>header.classList.toggle('scrolled', scrollY>60), {passive:true});

/* 5. Meniu mobil */
const mt = document.getElementById('mobileToggle'), mmenu = document.getElementById('mobileMenu');
if(mt && mmenu){
  mt.addEventListener('click', ()=>{
    mmenu.classList.toggle('open');
    document.body.style.overflow = mmenu.classList.contains('open') ? 'hidden' : '';
  });
  mmenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{ mmenu.classList.remove('open'); document.body.style.overflow=''; }));
}

/* 6. Link activ */
const cur = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(l=>{ if(l.getAttribute('href')===cur) l.classList.add('active'); });

/* 7. Reveal */
const ro = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('active'); ro.unobserve(e.target);} }), {threshold:.08, rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* 8. FAQ */
document.querySelectorAll('.faq-question').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const item = btn.parentElement, ans = item.querySelector('.faq-answer'), open = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{ o.classList.remove('open'); const a=o.querySelector('.faq-answer'); if(a) a.style.maxHeight = 0; });
    if(!open && ans){ item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
  });
});

/* 9. Before/After */
document.querySelectorAll('.ba-slider').forEach(s=>{
  const before = s.querySelector('.ba-before'), handle = s.querySelector('.ba-handle');
  if(!before||!handle) return;
  let drag=false;
  const set=p=>{ p=Math.max(2,Math.min(98,p)); before.style.clipPath='inset(0 '+(100-p)+'% 0 0)'; handle.style.left=p+'%'; };
  const move=x=>{ const r=s.getBoundingClientRect(); set((x-r.left)/r.width*100); };
  s.addEventListener('mousedown', e=>{drag=true;move(e.clientX);});
  addEventListener('mousemove', e=>{ if(drag) move(e.clientX); });
  addEventListener('mouseup', ()=>drag=false);
  s.addEventListener('touchstart', e=>{drag=true;move(e.touches[0].clientX);},{passive:true});
  s.addEventListener('touchmove', e=>{ if(drag) move(e.touches[0].clientX);},{passive:true});
  s.addEventListener('touchend', ()=>drag=false);
});

/* 10. Lightbox */
const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lightboxImg');
if(lb){
  document.querySelectorAll('.gallery-img').forEach(g=>g.addEventListener('click', ()=>{
    const im = g.querySelector('img');
    lbImg.src = im ? im.src : g.src;
    lb.classList.add('active'); document.body.style.overflow='hidden';
  }));
  lb.addEventListener('click', ()=>{ lb.classList.remove('active'); document.body.style.overflow=''; });
}

/* 11. Modal lead */
const modal = document.getElementById('leadModal');
let selectedService = 'Ofertă Generală';
function openLead(service){
  selectedService = service || 'Ofertă Generală';
  const st = document.getElementById('leadServiceText');
  if(st) st.textContent = 'Serviciu: ' + selectedService;
  if(modal){ modal.classList.add('active'); document.body.style.overflow='hidden'; }
}
function bindLeadButtons(scope){
  (scope||document).querySelectorAll('.openLeadModal').forEach(b=>b.addEventListener('click', e=>{
    e.preventDefault(); openLead(b.dataset.service);
  }));
}
bindLeadButtons();
const closeModal = ()=>{ if(modal){ modal.classList.remove('active'); document.body.style.overflow=''; } };
const cmb = document.getElementById('closeLeadModal');
if(cmb) cmb.addEventListener('click', closeModal);
if(modal) modal.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });

const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyrmwWAe39mXcZYXrlW-MRnmHne70Ak64iFTB4lNLAKrAZVG8TI_eHQOkH0-cVeqxijbg/exec';
async function sendLead(nameId, phoneId, btn, statusId, product){
  const name = document.getElementById(nameId).value.trim();
  const phone = document.getElementById(phoneId).value.trim();
  if(!name || !phone){ alert('Completează câmpurile.'); return; }
  btn.disabled = true; btn.textContent = 'Se trimite...';
  const q = WEBAPP_URL + '?name=' + encodeURIComponent(name) + '&phone=' + encodeURIComponent(phone) + '&city=-&product=' + encodeURIComponent(product) + '&price=-&t=' + Date.now();
  try{
    await fetch(q, {method:'GET', cache:'no-store'});
    const s = document.getElementById(statusId);
    if(s) s.style.display = 'block';
    document.getElementById(nameId).value=''; document.getElementById(phoneId).value='';
  }catch(e){ alert('Eroare la trimitere. Încearcă din nou.'); }
  btn.disabled = false; btn.textContent = 'Trimite';
}
const leadForm = document.getElementById('leadForm');
if(leadForm) leadForm.addEventListener('submit', e=>{
  e.preventDefault();
  sendLead('leadName','leadPhone', document.getElementById('sendLeadBtn'), 'leadStatus', 'VALMEX | ' + selectedService)
    .then(()=>setTimeout(closeModal, 1600));
});

/* 12. Exit-intent */
(function(){
  const em = document.getElementById('exitModal');
  if(!em) return;
  let shown = false;
  function show(){
    if(shown) return;
    try{ if(sessionStorage.getItem('vxExit')) return; sessionStorage.setItem('vxExit','1'); }catch(e){}
    shown = true; em.classList.add('active'); document.body.style.overflow='hidden';
  }
  document.addEventListener('mouseout', e=>{ if(!e.relatedTarget && e.clientY <= 0) show(); });
  setTimeout(show, 60000);
  const c = document.getElementById('closeExitModal');
  const hide = ()=>{ em.classList.remove('active'); document.body.style.overflow=''; };
  if(c) c.addEventListener('click', hide);
  em.addEventListener('click', e=>{ if(e.target===em) hide(); });
  const ef = document.getElementById('exitForm');
  if(ef) ef.addEventListener('submit', e=>{
    e.preventDefault();
    sendLead('exitName','exitPhone', document.getElementById('sendExitBtn'), 'exitStatus', 'VALMEX | Exit-Intent -5%')
      .then(()=>setTimeout(hide, 1600));
  });
})();

/* 13. Cookie banner */
(function(){
  const KEY='vxConsent';
  let c=null; try{ c=localStorage.getItem(KEY); }catch(e){}
  if(c) return;
  const b = document.createElement('div');
  b.className='cookie-banner';
  const prefix = location.pathname.includes('/blog/') ? '../' : '';
  b.innerHTML = '<p>Folosim cookie-uri pentru cea mai bună experiență. Continuând, ești de acord cu <a href="'+prefix+'politica-confidentialitate.html">Politica de Confidențialitate</a>.</p><div class="cookie-banner-actions"><button class="cookie-decline" type="button">Refuz</button><button class="cookie-accept" type="button">Accept</button></div>';
  document.body.appendChild(b);
  requestAnimationFrame(()=>b.classList.add('show'));
  const set = v=>{ try{localStorage.setItem(KEY,v);}catch(e){} b.classList.remove('show'); setTimeout(()=>b.remove(),400); };
  b.querySelector('.cookie-accept').addEventListener('click', ()=>set('accepted'));
  b.querySelector('.cookie-decline').addEventListener('click', ()=>set('declined'));
})();

/* 14. Intro */
const intro = document.getElementById('introScreen');
if(intro){
  try{
    if(!sessionStorage.getItem('vxIntro')){ sessionStorage.setItem('vxIntro','1'); setTimeout(()=>intro.classList.add('hide'), 1600); }
    else intro.style.display='none';
  }catch(e){ intro.style.display='none'; }
}
window.__valmexBindLead = bindLeadButtons;
})();
