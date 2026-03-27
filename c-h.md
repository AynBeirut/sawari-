Hi, I need help finishing my Sawari landing page project in this workspace.

Goal:
Make the website match my attached reference image exactly.

---

## Source of Truth Priority (STRICT ORDER)

1. **FINAL DESIGN image** (attached screenshot) — primary source of truth for layout, spacing, typography, and visual design. Always wins.
2. **`design/` folder** — real assets from the designer. Contains the correct final icons, images, and graphics to use.
3. **`assets/psd-export/`** — PSD-exported assets. Use for numbered image files referenced in HTML.
4. **ZIP file (`sawari-deploy-webuzo.zip`)** — reference code only. ⚠️ SOME SECTIONS ARE CORRECT, SOME ARE WRONG. Do NOT blindly copy from the zip. Always get confirmation from the user before adopting any section from the zip.

**Rule**: Never apply changes from the zip to a section without explicit user confirmation that the zip version of that section is correct.

---

Project files:
index.html, styles.css, script.js, server.js, assets/psd-export, design/

---

## Section Build Status

| # | Section | Status |
|---|---|---|
| 1 | Header + Hero | ✅ Done |
| 2 | Project Overview | ✅ Done |
| 3 | Amenities | ✅ Done (icons pending designer) |
| 4 | Video CTA | ✅ Done — filter fixed using 196-bg-7.png overlay |
| 5 | Location | ✅ Done — typography, vertical bar, tabs, map overlap with beige strip, font swap to Jost |
| 6 | Floor Plans | ✅ Done — beige backgrounds restored, floor plan image opacity/filter applied |
| 7 | Numbers / Stats | ✅ Done — border lines removed, white space reduced & centered, numbers color Myrtle Green |
| 8 | Photo Gallery | ✅ Done — navigation bar preserved, responsive gallery layout approved, center image larger, side images offset downward, click-to-fullscreen lightbox added |
| 9 | Virtual Tour | 🔲 Remaining |
| 10 | Philosophy (Animation) | 🔲 Remaining |
| 11 | FAQ | 🔲 Remaining |
| 12 | Newsletter | 🔲 Remaining |
| 13 | Register | 🔲 Remaining |
| 14 | Downloads | 🔲 Remaining |
| 15 | Footer | ⚠️ Layout done (grid, bars, columns, background) — content/typography remaining |

---

## SESSION HANDOFF NOTES (March 27, 2026 — Evening)

### ✅ Section 7 (Stats) — Fine-Tuned
- White space reduced from 320px → ~8rem symmetric padding
- Numbers vertically centered in the white area
- CSS version: v=42

### ✅ Section 15 (Footer) — Layout Done
- Grid: `1.25fr 1fr 1.5rem 1fr 1.5rem 1.75fr`
- Padding: `0 5vw 0 9.1vw`
- All 3 vlines: `margin-left: -4rem`
- Register col (nth-child 4): `margin-left: 3rem`
- Privacy col (nth-child 6): `margin-left: 1rem`
- Background: `#e5e2da` (Limestone Grey)
- Footer padding: `7rem 0 14rem`
- Git commit: f43affd

### 🔜 Next Steps (Priority Order)
1. **Fine-tuning pass** — review all ✅ sections for pixel-perfect parity with reference image
2. **Section 10 (Philosophy/Animation)** — scroll-triggered animation
3. **Real assets** — swap PSD placeholders with designer assets from `design/` folder once provided
4. **Sections 9, 11–14** — Virtual Tour, FAQ, Newsletter, Register, Downloads
5. **Section 15 content** — footer typography, links, and social icons

---

## SESSION HANDOFF NOTES (March 27, 2026)

### ✅ SECTION 8 (Photo Gallery) — COMPLETED

