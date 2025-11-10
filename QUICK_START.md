# Quick Start Guide - Translation URL System

## 🚀 Getting Started in 3 Steps

### Step 1: Configure Your Environment

Create or edit `.env.local` in the root directory:

```bash
# Set your desired country/language
NEXT_PUBLIC_LOCALIZATION_CODE=kr

# Default translation for Korean
NEXT_PUBLIC_DEFAULT_TRANSLATION_KR=korean_rwwad
```

**Available Country Codes:**
- `vn` = Vietnam
- `kr` = Korea
- `kh` = Cambodia (Khmer)
- `cn` = China
- `jp` = Japan
- `dk` = Denmark
- `ph` = Philippines
- `fr` = France
- `de` = Germany

### Step 2: Start the Development Server

```bash
npm run dev
```

### Step 3: Test It!

Visit the demo page:
```
http://localhost:3000/translation-demo
```

Or directly test Korean translations:
```
http://localhost:3000/korean_rwwad/chapters/11-hud
http://localhost:3000/korean_hamid/chapters/11-hud
```

## ✅ What's Already Set Up

### ✓ Korean Translation Routes
- `/korean_rwwad/chapters/[slug]` - Ruwwad Translation Center
- `/korean_hamid/chapters/[slug]` - Hamed Choi Translation

### ✓ Helper Functions
```javascript
import { buildChapterUrl, buildVerseUrl } from './lib/config';

// Build URLs for any translation
const url = buildChapterUrl('korean_rwwad', '11-hud');
// Result: /korean_rwwad/chapters/11-hud
```

### ✓ Translation Router Hook
```javascript
import { useTranslationRouter } from './lib/translation-router';

function MyComponent() {
  const { switchTranslation } = useTranslationRouter();
  
  // This will update the URL automatically!
  switchTranslation('korean_hamid');
}
```

### ✓ Translation Sync Hook
```javascript
import { useTranslationSync } from './components/settings/translation-sync';

function TranslationSelector() {
  const { handleTranslationChange, currentTranslation } = useTranslationSync();
  
  // Changes translation AND updates URL
  handleTranslationChange('korean_rwwad');
}
```

## 🎯 Quick Examples

### Example 1: Change Country from Vietnamese to Korean

1. Edit `.env.local`:
```bash
NEXT_PUBLIC_LOCALIZATION_CODE=kr
```

2. Restart server:
```bash
npm run dev
```

3. Navigate to:
```
http://localhost:3000/korean_rwwad/chapters/1-al-fatihah
```

### Example 2: Switch Translations Programmatically

```javascript
import { useTranslationSync } from '../components/settings/translation-sync';

export default function MyPage() {
  const { handleTranslationChange } = useTranslationSync();
  
  return (
    <div>
      <button onClick={() => handleTranslationChange('korean_rwwad')}>
        Ruwwad Translation
      </button>
      <button onClick={() => handleTranslationChange('korean_hamid')}>
        Hamed Choi Translation
      </button>
    </div>
  );
}
```

### Example 3: Build Custom URLs

```javascript
import { buildChapterUrl, buildVerseUrl } from '../lib/config';

// Chapter URL
const chapterUrl = buildChapterUrl('korean_hamid', '2-al-baqarah');
console.log(chapterUrl); // /korean_hamid/chapters/2-al-baqarah

// Verse URL
const verseUrl = buildVerseUrl('korean_rwwad', '2-al-baqarah', '255');
console.log(verseUrl); // /korean_rwwad/chapters/2-al-baqarah/verses/255
```

## 🔧 Integrate with Existing Components

### In Settings Component

```javascript
// Before
const handleTranslationChange = (code) => {
  changeTranslation(code);
};

// After - with URL update
import { useTranslationRouter } from '../lib/translation-router';

const { switchTranslation } = useTranslationRouter();

const handleTranslationChange = async (code) => {
  changeTranslation(code);
  await switchTranslation(code); // URL updates automatically!
};
```

### In Translation Modal

```javascript
// Use the enhanced translation modal
import EnhancedTranslationModal from '../components/modal/translation-modal-enhanced';

// It already handles URL updates automatically!
<EnhancedTranslationModal onBack={handleClose} />
```

## 📝 File Structure Created

```
quran-apps/
├── .env.local                           # Environment configuration
├── lib/
│   ├── config.js                        # Updated with helper functions
│   └── translation-router.js            # NEW: URL routing utilities
├── components/
│   ├── settings/
│   │   └── translation-sync.js          # NEW: Translation sync hooks
│   └── modal/
│       └── translation-modal-enhanced.js # NEW: Enhanced modal
├── pages/
│   ├── translation-demo.js              # NEW: Demo page
│   ├── korean_rwwad/
│   │   └── chapters/
│   │       └── [slug].js                # NEW: Korean Ruwwad route
│   └── korean_hamid/
│       └── chapters/
│           └── [slug].js                # NEW: Korean Hamid route
├── styles/
│   └── demo.module.scss                 # NEW: Demo page styles
├── TRANSLATION_ROUTING_GUIDE.md         # NEW: Full documentation
└── QUICK_START.md                       # This file
```

## 🎨 Customize for Your Needs

### Add More Translation Routes

1. Create page directory:
```bash
mkdir -p pages/indonesian_affairs/chapters
```

2. Copy template:
```bash
cp pages/korean_rwwad/chapters/[slug].js pages/indonesian_affairs/chapters/[slug].js
```

3. Update the file:
- Change URL in Meta component
- Change translation codes in getStaticProps
- Update allTranslations object

4. Add to route mapping in `lib/config.js`:
```javascript
const routeMapping = {
  // ... existing
  indonesian_affairs: 'indonesian_affairs',
};
```

## 🐛 Troubleshooting

### URLs not updating?
- Check that page files exist for your translation
- Verify translation code is in routeMapping (lib/config.js)
- Clear Next.js cache: `rm -rf .next`

### Translation not changing?
- Check browser console for errors
- Verify SettingsContext is initialized
- Make sure you're using the correct translation code

### 404 Errors?
- Run `npm run dev` to regenerate static paths
- Check the translation code spelling
- Verify getStaticPaths is working

## 📚 Learn More

- **Full Guide:** See `TRANSLATION_ROUTING_GUIDE.md`
- **Demo Page:** Visit `/translation-demo`
- **API Reference:** Check `lib/config.js` and `lib/translation-router.js`

## 🎉 You're Ready!

The system is now configured and ready to use. Visit the demo page or start integrating into your existing components!

**Test URLs:**
- Demo: http://localhost:3000/translation-demo
- Korean (Ruwwad): http://localhost:3000/korean_rwwad/chapters/1-al-fatihah
- Korean (Hamid): http://localhost:3000/korean_hamid/chapters/1-al-fatihah
