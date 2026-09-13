import { SITE, INTRO, DIMENSIONS, CASES, CASE_EXTENDED, SOURCES, SCENARIOS, LEGAL } from './data/content.js';

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

let lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'de';
let currentCaseId = null;
let experiment = { scenarioIndex:0, phase:'setup', infoChoice:null, actionChoice:null, traces:{}, history:[] };

const STR = {
  de: {
    brand:'Wenn die Maschine zurückschaut', skipToContent:'Zum Inhalt', ariaHome:'Startseite', ariaNav:'Hauptnavigation', ariaSwitchLanguage:'Sprache wechseln', ariaPrinciples:'Projektprinzipien', ariaHeroVisual:'Abstrakte dreidimensionale Darstellung eines Vergleichsraums', ariaHeroCanvas:'Dreidimensional wirkendes Netzwerk aus Beobachtungspunkten', ariaOutcomeCanvas:'Perspektivische Folgenkarte', ariaDimensions:'Dimensionen', ariaRisk:'Reputations-Risikostufe', riskMeaning:r=>r==='R1'?'R1: erhöhte personenbezogene Reputationssensitivität; verschärftes Evidenz-, Gegenlese- und Freigabegate.':'R0: reguläre redaktionelle Prüftiefe.', navExperiment:'Selbstexperiment', navCases:'Reale Fälle', navEssay:'Einführung', navMethod:'Methodik', navLegal:'Recht & Datenschutz',
    heroEyebrow:'Doppelte Optik · Entscheidungen unter Unsicherheit', heroTitle:'Wenn die Maschine zurückschaut', heroLead:'Ein Beobachtungsrahmen für das, was zwischen Modell und Wirklichkeit geschieht.',
    heroCta1:'Selbstexperiment starten', heroCta2:'Fallrekonstruktionen erkunden', heroProof1:'mehrdimensionale Denkspur', heroProof2a:'Blindphase', heroProof2b:'vor dem Ausgang', heroProof3a:'Primärquellen', heroProof3b:'bei realen Fällen',
    homeCard1Title:'Sie entscheiden zuerst', homeCard1Text:'Informationen erscheinen in der Reihenfolge, in der sie verfügbar sind. Der Ausgang bleibt zunächst verborgen.', homeCard2Title:'Die Welt antwortet', homeCard2Text:'Neue Evidenz zwingt zur Frage, ob ein Modell bestehen, angepasst oder verworfen werden sollte.', homeCard3Title:'Reale Fälle widerstehen', homeCard3Text:'Behörden, Unternehmen und historische Episoden werden quellengebunden rekonstruiert — mit Quellenstatus, Gegenlesart und klaren Aussagegrenzen.',
    dimensionsKicker:'Sechs Bewegungen', dimensionsHeading:'Der mehrdimensionale „CT-Scan“ durch die KI',
    experimentEyebrow:'Fiktives Selbstexperiment', experimentTitle:'Entscheiden, bevor Sie wissen, wie es ausgeht.', experimentSummary:'Drei kurze Situationen, jeweils mit Informationswahl und Entscheidung. Danach zeigt die App für jede abgeschlossene Situation separat, welche H/K/Q/D/G/R-Signale aus Ihrem Informationsweg und Ihrer Entscheidung hervorgehen. Cipollas Folgenoptik ergänzt den fiktiven Teil.', traceHeading:'Denkspur', outcomeHeading:'Folgenraum',
    casesEyebrow:'Denkbewegungen im öffentlichen Raum', casesTitle:'Dokumentierte Episoden mit zeitlich begrenztem Wissensstand.', casesSummary:'Jede Fallseite trennt Ausgangslage, neue Evidenz, ex-post-Ausgang, analytische Rekonstruktion, Gegenlesart und Aussagegrenzen.', filterLabel:'Filter', filterAll:'Alle Fälle', filterInstitution:'Institutionen', filterCompany:'Unternehmen', filterProspective:'Prospektiv', filterHistory:'Historisch', backCases:'Zurück zu allen Fällen',
    essayEyebrow:'Einführung & Erklärung', methodEyebrow:'Methodik', methodTitle:'Wie aus einem Blickwinkel ein prüfbarer Rahmen wird.', methodSummary:'Reale Fälle folgen einem strengeren Standard als das fiktive Selbstexperiment. Quellenstatus, Gegenlesart und Unsicherheit bleiben sichtbar.', legalEyebrow:'Rechts-/Datenschutzstand: 13. September 2026', legalSummary:'Vorsorglich strenge Anbieterkennzeichnung, trackerfreies Frontend, quellengebundene Fallstudien und transparenter Korrekturpfad.', legalNoteTitle:'Redaktioneller Hinweis', legalNoteText:'Besonders reputationsrelevante personenbezogene Aussagen werden nur nach einem gesonderten Public-Release- und, soweit angezeigt, externen Rechtsreview veröffentlicht.',
    footerProject:'Privates Informationsprojekt.', footerIndependent:'Unabhängig von den dargestellten Unternehmen, Behörden, Institutionen oder Personen.', footerLegal:'Impressum & Datenschutz',
    count:n=>`${n} Fall${n===1?'':'studien'}`, readCase:'Fall öffnen', initial:'Ausgangslage', evidence:'Neue Evidenz', outcome:'Ex-post-Ausgang', analysis:'Analytische Einordnung', counter:'Gegenlesart', whatNot:'Aussagegrenzen', sources:'Quellen', sourceStatus:'Quellenstatus', sourceLegend:'P0 = Primärquelle; P1 = institutioneller/historischer Primäranker; S1 = starke Sekundärquelle.', reviewed:'Stand', documentedCore:'Dokumentierte Eckpunkte', dimensionsFocus:'Dimensionen im Fokus', noScoreNote:'Die markierten Dimensionen zeigen, welche Denkbewegungen in diesem Fall analytisch relevant sind und wie sie in der Rekonstruktion zusammenwirken.', caseAssessmentLead:'Kernaussage dieser Rekonstruktion', deepDive:'Vertiefung', guidingQuestion:'Leitfrage',
    chooseInfo:'Welche Information wollen Sie zuerst?', chooseAction:'Neue Evidenz liegt vor. Was tun Sie?', revealEvidence:'Evidenz anzeigen', nextScenario:'Nächste Situation', finishExperiment:'Auswertung anzeigen', endExperiment:'Experiment beenden', restart:'Neu beginnen', selected:'gewählt', scenarioOf:(a,b)=>`Situation ${a} von ${b}`, experimentLength:'3 Situationen · je 2 Entscheidungen · danach automatische Auswertung', completedExperiment:'Selbstexperiment beendet', completedCount:(a,b)=>`${a} von ${b} Situationen abgeschlossen`, summaryIntro:'Die Zusammenfassung zeigt die H/K/Q/D/G/R-Denkspur jeder abgeschlossenen Situation separat. Dadurch bleiben Gemeinsamkeiten, Unterschiede und Revisionen über den Verlauf direkt vergleichbar.', restartExperiment:'Alle drei Situationen neu beginnen', backHome:'Zur Startseite', evidenceLabel:'Neue Evidenz', outcomeLabel:'Realisierter Ausgang', cipolla:'Cipolla-Folgenoptik', self:'Selbst', others:'Andere', clear:'klar', weak:'schwach', mixed:'gemischt', tentative:'tentativ', noSignal:'noch kein Signal', noCompletedTrace:'Eine vollständige Denkspur erscheint nach jeder abgeschlossenen Situation.',
    methodCards:[
      ['Episode und Zeitfenster','Analysiert wird eine dokumentierte Episode mit zeitlich begrenztem Wissensstand, klarer Akteursrolle und quellengebundener Rekonstruktion.'],
      ['Drei Ebenen','Denkprozess, ex-ante-Entscheidungsqualität und ex-post-Ausgang werden strikt getrennt. Ein guter Prozess kann schlecht ausgehen; ein schlechter kann Glück haben.'],
      ['Quellenhierarchie','Aktuelle Primärquelle > ältere Primärquelle > starke Sekundärquelle > LLM-Zusammenfassung. Selbstaussagen von Unternehmen werden sichtbar attribuiert und mit unabhängigen Quellen kontrastiert, soweit solche Quellen verfügbar sind.'],
      ['Publication Gate','Reputationsrelevante Claims durchlaufen ein verschärftes Evidenz- und Rechtsgate. Personenbezogene Wissens-, Motiv- oder Vorsatzbehauptungen gelangen erst nach belastbarer Primärevidenz und gesonderter Freigabe in den Public Snapshot.'],
      ['Reputations-Risikostufen','R0 kennzeichnet die reguläre redaktionelle Prüftiefe. R1 kennzeichnet erhöhte personenbezogene Reputationssensitivität und aktiviert ein verschärftes Evidenz-, Gegenlese- und Freigabegate. Die Stufe beschreibt ausschließlich die erforderliche Prüftiefe vor Veröffentlichung.'],
      ['Gegenlesart und Aussagegrenzen','Jeder reale Fall enthält eine ernsthafte alternative Interpretation und einen eigenen Abschnitt zu Reichweite, Aussagegrenzen und zusätzlichem Evidenzbedarf.'],
      ['Korrekturen','Substanzielle Änderungen erhalten datierte Korrekturvermerke. Automatisierte Inhaltsprozesse erzeugen Vorschläge; produktive Inhalte werden nach Review und Freigabe aktualisiert.'],
      ['Zwei Analysemodi','Das fiktive Selbstexperiment kombiniert H/K/Q/D/G/R mit Cipollas satirischer Folgenoptik. Reale Fallstudien arbeiten mit quellengebundener Episodenrekonstruktion, H/K/Q/D/G/R und expliziten Aussagegrenzen.'],
      ['Aktualität','Aktuelle Rollen, Gremien, laufende Verfahren und andere volatile Fakten werden vor Veröffentlichung erneut verifiziert. Historische Stichtage bleiben sichtbar.']
    ]
  },
  en: {
    brand:'When the Machine Looks Back', skipToContent:'Skip to content', ariaHome:'Home', ariaNav:'Main navigation', ariaSwitchLanguage:'Switch language', ariaPrinciples:'Project principles', ariaHeroVisual:'Abstract three-dimensional representation of a comparison space', ariaHeroCanvas:'Three-dimensional-looking network of observation points', ariaOutcomeCanvas:'Perspective outcome map', ariaDimensions:'Dimensions', ariaRisk:'Reputational risk level', riskMeaning:r=>r==='R1'?'R1: heightened personal reputational sensitivity; stricter evidence, counter-reading and approval gate.':'R0: regular level of editorial review.', navExperiment:'Self-experiment', navCases:'Real cases', navEssay:'Introduction', navMethod:'Method', navLegal:'Legal & privacy',
    heroEyebrow:'Dual Lens · Decisions under uncertainty', heroTitle:'When the Machine Looks Back', heroLead:'An observational framework for what happens between model and reality.',
    heroCta1:'Start self-experiment', heroCta2:'Explore case reconstructions', heroProof1:'multidimensional reasoning trace', heroProof2a:'Blind phase', heroProof2b:'before the outcome', heroProof3a:'Primary sources', heroProof3b:'for real cases',
    homeCard1Title:'You decide first', homeCard1Text:'Information appears in the order in which it becomes available. The outcome initially remains hidden.', homeCard2Title:'Reality answers', homeCard2Text:'New evidence forces the question whether a model should remain, be adapted, or be abandoned.', homeCard3Title:'Real cases resist', homeCard3Text:'Public bodies, companies and historical episodes are reconstructed from sources — with source status, counter-readings and explicit limits of inference.',
    dimensionsKicker:'Six movements', dimensionsHeading:'The AI’s multidimensional “CT scan”',
    experimentEyebrow:'Fictional self-experiment', experimentTitle:'Decide before you know how it turns out.', experimentSummary:'Three short situations, each with an information choice and a decision. The app then shows, separately for every completed situation, which H/K/Q/D/G/R signals arise from your information path and decision. Cipolla’s consequence lens complements the fictional part.', traceHeading:'Reasoning trace', outcomeHeading:'Outcome space',
    casesEyebrow:'Movements of thought in public', casesTitle:'Documented episodes with a time-bounded state of knowledge.', casesSummary:'Each case separates the starting point, new evidence, ex-post outcome, analytical reconstruction, counter-reading and limits of inference.', filterLabel:'Filter', filterAll:'All cases', filterInstitution:'Institutions', filterCompany:'Companies', filterProspective:'Prospective', filterHistory:'Historical', backCases:'Back to all cases',
    essayEyebrow:'Introduction & explanation', methodEyebrow:'Method', methodTitle:'Turning a viewpoint into a testable framework.', methodSummary:'Real cases follow a stricter standard than the fictional self-experiment. Source status, counter-readings and uncertainty remain visible.', legalEyebrow:'Legal/privacy status: 13 September 2026', legalSummary:'Conservative provider identification, tracker-free frontend, source-grounded case studies and a transparent correction path.', legalNoteTitle:'Editorial note', legalNoteText:'Especially reputation-sensitive personal claims are published only after an additional public-release gate and, where indicated, external legal review.',
    footerProject:'Private information project.', footerIndependent:'Independent of the companies, public bodies, institutions and persons presented.', footerLegal:'Legal notice & privacy',
    count:n=>`${n} case${n===1?'':'s'}`, readCase:'Open case', initial:'Starting point', evidence:'New evidence', outcome:'Ex-post outcome', analysis:'Analytical assessment', counter:'Counter-reading', whatNot:'Limits of inference', sources:'Sources', sourceStatus:'Source status', sourceLegend:'P0 = primary source; P1 = institutional/historical primary anchor; S1 = strong secondary source.', reviewed:'Status', documentedCore:'Documented core facts', dimensionsFocus:'Dimensions in focus', noScoreNote:'The highlighted dimensions show which movements of thought are analytically relevant in this case and how they interact in the reconstruction.', caseAssessmentLead:'Core finding of this reconstruction', deepDive:'Deep dive', guidingQuestion:'Guiding question',
    chooseInfo:'Which information do you want first?', chooseAction:'New evidence has arrived. What do you do?', revealEvidence:'Reveal evidence', nextScenario:'Next situation', finishExperiment:'Show summary', endExperiment:'End experiment', restart:'Restart', selected:'selected', scenarioOf:(a,b)=>`Situation ${a} of ${b}`, experimentLength:'3 situations · 2 decisions each · then an automatic summary', completedExperiment:'Self-experiment completed', completedCount:(a,b)=>`${a} of ${b} situations completed`, summaryIntro:'The summary shows the H/K/Q/D/G/R reasoning trace for every completed situation separately. This keeps common patterns, differences and revisions across the sequence directly comparable.', restartExperiment:'Restart all three situations', backHome:'Back to home', evidenceLabel:'New evidence', outcomeLabel:'Realised outcome', cipolla:'Cipolla consequence lens', self:'Self', others:'Others', clear:'clear', weak:'weak', mixed:'mixed', tentative:'tentative', noSignal:'no signal yet', noCompletedTrace:'A complete reasoning trace appears after each completed situation.',
    methodCards:[
      ['Episode and time window','The analysis reconstructs a documented episode with a time-bounded state of knowledge, a defined actor role and source-grounded evidence.'],
      ['Three levels','Reasoning process, ex-ante decision quality and ex-post outcome are kept separate. A sound process can end badly; a poor process can get lucky.'],
      ['Source hierarchy','Current primary source > older primary source > strong secondary source > LLM summary. Corporate self-statements are visibly attributed and contrasted with independent sources where available.'],
      ['Publication gate','Reputation-sensitive claims pass a heightened evidence and legal gate. Claims about personal knowledge, motives or intent enter the public snapshot after robust primary evidence and separate approval.'],
      ['Reputational risk levels','R0 marks the regular level of editorial review. R1 marks heightened personal reputational sensitivity and activates a stricter evidence, counter-reading and approval gate. The level describes only the depth of review required before publication.'],
      ['Counter-reading and limits','Every real case contains a serious alternative interpretation and a dedicated section on scope, limits of inference and additional evidence needs.'],
      ['Corrections','Substantive changes receive dated correction notes. Automated content processes generate proposals; production content is updated after review and approval.'],
      ['Two analysis modes','The fictional self-experiment combines H/K/Q/D/G/R with Cipolla’s satirical consequence lens. Real case studies use source-grounded episode reconstruction, H/K/Q/D/G/R and explicit limits of inference.'],
      ['Currency','Current roles, bodies, proceedings and other volatile facts are re-verified before publication. Historical cut-off dates remain visible.']
    ]
  }
};

