# MULTI-AI HANDOFF — „Wenn die Maschine zurückschaut“
## RC5 / 13. September 2026

This file is intended for the second AI/reviewer with access to Thomas Riepe’s Mac Studio. It is a current operational and conceptual handoff. Treat the installed project itself as the executable source of truth and the named methodology handoffs as the research source of truth.

---

## 1. Overall goal

Build and publish a visually strong, bilingual (German/English) public information app titled:

> **Wenn die Maschine zurückschaut / When the Machine Looks Back**

The central perspective reversal is: modern frontier LLMs have a comparison space and computational/textual breadth far beyond one human lifetime. The app uses that foreign comparison perspective as an observational tool for human and institutional decision processes under uncertainty.

The app has two principal analytic modes:

1. **Fictional self-experiment** — the user chooses information, receives choice-specific evidence, makes a decision, sees an action-specific realised outcome, and receives a multidimensional H/K/Q/D/G/R reasoning trace. Cipolla’s satirical consequence lens appears here.
2. **Source-grounded real case reconstructions** — documented institutional/company/historical episodes reconstructed from public evidence, with ex-ante information state, new evidence, ex-post outcome, H/K/Q/D/G/R analysis, counter-reading, explicit limits of inference, and source cards.

The app also contains the full introduction, methodology/source registry, legal/privacy/corrections page, bilingual UI, and pseudo-3D visualisations with accessible text/2D fallback.

---

## 2. New editorial rule — RC5 (important)

Thomas explicitly changed the public-language policy on 13 Sep 2026:

### Public copy must state positively what the app does.

Avoid defining the app through exclusion formulas such as “kein X”, “nicht Y”, “ohne Z” where the same meaning can be stated as scope/function.

The home-page six-dimension heading is now:

> **Der mehrdimensionale „CT-Scan“ durch die KI**

English:

> **The AI’s multidimensional “CT scan”**

Public copy must also avoid trigger vocabulary such as:

- IQ
- Intelligenz / intelligence score
- Dummheit / stupidity
- Persönlichkeitstest / personality test

The validator now blocks this vocabulary in the public app-facing source files.

The former real-case heading “Was dieser Fall nicht zeigt” is now:

> **Aussagegrenzen** / **Limits of inference**

All 17 scope paragraphs were rewritten positively in terms of evidentiary reach, analytical scope and additional evidence needs.

This is a public editorial-language rule, not a change to the underlying methodology.

---

## 3. Core H/K/Q/D/G/R framework

- **H — Horizontbewusstsein / Horizon awareness**: detects that the current model no longer fits or that something anomalous requires attention.
- **K — Weltkopplung / World coupling**: allows external evidence and resistance from reality to reach and alter the model.
- **Q — Diagnostische Informationssuche / Diagnostic inquiry**: chooses information with high discriminating power between competing explanations.
- **D — Strukturelle Durchdringung / Structural penetration**: identifies mechanisms, dependencies, feedback loops and structural conditions beneath events.
- **G — Generativität / Generativity**: generates alternative hypotheses, questions, measurements and options.
- **R — Evidenzsensitive Revision / Evidence-sensitive revision**: changes the model in proportion to the strength and diagnostic value of new evidence.

These dimensions interact; the public presentation now treats them as a multidimensional reasoning trace / “CT scan”.

---

## 4. Three analytic levels

The app preserves a strict separation between:

1. **Reasoning process** — how information was sought, interpreted and revised.
2. **Ex-ante decision quality** — whether a decision was well-founded given the information available at that time.
3. **Ex-post outcome** — what actually happened later.

This separation is central to the app and protects against hindsight bias and outcome bias.

---

## 5. Fictional self-experiment — current implementation

RC4/RC5 inherited a corrected experiment engine after an independent audit found two RC2 defects.

Current guarantees:

