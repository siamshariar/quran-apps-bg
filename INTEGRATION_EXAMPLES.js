/**
 * Integration Example: How to Update Existing Settings Component
 * 
 * This file shows how to integrate the translation URL system
 * into your existing settings component
 */

// BEFORE - Original settings component
/*
import { useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';

function Translation() {
  const { translation, changeTranslation } = useContext(SettingsContext);
  
  const handleTranslationChange = (newTranslation) => {
    changeTranslation(newTranslation);
    // URL doesn't update!
  };
  
  return (
    <div>
      <select onChange={(e) => handleTranslationChange(e.target.value)}>
        <option value="korean_hamid">Hamed Choi</option>
        <option value="korean_rwwad">Ruwwad Translation Center</option>
      </select>
    </div>
  );
}
*/

// AFTER - Integrated with translation router
import { useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import { useTranslationRouter } from '../../lib/translation-router';

function TranslationWithUrlUpdate() {
  const { translation, changeTranslation } = useContext(SettingsContext);
  const { switchTranslation } = useTranslationRouter();
  
  const handleTranslationChange = async (newTranslation) => {
    // Update context
    changeTranslation(newTranslation);
    
    // Update URL automatically
    await switchTranslation(newTranslation);
    
    // Optionally dispatch event for other components
    window.dispatchEvent(new CustomEvent('translationChange', {
      detail: { translation: newTranslation }
    }));
  };
  
  return (
    <div>
      <select 
        value={translation}
        onChange={(e) => handleTranslationChange(e.target.value)}
      >
        <option value="korean_hamid">Hamed Choi</option>
        <option value="korean_rwwad">Ruwwad Translation Center</option>
      </select>
    </div>
  );
}

// ALTERNATIVE - Using the useTranslationSync hook (even simpler!)
import { useTranslationSync } from '../../components/settings/translation-sync';

function TranslationSimplified() {
  const { 
    currentTranslation, 
    handleTranslationChange, 
    availableTranslations 
  } = useTranslationSync();
  
  return (
    <div>
      <select 
        value={currentTranslation}
        onChange={(e) => handleTranslationChange(e.target.value)}
      >
        {availableTranslations.map(trans => (
          <option key={trans.code} value={trans.code}>
            {trans.name}
          </option>
        ))}
      </select>
    </div>
  );
}

// EXAMPLE: Full Settings Component Integration
import { useState, useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import { useTranslationRouter } from '../../lib/translation-router';
import { getAvailableTranslations, t } from '../../lib/config';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ChevronRightIcon from '../icons/ChevronRight';
import styles from './index.module.scss';

function EnhancedSettings() {
  const { translation, changeTranslation } = useContext(SettingsContext);
  const { switchTranslation } = useTranslationRouter();
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const availableTranslations = getAvailableTranslations();
  
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };
  
  const handleTranslationChange = async (newTranslation) => {
    if (newTranslation === translation || isUpdating) return;
    
    setIsUpdating(true);
    
    try {
      // Update context
      changeTranslation(newTranslation);
      
      // Update URL
      await switchTranslation(newTranslation);
      
      // Notify other components
      window.dispatchEvent(new CustomEvent('translationChange', {
        detail: { translation: newTranslation }
      }));
      
      console.log(`Translation changed to: ${newTranslation}`);
    } catch (error) {
      console.error('Error changing translation:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className={styles.wrapper}>
      <Accordion 
        expanded={expandedPanel === 'translation'}
        onChange={handleAccordionChange('translation')}
      >
        <AccordionSummary expandIcon={<ChevronRightIcon />}>
          <div className={styles.title}>{t('Translation')}</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.list}>
            <RadioGroup
              value={translation}
              onChange={(e) => handleTranslationChange(e.target.value)}
            >
              {availableTranslations.map((trans) => (
                <FormControlLabel
                  key={trans.code}
                  value={trans.code}
                  control={<Radio disabled={isUpdating} />}
                  label={trans.name}
                  disabled={isUpdating}
                />
              ))}
            </RadioGroup>
            {isUpdating && (
              <div className={styles.updating}>
                Updating URL...
              </div>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default EnhancedSettings;

// EXAMPLE: Translation Modal Integration
import EnhancedTranslationModal from '../modal/translation-modal-enhanced';

function SettingsWithModal() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Change Translation
      </button>
      
      {showModal && (
        <EnhancedTranslationModal 
          onBack={() => setShowModal(false)}
          isOpen={showModal}
        />
      )}
    </div>
  );
}

// EXAMPLE: Link to Different Translation
import Link from 'next/link';
import { buildChapterUrl } from '../../lib/config';

function TranslationLinks({ chapterSlug }) {
  const translations = [
    { code: 'korean_hamid', name: 'Hamed Choi' },
    { code: 'korean_rwwad', name: 'Ruwwad Translation Center' }
  ];
  
  return (
    <div>
      <h3>View in different translations:</h3>
      {translations.map(trans => (
        <Link 
          key={trans.code}
          href={buildChapterUrl(trans.code, chapterSlug)}
        >
          <a>{trans.name}</a>
        </Link>
      ))}
    </div>
  );
}

// EXAMPLE: Programmatic Navigation with Translation
import { useRouter } from 'next/router';
import { buildVerseUrl } from '../../lib/config';

function NavigateToVerse() {
  const router = useRouter();
  
  const goToVerse = (translation, chapter, verse) => {
    const url = buildVerseUrl(translation, chapter, verse);
    router.push(url);
  };
  
  return (
    <button onClick={() => goToVerse('korean_rwwad', '2-al-baqarah', '255')}>
      Go to Ayatul Kursi (Korean - Ruwwad)
    </button>
  );
}

// EXAMPLE: Listen to Translation Changes
import { useEffect } from 'react';

function TranslationListener() {
  useEffect(() => {
    const handleTranslationChange = (event) => {
      const newTranslation = event.detail.translation;
      console.log('Translation changed to:', newTranslation);
      
      // Do something when translation changes
      // e.g., reload data, update UI, etc.
    };
    
    window.addEventListener('translationChange', handleTranslationChange);
    
    return () => {
      window.removeEventListener('translationChange', handleTranslationChange);
    };
  }, []);
  
  return <div>Listening for translation changes...</div>;
}

// EXAMPLE: Get Current Translation from URL
import { useTranslationRouter } from '../../lib/translation-router';

function CurrentUrlTranslation() {
  const { getCurrentTranslationFromUrl } = useTranslationRouter();
  const urlTranslation = getCurrentTranslationFromUrl();
  
  return (
    <div>
      {urlTranslation ? (
        <p>Current URL translation: {urlTranslation}</p>
      ) : (
        <p>Not on a translation-specific URL</p>
      )}
    </div>
  );
}
