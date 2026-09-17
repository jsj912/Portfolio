# TODO

Gaps left deliberately unfilled. Per ground rule 1 of the brief: anything the
CONTENT block does not supply is `null`, its UI element is hidden, and it is
listed here. Nothing on the site is invented to fill these in.

Fill any of them in by editing `src/content/site.ts` — the value stops being
`null` and the element appears on its own. No component changes needed.

## Assets you need to add

- [ ] **`public/resume.pdf`** — not present. The hero's "Download Resume" button
      is hidden until this file exists; the build checks for it. Drop the PDF in
      at that exact path and it appears.

## Null fields in `src/content/site.ts` (23)

- [ ] `profile.photo`
      No headshot supplied. Any avatar/photo UI stays unrendered.
- [ ] `education[1].place  (Indian Institute of Technology, Madras)`
      Field omitted in the brief; the line is not rendered.
- [ ] `education[1].detail  (Indian Institute of Technology, Madras)`
      Field omitted in the brief; the line is not rendered.
- [ ] `matches[samsung-moe].links.github`
      No github link; that button is not rendered.
- [ ] `matches[samsung-moe].links.demo`
      No demo link; that button is not rendered.
- [ ] `matches[samsung-moe].links.report`
      No report link; that button is not rendered.
- [ ] `matches[ringshield].links.github`
      No github link; that button is not rendered.
- [ ] `matches[ringshield].links.demo`
      No demo link; that button is not rendered.
- [ ] `matches[ringshield].links.report`
      No report link; that button is not rendered.
- [ ] `matches[amsdds].links.github`
      No github link; that button is not rendered.
- [ ] `matches[amsdds].links.demo`
      No demo link; that button is not rendered.
- [ ] `matches[amsdds].links.report`
      No report link; that button is not rendered.
- [ ] `matches[network-anomaly].links.github`
      No github link; that button is not rendered.
- [ ] `matches[network-anomaly].links.demo`
      No demo link; that button is not rendered.
- [ ] `matches[smart-glasses].links.demo`
      No demo link; that button is not rendered.
- [ ] `matches[he-iot].period`
      No date range given; the period chip is not rendered.
- [ ] `matches[he-iot].links.github`
      No github link; that button is not rendered.
- [ ] `matches[he-iot].links.demo`
      No demo link; that button is not rendered.
- [ ] `matches[he-iot].links.report`
      No report link; that button is not rendered.
- [ ] `matches[he-iot].recap.arena`
      No arena; that scoreboard row is not rendered.
- [ ] `publications[1].venue`
      No venue; not rendered. Title: Hallucinations, Adversarial Vulnerabilities, and Mit...
- [ ] `publications[2].venue`
      No venue; not rendered. Title: An Extensible Mixture-of-Experts Architecture for On...
- [ ] `publications[2].note`
      No note; not rendered. Title: An Extensible Mixture-of-Experts Architecture for On...

## Notes

- The phone number is intentionally absent everywhere and must stay that way.
  `npm run check:content` fails the build if it ever reappears.
- All three publications are in preparation. The UI says exactly that and shows
  no DOI, link, or "Published" wording, because none exist.