- exactly 3 scenarios;
- explicit progress indicator;
- early-exit control;
- each information choice yields its own evidence;
- each action yields its own realised outcome text;
- information acquisition, decision and realised outcome are distinct phases;
- all 36 information-choice × action paths were independently exercised;
- Cipolla points remain off quadrant axes;
- final output is a multidimensional H/K/Q/D/G/R reasoning trace.

RC4 independent in-memory Chromium audit: **127/127 checks PASS**.
RC4 post-refinement smoke audit: **14/14 checks PASS**.

---

## 6. Public real-case set — 17 cases / 29 sources

Current case IDs and titles:

1. `bnetza-gas-2022` — **Gaskrise 2022/23: Entscheiden vor dem Winter**
2. `bundesbank-inflation` — **Inflation 2021–23: Wenn Projektionen nach oben revidiert werden**
3. `siemens-gamesa-2023` — **Siemens Gamesa: Wenn technische Realität in die Planung einbricht**
4. `minimum-wage-commission` — **Mindestlohnkommission: Evidenz unter Verteilungs- und Zielkonflikten**
5. `climate-council` — **Expertenrat für Klimafragen: Prüfen, was eine Projektion wirklich trägt**
6. `munichre-risk-system` — **Munich Re als epistemisches Risikosystem**
7. `ergo-hmi-budapest` — **HMI/Budapest: Wenn Incentive-Design zur Governance-Frage wird**
8. `ergo-riester-2011` — **ERGO Riester 2011: Welche Information würde den Unterschied machen?**
9. `ergo-controls-2011-2026` — **Von Failure Modes zur Kontrollarchitektur**
10. `ergo-transformation` — **ERGO-Transformation 2016–2025: eingefrorene Ziele, spätere Ergebnisse**
11. `next-insurance` — **NEXT Insurance: Freeze now — judge later**
12. `munichre-nzia` — **Klima / NZIA: Revision des Ziels oder des Instruments?**
13. `munichre-nazi-history` — **Munich Re im Nationalsozialismus: institutionelle Anpassung, Nutzen und Verantwortung**
14. `munichre-ukraine` — **Russland/Ukraine 2022: externer Schock und Geschäftsrevision**
15. `munichre-remuneration` — **Vergütungsarchitektur: Was das System formal belohnt**
16. `ambition-2030` — **Ambition 2030: prospektive Governance-Wette**
17. `ergo-governance` — **ERGO Governance-Bündelung: Welche Checks and Balances sind dokumentiert?**

Each case carries:

- starting point;
- new evidence;
- ex-post outcome/current open status;
- prominent analytical assessment;
- guiding question;
- deeper contextual explanation;
- focused H/K/Q/D/G/R dimensions;
- counter-reading;
- explicit limits of inference;
- source cards.

Public source classes:

- P0 = hard primary source;
- P1 = institutional/scholarly historical primary anchor;
- S1 = strong secondary source, visibly attributed.

Source registry is in `data/content.js`.

---

## 7. Public/private boundary

A separate research/editorial layer was designed conceptually. Sensitive research or Evidence-Hold material must stay outside the public repository.

The public build has a hashed sentinel scan that blocks known private/Evidence-Hold topic leakage into the public tree.

RC3 found and removed an earlier metadata leak in an unlinked Markdown file; the validator now checks the whole public tree.

Public real cases use source-grounded episode reconstruction. Reputation-sensitive claims pass a dedicated publication gate; living-person knowledge/motive/intent claims require strong primary evidence and separate review before they can enter the public snapshot.

---

## 8. Legal/privacy state

Required public operator wording:

**Unabhängigkeit**

> Privates Informationsprojekt. Unabhängig von den dargestellten Unternehmen, Behörden, Institutionen oder Personen.

Public email spelling everywhere:

> `thomasriepe(at)gmail.com`

Never replace with an `@` address in public copy.

Provider/responsible person:

Thomas Riepe  
Heinz-Kapelle-Straße 12  
10407 Berlin  
Deutschland

The legal/privacy page currently includes:

