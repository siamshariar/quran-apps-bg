/**
 * Enhanced Translation Selector Component
 * This component integrates with the translation router to update URLs
 * when translation changes
 */

"use client"

import { useContext, useEffect } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import { useTranslationRouter } from '../../lib/translation-router';
import { getAvailableTranslations } from '../../lib/config';

/**
 * Hook to sync translation changes with URL
 */
export const useTranslationSync = () => {
  const { translation, changeTranslation } = useContext(SettingsContext);
  const { switchTranslation, getCurrentTranslationFromUrl } = useTranslationRouter();

  // Sync URL translation with context on mount
  useEffect(() => {
    const urlTranslation = getCurrentTranslationFromUrl();
    
    if (urlTranslation && urlTranslation !== translation) {
      // Update context to match URL
      changeTranslation(urlTranslation);
    }
  }, []); // Run only on mount

  /**
   * Handle translation change and update URL
   */
  const handleTranslationChange = async (newTranslation) => {
    // Update context
    changeTranslation(newTranslation);
    
    // Update URL
    await switchTranslation(newTranslation);
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('translationChange', {
      detail: { translation: newTranslation }
    }));
  };

  return {
    currentTranslation: translation,
    handleTranslationChange,
    availableTranslations: getAvailableTranslations(),
  };
};

/**
 * Translation Change Handler Component
 * Wrap your app with this to automatically handle translation-URL syncing
 */
export const TranslationSyncProvider = ({ children }) => {
  useTranslationSync();
  return children;
};
