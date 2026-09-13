# Independent RC4 audit — 13 September 2026

RC4 is a publication-hygiene refinement of RC3 after an independent post-build audit.

## Independently verified

- Fresh-package integrity and built-in validation.
- 17 public case reconstructions, 29 source records and 3 fictional scenarios.
- All 36 information-choice × action paths in the self-experiment: choice-specific evidence and distinct action-specific realised outcomes.
- Automatic completion after scenario 3 and explicit early termination.
- German/English rendering, dynamic accessibility labels and representative English experiment path.
- Mobile-width rendering without horizontal overflow in the independent headless DOM harness.
- No real-case Cipolla classification, person score or person profile.
- Public/private sentinel scan and absence of known Evidence-Hold topic names in the public tree.
- No raw operator email address; only the deliberately obfuscated contact form appears.
- No cookies, analytics, tracking, external runtime fonts/scripts/styles or browser persistence.
- Current legal/privacy text and GitHub Pages hosting disclosure checked against the documented release basis.

## Browser logic audit

An independent in-memory Chromium harness executed the shipped HTML, CSS, content and application JavaScript without modifying the artefact. The final suite passed **127/127 checks**, including all 36 experiment paths, case rendering, bilingual labels, mobile-width layout and finish-state behaviour.

The container environment blocks ordinary local HTTP Chromium navigation, so this harness verifies DOM/application behaviour rather than a live localhost transport path. Localhost transport and Safari rendering had already been demonstrated on the target Mac with the preceding release candidate; RC4 changes only publication-hygiene details described below.

After the RC4-specific refinements, a fresh-package Chromium smoke test was run again against the in-memory harness: **14/14 checks PASS**, covering case rendering, single rendering of the documented core, experiment progress/evidence/outcome, English UI, mobile overflow and page-error detection.

## RC4 refinements

1. Removed a redundant duplicate rendering of Ausgangslage / Neue Evidenz / Ex-post-Ausgang on real-case pages. The same documented facts are now shown once, as the three primary stage cards beneath the heading “Dokumentierte Eckpunkte”.
2. Replaced the 2025 Mindestlohnkommission source link with the official one-page PDF for the fifth decision, reducing dependence on a redirect/content-negotiation endpoint.
3. Updated release documentation and manifests after the independent audit.

## Residual limits

- The real-case pages are deliberately concise analytical reconstructions, not exhaustive monographs. Their sources allow readers to inspect the underlying primary material.
- Technical and editorial review cannot constitute a guarantee of legal certainty. Particularly sensitive future additions remain subject to the publication/legal gate described in the project methodology.

**Independent audit result: PASS — no known technical or methodological release blocker remains in RC4.**