- precautionary provider/editorial-responsibility notice aligned with § 18 MStV;
- static cookie- and tracker-free frontend description;
- GitHub Pages IP logging disclosure linked to GitHub documentation;
- Berlin journalistic/editorial personal-data working framework (§ 2 Abs. 7 / § 19 BlnDSG);
- normal-GDPR data-subject-rights section where applicable;
- corrections / objections / reply contact;
- short liability notice;
- source/usage-rights section;
- editorial standards and publication gate.

Legal certainty is treated conservatively; particularly sensitive future additions remain subject to publication/legal review.

---

## 9. UI / visual state

Design direction:

- dark, restrained editorial interface;
- mint/turquoise accent;
- strong typographic hierarchy;
- home hero with abstract perspective/3D comparison-space canvas;
- second perspective canvas for fictional outcome space;
- responsive layout tested at mobile width;
- keyboard/accessibility semantics and reduced-motion handling;
- DE/EN dynamic ARIA labels and metadata.

Safari on the target Mac had already rendered the preceding candidates correctly. User review of RC2 reported home/English/responsive/legal generally OK; requested richer real cases and finite experiment, which were implemented in RC2 and hardened further in RC3/RC4.

---

## 10. Current executable project locations on the Mac

After RC5 installation, authoritative installed project:

```text
~/Projects/machine-looks-back
```

Current/previous installed candidate before RC5 is likely already at that same path, because `INSTALL_LOCAL.sh` replaces the target after backing it up.

RC5 download expected at:

```text
~/Downloads/MACHINE_LOOKS_BACK_APP_RC5_2026-09-13.zip
```

If Safari auto-unpacks it:

```text
~/Downloads/machine-looks-back-rc5/
```

Useful search commands for the second AI on the Mac:

```bash
find "$HOME/Downloads" "$HOME/Projects" -maxdepth 3 \
  \( -iname '*MACHINE_LOOKS_BACK*' -o -iname 'machine-looks-back*' \) -print 2>/dev/null
```

and for the methodological source documents:

```bash
find "$HOME/Downloads" "$HOME" -maxdepth 4 -type f \
  \( -iname 'FALLSTUDIEN_BILDUNG_ALS_WEG_DEUTSCHLAND_HANDOFF_v1_2_FINAL_2026-09-06.md' \
  -o -iname 'PRIVATE_ERGO_MUNICH_RE_SENSITIVE_CASES_HANDOFF_v1_0_2026-09-09.md' \
  -o -iname 'Verifikations-und-Methodikprinzipien_Multi-AI-Committee*.md' \
  -o -iname 'DUAL_LENS_PREBUILD_RELEASE_BUNDLE_v1_0_2026-09-13.zip' \) -print 2>/dev/null
```

If a named source handoff is absent locally, retrieve it from the ChatGPT conversation/library by exact filename rather than reconstructing it from memory.

---

## 11. Authoritative methodology handoffs

Important prior source documents:

- `FALLSTUDIEN_BILDUNG_ALS_WEG_DEUTSCHLAND_HANDOFF_v1_2_FINAL_2026-09-06.md`
  - frozen public-methodology handoff before pilot;
  - SHA-256 recorded in project history: `7972d871c8d66a1329e666eefe6ad28f10cebe3ae10bfded19b6ba66e7a80c39`.
- `PRIVATE_ERGO_MUNICH_RE_SENSITIVE_CASES_HANDOFF_v1_0_2026-09-09.md`
  - deep ERGO/Munich-Re research and public/private publication logic;
  - SHA-256 recorded in project history: `b92d991f42ee9814a2ca0a329f0fc8c24d1f2ae3ff0ee813523aa55dbf4f3a70`.
- `Verifikations-und-Methodikprinzipien_Multi-AI-Committee(1).md`
  - cross-model verification, deterministic-tool priority, dated corrections, proposal-only automation, Blind-Spot principle.
