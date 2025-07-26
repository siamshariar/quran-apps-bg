// lib/utils.js

export function cleanSlug(slug) {
  if (!slug) return slug;
  
  console.log('cleanSlug input:', slug);
  
  // Remove Vietnamese chapter words and clean up
  let cleaned = slug
    .replace(/chương-/gi, '') // Remove "chương-" 
    .replace(/ch[ươ]+ng-/gi, '') // Remove variations of "chương-"
    .replace(/[^\w\s-]/g, '') // Remove all non-word chars except spaces and dashes
    .replace(/-{2,}/g, '-') // Replace 2 or more consecutive dashes with single dash
    .replace(/^-+/, '') // Remove leading dashes
    .replace(/-+$/, '') // Remove trailing dashes
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .trim(); // Remove any whitespace
  
  console.log('cleanSlug output:', cleaned);
  return cleaned;
}

export function normalizeSlug(slug) {
  if (!slug) return slug;
  
  console.log('normalizeSlug input:', slug);
  
  // Decode URI components and clean
  try {
    const decoded = decodeURIComponent(slug);
    const cleaned = cleanSlug(decoded);
    console.log('normalizeSlug - decoded:', decoded, 'cleaned:', cleaned);
    return cleaned;
  } catch (error) {
    console.error('Error decoding slug:', error);
    const cleaned = cleanSlug(slug);
    console.log('normalizeSlug fallback - cleaned:', cleaned);
    return cleaned;
  }
}

// Additional utility for handling chapter slugs specifically
export function cleanChapterSlug(slug) {
  if (!slug) return slug;
  
  return slug
    .replace(/chương-/gi, '') // Remove "chương-"
    .replace(/ch[ươ]+ng-/gi, '') // Remove variations
    .replace(/-{2,}/g, '-') // Fix multiple dashes
    .replace(/^-+/, '') // Remove leading dashes
    .replace(/-+$/, '') // Remove trailing dashes
    .toLowerCase()
    .trim();
}

// Test function
export function testSlugCleaning() {
  const testCases = [
    "53--an-najm",
    "69-chương-al-hāqqah", 
    "38-chương-sād",
    "53-chương-an-najm",
    "chương-test",
    "--test--",
    "normal-slug",
    "53-ch%C6%B0%C6%A1ng-an-najm"
  ];

  console.log('=== Slug cleaning tests ===');
  testCases.forEach(slug => {
    const cleaned = cleanSlug(slug);
    const normalized = normalizeSlug(slug);
    console.log(`Original: "${slug}"`);
    console.log(`Cleaned: "${cleaned}"`);
    console.log(`Normalized: "${normalized}"`);
    console.log('---');
  });
}