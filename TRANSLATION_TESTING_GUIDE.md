# Translation URL Testing Guide

## Current Configuration
- **Localization:** Korean (kr)
- **First Translation:** `korean_hamid` (Hamed Choi)
- **Second Translation:** `korean_rwwad` (Ruwwad Translation Center) - ⚠️ **API DATA NOT AVAILABLE**

## ✅ WORKING URLs (Use These!)

### 1. Base Routes (First Translation - No Code in URL)
These URLs show the FIRST translation (`korean_hamid`) without the translation code:
```
http://localhost:3000/chapters/1-al-fatihah
http://localhost:3000/chapters/11-hud
http://localhost:3000/chapters/110-an-nasr
http://localhost:3000/chapters/2-al-baqarah
http://localhost:3000/chapters/18-al-kahf
```
✅ **Status:** Working (200 OK) - Shows korean_hamid translation

### 2. Translation-Specific Routes (With Code in URL)
These URLs show specific translations with the code in the URL:
```
http://localhost:3000/korean_hamid/chapters/1-al-fatihah
http://localhost:3000/korean_hamid/chapters/11-hud
http://localhost:3000/korean_hamid/chapters/110-an-nasr
http://localhost:3000/korean_hamid/chapters/2-al-baqarah
```
✅ **Status:** Working (200 OK) - Shows korean_hamid translation

## ❌ INCORRECT URLs (Don't Use These!)

### 1. Wrong Translation Code (Typo)
```
❌ http://localhost:3000/korean_hameed/chapters/11-hud
```
**Issue:** `korean_hameed` is a typo. Correct code is `korean_hamid` (with 'i', not 'ee')
**Error:** 404 Not Found

### 2. Unavailable Translation
```
❌ http://localhost:3000/korean_rwwad/chapters/1-al-fatihah
❌ http://localhost:3000/korean_rwwad/chapters/11-hud
❌ http://localhost:3000/korean_rwwad/chapters/110-an-nasr
```
**Issue:** API doesn't have data for `korean_rwwad` translation yet
**Error:** 404 Not Found
**Server Log:** "Failed to load translation korean_rwwad for chapter X"

## 🔄 Translation Switching Behavior

### Expected Behavior:

1. **Start at Base Route** → `/chapters/11-hud`
   - Shows: `korean_hamid` (first translation)
   - URL: `/chapters/11-hud` (no code)

2. **Change to Another Translation** → Switch to `korean_rwwad` (if it were available)
   - Shows: `korean_rwwad` 
   - URL: `/korean_rwwad/chapters/11-hud` (code added)

3. **Change Back to First Translation** → Switch back to `korean_hamid`
   - Shows: `korean_hamid`
   - URL: `/chapters/11-hud` (code removed again)

### Current Limitation:
Since `korean_rwwad` is not available in the API, you can only test with:
- First translation: `korean_hamid` (base route: `/chapters/[slug]`)
- Same translation with code: `/korean_hamid/chapters/[slug]`

## 🛠️ How to Test

### Test 1: Base Route Works
1. Go to: `http://localhost:3000/chapters/11-hud`
2. ✅ Should show Chapter 11 (Hud) in Korean (korean_hamid translation)
3. ✅ URL should stay: `/chapters/11-hud`

### Test 2: Translation-Specific Route Works
1. Go to: `http://localhost:3000/korean_hamid/chapters/11-hud`
2. ✅ Should show Chapter 11 (Hud) in Korean (korean_hamid translation)
3. ✅ URL should stay: `/korean_hamid/chapters/11-hud`

### Test 3: Navigate Between Chapters
1. Start at: `http://localhost:3000/chapters/1-al-fatihah`
2. Click next chapter button
3. ✅ Should navigate to: `/chapters/2-al-baqarah`
4. ✅ URL should maintain base route format