- `MASTER_PREBUILD_RELEASE_BLUEPRINT_v1_0_2026-09-13.md`
- `PUBLICATION_RELEASE_GATE_v1_0_2026-09-13.md`

The current executable app incorporates the evolved decisions from these documents; where wording conflicts, the newer RC5 public-language policy controls public copy while the underlying evidence/publication methodology remains unchanged.

---

## 12. Introduction state

The old “Bildung” framing has been replaced by the perspective:

> **Wenn die Maschine zurückschaut**

The introduction retains Thomas’s deliberately intuitive comparison that current frontier-model data-centre compute is roughly comparable in raw substrate magnitude to **ten to one hundred tightly interconnected human brains**, plus the text-equivalent comparison to **hundreds of millions of books**. These are intentional project framing choices and should not be silently removed.

The introduction also retains the marmoset outside-view analogy, the two-part app architecture, H/K/Q/D/G/R, ex-ante/ex-post separation, Cipolla in the fictional self-experiment, and real-world source-grounded case reconstruction.

RC5 rewrites negative self-definition phrases into positive scope/function wording.

---

## 13. Verification principles

Project verification rules remain binding:

- agreement among LLMs is not proof;
- LLM corrections require verification too;
- deterministic tools take priority for mechanically checkable claims;
- contradictions trigger primary-source review rather than model-majority voting;
- corrections are dated and auditable;
- automated update pipelines are proposal-only;
- parser/classifier changes need positive and near-miss negative fixtures;
- final executable package must be tested after sealing, using its own validators.

---

## 14. Publication target and workflow

GitHub owner:

```text
thothrde
```

Repository target:

```text
https://github.com/thothrde/machine-looks-back
```

GitHub Pages target:

```text
https://thothrde.github.io/machine-looks-back/
```

Publishing script in project:

```text
scripts/PUBLISH_GITHUB_PAGES.sh
```

RC5 also contains:

```text
scripts/APPLY_RC5_AND_PUBLISH.sh
```

which verifies the sealed package, stops the old preview if needed, installs the candidate, runs verification again from the installed target, publishes through the authenticated GitHub CLI, and checks the live Pages URL for the RC5 CT-scan wording.

The user’s Mac preflight already showed `gh` authenticated as GitHub account `thothrde` with repository/workflow scopes.

---

## 15. Current publication status at handoff time

RC5 is intended to be the next public version. Treat publication as complete only after:

1. `PACKAGE VERIFY PASS` on the sealed RC5;
2. install to `~/Projects/machine-looks-back`;
3. GitHub push/Pages activation/update succeeds;
4. live URL returns the RC5 home-page wording;
5. live legal/privacy page is checked once after deployment.

Do not mark release complete merely because the repository push succeeded.

---

## 16. What the second AI should do if asked to review

1. Inspect the actual installed RC5 files on the Mac rather than relying on this summary alone.
2. Run `bash scripts/VERIFY_PACKAGE.sh`.
3. Inspect `app.js`, `data/content.js`, `tests/validate.mjs`, legal copy and release docs.
4. Confirm the new positive-language rule and banned-trigger vocabulary gate.
5. Re-check any challenged factual claim against the linked primary source.
6. For live-publication questions, inspect the actual GitHub repository/Pages URL and current commit, not a local candidate alone.
7. Preserve the public/private boundary and proposal-only governance.

---

## 17. Current high-level status

- Concept architecture: complete.
- Public UI: complete in DE/EN.
- Self-experiment: implemented and path-tested.
- 17 real cases: implemented with richer analytical assessment and explicit limits of inference.
- Sources: 29 registered public sources.
- Legal/privacy/corrections: implemented for current GitHub Pages design.
- Accessibility/responsive: tested in browser harness and Safari review.
- Visual design: implemented with two perspective/3D-like canvases.
- RC5 editorial revision: implemented.
- Remaining operational step: seal/verify RC5 and apply/publish it on the Mac, then verify the live Pages URL.

