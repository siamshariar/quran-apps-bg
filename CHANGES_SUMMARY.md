# Translation URL Dynamic Routing - Changes Summary

## Date: November 10, 2025

## Problem Statement
The application was hardcoded to use `vietnamese_hassan` as the base translation (URLs without translation code). This needed to be changed to dynamically support any language's first translation as the base.

## Requirements
1. **Base route** (`/chapters/[slug]`) should show the **first available translation** for the configured language
2. **Both URL formats should work**:
   - `/chapters/11-hud` → Shows first translation (e.g., `korean_hamid`)
   - `/korean_hamid/chapters/11-hud` → Shows same translation explicitly
3. **Translation switching** should update URLs dynamically:
   - First translation → Base URL (no code)
   - Other translations → URL with code (`/[code]/chapters/[slug]`)
4. **Chapter navigation** should maintain correct URL format based on active translation

## Changes Made

### 1. Core Configuration Updates (`lib/config.js`)

#### Added Helper Functions:
- **`getFirstAvailableTranslation()`**: Returns the first translation code for the current language
- **`isFirstTranslation(code)`**: Checks if a translation code is the first in the list
- **`buildChapterUrl(slug, translationCode)`**: Builds the correct chapter URL based on translation

```javascript
// Example usage:
getFirstAvailableTranslation() // Returns "korean_hamid" for Korean locale
isFirstTranslation("korean_hamid") // Returns true
isFirstTranslation("korean_rwwad") // Returns false
buildChapterUrl("11-hud", "korean_hamid") // Returns "/chapters/11-hud"
buildChapterUrl("11-hud", "korean_rwwad") // Returns "/korean_rwwad/chapters/11-hud"
```

### 2. Context Updates (`contexts/SettingsContext.js`)

#### Smart Translation Change Handler:
- Detects base routes (without translation code) and initializes with first translation
- When changing translations:
  - **TO first translation**: Removes code from URL
  - **FROM first translation**: Adds code to URL
  - **Between non-first**: Updates code in URL

```javascript
// Initialization for base routes
if (/^\/(chapters|subjective)\//.test(pathname)) {
  translation = getFirstAvailableTranslation()
}

// Translation change logic
changeTranslation: (newTranslation) => {
  if (isFirstTranslation(newTranslation)) {
    // Remove code from URL
    router.push(`/chapters/${slug}`, undefined, { shallow: true })
  } else if (isFirstTranslation(currentTranslation)) {
    // Add code to URL
    router.push(`/${newTranslation}/chapters/${slug}`, undefined, { shallow: true })
  } else {
    // Change code in URL
    router.push(path.replace(currentTranslation, newTranslation), undefined, { shallow: true })
  }
}
```

### 3. Page Component Updates

#### Base Route (`pages/chapters/[slug]/index.js`):
- Uses `getFirstAvailableTranslation()` to load the first translation
- Handles dynamic translation changes via event listener
- Shows error message if data is missing
- Updated `getStaticProps` to use first available translation

#### Translation-Specific Route (`pages/[translationCode]/chapters/[slug].js`):
- Validates translation code against available translations
- Returns 404 if translation data not available
- Supports all valid translation codes

### 4. Component Updates

#### Updated Components with Dynamic First Translation Logic:

1. **`components/layout2/surah/content.js`**
   - Replaced `vietnamese_hassan` checks with `isFirstTranslation()`
   - Updated navigation link generation (prev/next chapter)
   - Uses `buildChapterUrl()` for chapter links

2. **`components/sidenav/chapter-list.js`**
   - Updated chapter list links to use dynamic first translation
   - Imports and uses `isFirstTranslation()`

3. **`components/home/chapter-card.js`**
   - Updated chapter card links
   - Uses dynamic translation prefix

4. **`components/layout2/web/chapter-list.js`**
   - Updated web chapter list links
   - Uses `isFirstTranslation()` for link generation

### 5. Environment Configuration (`.env.local`)

```bash
# Localization Configuration
NEXT_PUBLIC_LOCALIZATION_CODE=kr

# Korean translations
NEXT_PUBLIC_DEFAULT_TRANSLATION_KR=korean_hamid
```

## How It Works Now

### Korean Configuration Example:

**Available Translations:**
1. `korean_hamid` - Hamed Choi (First translation)
2. `korean_rwwad` - Ruwwad Translation Center (Second translation)

**URL Behavior:**

| Scenario | URL | Translation Shown | Notes |
|----------|-----|-------------------|-------|
| Visit base route | `/chapters/11-hud` | `korean_hamid` | First translation, no code |
| Visit with first code | `/korean_hamid/chapters/11-hud` | `korean_hamid` | Explicit first translation |
| Visit with other code | `/korean_rwwad/chapters/11-hud` | `korean_rwwad` | If available in API |
| Navigate to next chapter | `/chapters/12-yusuf` | `korean_hamid` | Maintains base format |
| Switch to 2nd translation | `/korean_rwwad/chapters/11-hud` | `korean_rwwad` | Adds code to URL |
| Switch back to 1st | `/chapters/11-hud` | `korean_hamid` | Removes code from URL |

