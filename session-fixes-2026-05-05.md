# Sawari Website Fixes - Session May 5, 2026

## Summary
Fixed Arabic translation errors, improved floor plan labeling system, and enhanced UI consistency across both English and Arabic versions.

---

## Arabic Version (index-ar.html)

### 1. Gallery Filter Styling
**Issue:** Gallery filter horizontal decorative line was misaligned  
**Fix:** Adjusted CSS positioning for Arabic RTL layout
- File: `styles.css`
- Lines: 3432-3436 (RTL gallery filter bar)
- Changes:
  - `left: calc(max(735px, 9.3vw) + 0rem) !important`
  - `right: 29vw !important`
  - `bottom: 3.2rem !important`
- Also fixed 4 bedrooms indicator position: `bottom: -1.7rem !important`
- Removed white gap: `margin-bottom: 0` on gallery filter section

### 2. Spelling Corrections
**Issue:** Incorrect Arabic words used in overview and philosophy sections  
**Fix:** Corrected terminology
- File: `index-ar.html`
- **Line 91:** `حضرية` → `حضارية` (urban → civilizational)
  - Full text: "واحة حضارية" (civilizational oasis)
- **Line 372:** `منطقة سنترال بوينت` → `المنطقة المركزية` (Central Point area → The central district)

### 3. Phone Number Formatting
**Issue:** Phone numbers displayed incorrectly with Arabic RTL text direction  
**Fix:** Added proper formatting and display
- File: `index-ar.html`, Line 485
- Changed: `1 800 312 2121 / 1 800 311 1010`
- To: `+1 800 312 2121 / +1 800 311 1010`
- Added `dir="ltr"` attribute for left-to-right display
- File: `styles.css`, Line 3615-3617
- Added: `white-space: nowrap` to prevent line wrapping

### 4. Floor Plan Labels (floor-plans-ar.html)
**Issue:** Floor plan type labels were in English on Arabic page  
**Fix:** Translated all bedroom type labels to Arabic
- **2 Bedroom Plans:**
  - `2 BED TYPE 1` → `غرفتين نوم – النوع 1`
  - `2 BED TYPE 2` → `غرفتين نوم – النوع 2`
- **3 Bedroom Plans:**
  - `3 BED TYPE 1-4` → `3 غرف نوم – النوع 1-4`
- **4 Bedroom Plans:**
  - `4 BED TYPE 1` → `4 غرف نوم – النوع 1`
- **Duplex Floor Labels:**
  - `LOWER FLOOR` → `الطابق السفلي`
  - `UPPER FLOOR` → `الطابق العلوي`

---

## Both Versions (English & Arabic)

### 5. Floor Plan Carousel Titles
**Issue:** Floor plans didn't show type numbers consistently, causing confusion  
**Fix:** Added type numbers to all plan titles and removed duplicate subtitles
- File: `data/plans.json`
- **Changes:**
  1. Plan 1: `ONE BED APARTMENT` → `ONE BED APARTMENT - TYPE 1`
  2. Plan 2: `TWO BED APARTMENT` → `TWO BED APARTMENT - TYPE 1`
  3. Plan 3: `TWO BED APARTMENT` → `TWO BED APARTMENT - TYPE 2`
  4. Plan 4: `THREE BED APARTMENT` → `THREE BED APARTMENT - TYPE 1`
  5. Plan 5: `THREE BED APARTMENT` → `THREE BED APARTMENT - TYPE 2`
  6. Plan 6: `THREE BED APARTMENT` → `THREE BED APARTMENT - TYPE 3`
  7. Plan 7: `THREE BED APARTMENT` → `THREE BED APARTMENT - TYPE 4`
  8. Plan 8: `THREE BED APARTMENT - TYPE 4A` → `THREE BED APARTMENT - TYPE 4` (removed A)
  9. Plan 9: `FOUR BED APARTMENT` → `FOUR BED APARTMENT - TYPE 1`
  10-13. Duplex plans: Already had type numbers, kept as is
- Removed all duplicate `subtitle` fields (set to empty string)

### 6. Arabic Translation Logic
**Issue:** New floor plan title format needed proper Arabic translation  
**Fix:** Updated translation function to handle new format
- File: `script.js`, Lines 115-135
- Added translations for:
  - `ONE BED APARTMENT - TYPE` → `شقة بغرفة نوم واحدة - نوع`
  - `TWO BED APARTMENT - TYPE` → `شقة بغرفتي نوم - نوع`
  - `THREE BED APARTMENT - TYPE` → `شقة بثلاث غرف نوم - نوع`
  - `FOUR BED APARTMENT - TYPE` → `شقة بأربع غرف نوم - نوع`

---

## Results

### Arabic Floor Plan Display (1/13 to 13/13):
1. شقة بغرفة نوم واحدة - نوع 1
2. شقة بغرفتي نوم - نوع 1
3. شقة بغرفتي نوم - نوع 2
4. شقة بثلاث غرف نوم - نوع 1
5. شقة بثلاث غرف نوم - نوع 2
6. شقة بثلاث غرف نوم - نوع 3
7. شقة بثلاث غرف نوم - نوع 4
8. شقة بثلاث غرف نوم - نوع 4
9. شقة بأربع غرف نوم - نوع 1
10. دوبلكس 4 غرف نوم - النوع 1 - الطابق السفلي
11. دوبلكس 4 غرف نوم - النوع 1 - الطابق العلوي
12. دوبلكس 4 غرف نوم - النوع 2 - الطابق السفلي
13. دوبلكس 4 غرف نوم - النوع 2 - الطابق العلوي

### English Floor Plan Display:
Same structure with type numbers now clearly visible in title.

---

## Files Modified

1. **styles.css**
   - Gallery filter Arabic positioning
   - Phone number white-space fix

2. **index-ar.html**
   - Spelling corrections (حضارية, المنطقة المركزية)
   - Phone number format and dir attribute

3. **floor-plans-ar.html**
   - All bedroom type labels translated to Arabic
   - Floor level labels (LOWER/UPPER) translated

4. **data/plans.json**
   - Added type numbers to all plan titles
   - Removed duplicate subtitle information

5. **script.js**
   - Updated `localizePlanText()` function
   - Added translations for new title format

---

## Git Commits

1. `fe4622f` - Fix Arabic gallery filter bar position and remove white gap
2. `5f406ca` - Fix Arabic floor plan labels and phone number formatting
3. `e92f985` - Fix Arabic spelling: حضارية, المنطقة المركزية, and phone number display
4. `a2166ec` - Fix Arabic floor plan titles - add type numbers and remove duplicates

---

## Deployment

**Package:** `sawari-deployment-2026-05-05.zip` (103.4 MB)  
**Status:** Ready for production deployment  
**Includes:** All HTML, CSS, JS, assets, data, and admin files with latest fixes
