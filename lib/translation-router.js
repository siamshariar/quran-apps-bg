/**
 * Translation Route Helper
 * This file provides utilities for handling dynamic translation-based routing
 */

import { useRouter } from 'next/router';
import { getRoutePrefix, buildChapterUrl, buildVerseUrl, buildSubjectiveUrl } from './config';

/**
 * Hook to handle translation changes and update URL accordingly
 */
export const useTranslationRouter = () => {
  const router = useRouter();

  /**
   * Navigate to the same content but with a different translation
   * @param {string} newTranslationCode - The translation code to switch to
   */
  const switchTranslation = async (newTranslationCode) => {
    const { pathname, query } = router;
    
    // Detect current route type
    const isChapterRoute = pathname.includes('/chapters/[slug]');
    const isVerseRoute = pathname.includes('/chapters/[slug]/verses/[verseNo]');
    const isSubjectiveRoute = pathname.includes('/subjective');
    
    let newUrl = '';
    
    if (isVerseRoute) {
      // Handle verse route
      const { slug, verseNo } = query;
      newUrl = buildVerseUrl(newTranslationCode, slug, verseNo);
    } else if (isChapterRoute) {
      // Handle chapter route
      const { slug } = query;
      newUrl = buildChapterUrl(newTranslationCode, slug);
    } else if (isSubjectiveRoute) {
      // Handle subjective route
      const slug = query.slug || '';
      newUrl = buildSubjectiveUrl(newTranslationCode, slug);
    } else {
      // For other routes, just update the query parameter
      return router.push({
        pathname,
        query: { ...query, translation: newTranslationCode }
      });
    }
    
    if (newUrl) {
      await router.push(newUrl, undefined, { shallow: false });
    }
  };

  /**
   * Get the current translation code from the URL
   * @returns {string|null} - The current translation code or null
   */
  const getCurrentTranslationFromUrl = () => {
    const { pathname } = router;
    
    // Extract translation code from pathname
    // Pattern: /[translation_code]/chapters/[slug]
    const match = pathname.match(/^\/([^\/]+)\//);
    
    if (match && match[1]) {
      const possibleTranslation = match[1];
      
      // Check if it's a valid translation code (contains underscore or hyphen)
      if (possibleTranslation.includes('_') || possibleTranslation.includes('-')) {
        return possibleTranslation;
      }
    }
    
    return null;
  };

  return {
    switchTranslation,
    getCurrentTranslationFromUrl,
  };
};

/**
 * Middleware to redirect to correct translation-based URL
 * Use this in your pages to ensure users are on the correct URL for their selected translation
 */
export const redirectToTranslationUrl = (router, currentTranslation, urlTranslation) => {
  if (currentTranslation && urlTranslation && currentTranslation !== urlTranslation) {
    const { pathname, query } = router;
    
    // Build new URL based on current route
    if (pathname.includes('/chapters/[slug]/verses/[verseNo]')) {
      const newUrl = buildVerseUrl(currentTranslation, query.slug, query.verseNo);
      router.replace(newUrl);
    } else if (pathname.includes('/chapters/[slug]')) {
      const newUrl = buildChapterUrl(currentTranslation, query.slug);
      router.replace(newUrl);
    } else if (pathname.includes('/subjective')) {
      const newUrl = buildSubjectiveUrl(currentTranslation, query.slug);
      router.replace(newUrl);
    }
  }
};

/**
 * Get all available translation routes for a specific content
 * @param {string} contentType - 'chapter', 'verse', or 'subjective'
 * @param {object} params - Parameters like slug, verseNo, etc.
 * @param {array} translationCodes - Array of translation codes
 * @returns {array} - Array of {code, url} objects
 */
export const getTranslationUrls = (contentType, params, translationCodes) => {
  return translationCodes.map(code => {
    let url = '';
    
    switch(contentType) {
      case 'verse':
        url = buildVerseUrl(code, params.slug, params.verseNo);
        break;
      case 'chapter':
        url = buildChapterUrl(code, params.slug);
        break;
      case 'subjective':
        url = buildSubjectiveUrl(code, params.slug);
        break;
      default:
        url = '';
    }
    
    return { code, url };
  });
};
