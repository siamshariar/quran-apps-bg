# Dynamic Translation URL System

This system allows automatic URL updates when users change translations, supporting country-specific translation routes.

## Overview

When a user changes the translation from the settings, the URL automatically updates to reflect the selected translation. For example:
- `http://localhost:3000/vietnamese_rwwad/chapters/11-hud` (Vietnamese - Ruwwad Translation)
- `http://localhost:3000/korean_rwwad/chapters/11-hud` (Korean - Ruwwad Translation)
- `http://localhost:3000/korean_hamid/chapters/11-hud` (Korean - Hamed Choi Translation)

## Configuration

### Environment Variables (.env.local)

```bash
# Change this to switch between different language/country configurations
NEXT_PUBLIC_LOCALIZATION_CODE=vn

# Default translations for each localization
NEXT_PUBLIC_DEFAULT_TRANSLATION_VN=vietnamese_rwwad
NEXT_PUBLIC_DEFAULT_TRANSLATION_KR=korean_rwwad
# ... other countries
```

**Supported Localization Codes:**
- `vn` - Vietnam
- `kh` - Cambodia (Khmer)
- `kr` - Korea
- `cn` - China
- `jp` - Japan
- `dk` - Denmark
- `ph` - Philippines
- `fr` - France
- `de` - Germany

### Switch Countries

To switch from Vietnamese to Korean translations:

1. Update `.env.local`:
```bash
NEXT_PUBLIC_LOCALIZATION_CODE=kr
```

2. Restart your development server:
```bash
npm run dev
```

The app will now use Korean translations and Korean-specific URLs.

## File Structure

### Pages Structure

Each translation has its own route:

```
pages/
  ├── vietnamese_rwwad/
  │   └── chapters/
  │       └── [slug].js
  ├── vietnamese_hassan/
  │   └── chapters/
  │       └── [slug].js
  ├── korean_rwwad/
  │   └── chapters/
  │       └── [slug].js
  ├── korean_hamid/
  │   └── chapters/
  │       └── [slug].js
  └── ... other translations
```

### Configuration Files

- **lib/config.js** - Main configuration with translation data and helper functions
- **lib/translation-router.js** - URL routing utilities for translation switching
- **components/settings/translation-sync.js** - React hooks for syncing translation with URL

## Usage

### 1. Using the Translation Router Hook

```javascript
import { useTranslationRouter } from '../lib/translation-router';

function MyComponent() {
  const { switchTranslation, getCurrentTranslationFromUrl } = useTranslationRouter();
  
  const handleChange = (newTranslation) => {
    switchTranslation(newTranslation); // Automatically updates URL
  };
  
  return (
    <select onChange={(e) => handleChange(e.target.value)}>
      <option value="korean_rwwad">Ruwwad Translation Center</option>
      <option value="korean_hamid">Hamed Choi</option>
    </select>
  );
}
```

### 2. Using the Translation Sync Hook

```javascript
import { useTranslationSync } from '../components/settings/translation-sync';

function TranslationSelector() {
  const { 
    currentTranslation, 
    handleTranslationChange, 
    availableTranslations 
  } = useTranslationSync();
  
  return (
    <div>
      <h3>Current: {currentTranslation}</h3>
      {availableTranslations.map(trans => (
        <button 
          key={trans.code}
          onClick={() => handleTranslationChange(trans.code)}
        >
          {trans.name}
        </button>
      ))}
    </div>
  );
}
```

### 3. Building Dynamic URLs

```javascript
import { buildChapterUrl, buildVerseUrl } from '../lib/config';

// Build chapter URL
const chapterUrl = buildChapterUrl('korean_rwwad', '11-hud');
// Result: /korean_rwwad/chapters/11-hud

// Build verse URL
const verseUrl = buildVerseUrl('korean_hamid', '11-hud', '5');
// Result: /korean_hamid/chapters/11-hud/verses/5
```

## How It Works

### 1. Translation Change Flow

```
User changes translation in Settings
    ↓
handleTranslationChange() called
    ↓
Context updated with new translation
    ↓
switchTranslation() updates URL
    ↓
Next.js navigates to new route
    ↓
New page loads with correct translation
```

### 2. URL Structure

```
/{translation_code}/chapters/{chapter-slug}
/{translation_code}/chapters/{chapter-slug}/verses/{verse-number}
/{translation_code}/subjective/{topic-slug}
```