### Vietnamese Configuration Example:

**Available Translations:**
1. `vietnamese_hassan` - Hasan Abdul-Karim (First translation)
2. `vietnamese_rwwad` - Ruwwad Translation Center (Second translation)

**URL Behavior:**
- `/chapters/1-al-fatihah` → Shows `vietnamese_hassan`
- `/vietnamese_rwwad/chapters/1-al-fatihah` → Shows `vietnamese_rwwad`

## Key Features

✅ **Language-Agnostic**: Works for any language configuration
✅ **SEO-Friendly**: Clean URLs for the primary translation
✅ **Backwards Compatible**: All existing URLs continue to work
✅ **Dynamic Switching**: URL updates automatically when changing translations
✅ **No Page Reload**: Uses shallow routing for translation changes
✅ **Chapter Navigation**: Prev/Next buttons maintain correct URL format

## Testing

### Test URLs (Korean Locale):

**✅ Working URLs:**
```
http://localhost:3000/chapters/1-al-fatihah     (first translation)
http://localhost:3000/chapters/11-hud           (first translation)
http://localhost:3000/chapters/110-an-nasr      (first translation)
http://localhost:3000/korean_hamid/chapters/11-hud    (explicit first)
```

**❌ Won't Work (API Limitations):**
```
http://localhost:3000/korean_rwwad/chapters/1-al-fatihah  (API has no data)
http://localhost:3000/korean_hameed/chapters/11-hud      (typo - should be hamid)
```

### Test Scenarios:

1. **Base Route Access**:
   - Visit: `http://localhost:3000/chapters/11-hud`
   - Expected: Shows Chapter 11 in Korean (korean_hamid translation)
   - URL stays: `/chapters/11-hud`

2. **Chapter Navigation**:
   - Visit: `http://localhost:3000/chapters/11-hud`
   - Click "Next Chapter"
   - Expected: Navigates to `/chapters/12-yusuf`
   - Translation: Still korean_hamid

3. **Translation Switching** (if multiple translations available):
   - Visit: `http://localhost:3000/chapters/11-hud`
   - Open settings, select different translation
   - Expected: URL changes to `/[new-code]/chapters/11-hud`
   - Switch back to first: URL returns to `/chapters/11-hud`

## Files Modified

### Core Files:
1. `lib/config.js` - Added helper functions
2. `contexts/SettingsContext.js` - Smart URL switching logic
3. `pages/chapters/[slug]/index.js` - Base route with first translation
4. `pages/[translationCode]/chapters/[slug].js` - Translation-specific route

### Component Files:
5. `components/layout2/surah/content.js` - Navigation links
6. `components/sidenav/chapter-list.js` - Sidebar chapter list
7. `components/home/chapter-card.js` - Home page chapter cards
8. `components/layout2/web/chapter-list.js` - Web chapter list

### Configuration:
9. `.env.local` - Environment variables

## Important Notes

### Translation Codes:
- ✅ Correct: `korean_hamid` (with 'i')
- ❌ Wrong: `korean_hameed` (typo)

### API Availability:
- `korean_hamid` ✅ Available
- `korean_rwwad` ❌ Not available (API returns 404)

### Server Logs to Monitor:
```
✅ Good: "Base route: Fetching chapter X with first translation: korean_hamid"
✅ Good: "GET /chapters/11-hud 200 in XXXms"
❌ Error: "Failed to load translation korean_rwwad for chapter X"
```

## Migration Guide

### For Other Languages:

1. **Update `.env.local`**:
```bash
NEXT_PUBLIC_LOCALIZATION_CODE=<your-code>
NEXT_PUBLIC_DEFAULT_TRANSLATION_<YOUR_CODE>=<first_translation_code>
```

2. **Verify Translation Codes in `lib/config.js`**:
```javascript
YourLanguage: [
  { code: "your_first", name: "First Translator" },
  { code: "your_second", name: "Second Translator" },
],
```

3. **Test Base Routes**:
- `/chapters/1-al-fatihah` should show first translation
- Navigation should work between chapters
- Translation switching should update URLs

## Troubleshooting

### Problem: 404 on base routes
**Solution**: Check that first translation code is correct in config and API has data

### Problem: URL doesn't update when switching translations
**Solution**: Check browser console for errors, verify `isFirstTranslation()` is imported

### Problem: Navigation goes to wrong URLs
**Solution**: Clear `.next` cache and restart dev server

### Problem: Translation shows but URL is wrong
**Solution**: Check that `buildChapterUrl()` is being used in all link components

## Future Improvements

1. Add verse-level URL support with same pattern
2. Add support for query parameters (e.g., `?translation=code`)
3. Implement translation fallback if first translation unavailable
4. Add unit tests for helper functions
5. Add E2E tests for URL switching

## Summary

The application now supports **dynamic first translation routing** for any configured language. The Korean locale now correctly uses `korean_hamid` as the base translation, and all navigation and URL switching works as expected. The system is language-agnostic and can be easily configured for any supported language.
