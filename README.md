# Wenn die Maschine zurückschaut / When the Machine Looks Back

Release candidate RC5.2, 13 September 2026.

A static, bilingual public information app built around a multidimensional “CT scan” of reasoning movements, a finite fictional self-experiment, and source-grounded real-world case reconstructions.

## Included

- German / English UI and full introduction
- shareable language selection via `?lang=de` / `?lang=en`
- finite three-scenario fictional self-experiment with explicit progress, early-exit option, choice-specific evidence, action-specific realised outcomes and a multidimensional H/K/Q/D/G/R reasoning trace
- Cipolla consequence lens in the fictional self-experiment
- 17 documented real-world case reconstructions with prominent analytical assessment, guiding question, deeper context, focused dimensions, counter-reading and explicit limits of inference
- 29-source public registry plus per-case source cards
- perspective pseudo-3D canvas visualisations with text/2D accessibility fallback
- methodology, corrections, legal notice, privacy, data-subject-rights, editorial standards, source-rights and liability sections
- conservative public/private claim boundary
- deterministic package/release validator
- read-only Mac preflight, local preview, local install and GitHub Pages publishing scripts

## 1 — Verify extracted package

```bash
bash scripts/VERIFY_PACKAGE.sh
```

## 2 — Read-only Mac preflight

```bash
bash scripts/PREFLIGHT.sh
```

## 3 — Install locally

```bash
bash scripts/INSTALL_LOCAL.sh
```

Default target: `~/Projects/machine-looks-back`.
An existing target is backed up before replacement.

## 4 — Preview on the Mac

```bash
bash "$HOME/Projects/machine-looks-back/scripts/RUN_LOCAL.sh"
```

Default preview: `http://127.0.0.1:8797/`

Stop it with:

```bash
bash "$HOME/Projects/machine-looks-back/scripts/STOP_LOCAL.sh"
```

## 5 — Publish

```bash
cd "$HOME/Projects/machine-looks-back"
bash scripts/PUBLISH_GITHUB_PAGES.sh
```

Default target:

- GitHub owner: `thothrde`
- repository: `machine-looks-back`
- Pages URL: `https://thothrde.github.io/machine-looks-back/`

The publishing script validates content before pushing and preserves any unrelated existing Git remote.

## Editorial language principle introduced in RC5

The public app states positively what it does. The home page, introduction, method section and case framework describe the multidimensional H/K/Q/D/G/R analysis, source-grounded episode reconstruction, counter-readings, limits of inference and publication gates directly. Trigger vocabulary such as `IQ`, `Intelligenz`, `Dummheit`, `intelligence score`, `stupidity` and `personality test` is blocked from the public application copy by the validator.


## RC5.2 semantic corrections

- final self-experiment output now renders the complete H/K/Q/D/G/R trace separately for every completed situation, preserving the three situations instead of showing only the last one
- R0/R1 reputational-risk levels are defined publicly in German and English as editorial review-depth markers
- duplicated Cipolla and Q wording removed
- the English introduction has been expanded to full substantive parity with the German version
- `tests/validate_rc52_semantics.mjs` guards these invariants in future releases

## Independent audit

`docs/INDEPENDENT_AUDIT_RC5_2026-09-13.md` records the RC5 publication audit. RC5.2 adds a dedicated semantic regression test for the corrections listed above.