### 3. Route Mapping

The `getRoutePrefix()` function maps translation codes to URL prefixes:

```javascript
{
  vietnamese_rwwad: 'vietnamese_rwwad',
  korean_rwwad: 'korean_rwwad',
  korean_hamid: 'korean_hamid',
  // ... etc
}
```

## Adding New Translation Routes

### Step 1: Update config.js

Add your translation to the `translationData` object in `lib/config.js`:

```javascript
export const translationData = {
  // ... existing translations
  Indonesian: [
    { code: "indonesian_affairs", name: "Indonesian Ministry" },
    { code: "indonesian_complex", name: "King Fahd Complex" },
  ],
}
```

### Step 2: Add Route Mapping

Add the mapping in `getRoutePrefix()` function in `lib/config.js`:

```javascript
const routeMapping = {
  // ... existing mappings
  indonesian_affairs: 'indonesian_affairs',
  indonesian_complex: 'indonesian_complex',
};
```

### Step 3: Create Page Files

Create the directory and page file:

```bash
mkdir -p pages/indonesian_affairs/chapters
```

Copy the template from `pages/korean_rwwad/chapters/[slug].js` and update:
- URL in Meta component
- Translation codes in getStaticProps
- allTranslations object

### Step 4: Update Environment Variables

Add default translation in `.env.local`:

```bash
NEXT_PUBLIC_DEFAULT_TRANSLATION_ID=indonesian_affairs
```

### Step 5: Test

1. Change `NEXT_PUBLIC_LOCALIZATION_CODE=id` in `.env.local`
2. Restart dev server
3. Navigate to `/indonesian_affairs/chapters/11-hud`
4. Change translation in settings - URL should update automatically

## Integration with Existing Components

### Settings Component

The existing settings component can be enhanced to use the new translation sync:

```javascript
import { useTranslationSync } from '../components/settings/translation-sync';

function Translation() {
  const { handleTranslationChange, currentTranslation } = useTranslationSync();
  
  const onTranslationSelect = (translationCode) => {
    handleTranslationChange(translationCode);
    // URL will automatically update!
  };
  
  // ... rest of component
}
```

### Context Provider

Wrap your app with TranslationSyncProvider in `_app.js`:

```javascript
import { TranslationSyncProvider } from '../components/settings/translation-sync';

function MyApp({ Component, pageProps }) {
  return (
    <SettingsContextProvider>
      <TranslationSyncProvider>
        <Component {...pageProps} />
      </TranslationSyncProvider>
    </SettingsContextProvider>
  );
}
```

## Troubleshooting

### URLs not updating?

1. Make sure translation router is imported correctly
2. Check that the translation code exists in routeMapping
3. Verify the page file exists for that translation route

### 404 errors?

1. Ensure page files exist: `pages/{translation_code}/chapters/[slug].js`
2. Check getStaticPaths is generating paths correctly
3. Verify translation code spelling matches exactly

### Translation not changing?

1. Check SettingsContext is properly initialized
2. Verify changeTranslation function is being called
3. Check browser console for errors

## Example Implementation

See working examples in:
- `pages/vietnamese_rwwad/chapters/[slug].js` - Vietnamese Ruwwad
- `pages/korean_rwwad/chapters/[slug].js` - Korean Ruwwad
- `pages/korean_hamid/chapters/[slug].js` - Korean Hamed Choi

## API Reference

### Functions in lib/config.js

- `getRoutePrefix(translationCode)` - Get URL prefix for translation
- `buildChapterUrl(translationCode, chapterSlug)` - Build chapter URL
- `buildVerseUrl(translationCode, chapterSlug, verseNo)` - Build verse URL
- `buildSubjectiveUrl(translationCode, slug)` - Build subjective URL
- `getDefaultTranslation()` - Get default translation for current localization

### Hooks in lib/translation-router.js

- `useTranslationRouter()` - Hook for translation routing
  - `switchTranslation(code)` - Switch to different translation
  - `getCurrentTranslationFromUrl()` - Get current translation from URL

### Hooks in components/settings/translation-sync.js

- `useTranslationSync()` - Hook for translation + URL syncing
  - `currentTranslation` - Current active translation
  - `handleTranslationChange(code)` - Change translation and update URL
  - `availableTranslations` - Array of available translations