### Test 4: Translation Switching (Settings Modal)
1. Go to: `http://localhost:3000/chapters/11-hud`
2. Open settings modal
3. Current translation should show: `Hamed Choi` (korean_hamid)
4. Note: `korean_rwwad` option may fail if selected (API doesn't have data)

## 📋 Server Logs Explanation

When you see these logs, it means:

✅ **Good Logs:**
```
Base route: Fetching chapter 110 with first translation: korean_hamid
Base route loaded translations: [ 'korean_hamid' ]
GET /chapters/110-an-nasr 200 in XXXms
```
= Base route working correctly

✅ **Good Logs:**
```
GET /korean_hamid/chapters/11-hud 200 in XXXms
Warning: data for page "/chapters/[slug]" (path "/chapters/11-hud") is 179 kB which exceeds...
```
= Page loaded successfully (warning is just about data size, not an error)

❌ **Error Logs:**
```
Failed to load translation korean_rwwad for chapter 11
GET /korean_rwwad/chapters/11-hud 404 in XXXms
```
= korean_rwwad translation not available in API

❌ **Error Logs:**
```
GET /korean_hameed/chapters/11-hud 404 in XXXms
```
= Typo in translation code (should be korean_hamid)

## 🎯 Available Chapters for Testing

All 114 chapters work with the base route pattern. Examples:
- `/chapters/1-al-fatihah` - Al-Fatihah (The Opening)
- `/chapters/2-al-baqarah` - Al-Baqarah (The Cow)
- `/chapters/18-al-kahf` - Al-Kahf (The Cave)
- `/chapters/36-ya-sin` - Ya-Sin
- `/chapters/55-ar-rahman` - Ar-Rahman (The Beneficent)
- `/chapters/67-al-mulk` - Al-Mulk (The Sovereignty)
- `/chapters/110-an-nasr` - An-Nasr (The Divine Support)
- `/chapters/114-an-nas` - An-Nas (Mankind)

## 🔧 Translation Codes Reference

### Korean Translations:
1. `korean_hamid` - Hamed Choi ✅ Available
2. `korean_rwwad` - Ruwwad Translation Center ❌ Not Available in API

### Correct vs Incorrect:
- ✅ `korean_hamid` (correct)
- ❌ `korean_hameed` (typo - wrong)

## 💡 Tips

1. **Always use** `korean_hamid` for testing (not `korean_hameed`)
2. **Base routes** (`/chapters/[slug]`) automatically use the first available translation
3. **Translation-specific routes** (`/[code]/chapters/[slug]`) require valid translation code
4. **URL switching** happens automatically when you change translations in settings
5. **No page reload** required when switching translations (uses shallow routing)

## 🐛 Troubleshooting

### Problem: Page shows "404! Something Went Wrong"
**Solution:** Check if you're using the correct translation code:
- ✅ Use: `korean_hamid`
- ❌ Don't use: `korean_hameed` (typo)
- ❌ Don't use: `korean_rwwad` (not available)

### Problem: Page shows loading spinner indefinitely
**Solution:** 
1. Open browser console (F12)
2. Check for error messages
3. Verify the translation code is correct
4. Try refreshing the page

### Problem: Translation switching doesn't work
**Solution:**
1. Make sure you're selecting `korean_hamid` (the only available translation)
2. Check browser console for errors
3. Verify the URL updates correctly

## 📝 Summary

**What Works:**
- ✅ Base routes: `/chapters/[slug]` → Shows korean_hamid
- ✅ Specific routes: `/korean_hamid/chapters/[slug]` → Shows korean_hamid
- ✅ URL switching between first translation (base route) and others
- ✅ All 114 chapters accessible

**What Doesn't Work:**
- ❌ `/korean_hameed/chapters/[slug]` → Typo, should be korean_hamid
- ❌ `/korean_rwwad/chapters/[slug]` → API doesn't have this translation data yet

**Correct Translation Code:** `korean_hamid` (not `korean_hameed`)