**✅ Navigation bar preserved:**
- All navigation bar adjustments match the design
- Positioning: 640px from left
- Title/subtitle pushed down with 2rem top padding
- Navigation bar expanded with proper top (1.5rem) and bottom (3.5rem) padding
- Gray baseline positioned at 3.2rem from bottom, ending at 22vw from right
- Active tab green underline positioned at -2.2rem to overlap gray baseline
- Both underlines properly inset with 2rem horizontal padding on buttons

**✅ Gallery grid/layout completed:**
- Bar structure restored so the beige gallery strip stays correct
- Global page zoom kept in place for the approved top layout, with gallery width compensated locally using `--page-zoom`
- Gallery image stage widened beyond the normal container without touching the bar
- Center gallery image kept dominant while side images remain smaller
- Left and right images pushed downward to match the design composition
- Bottom gallery progress line restored below the image stage
- Click-to-fullscreen gallery lightbox added for all three gallery images
- Cache-busted asset URLs updated: `styles.css?v=5`, `script.js?v=3`

**Final CSS values:**
- `.gallery-head-texts` → `padding-top: 2rem`
- `.gallery-filter` → `padding-left: max(640px, 8.3vw)`, `padding-top: 1.5rem`, `padding-bottom: 3.5rem`
- `.gallery-filter::after` → `bottom: 3.2rem`, `right: 22vw`, `left: calc(max(640px, 8.3vw) + 2rem)`
- `.gallery-filter button` → `padding: 0 2rem`, `margin-bottom: 2rem`
- `.gallery-filter button.active::after` → `bottom: -2.2rem`, `left: 2rem`, `right: 2rem`
- `.gallery .container` → `width: min(1833px, calc((100vw - 4rem) / var(--page-zoom, 1)))`, `margin-left: 50%`, `transform: translateX(-50%)`
- `.gallery-grid` → `grid-template-columns: 29.84% 36.88% 28.91%`, `gap: 2.18%`, `align-items: start`, `padding-bottom: 4.2rem`
- `.gallery-grid > img:first-child` → `margin-top: clamp(4.1rem, 5.8vw, 5.9rem)`
- `.gallery-grid > img:last-child` → `margin-top: clamp(4.1rem, 5.8vw, 5.9rem)`
- `.gallery-grid::before` → baseline from `left: 16.75%` to `right: 16.69%`
- `.gallery-grid::after` → active segment `left: 40.1%`, `width: 18.77%`

**HTML/JS additions:**
- Gallery images now use `.gallery-open` and `data-gallery-full`
- Added `#galleryLightbox`, `#galleryLightboxImage`, `#galleryLightboxClose`
- Added fullscreen gallery open/close logic in `script.js`
- Added category-based gallery switching for `Lobby`, `1 Bedroom`, `2 Bedrooms`, `3 Bedrooms`, `Garden`
- Added per-category bottom progress and fullscreen previous/next navigation
- Real category image population is paused until the designer sends the remaining images
- Gallery folders prepared under `assets/gallery/1bed`, `assets/gallery/2bed`, `assets/gallery/3bed`, `assets/gallery/garden`, and `assets/gallery/lobby`

---

## SESSION HANDOFF NOTES (March 26, 2026 — Midday)

