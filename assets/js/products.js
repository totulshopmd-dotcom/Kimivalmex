/* Valmex — Produse v3 · carduri profesionale + filtre dinamice */
(function(){
'use strict';
const grid = document.getElementById('productsGrid');
if(!grid || typeof PRODUCTS === 'undefined') return;
const toolbar = document.getElementById('productsFilter');
const cats = ['Toate', ...new Set(PRODUCTS.map(p=>p.category).filter(Boolean))];
if(toolbar) toolbar.innerHTML = cats.map((c,i)=>'<button class="filter-pill'+(i===0?' active':'')+'" data-filter="'+c+'">'+c+'</button>').join('');

function card(p, i){
  const price = p.price ? p.price+' <small>'+(p.unit||'lei')+'</small>' : '<small>Preț la cerere</small>';
  const desc = p.shortDescription || p.description || '';
  return '<article class="product-card reveal reveal-delay-'+((i%3)+1)+'">'+
    '<div class="product-card-img">'+
    (p.badge ? '<span class="product-badge">'+p.badge+'</span>' : '')+
    '<img src="'+p.image+'" alt="'+(p.title||'Produs')+' — Valmex Moldova" loading="lazy"></div>'+
    '<div class="card-body"><div class="product-card-cat">'+(p.category||'')+'</div>'+
    '<h3 class="product-card-title">'+(p.title||'')+'</h3>'+
    '<p class="product-card-desc">'+desc+'</p></div>'+
    '<div class="product-card-footer"><div class="product-card-price">'+price+'</div>'+
    '<button class="product-card-more" data-id="'+p.id+'">Detalii</button></div></article>';
}

function render(cat){
  const list = cat==='Toate' ? PRODUCTS : PRODUCTS.filter(p=>p.category===cat);
  grid.innerHTML = list.length ? list.map(card).join('') : '<div class="products-empty">Niciun produs în această categorie.</div>';
  grid.querySelectorAll('.reveal').forEach(el=>el.classList.add('active'));
  grid.querySelectorAll('.product-card-more').forEach(b=>b.addEventListener('click', ()=>openDetail(b.dataset.id)));
  if(window.__valmexBindLead) window.__valmexBindLead(grid);
}

const pm = document.createElement('div');
pm.className='product-detail-modal'; pm.id='productModal';
pm.innerHTML = '<div class="pd-box"><div class="pd-grid">'+
'<div class="pd-image-wrap"><img class="pd-image" id="pdImg" src="" alt=""></div>'+
'<div class="pd-info"><div class="pd-category" id="pdCat"></div>'+
'<h3 class="pd-title" id="pdTitle"></h3><div class="pd-price" id="pdPrice"></div>'+
'<p class="pd-description" id="pdDesc"></p><div class="pd-specs" id="pdSpecs"></div>'+
'<div class="pd-cta"><button class="btn openLeadModal" id="pdCta">Cere Ofertă pentru acest Produs</button></div>'+
'</div></div></div>';
document.body.appendChild(pm);

function openDetail(id){
  const p = PRODUCTS.find(x=>String(x.id)===String(id)); if(!p) return;
  document.getElementById('pdImg').src = p.image;
  document.getElementById('pdImg').alt = p.title || '';
  document.getElementById('pdCat').textContent = p.category || '';
  document.getElementById('pdTitle').textContent = p.title || '';
  document.getElementById('pdPrice').innerHTML = p.price ? 'de la '+p.price+' '+(p.unit||'lei') : 'Preț la cerere';
  document.getElementById('pdDesc').textContent = p.description || p.shortDescription || '';
  const specs = p.specs || p.characteristics || [];
  document.getElementById('pdSpecs').innerHTML = specs.map(s=>
    '<div class="pd-spec-row"><span>'+(s.label||s.name||'')+'</span><b>'+(s.value||'')+'</b></div>').join('');
  document.getElementById('pdCta').dataset.service = p.title || '';
  pm.classList.add('active'); document.body.style.overflow='hidden';
  if(window.__valmexBindLead) window.__valmexBindLead(pm);
}
pm.addEventListener('click', e=>{ if(e.target===pm){ pm.classList.remove('active'); document.body.style.overflow=''; } });

if(toolbar) toolbar.querySelectorAll('.filter-pill').forEach(pill=>pill.addEventListener('click', ()=>{
  toolbar.querySelectorAll('.filter-pill').forEach(p=>p.classList.remove('active'));
  pill.classList.add('active'); render(pill.dataset.filter);
}));
render('Toate');
})();
