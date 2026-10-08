/* Valmex — Proiecte v3 */
(function(){
'use strict';
if (typeof PROJECTS === 'undefined') return;
const grid = document.getElementById('projectsGrid');
if (!grid) return;
const toolbar = document.getElementById('projectsFilter');
const cats = ['Toate', ...new Set(PROJECTS.map(p=>p.category).filter(Boolean))];
if (toolbar) toolbar.innerHTML = cats.map((c,i)=>'<button class="filter-pill'+(i===0?' active':'')+'" data-filter="'+c+'">'+c+'</button>').join('');

function cardHtml(p){
  const thumbs = p.images.length>1 ? '<div class="story-thumbs">'+p.images.map((img,i)=>
    '<button class="story-thumb'+(i===0?' active':'')+'" data-src="'+img+'"><img src="'+img+'" alt="'+p.title+' — imagine '+(i+1)+'" loading="lazy"></button>').join('')+'</div>' : '';
  return '<article class="project-card reveal">'+
    '<div class="project-card-img gallery-img"><span class="product-badge">'+p.category+'</span>'+
    '<img src="'+p.images[0]+'" alt="'+p.title+' — '+p.location+'" loading="lazy"></div>'+thumbs+
    '<div class="project-card-body"><h3 class="project-card-title">'+p.title+' — '+p.location+'</h3>'+
    '<p class="project-card-text">'+p.description+'</p></div></article>';
}
function render(cat){
  const list = cat==='Toate' ? PROJECTS : PROJECTS.filter(p=>p.category===cat);
  grid.innerHTML = list.map(cardHtml).join('') || '<div class="products-empty">Niciun proiect în această categorie.</div>';
  grid.querySelectorAll('.reveal').forEach(el=>el.classList.add('active'));
  grid.querySelectorAll('.project-card').forEach(card=>{
    const main = card.querySelector('.project-card-img img');
    card.querySelectorAll('.story-thumb').forEach(t=>t.addEventListener('click', e=>{
      e.stopPropagation();
      if(main) main.src = t.dataset.src;
      card.querySelectorAll('.story-thumb').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
    }));
  });
}
const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lightboxImg');
if(lb) grid.addEventListener('click', e=>{
  const g = e.target.closest('.gallery-img');
  if(!g) return;
  const im = g.querySelector('img'); if(!im) return;
  lbImg.src = im.src; lb.classList.add('active'); document.body.style.overflow='hidden';
});
if(lb) lb.addEventListener('click', ()=>{ lb.classList.remove('active'); document.body.style.overflow=''; });
if(toolbar) toolbar.querySelectorAll('.filter-pill').forEach(pill=>pill.addEventListener('click', ()=>{
  toolbar.querySelectorAll('.filter-pill').forEach(p=>p.classList.remove('active'));
  pill.classList.add('active'); render(pill.dataset.filter);
}));
render('Toate');
})();