### ✅ Completed This Session
- Section 4 (Video CTA): teal overlay fixed — replaced solid color+opacity with `196-bg-7.png` PNG overlay asset
- Section 5 (Location): top padding-top increased from `2.125rem` → `5.5rem` to match reference spacing
- Section 6 (Floor Plans): Restored beige backgrounds (167-bg-6.png, 166-bg-5.png), applied opacity 0.5 + brightness filter to floor plan image
- Section 7 (Stats): Removed border lines, adjusted vertical spacing (margin-top: -1rem, min-height: 320px), numbers color: Myrtle Green (#264620)

### ⚠️ Section 5 — Awaiting User Test
- Spacing fix applied. User will test and return with feedback.
- Do NOT touch Section 5 further until user confirms or provides new instructions.

---

## SESSION HANDOFF NOTES (March 25, 2026)

### ✅ Completed (March 25)
- Git: Reverted last 2 premature commits (git reset --hard HEAD~2 + force push)
- Section 4 (Video CTA): Background image filter structure rebuilt using ::before / ::after layers
- Section 4: CTA text font set to Futura, size 33px (corrected from 36px), weight 500, uppercase, #ffffff

### ~~⚠️ STILL BROKEN — Section 4 Filter~~ ✅ FIXED
Fixed by replacing `.video-cta::after` solid color overlay with `url('assets/psd-export/196-bg-7.png')` PNG asset.

### Typography Reference — Full Site

All headings/titles use: `font-family: 'Futura', 'Futura PT', sans-serif`

| Element | Font | Size (px) | Notes |
|---|---|---|---|
| All section titles (e.g. "Location & Connectivity") | Futura | 48.75 | Used site-wide for major headings |
| Corp / company name / hero large text | Futura | 80 | Hero/brand display size |
| Section 4 Video CTA text ("EXPLORE THE FUTURE / OF SAWARI AJMAN") | Futura | 33 | Confirmed 33px, uppercase |
| Location subtitle ("Strategically positioned…") | Futura | 33 | Section subtitle text |
| Stat numbers (75, 151, 275, 316) | Futura | 60 | Large stat figures |
| Stat labels ("Completed Projects", "Finished Projects", etc.) | Futura | 18 | Below stat numbers |
| Distance labels ("10 Mins Sharjah…", "13 Mins Al Zorah…") | Futura | 21.71 | Location connectivity strip |

**Summary of confirmed sizes**: 80 / 48.75 / 33 / 21.71 / 60 / 18

### Typography Reference (Section 4 — Video CTA)
- Font: `'Futura', 'Futura PT', sans-serif`
- Size: `33px` ← **corrected from earlier session (was wrongly set to 36px)**
- Weight: `500` (regular words) / `700` (strong tags)
- Case: `uppercase`
- Color: `#ffffff`
- Letter-spacing: `0.04em`

### CSS Variable
- `--deep: #4f6662` (the teal color used for the overlay)

### Brand Color Palette

| Name | Hex | CSS Variable |
|---|---|---|
| Pearl White | `#f2f2f4` | `--pearl-white` |
| Marble White | `#f3eee7` | `--marble-white` |
| Limestone Grey | `#e5e2da` | `--limestone` |
| Quill Grey | `#c6cfbf` | `--quill-grey` |
| Natural Beige | `#a3937b` |`--natural-beige` |
| Teakwood Beige | `#8d7f6a` | `--teakwood` |
| Palm Green | `#69713e` | `--palm-green` |
| Myrtle Green | `#264620` | `--myrtle` |
| Midnight Black | `#151207` | `--midnight` |
| Solid Black | `#000000` | `--black` |

### Section 4 HTML structure
```html
<section class="video-cta section-dark">
  <div class="container cta-inner reveal">
    <span class="cta-text-left">EXPLORE THE <strong>FUTURE</strong></span>
    <button class="play" type="button" aria-label="Play video">
      <img src="assets/psd-export/199-forma-1-4.png" alt="" />
    </button>
    <span class="cta-text-right">OF <strong>SAWARI AJMAN</strong></span>
  </div>
</section>
```

---

## Remaining Tasks

1. Replace any placeholders or wrong images with original PSD-exported assets where available.
2. Finish the bottom area parity:
   - Contact strip
   - Register Your Interest form block
   - Documents strip with correct PDF icons/text alignment
3. Build remaining sections:
  - Virtual Tour
  - Philosophy (Animation)
  - FAQ
  - Newsletter
  - Register
  - Downloads
  - Footer
4. Keep existing working interactions unless they conflict with the reference.

## Output format
Short plan → Applied file changes → Visual parity notes → Next small step

## Important
Keep responses concise. Avoid large repeated summaries to prevent request-size errors.
Edit styles.css directly using exact string replacements (Node.js if needed due to Unicode characters in comments).
Never use regex scripts that touch multiple selectors at once — they cause cascading syntax corruption.