function t(key){ return STR[lang][key]; }
function txt(obj){ return obj?.[lang] ?? ''; }

function applyLanguage(){
  document.documentElement.lang = lang;
  document.title = SITE.title[lang];
  $$('[data-i18n]').forEach(el=>{ const v=t(el.dataset.i18n); if(typeof v==='string') el.textContent=v; });
  $('#lang-toggle').textContent = lang==='de' ? 'EN' : 'DE';
  $('.skip-link').textContent=t('skipToContent');
  $('.brand').setAttribute('aria-label',t('ariaHome'));
  $('.main-nav').setAttribute('aria-label',t('ariaNav'));
  $('#lang-toggle').setAttribute('aria-label',t('ariaSwitchLanguage'));
  $('.hero-proof').setAttribute('aria-label',t('ariaPrinciples'));
  $('.hero-visual').setAttribute('aria-label',t('ariaHeroVisual'));
  $('#hero-canvas').setAttribute('aria-label',t('ariaHeroCanvas'));
  $('#outcome-canvas').setAttribute('aria-label',t('ariaOutcomeCanvas'));
  const meta=document.querySelector('meta[name="description"]');
  const metaDescription=lang==='de' ? 'Wenn die Maschine zurückschaut — interaktives Selbstexperiment und dokumentierte Fallrekonstruktionen über Entscheidungen, Evidenz und Revision.' : 'When the Machine Looks Back — an interactive self-experiment and documented case reconstructions about decisions, evidence and revision.';
  if(meta) meta.setAttribute('content', metaDescription);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content',SITE.title[lang]);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content',metaDescription);
  renderDimensions(); renderCases(); renderEssay(); renderMethod(); renderLegal(); renderExperiment();
  if(currentCaseId) renderCaseDetail(currentCaseId);
}

