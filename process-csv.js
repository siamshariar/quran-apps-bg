const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = 'DIT - Quran Apps Data Process - Translation List.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV (simple parsing, assuming no quoted commas in fields)
const lines = csvContent.split('\n').filter(line => line.trim());
const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());

const translations = [];
for (let i = 1; i < lines.length; i++) {
  const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
  if (values.length >= headers.length) {
    const translation = {};
    headers.forEach((header, index) => {
      translation[header] = values[index] || '';
    });
    translations.push(translation);
  }
}

// Group by language code
const translationsByLanguage = {};
translations.forEach(t => {
  const langCode = t['Code'];
  if (langCode && t['Translation ID']) {
    if (!translationsByLanguage[langCode]) {
      translationsByLanguage[langCode] = [];
    }
    translationsByLanguage[langCode].push({
      code: t['Translation ID'],
      name: t['Translated by'],
      description: t['Description'],
      url: t['URL']
    });
  }
});

// Generate .env content
let envContent = '# Quran App Environment Configuration\n';
envContent += '# Generated from CSV data\n\n';

// Add localization settings
Object.keys(translationsByLanguage).forEach(langCode => {
  const langTranslations = translationsByLanguage[langCode];
  envContent += `# ${langCode.toUpperCase()} Translations\n`;
  envContent += `NEXT_PUBLIC_${langCode.toUpperCase()}_TRANSLATIONS=${JSON.stringify(langTranslations)}\n`;
  envContent += `NEXT_PUBLIC_DEFAULT_TRANSLATION_${langCode.toUpperCase()}=${langTranslations[0]?.code || ''}\n\n`;
});

// Add API configuration
envContent += '# API Configuration\n';
envContent += 'NEXT_PUBLIC_API_BASE_URL=https://api.alquranarabia.com/api\n';
envContent += 'NEXT_PUBLIC_LOCAL_API_BASE_URL=http://127.0.0.1:8000/api\n\n';

// Add existing configuration
envContent += '# Existing Configuration\n';
envContent += 'APP_NAME=quran.pt\n';
envContent += 'NEXT_PUBLIC_LOCALIZATION_CODE=pt\n';
envContent += 'GOOGLE_ANALYTICS_ID=123\n\n';

// Add total translations count
const totalTranslations = Object.values(translationsByLanguage).reduce((sum, arr) => sum + arr.length, 0);
envContent += `# Total translations: ${totalTranslations}\n`;
envContent += `# Languages supported: ${Object.keys(translationsByLanguage).length}\n`;

console.log('Generated .env content:');
console.log(envContent);

// Write to .env file
fs.writeFileSync('.env', envContent);
console.log('✅ .env file updated successfully!');