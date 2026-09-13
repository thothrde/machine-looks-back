import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { CASES, CASE_EXTENDED, SOURCES, DIMENSIONS, SCENARIOS, LEGAL, INTRO } from '../data/content.js';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const errors=[];
const ok=(cond,msg)=>{if(!cond)errors.push(msg)};
const reqBoth=(obj,label)=>{ok(obj && typeof obj.de==='string' && obj.de.trim(),`${label}: missing de`);ok(obj && typeof obj.en==='string' && obj.en.trim(),`${label}: missing en`)};

ok(CASES.length>=17,`expected at least 17 public cases, got ${CASES.length}`);
ok(new Set(CASES.map(c=>c.id)).size===CASES.length,'duplicate case id');
ok(new Set(DIMENSIONS.map(d=>d.id)).size===6,'dimensions must be H/K/Q/D/G/R');
ok(SCENARIOS.length>=3,'expected at least three fictional scenarios');

ok(Object.keys(CASE_EXTENDED).length===CASES.length,`expected extended notes for every case, got ${Object.keys(CASE_EXTENDED).length}/${CASES.length}`);
for(const c of CASES){
  const ext=CASE_EXTENDED[c.id];
  ok(Boolean(ext),`case ${c.id}: missing extended note`);
  if(ext){ reqBoth(ext.question,`case ${c.id}.extended.question`); reqBoth(ext.detail,`case ${c.id}.extended.detail`); }
  for(const k of ['title','teaser','initial','evidence','outcome','analysis','counter','whatNot']) reqBoth(c[k],`case ${c.id}.${k}`);
  ok(Array.isArray(c.sources)&&c.sources.length>0,`case ${c.id}: no sources`);
  ok(Array.isArray(c.dimensions)&&c.dimensions.length>0,`case ${c.id}: no dimensions`);
  for(const sid of c.sources) ok(Boolean(SOURCES[sid]),`case ${c.id}: missing source ${sid}`);
  for(const d of c.dimensions) ok(['H','K','Q','D','G','R'].includes(d),`case ${c.id}: invalid dimension ${d}`);
  const serialized=JSON.stringify(c);
  ok(!/cipollaClass|personScore|epistemicProfile/i.test(serialized),`case ${c.id}: forbidden person/Cipolla field`);
}
for(const [id,s] of Object.entries(SOURCES)){
  ok(/^https:\/\//.test(s.url),`source ${id}: non-https URL`);
  ok(['P0','P1','S1'].includes(s.type),`source ${id}: invalid public source type ${s.type}`);
  ok(Boolean(s.publisher&&s.date&&s.titleDe&&s.titleEn),`source ${id}: incomplete metadata`);
}
for(const sc of SCENARIOS){
  reqBoth(sc.title,`scenario ${sc.id}.title`);reqBoth(sc.setup,`scenario ${sc.id}.setup`);
  ok(sc.infoChoices.length>=3,`scenario ${sc.id}: too few info choices`);ok(sc.actions.length>=3,`scenario ${sc.id}: too few actions`);
  for(const choice of sc.infoChoices){reqBoth(choice.label,`scenario ${sc.id}.infoChoice ${choice.id}.label`);reqBoth(choice.evidence,`scenario ${sc.id}.infoChoice ${choice.id}.evidence`);}
  for(const action of sc.actions){reqBoth(action.label,`scenario ${sc.id}.action ${action.id}.label`);reqBoth(action.outcomeText,`scenario ${sc.id}.action ${action.id}.outcomeText`);ok(action.outcome && Number.isFinite(action.outcome.self) && Number.isFinite(action.outcome.others),`scenario ${sc.id}.action ${action.id}: invalid numeric outcome`);ok(action.outcome.self!==0 && action.outcome.others!==0,`scenario ${sc.id}.action ${action.id}: Cipolla point may not lie on an axis`);}

}

const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const content=fs.readFileSync(path.join(root,'data/content.js'),'utf8');
const publicText=index+'\n'+app+'\n'+content;
ok(!/mailto:/i.test(publicText),'mailto link is forbidden by project preference');
ok(!/thomasriepe@gmail\.com/i.test(publicText),'email with @ is forbidden');
ok((publicText.match(/thomasriepe\(at\)gmail\.com/g)||[]).length>=2,'obfuscated email missing');
ok(!/<script[^>]+src=["']https?:/i.test(index),'external runtime script found');
ok(!/<link(?=[^>]*rel=["']stylesheet["'])[^>]+href=["']https?:/i.test(index),'external runtime stylesheet found');
ok(!/localStorage|document\.cookie|gtag\(|google-analytics|matomo|segment\.com/i.test(app),'tracking or persistent browser storage found');
ok(content.includes('Privates Informationsprojekt. Unabhängig von den dargestellten Unternehmen, Behörden, Institutionen oder Personen.'),'required independence wording missing');
ok(INTRO.de.includes('zehn bis hundert eng miteinander verschalteten menschlichen Gehirnen'),'required intuitive compute comparison missing');
ok(INTRO.de.includes('Hunderten von Millionen Büchern äquivalent ist'),'required book-equivalent wording missing');
ok(!INTRO.de.includes('Die KI steht unter Kontrolle'),'removed introduction section reappeared');
const publicFacingText=[index,app,content].join('\n');
const forbiddenEditorialTerms=[/\bIQ\b/i,/Intelligenz/i,/Dummheit/i,/\bintelligence score\b/i,/\bstupidity\b/i,/personality test/i];
for(const rx of forbiddenEditorialTerms) ok(!rx.test(publicFacingText),`forbidden editorial trigger vocabulary found: ${rx}`);
ok(!publicFacingText.includes('Kein Persönlichkeitstest. Kein Intelligenzwert.'),'deprecated negative home heading reappeared');
ok(!publicFacingText.includes('Not a personality test. Not an intelligence score.'),'deprecated negative English home heading reappeared');
ok(!publicFacingText.includes('Was dieser Fall nicht zeigt'),'deprecated negative case-scope heading reappeared');
ok(!publicFacingText.includes('What this case does not show'),'deprecated negative English case-scope heading reappeared');

ok(index.includes('Content-Security-Policy'),'CSP meta missing');
ok(index.includes('./styles.css') && index.includes('./app.js'),'local runtime assets missing from HTML');
ok(fs.existsSync(path.join(root,'robots.txt')) && fs.existsSync(path.join(root,'sitemap.xml')),'robots/sitemap missing');
ok(content.includes('§ 2 Abs. 7 und § 19 BlnDSG'),'Berlin journalistic privacy framework missing');
ok(content.includes('Korrekturstand') && content.includes('Correction status'),'bilingual correction status missing');


ok(!INTRO.de.includes('<p class="closing"><strong>Ein Beobachtungsrahmen.</strong></p>'),'orphan closing line reappeared');
ok(app.includes('experiment.history') && app.includes('finishExperiment'),'experiment completion flow missing');
ok(!app.includes('(experiment.scenarioIndex+1)%SCENARIOS.length'),'self-experiment must not loop endlessly');
ok(content.includes('Betroffenenrechte bei normaler DSGVO-Verarbeitung'),'privacy rights section missing');
ok(!content.includes('Erstveröffentlichung: 13. September 2026'),'premature initial-publication claim reappeared');
ok(fs.existsSync(path.join(root,'package.json')),'package.json missing');


ok(!content.includes('reveal:both('),'scenario-level fixed reveal is forbidden; evidence must depend on chosen information');
ok(app.includes('chosen.evidence'),'experiment must render choice-specific evidence');
ok(app.includes('a.outcomeText'),'experiment must render action-specific realised outcome text');
ok(!/txt\(s\.reveal\)/.test(app),'scenario reveal must not be reused as realised outcome');
ok(app.includes("ariaDimensions") && app.includes("ariaOutcomeCanvas"),'bilingual accessibility labels missing');

const publicTreeText=[publicText,...fs.readdirSync(path.join(root,'docs')).map(f=>fs.readFileSync(path.join(root,'docs',f),'utf8')),fs.readFileSync(path.join(root,'README.md'),'utf8'),fs.readFileSync(path.join(root,'CORRECTIONS.md'),'utf8')].join('\n');
const blockedTokenHashes=new Set([
  'f08225b4125a145dbffb256b7437585826b82b7fad59a23be7a15e081aa19e21',
  'c7468d2ec05baa0ef97d9d8b3440c2727f7871d4cd735ae422dfd038b1793191',
  'cff7b61166089e3b1fa0b20c185c2231093963197f75165c86af55211a3a4991',
  'dc0de1d79c49fc2cb4a66ac4d6eaf0c8da5b03d283282bffd20f453deebfa766',
  'd0f2323599c1b40a5ff182ebced1ae00af5522f614ddbf14fc38eb83396a5e26',
  '99aa11bfbb75115face0a2a8b6caadb171ae9d550ae5966e74faeeef41e28dd2',
  'd921059923b3189afe4bcf4a6917278770e8c3c37926f44dddd2ca14f3acd838',
  'ccf1799b3a2820e602dfcb2ade142591e53a8fa3717b09739767aeb8f442b781'
]);
const publicTokens=publicTreeText.toLowerCase().match(/[a-z0-9_äöüß-]+/g)||[];
const leakedToken=publicTokens.find(tok=>blockedTokenHashes.has(crypto.createHash('sha256').update(tok).digest('hex')));
ok(!leakedToken,'private/evidence-hold sentinel leaked into public tree');
ok(index.includes('name="referrer" content="no-referrer"'),'no-referrer policy meta missing');
if(errors.length){console.error('VALIDATION FAIL');for(const e of errors)console.error(' -',e);process.exit(1)}
console.log(`VALIDATION PASS: ${CASES.length} cases, ${Object.keys(SOURCES).length} sources, ${SCENARIOS.length} scenarios`);