function renderDimensions(){
  $('#dimension-grid').innerHTML = DIMENSIONS.map(d=>`<article class="dimension-card"><div class="dimension-id">${d.id}</div><h3>${lang==='de'?d.de:d.en}</h3><p>${lang==='de'?d.deShort:d.enShort}</p></article>`).join('');
}

function categoryLabel(c){
  const map={de:{institution:'Institution',company:'Unternehmen',prospective:'Prospektiv',history:'Historisch'},en:{institution:'Institution',company:'Company',prospective:'Prospective',history:'Historical'}};
  return map[lang][c]||c;
}

function renderCases(){
  const filter=$('#case-filter')?.value || 'all';
  const items=CASES.filter(c=>filter==='all'||c.category===filter);
  $('#case-count').textContent=t('count')(items.length);
  $('#case-grid').innerHTML=items.map(c=>`
    <article class="case-card">
      <div class="case-meta"><span>${c.institution}</span><span>${c.years}</span></div>
      <h2>${txt(c.title)}</h2>
      <p>${txt(c.teaser)}</p>
      <div class="case-dims" aria-label="${t('ariaDimensions')}">${c.dimensions.map(d=>`<span class="dim-chip" title="${d}">${d}</span>`).join('')}<span class="risk-chip" title="${t('riskMeaning')(c.risk)}">${c.risk}</span></div>
      <a class="case-link" href="#case/${c.id}">${t('readCase')} →</a>
    </article>`).join('');
}

