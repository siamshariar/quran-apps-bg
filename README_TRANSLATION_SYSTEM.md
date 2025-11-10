# 🌍 Dynamic Translation URL System

A complete implementation for translation-based routing that automatically updates URLs when users change translations.

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [File Structure](#file-structure)
- [Examples](#examples)
- [Configuration](#configuration)
- [Testing](#testing)

## 🎯 Overview

This system enables dynamic URL routing based on translation selection. When a user changes the translation, the URL automatically updates to reflect the selected translation, providing:

- **SEO Benefits**: Unique URLs for each translation
- **Better UX**: Shareable links with specific translations
- **Country Switching**: Change entire app locale via environment variable
- **Automatic Updates**: URLs update automatically when translation changes

### Before
```
User changes translation → Only content changes
URL stays the same: /chapters/11-hud
```

### After
```
User selects Korean (Ruwwad) → Content AND URL change
URL updates to: /korean_rwwad/chapters/11-hud

User selects Korean (Hamid) → Content AND URL change
URL updates to: /korean_hamid/chapters/11-hud
```

## ✨ Features

### ✅ Automatic URL Updates
Translation changes automatically update the browser URL

### ✅ Country-Specific Configuration
Switch entire app to different country via `.env.local`

### ✅ SEO-Friendly URLs
Each translation has its own unique, crawlable URL structure

### ✅ Easy Integration
Simple hooks and utilities for seamless integration

### ✅ Static Site Generation
Full support for Next.js static export

### ✅ Type-Safe Helpers
Well-documented helper functions for URL building

## 🚀 Quick Start

### 1. Configure Environment

Create `.env.local`:
```bash
# Set to Korean
NEXT_PUBLIC_LOCALIZATION_CODE=kr
NEXT_PUBLIC_DEFAULT_TRANSLATION_KR=korean_rwwad
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Test It!

Visit these URLs:
```
http://localhost:3000/translation-demo
http://localhost:3000/korean_rwwad/chapters/1-al-fatihah
http://localhost:3000/korean_hamid/chapters/1-al-fatihah
```

### 4. Use in Your Code

```javascript
import { useTranslationSync } from './components/settings/translation-sync';

function MyComponent() {
  const { handleTranslationChange } = useTranslationSync();
  
  // This changes translation AND updates URL automatically!
  return (
    <button onClick={() => handleTranslationChange('korean_rwwad')}>
      Switch to Ruwwad Translation
    </button>
  );
}
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[QUICK_START.md](./QUICK_START.md)** | Get started in 3 steps |
| **[TRANSLATION_ROUTING_GUIDE.md](./TRANSLATION_ROUTING_GUIDE.md)** | Complete documentation |
| **[INTEGRATION_EXAMPLES.js](./INTEGRATION_EXAMPLES.js)** | Code examples |
| **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** | What's implemented |

## 📁 File Structure

```
quran-apps/
├── .env.local                              # Environment configuration
│
├── lib/
│   ├── config.js                           # ✨ Enhanced with helpers
│   └── translation-router.js               # 🆕 URL routing utilities
│
├── components/
│   ├── settings/
│   │   └── translation-sync.js             # 🆕 React hooks for sync
│   └── modal/
│       └── translation-modal-enhanced.js   # 🆕 Enhanced modal
│
├── pages/
│   ├── translation-demo.js                 # 🆕 Interactive demo
│   ├── korean_rwwad/
│   │   └── chapters/[slug].js              # 🆕 Korean Ruwwad route
│   └── korean_hamid/
│       └── chapters/[slug].js              # 🆕 Korean Hamid route
│
├── styles/
│   └── demo.module.scss                    # 🆕 Demo styles
│
└── Documentation/
    ├── QUICK_START.md                      # 🆕 Quick start guide
    ├── TRANSLATION_ROUTING_GUIDE.md        # 🆕 Full documentation
    ├── INTEGRATION_EXAMPLES.js             # 🆕 Code examples
    ├── IMPLEMENTATION_SUMMARY.md           # 🆕 Implementation summary
    └── README_TRANSLATION_SYSTEM.md        # 🆕 This file
```

## 💡 Examples

### Example 1: Simple Translation Switch

```javascript
import { useTranslationSync } from './components/settings/translation-sync';

function TranslationSelector() {
  const { currentTranslation, handleTranslationChange, availableTranslations } = useTranslationSync();
  
  return (
    <select 
      value={currentTranslation} 
      onChange={(e) => handleTranslationChange(e.target.value)}
    >
      {availableTranslations.map(t => (
        <option key={t.code} value={t.code}>{t.name}</option>
      ))}
    </select>
  );
}
```

### Example 2: Build Custom Links

```javascript
import Link from 'next/link';
import { buildChapterUrl } from './lib/config';

function ChapterLinks() {
  return (
    <div>
      <Link href={buildChapterUrl('korean_rwwad', '2-al-baqarah')}>
        Al-Baqarah (Ruwwad)
      </Link>
      <Link href={buildChapterUrl('korean_hamid', '2-al-baqarah')}>
        Al-Baqarah (Hamed Choi)
      </Link>
    </div>
  );
}
```

### Example 3: Programmatic Navigation

```javascript
import { useRouter } from 'next/router';
import { buildVerseUrl } from './lib/config';

function NavigateToVerse() {
  const router = useRouter();
  
  const goToAyatulKursi = () => {
    const url = buildVerseUrl('korean_rwwad', '2-al-baqarah', '255');
    router.push(url);
  };
  
  return <button onClick={goToAyatulKursi}>Go to Ayatul Kursi</button>;
}
```

## ⚙️ Configuration

### Supported Country Codes

| Code | Country | Language |
|------|---------|----------|
| `vn` | Vietnam | Vietnamese |
| `kr` | Korea | Korean |
| `kh` | Cambodia | Khmer |
| `cn` | China | Chinese |
| `jp` | Japan | Japanese |
| `dk` | Denmark | Danish |
| `ph` | Philippines | Filipino |
| `fr` | France | French |
| `de` | Germany | German |

### Switch Countries

Edit `.env.local`:
```bash
# Vietnamese
NEXT_PUBLIC_LOCALIZATION_CODE=vn

# Korean
NEXT_PUBLIC_LOCALIZATION_CODE=kr

# Danish
NEXT_PUBLIC_LOCALIZATION_CODE=dk
```

Then restart the server:
```bash
npm run dev
```

### Korean Translations

Currently configured:
- **korean_hamid** - Hamed Choi
- **korean_rwwad** - Ruwwad Translation Center

URLs:
- `/korean_hamid/chapters/[chapter-slug]`
- `/korean_rwwad/chapters/[chapter-slug]`

## 🧪 Testing

### 1. Demo Page
Visit: `http://localhost:3000/translation-demo`

Interactive demo showing:
- Current configuration
- Available translations  
- URL preview
- Navigation testing

### 2. Manual Testing

Test Korean routes:
```
http://localhost:3000/korean_rwwad/chapters/1-al-fatihah
http://localhost:3000/korean_rwwad/chapters/2-al-baqarah
http://localhost:3000/korean_hamid/chapters/1-al-fatihah
```

### 3. Verification Script

Run in browser console:
```javascript
// Will be available in production
require('./verify-translation-system.js');
```

### 4. Integration Testing

1. Open any chapter page
2. Go to Settings → Translation
3. Change translation
4. Verify URL updates automatically
5. Verify content changes correctly

## 🔧 API Reference

### Helper Functions (lib/config.js)

```javascript
// Get URL prefix for translation
getRoutePrefix(translationCode: string): string

// Build chapter URL
buildChapterUrl(translationCode: string, chapterSlug: string): string

// Build verse URL  
buildVerseUrl(translationCode: string, chapterSlug: string, verseNo: string): string

// Build subjective URL
buildSubjectiveUrl(translationCode: string, slug?: string): string

// Get default translation for current locale
getDefaultTranslation(): string
```

### Hooks (lib/translation-router.js)

```javascript
// Translation router hook
useTranslationRouter(): {
  switchTranslation: (code: string) => Promise<void>,
  getCurrentTranslationFromUrl: () => string | null
}
```

### Hooks (components/settings/translation-sync.js)

```javascript
// Translation sync hook (recommended)
useTranslationSync(): {
  currentTranslation: string,
  handleTranslationChange: (code: string) => Promise<void>,
  availableTranslations: Array<{code: string, name: string}>
}
```

## 📦 What's Included

- ✅ Environment-based configuration
- ✅ Helper functions for URL building
- ✅ React hooks for translation routing
- ✅ Korean translation routes (korean_rwwad, korean_hamid)
- ✅ Enhanced translation modal
- ✅ Translation sync utilities
- ✅ Interactive demo page
- ✅ Comprehensive documentation
- ✅ Integration examples
- ✅ Verification script

## 🎓 Learn More

### For Quick Start
Read: [QUICK_START.md](./QUICK_START.md)

### For Full Guide
Read: [TRANSLATION_ROUTING_GUIDE.md](./TRANSLATION_ROUTING_GUIDE.md)

### For Code Examples
Read: [INTEGRATION_EXAMPLES.js](./INTEGRATION_EXAMPLES.js)

### For Implementation Details
Read: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

## 🐛 Troubleshooting

### URLs not updating?
1. Check translation code exists in `getRoutePrefix()` mapping
2. Verify page file exists for that translation
3. Clear Next.js cache: `rm -rf .next && npm run dev`

### 404 Errors?
1. Ensure page files exist in `pages/{translation_code}/chapters/`
2. Check `getStaticPaths` is generating paths
3. Verify translation code spelling

### Translation not changing?
1. Check browser console for errors
2. Verify SettingsContext is initialized
3. Ensure using correct translation code

See [TRANSLATION_ROUTING_GUIDE.md](./TRANSLATION_ROUTING_GUIDE.md#troubleshooting) for more help.

## 🎉 Success!

Your translation URL system is ready! 

**Next Steps:**
1. ✅ Test the demo page
2. ✅ Try changing translations
3. ✅ Watch URLs update automatically
4. ✅ Integrate into your components
5. ✅ Add more translation routes as needed

---

**Made with ❤️ for better Quran app UX**

For support, see the documentation files or check the code examples.
