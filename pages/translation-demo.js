/**
 * Translation URL Demo Page
 * 
 * This page demonstrates how the translation URL system works
 * Visit: http://localhost:3000/translation-demo
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  getAvailableTranslations, 
  buildChapterUrl, 
  buildVerseUrl,
  config 
} from '../lib/config';
import { useTranslationRouter } from '../lib/translation-router';
import styles from '../styles/demo.module.scss';

export default function TranslationDemo() {
  const router = useRouter();
  const { switchTranslation, getCurrentTranslationFromUrl } = useTranslationRouter();
  const availableTranslations = getAvailableTranslations();
  const [selectedTranslation, setSelectedTranslation] = useState(availableTranslations[0]?.code || '');
  const currentUrlTranslation = getCurrentTranslationFromUrl();

  const exampleChapter = '11-hud';
  const exampleVerse = '5';

  const handleTranslationChange = (e) => {
    setSelectedTranslation(e.target.value);
  };

  const handleNavigate = async (type) => {
    let url = '';
    
    switch(type) {
      case 'chapter':
        url = buildChapterUrl(selectedTranslation, exampleChapter);
        break;
      case 'verse':
        url = buildVerseUrl(selectedTranslation, exampleChapter, exampleVerse);
        break;
      default:
        return;
    }
    
    await router.push(url);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Translation URL System Demo</h1>
        <p>Demonstration of dynamic translation-based URL routing</p>
      </div>

      <div className={styles.section}>
        <h2>Current Configuration</h2>
        <div className={styles.infoBox}>
          <div className={styles.infoItem}>
            <strong>Localization Code:</strong> {config.localizationCode || 'Not set'}
          </div>
          <div className={styles.infoItem}>
            <strong>Country:</strong> {config.country || 'Not set'}
          </div>
          <div className={styles.infoItem}>
            <strong>Language:</strong> {config.language || 'Not set'}
          </div>
          <div className={styles.infoItem}>
            <strong>Default Translation:</strong> {config.translationCode || 'Not set'}
          </div>
          <div className={styles.infoItem}>
            <strong>Current URL Translation:</strong> {currentUrlTranslation || 'None (root path)'}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Available Translations</h2>
        <div className={styles.translationList}>
          {availableTranslations.map(trans => (
            <div key={trans.code} className={styles.translationCard}>
              <strong>{trans.name}</strong>
              <code>{trans.code}</code>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Try It Out</h2>
        <p>Select a translation and navigate to see the URL change:</p>
        
        <div className={styles.demo}>
          <div className={styles.formGroup}>
            <label htmlFor="translation-select">Select Translation:</label>
            <select 
              id="translation-select"
              value={selectedTranslation} 
              onChange={handleTranslationChange}
              className={styles.select}
            >
              {availableTranslations.map(trans => (
                <option key={trans.code} value={trans.code}>
                  {trans.name} ({trans.code})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.actions}>
            <button 
              onClick={() => handleNavigate('chapter')}
              className={styles.button}
            >
              Go to Chapter 11 (Hud)
            </button>
            <button 
              onClick={() => handleNavigate('verse')}
              className={styles.button}
            >
              Go to Chapter 11, Verse 5
            </button>
          </div>

          <div className={styles.urlPreview}>
            <h3>URL Preview:</h3>
            <div className={styles.urlBox}>
              <strong>Chapter URL:</strong>
              <code>{buildChapterUrl(selectedTranslation, exampleChapter)}</code>
            </div>
            <div className={styles.urlBox}>
              <strong>Verse URL:</strong>
              <code>{buildVerseUrl(selectedTranslation, exampleChapter, exampleVerse)}</code>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>How to Change Country/Language</h2>
        <div className={styles.codeBlock}>
          <p><strong>Step 1:</strong> Edit <code>.env.local</code> file:</p>
          <pre>
{`# Change from Vietnamese to Korean
NEXT_PUBLIC_LOCALIZATION_CODE=kr

# Or to Danish
NEXT_PUBLIC_LOCALIZATION_CODE=dk

# Or to Chinese
NEXT_PUBLIC_LOCALIZATION_CODE=cn`}
          </pre>
          
          <p><strong>Step 2:</strong> Restart the development server:</p>
          <pre>npm run dev</pre>
          
          <p><strong>Step 3:</strong> The app will now use the selected country's translations and URLs!</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Integration Guide</h2>
        <p>See <code>TRANSLATION_ROUTING_GUIDE.md</code> for complete documentation.</p>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>✅ Automatic URL Updates</h3>
            <p>URLs update automatically when translation changes</p>
          </div>
          <div className={styles.feature}>
            <h3>✅ Country-Specific Routes</h3>
            <p>Each translation has its own URL structure</p>
          </div>
          <div className={styles.feature}>
            <h3>✅ Environment Configuration</h3>
            <p>Switch countries via .env.local file</p>
          </div>
          <div className={styles.feature}>
            <h3>✅ SEO Friendly</h3>
            <p>Each translation has unique, crawlable URLs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