function renderCaseDetail(id){
  const c=CASES.find(x=>x.id===id); if(!c) return;
  currentCaseId=id;
  const stage=(title,body,cls='')=>`<section class="case-stage ${cls}"><h3>${title}</h3><p>${body}</p></section>`;
  const sourceCards=c.sources.map(id=>{
    const s=SOURCES[id]; if(!s) return '';
    const ttl=lang==='de'?s.titleDe:s.titleEn;
    return `<a class="source-card" href="${s.url}" target="_blank" rel="noopener noreferrer"><span class="source-type">${s.type}</span><span><span class="source-title">${ttl}</span><br><span class="source-meta">${s.publisher} · ${s.date}</span></span><span aria-hidden="true">↗</span></a>`;
  }).join('');
  const extended=CASE_EXTENDED[c.id];
  const dimCards=c.dimensions.map(id=>{
    const d=DIMENSIONS.find(x=>x.id===id); if(!d) return '';
    return `<article class="case-dimension-card"><span class="dimension-id">${d.id}</span><div><strong>${lang==='de'?d.de:d.en}</strong><p>${lang==='de'?d.deShort:d.enShort}</p></div></article>`;
  }).join('');
  $('#case-detail-content').innerHTML=`
    <header class="case-detail-header"><div class="case-meta"><span>${c.institution}</span><span>${c.years} · ${categoryLabel(c.category)} · <span title="${t('riskMeaning')(c.risk)}">${c.risk}</span></span></div><h1>${txt(c.title)}</h1><p class="lead">${txt(c.teaser)}</p><div class="case-dims" aria-label="${t('ariaDimensions')}">${c.dimensions.map(d=>`<span class="dim-chip">${d}</span>`).join('')}</div></header>
    <section class="case-assessment-hero"><p class="eyebrow">${t('caseAssessmentLead')}</p><h2>${t('analysis')}</h2><p>${txt(c.analysis)}</p></section>
    ${extended?`<section class="case-deep-dive"><div class="case-guiding-question"><span class="eyebrow">${t('guidingQuestion')}</span><p>${txt(extended.question)}</p></div><h2>${t('deepDive')}</h2><p>${txt(extended.detail)}</p></section>`:''}
    <section class="case-core-heading"><h2>${t('documentedCore')}</h2></section>
    <div class="case-stage-grid case-stage-grid-primary">${stage(t('initial'),txt(c.initial))}${stage(t('evidence'),txt(c.evidence))}${stage(t('outcome'),txt(c.outcome))}</div>
    <section class="case-dimension-section"><div class="case-section-head"><h2>${t('dimensionsFocus')}</h2><p>${t('noScoreNote')}</p></div><div class="case-dimension-grid">${dimCards}</div></section>
    <div class="case-stage-grid case-stage-grid-interpretation">${stage(t('counter'),txt(c.counter),'counter')}${stage(t('whatNot'),txt(c.whatNot),'limits')}</div>
    <section class="case-source-section"><h2>${t('sources')}</h2><p class="source-meta">${t('sourceStatus')}: ${t('sourceLegend')}</p><div class="source-list">${sourceCards}</div></section>`;
}
function renderEssay(){ $('#essay-content').innerHTML=INTRO[lang]; }
function renderMethod(){
  const cards=t('methodCards').map(([h,p])=>`<article class="method-card"><h2>${h}</h2><p>${p}</p></article>`).join('');
  const sourceTitle=lang==='de'?'Öffentliches Quellenregister':'Public source register';
  const sourceText=lang==='de'?'Alle Quellen, auf die die derzeit veröffentlichten Fallrekonstruktionen gestützt sind. P0 = Primärquelle, P1 = institutioneller/historischer Primäranker, S1 = starke Sekundärquelle.':'All sources supporting the currently published case reconstructions. P0 = primary source, P1 = institutional/historical primary anchor, S1 = strong secondary source.';
  const sourceCards=Object.values(SOURCES).map(s=>`<a class="source-card" href="${s.url}" target="_blank" rel="noopener noreferrer"><span class="source-type">${s.type}</span><span><span class="source-title">${lang==='de'?s.titleDe:s.titleEn}</span><br><span class="source-meta">${s.publisher} · ${s.date}</span></span><span aria-hidden="true">↗</span></a>`).join('');
  $('#method-content').innerHTML=cards+`<section class="source-register"><h2>${sourceTitle}</h2><p>${sourceText}</p><div class="source-list">${sourceCards}</div></section>`;
}
function renderLegal(){
  const l=LEGAL[lang]; $('#legal-heading').textContent=l.heading;
  $('#legal-content').innerHTML=[l.provider,l.independence,l.privacy,l.corrections,l.correctionStatus,l.liability,l.rights,l.editorial,l.sourceRights,l.legalBasis,l.contact].map(x=>`<section>${x}</section>`).join('');
}

