/**
 * Translation URL System - Verification Script
 * 
 * Run this in your browser console on any page to verify the system is working
 */

console.log('🔍 Translation URL System Verification\n');

// Test 1: Check if helper functions exist
console.log('Test 1: Helper Functions');
try {
  const { buildChapterUrl, buildVerseUrl, buildSubjectiveUrl, getRoutePrefix } = require('./lib/config');
  console.log('✅ Helper functions imported successfully');
  
  // Test URL building
  const chapterUrl = buildChapterUrl('korean_rwwad', '11-hud');
  const verseUrl = buildVerseUrl('korean_hamid', '11-hud', '5');
  const subjectiveUrl = buildSubjectiveUrl('korean_rwwad', 'prayer');
  
  console.log('  Chapter URL:', chapterUrl);
  console.log('  Verse URL:', verseUrl);
  console.log('  Subjective URL:', subjectiveUrl);
  
  if (chapterUrl === '/korean_rwwad/chapters/11-hud' &&
      verseUrl === '/korean_hamid/chapters/11-hud/verses/5' &&
      subjectiveUrl === '/korean_rwwad/subjective/prayer') {
    console.log('✅ URL building works correctly\n');
  } else {
    console.log('❌ URL building has issues\n');
  }
} catch (error) {
  console.log('❌ Helper functions not found:', error.message, '\n');
}

// Test 2: Check if Korean pages exist
console.log('Test 2: Korean Translation Pages');
const koreanPages = [
  '/korean_rwwad/chapters/1-al-fatihah',
  '/korean_hamid/chapters/1-al-fatihah'
];

koreanPages.forEach(async (page) => {
  try {
    const response = await fetch(page, { method: 'HEAD' });
    if (response.ok) {
      console.log(`✅ ${page} exists`);
    } else {
      console.log(`❌ ${page} returned ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ ${page} - Error: ${error.message}`);
  }
});
console.log('');

// Test 3: Check environment variables
console.log('Test 3: Environment Configuration');
const localizationCode = process.env.NEXT_PUBLIC_LOCALIZATION_CODE;
if (localizationCode) {
  console.log(`✅ NEXT_PUBLIC_LOCALIZATION_CODE is set to: ${localizationCode}`);
} else {
  console.log('⚠️  NEXT_PUBLIC_LOCALIZATION_CODE is not set (using default)');
}
console.log('');

// Test 4: Check translation data
console.log('Test 4: Translation Data');
try {
  const { translationData, config } = require('./lib/config');
  
  if (translationData.Korean) {
    console.log('✅ Korean translations found:');
    translationData.Korean.forEach(trans => {
      console.log(`  - ${trans.name} (${trans.code})`);
    });
  } else {
    console.log('❌ Korean translations not found in translationData');
  }
  
  if (config.availableTranslations) {
    console.log('✅ Available translations for current locale:');
    config.availableTranslations.forEach(trans => {
      console.log(`  - ${trans.name} (${trans.code})`);
    });
  }
} catch (error) {
  console.log('❌ Translation data error:', error.message);
}
console.log('');

// Test 5: Check route mapping
console.log('Test 5: Route Mapping');
try {
  const { getRoutePrefix } = require('./lib/config');
  
  const testCodes = [
    'korean_rwwad',
    'korean_hamid',
    'vietnamese_rwwad',
    'vietnamese_hassan'
  ];
  
  testCodes.forEach(code => {
    const prefix = getRoutePrefix(code);
    if (prefix === code) {
      console.log(`✅ ${code} → /${prefix}`);
    } else {
      console.log(`❌ ${code} → Unexpected prefix: ${prefix}`);
    }
  });
} catch (error) {
  console.log('❌ Route mapping error:', error.message);
}
console.log('');

// Summary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📋 Verification Summary');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('If all tests show ✅, the system is working correctly!');
console.log('');
console.log('Next steps:');
console.log('1. Visit /translation-demo for interactive testing');
console.log('2. Try /korean_rwwad/chapters/1-al-fatihah');
console.log('3. Change translation in Settings and watch URL update');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
