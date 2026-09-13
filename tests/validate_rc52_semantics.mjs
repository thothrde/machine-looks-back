import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  INTRO, DIMENSIONS, CASES, CASE_EXTENDED, SCENARIOS, LEGAL
} from '../data/content.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const content = fs.readFileSync(path.join(root, 'data/content.js'), 'utf8');

function fail(msg){ console.error(`RC5.2 SEMANTIC FAIL: ${msg}`); process.exit(1); }
function assert(cond,msg){ if(!cond) fail(msg); }

function walkPairs(obj, pathName='root', out=[]){
  if(!obj || typeof obj !== 'object') return out;
  if(typeof obj.de === 'string' || typeof obj.en === 'string'){
    assert(typeof obj.de === 'string' && obj.de.trim(), `${pathName}.de missing`);
    assert(typeof obj.en === 'string' && obj.en.trim(), `${pathName}.en missing`);
    out.push(pathName);
  }
  for(const [k,v] of Object.entries(obj)){
    if(v && typeof v === 'object') walkPairs(v, `${pathName}.${k}`, out);
  }
  return out;
}

const pairPaths = walkPairs({DIMENSIONS, CASES, CASE_EXTENDED, SCENARIOS});
assert(pairPaths.length >= 220, `unexpected bilingual pair count ${pairPaths.length}`);

function countTag(html, tag){
  return (html.match(new RegExp(`<${tag}\\b`, 'g')) || []).length;
}
for(const tag of ['h1','h2','p','li']){
  assert(countTag(INTRO.de,tag) === countTag(INTRO.en,tag),
    `INTRO DE/EN ${tag} count differs: ${countTag(INTRO.de,tag)} vs ${countTag(INTRO.en,tag)}`);
}

const enMarkers = [
  'What information was sought, which alternatives were considered, which structures were recognised?',
  'This question may be answered only from what was known at that point in time.',
  'Customer complaints disappear as outliers.',
  'Which incentive structure, overlooked feedback loop or technical dependency produced the result?',
  'A thousand cases can still miss the relevant error class'
];
for(const marker of enMarkers) assert(INTRO.en.includes(marker), `English parity marker missing: ${marker}`);

const forbiddenDuplicates = [
  'Entscheidend ist die Trennschärfe der Information.',
  'What matters is the discriminating power of the information.',
  'Was gewinnt oder verliert der Handelnde? Was gewinnen oder verlieren andere? Daraus'
];
for(const x of forbiddenDuplicates) assert(!content.includes(x), `duplicate wording remains: ${x}`);

assert(app.includes("['Reputations-Risikostufen'"), 'German R0/R1 methodology definition missing');
assert(app.includes("['Reputational risk levels'"), 'English R0/R1 methodology definition missing');
assert(app.includes("riskMeaning:r=>r==='R1'"), 'R0/R1 accessible risk meaning missing');

assert(app.includes("experiment.history.map((h,i)=>"), 'final trace does not iterate completed-scenario history');
assert(app.includes("${traceRows(h.traces||{})}"), 'final trace does not render each stored scenario trace');
assert(app.includes("if(experiment.phase==='finished'){"), 'finished-state trace branch missing');
assert(!app.includes("summaryIntro:'Die Zusammenfassung verdichtet"), 'old German aggregate claim remains');
assert(!app.includes("summaryIntro:'The summary condenses"), 'old English aggregate claim remains');

assert(SCENARIOS.length === 3, `expected 3 scenarios, got ${SCENARIOS.length}`);
assert(DIMENSIONS.map(d=>d.id).join('') === 'HKQDGR', 'dimension set/order changed');
for(const s of SCENARIOS){
  assert(s.infoChoices.length === 4, `${s.id}: expected 4 information choices`);
  assert(s.actions.length === 3, `${s.id}: expected 3 actions`);
}

console.log(`RC5.2 SEMANTIC PASS: ${pairPaths.length} bilingual pairs; INTRO structural parity; per-scenario final traces; R0/R1 defined; duplicate wording removed.`);