function route(){
  const hash=location.hash.replace(/^#/,'')||'home';
  let target=hash;
  if(hash.startsWith('case/')){ target='case-detail'; renderCaseDetail(hash.slice(5)); }
  $$('.view').forEach(v=>{ const active=v.dataset.route===target; v.hidden=!active; v.classList.toggle('active',active); });
  window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  if(target==='experiment') setTimeout(()=>drawOutcome(),20);
}

function updateTrace(obj={}){ Object.assign(experiment.traces,obj); renderTrace(); }
function traceRows(traces={}){
  return DIMENSIONS.map(d=>{
    const sig=traces[d.id]; const label=sig ? t(sig) : t('noSignal');
    return `<div class="trace-item"><span class="trace-id">${d.id}</span><span>${lang==='de'?d.de:d.en}</span><span class="signal ${sig||''}">${label}</span></div>`;
  }).join('');
}
function renderTrace(){
  const target=$('#trace-list'); if(!target) return;
  if(experiment.phase==='finished'){
    target.innerHTML=experiment.history.length ? experiment.history.map((h,i)=>{
      const s=SCENARIOS.find(x=>x.id===h.scenarioId);
      return `<section class="trace-scenario"><div class="scenario-step">${t('scenarioOf')(i+1,SCENARIOS.length)}</div><h3>${txt(s?.title)}</h3>${traceRows(h.traces||{})}</section>`;
    }).join('') : `<p class="source-meta">${t('noCompletedTrace')}</p>`;
    return;
  }
  target.innerHTML=traceRows(experiment.traces);
}
function resetExperiment(full=false){
  if(full){ experiment.scenarioIndex=0; experiment.history=[]; }
  experiment.phase='setup'; experiment.infoChoice=null; experiment.actionChoice=null; experiment.traces={}; renderExperiment();
}
function finishExperiment(){ experiment.phase='finished'; renderExperiment(); }
function bindFinishButton(panel){ const b=$('#finish-exp-early',panel); if(b) b.addEventListener('click',finishExperiment); }
function renderExperimentSummary(panel){
  const done=experiment.history.length;
  const items=experiment.history.map((h,i)=>{
    const s=SCENARIOS.find(x=>x.id===h.scenarioId); const info=s?.infoChoices.find(x=>x.id===h.infoChoice); const action=s?.actions.find(x=>x.id===h.actionChoice);
    return `<article class="experiment-summary-item"><span class="scenario-step">${t('scenarioOf')(i+1,SCENARIOS.length)}</span><h3>${txt(s?.title)}</h3><p><strong>${t('selected')}:</strong> ${txt(info?.label)} → ${txt(action?.label)}</p><p><strong>${t('cipolla')}:</strong> ${action?cipollaLabel(action.outcome):'—'}</p></article>`;
  }).join('');
  panel.innerHTML=`<div class="experiment-finish"><p class="eyebrow">${t('completedExperiment')}</p><h2>${t('completedCount')(done,SCENARIOS.length)}</h2><p class="scenario-copy">${t('summaryIntro')}</p>${items||`<p class="scenario-copy">${lang==='de'?'Noch keine Situation vollständig abgeschlossen.':'No situation has been completed yet.'}</p>`}<div class="experiment-controls"><a class="text-button" href="#home">← ${t('backHome')}</a><button class="btn btn-primary" id="restart-exp-all">↺ ${t('restartExperiment')}</button></div></div>`;
  $('#restart-exp-all',panel)?.addEventListener('click',()=>resetExperiment(true));
  renderTrace();
}
function renderExperiment(){
  const s=SCENARIOS[experiment.scenarioIndex] || SCENARIOS[0];
  const panel=$('#experiment-panel'); if(!panel) return;
  if(experiment.phase==='finished'){ renderExperimentSummary(panel); return; }
  const top=`<div class="experiment-topline"><div><div class="scenario-step">${t('scenarioOf')(experiment.scenarioIndex+1,SCENARIOS.length)}</div><div class="experiment-length">${t('experimentLength')}</div></div><button class="text-button experiment-end" id="finish-exp-early">${t('endExperiment')}</button></div><h2 class="scenario-title">${txt(s.title)}</h2>`;
  if(experiment.phase==='setup'){
    panel.innerHTML=top+`<p class="scenario-copy">${txt(s.setup)}</p><h3>${t('chooseInfo')}</h3><div class="choice-grid">${s.infoChoices.map(c=>`<button class="choice" data-info="${c.id}">${txt(c.label)}</button>`).join('')}</div>`;
    $$('[data-info]',panel).forEach(btn=>btn.addEventListener('click',()=>{experiment.infoChoice=btn.dataset.info; updateTrace(s.infoChoices.find(c=>c.id===experiment.infoChoice).dims); experiment.phase='evidence'; renderExperiment();}));
  } else if(experiment.phase==='evidence'){
    const chosen=s.infoChoices.find(c=>c.id===experiment.infoChoice);
    panel.innerHTML=top+`<p class="scenario-copy"><strong>${t('selected')}:</strong> ${txt(chosen.label)}</p><div class="case-stage analysis"><h3>${t('evidenceLabel')}</h3><p>${txt(chosen.evidence)}</p></div><h3>${t('chooseAction')}</h3><div class="choice-grid">${s.actions.map(a=>`<button class="choice" data-action="${a.id}">${txt(a.label)}</button>`).join('')}</div>`;
    $$('[data-action]',panel).forEach(btn=>btn.addEventListener('click',()=>{experiment.actionChoice=btn.dataset.action; const a=s.actions.find(x=>x.id===experiment.actionChoice); updateTrace(a.dims); experiment.history=experiment.history.filter(h=>h.scenarioId!==s.id); experiment.history.push({scenarioId:s.id,infoChoice:experiment.infoChoice,actionChoice:experiment.actionChoice,traces:{...experiment.traces}}); experiment.phase='outcome'; renderExperiment(); drawOutcome(a.outcome);}));
  } else {
    const chosen=s.infoChoices.find(c=>c.id===experiment.infoChoice); const a=s.actions.find(x=>x.id===experiment.actionChoice);
    const quadrant = cipollaLabel(a.outcome); const last=experiment.scenarioIndex===SCENARIOS.length-1;
    panel.innerHTML=top+`<p class="scenario-copy"><strong>${t('selected')}:</strong> ${txt(chosen.label)} → ${txt(a.label)}</p><div class="case-stage analysis"><h3>${t('outcomeLabel')}</h3><p>${txt(a.outcomeText)}</p><p><strong>${t('cipolla')}:</strong> ${quadrant}</p></div><div class="experiment-controls"><button class="text-button" id="restart-exp">↺ ${t('restart')}</button><button class="btn btn-primary" id="next-exp">${last?t('finishExperiment'):t('nextScenario')} →</button></div>`;
    $('#restart-exp').addEventListener('click',()=>resetExperiment(true)); $('#next-exp').addEventListener('click',()=>{ if(last){finishExperiment();} else {experiment.scenarioIndex+=1; resetExperiment(false);} });
    drawOutcome(a.outcome);
  }
  bindFinishButton(panel);
  renderTrace();
}
function cipollaLabel(o){
  const de = o.self>0 && o.others>0 ? 'I — Nutzen für Handelnden und andere' : o.self<0 && o.others>0 ? 'H — Schaden für Handelnden, Nutzen für andere' : o.self>0 && o.others<0 ? 'B — Nutzen für Handelnden, Schaden für andere' : o.self<0 && o.others<0 ? 'S — Schaden für Handelnden und andere' : '— Achsenfall';
  const en = o.self>0 && o.others>0 ? 'I — gain for actor and others' : o.self<0 && o.others>0 ? 'H — loss for actor, gain for others' : o.self>0 && o.others<0 ? 'B — gain for actor, loss for others' : o.self<0 && o.others<0 ? 'S — loss for actor and others' : '— axis case';
  return lang==='de'?de:en;
}

function drawOutcome(point=null){
  const canvas=$('#outcome-canvas'); if(!canvas) return; const ctx=canvas.getContext('2d');
  const w=canvas.width,h=canvas.height; ctx.clearRect(0,0,w,h); ctx.fillStyle='#090d13';ctx.fillRect(0,0,w,h);
  const ox=w*.5, oy=h*.62, scale=48;
  ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=1;
  for(let i=-3;i<=3;i++){
    const x1=project(i,-3,0),x2=project(i,3,0);line(x1,x2);
    const y1=project(-3,i,0),y2=project(3,i,0);line(y1,y2);
  }
  const xAxis=project(-3.4,0,0),xAxis2=project(3.4,0,0),yAxis=project(0,-3.4,0),yAxis2=project(0,3.4,0);ctx.strokeStyle='rgba(149,242,212,.6)';line(xAxis,xAxis2);ctx.strokeStyle='rgba(142,183,255,.6)';line(yAxis,yAxis2);
  ctx.fillStyle='rgba(255,255,255,.7)';ctx.font='14px system-ui';ctx.fillText(t('self'),w-70,h-46);ctx.fillText(t('others'),50,58);
  if(point){
    const p=project(point.self,point.others,1.1);ctx.beginPath();ctx.arc(p.x,p.y,10,0,Math.PI*2);ctx.fillStyle='#95f2d4';ctx.shadowColor='#95f2d4';ctx.shadowBlur=22;ctx.fill();ctx.shadowBlur=0;
    $('#outcome-fallback').textContent=`${t('self')}: ${point.self}; ${t('others')}: ${point.others}; ${cipollaLabel(point)}`;
  } else $('#outcome-fallback').textContent='';
  function project(x,y,z){const px=ox+(x-y)*scale*.72;const py=oy+(x+y)*scale*.28-z*36;return{x:px,y:py}}
  function line(a,b){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
}

function startHero(){
  const canvas=$('#hero-canvas'); if(!canvas) return; const ctx=canvas.getContext('2d'); const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pts=Array.from({length:68},(_,i)=>{ const u=(i+.5)/68; const phi=Math.acos(1-2*u); const theta=Math.PI*(1+Math.sqrt(5))*i; return {x:Math.sin(phi)*Math.cos(theta),y:Math.sin(phi)*Math.sin(theta),z:Math.cos(phi)}; });
  let frame=0;
  function render(){
    const w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);const time=reduced?0:frame*.004; const c=Math.cos(time),s=Math.sin(time); const rotated=pts.map(p=>{const x=p.x*c-p.z*s,z=p.x*s+p.z*c;return{x,y:p.y,z}});
    const proj=rotated.map(p=>{const d=3.2-p.z;return{x:w/2+p.x*220/d*2.2,y:h/2+p.y*220/d*2.2,z:p.z,d}});
    for(let i=0;i<proj.length;i++)for(let j=i+1;j<proj.length;j++){const dx=rotated[i].x-rotated[j].x,dy=rotated[i].y-rotated[j].y,dz=rotated[i].z-rotated[j].z,dist=Math.hypot(dx,dy,dz);if(dist<.52){ctx.strokeStyle=`rgba(149,242,212,${(0.52-dist)*.16})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(proj[i].x,proj[i].y);ctx.lineTo(proj[j].x,proj[j].y);ctx.stroke();}}
    proj.sort((a,b)=>a.z-b.z).forEach((p,i)=>{const r=1.7+(p.z+1)*1.2;ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fillStyle=i%5===0?'rgba(142,183,255,.85)':'rgba(149,242,212,.72)';ctx.fill();});
    if(!reduced){frame++;requestAnimationFrame(render)}
  } render();
}

$('#lang-toggle').addEventListener('click',()=>{
  lang=lang==='de'?'en':'de';
  const url=new URL(location.href); url.searchParams.set('lang',lang); history.replaceState(null,'',url.pathname+'?'+url.searchParams.toString()+url.hash);
  applyLanguage();
});
$('#case-filter').addEventListener('change',renderCases);
$('#case-back').addEventListener('click',()=>{location.hash='cases'});
window.addEventListener('hashchange',route);

applyLanguage(); route(); startHero(); drawOutcome();
