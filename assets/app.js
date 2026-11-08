(function () {
  'use strict';
  const loadConfig = document.createElement('script');
  loadConfig.src = 'assets/config.js';
  loadConfig.onload = initialize;
  loadConfig.onerror = () => { document.querySelector('main').insertAdjacentHTML('afterbegin', '<p class="config-error">Erreur : fichier assets/config.js introuvable.</p>'); };
  document.head.appendChild(loadConfig);

  function initialize() {
    const conf = window.SIO_CONFIG || { applications: [], documents: [], contacts: [] };
    const apps = conf.applications || [];
    const $ = (s) => document.querySelector(s);
    const make = (tag, cls, text) => { const el = document.createElement(tag); if(cls) el.className = cls; if(text != null) el.textContent = text; return el; };
    const safeUrl = (str) => { if (typeof str !== 'string' || !str.trim()) return ''; try { const u = new URL(str, document.baseURI); return ['http:', 'https:', 'mailto:'].includes(u.protocol) ? u.href : ''; } catch (_) { return ''; } };
    const join = (...nodes) => { const fragment = document.createDocumentFragment(); nodes.forEach(n => fragment.append(n)); return fragment; };
    const accent = (color) => ['violet','blue','orange','mint','pink'].includes(color) ? color : 'violet';
    function appCard(item, small=false) {
      const card = make('article', small ? 'quick-card' : 'app-card');
      const logo = make('span', 'app-logo '+accent(item.color), item.icon || '◈');
      const name = make('h3', '', item.name || 'Application');
      const desc = make('p', '', item.description || '');
      const action = make('span', 'card-arrow', '↗');
      const url = safeUrl(item.url);
      card.append(logo, name, desc, action);
      if (!small) card.append(make('div','card-category',item.category || 'Application'));
      if (url) { const link = make('a','card-overlay'); link.href = url; link.setAttribute('aria-label', 'Ouvrir '+(item.name || 'l’application')); if (new URL(url).origin !== location.origin) { link.target='_blank'; link.rel='noopener noreferrer'; } card.append(link); }
      else { card.classList.add('not-configured'); const tag=make('span','unconfigured','À configurer'); card.append(tag); card.title='Configurez son adresse dans assets/config.js'; }
      return card;
    }
    const quick = $('#quickGrid'); apps.filter(a => a.featured).slice(0,4).forEach(a => quick.append(appCard(a,true)));
    const statusList = $('#statusList'); apps.slice(0,4).forEach(a => { const row=make('div','status-row');const left=make('div','status-left');left.append(make('span','status-indicator '+accent(a.color)),make('span','status-name',a.name));row.append(left,make('span','status-type',a.category));statusList.append(row); });
    let category='Tous'; const categories=['Tous',...new Set(apps.map(a=>a.category || 'Autre'))];
    function drawApps() {
      const term=($('#serviceSearch').value || '').trim().toLocaleLowerCase('fr');
      const filtered=apps.filter(a=>(category==='Tous'||a.category===category) && [a.name,a.description,a.category].join(' ').toLocaleLowerCase('fr').includes(term));
      $('#allApps').replaceChildren(...filtered.map(a=>appCard(a)));
      $('#appCount').textContent = filtered.length+' SERVICE'+(filtered.length>1?'S':'');
      $('#emptyApps').hidden = !!filtered.length;
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.toggle('selected',b.dataset.category===category));
    }
    categories.forEach(c=>{const b=make('button','filter-btn',c);b.dataset.category=c;b.type='button';b.addEventListener('click',()=>{category=c;drawApps();});$('#categoryFilters').append(b);});
    $('#serviceSearch').addEventListener('input',drawApps);drawApps();
    (conf.documents || []).forEach(d => {const card=make('article','doc-card'); const top=make('div','doc-top');top.append(make('span','doc-symbol',d.icon||'▤'),make('span','doc-category',d.category||'DOCUMENT'));card.append(top,make('h3','',d.title),make('p','',d.description));const url=safeUrl(d.url);if(url){const link=make('a','doc-link','Consulter le document ↗');link.href=url;link.target='_blank';link.rel='noopener noreferrer';card.append(link);}else card.append(make('span','doc-link muted','Document à ajouter'));$('#docGrid').append(card);});
    (conf.contacts || []).forEach(c=>{const row=make('article','contact-card');const icon=make('div','contact-avatar',c.initials||'IT');const details=make('div','contact-info');details.append(make('h3','',c.name),make('p','',c.role));row.append(icon,details);const mail=safeUrl(c.email ? 'mailto:'+c.email : '');if(mail){const a=make('a','contact-mail','Contacter ↗');a.href=mail;row.append(a);}else row.append(make('span','contact-mail muted','Contact à configurer'));$('#directoryList').append(row);});
    const labels={accueil:'Vue d’ensemble',services:'Applications',documentation:'Documentation',annuaire:'Annuaire'};
    function navigate() {let key=location.hash.slice(1) || 'accueil';if(!labels[key]) key='accueil'; document.querySelectorAll('.view').forEach(el=>el.classList.toggle('active',el.id===key));document.querySelectorAll('[data-nav]').forEach(el=>el.classList.toggle('active',el.dataset.nav===key));$('#currentPage').textContent=labels[key];$('#sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'instant'});}
    window.addEventListener('hashchange',navigate);navigate();
    $('#menuToggle').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
    const applyTheme=t=>{document.documentElement.dataset.theme=t;$('#themeToggle').textContent=t==='dark'?'☼':'☾';try{localStorage.setItem('sio-theme',t);}catch(_){}};
    let saved='dark';try{saved=localStorage.getItem('sio-theme')||'dark';}catch(_){}applyTheme(saved);
    $('#themeToggle').addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
    const datefmt=new Intl.DateTimeFormat('fr-FR',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
    $('#topDate').textContent=datefmt.format(new Date());
  }
})();
