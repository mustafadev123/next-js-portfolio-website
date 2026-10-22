# Content notes

## Where content lives

- `lib/content/profile.ts`: name, role, hero hook, proof points, contact details, education, bio, skills, nav
- `lib/content/experience.ts`: roles (`highlights` = full copy, `summary` = condensed copy)
- `lib/content/projects.ts`: all projects; optional `summary`, `image`, `year`, `slug`, `caseStudy`
- `lib/content/chat-context.ts`: builds the chatbot's system prompt from the above, so the assistant stays in sync
- `lib/projects-data.ts`: re-export kept for older imports

Adding a project: append an object to `projects`. Only `title`, `description`, `category`, `technologies` are required. Leave `image` empty for the generated cover. New categories appear in the Projects filters automatically.

## Synced with résumé (Oct 2026)

Source: `public/resume.pdf` (copied from `Mustufa_Resume.pdf`).

- Education: MS CS, Georgia State University (2026 – Present) + BSc CS, LUMS (Sep 2022 – Jun 2026), new coursework list
- Experience: added Google Summer of Code – Google DeepMind; Synergates now Jun – Oct 2024 with résumé bullets; 10Pearls bullets updated
- Projects: Auto-Analytics renamed to "Multi-Agent Auto-Analytics System (ContinuumAI)" with résumé copy and metrics; IntelliLearn and TB Detection updated (TB now Efficient ViT + SHAP/Grad-CAM, 94% F1); added Distributed Key-Value Store, RAG Diagnostic Assistant, Scalable Agentic RAG Platform
- Skills replaced with the résumé's five groups
- Phone now +1 (470) 819-7646; location Atlanta, Georgia (inferred from Georgia State enrolment)
- Name spelling standardised to "Mustufa" everywhere, including the chatbot

## Decided (Oct 2026)

- Keep Gerry's IT and Netsol on the site; keep the LUMS GPA (3.70)
- WhatsApp switched to the US number (+1 470-819-7646)
- Status line: "Open to SWE internships / full-time roles" (freelance line removed)
- Screenshot Zero image: frame from the demo video, cropped to `public/screenshot_zero.jpg`
- GuideWing demo: https://youtu.be/XbiNkC0ZHZ8 (public, verified playable)
- Social preview: `public/og-image.png` (1200×630), referenced in `app/layout.tsx`

## Open questions

| Topic | Current state | Needs |
| --- | --- | --- |
| Links for new projects | Raft KV store, RAG assistant, Agentic RAG platform, GSoC PR have no links | Repo / PR / demo URLs if public |
| Karachi City Guide vs CLICK | Project card says "Tourism portal…" linking click.gos.pk; résumé describes CLICK backend work at Synergates | Should the card describe your backend role? |
| Résumé PDF text layer | The PDF contains a hidden older header (Pakistani phone, duplicated "Education") that text extractors and ATS systems read | Re-export the PDF cleanly |
| Screenshots | Raft KV store, research and ML projects use generated covers | Real images when available |

## Link audit (2026-10-22)

All internal routes, images, the résumé and project links return 200 except:

- Multimodal TB Detection repo moved to `github.com/mustafadev123/Mutlimodal_tb_detection` (verified 200).
- `https://www.click.gos.pk/`: HTTP 500 from their server; link kept.
- LinkedIn blocks automated checks (status 999); URL unchanged.

## Known code issues

- Upgraded `next` 15.3.6 → 15.3.9 (patched release for the Dec 2025 security advisory).
- `npm run lint` fails: ESLint 9 can't read the legacy `.eslintrc.json` (needs a flat config).
- Tech logos in `public/` (~1 MB each) are no longer used on the home page; image optimisation is still disabled in `next.config.mjs`.
