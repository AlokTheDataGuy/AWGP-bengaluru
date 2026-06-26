/* Shared presentation metadata for the Sanskars index + detail pages.
   Content itself lives in data-json-files/sanskars/sanskars.json — these
   maps only attach a photograph and a short life-stage label per sanskar. */

export const SANSKAR_IMG = {
  punsavan:       '/assets/sanskars/punsavan.jpeg',
  naamkaran:      '/assets/sanskars/naamkaran.jpg',
  annaprashan:    '/assets/sanskars/annaprashan.jpg',
  mundan:         '/assets/sanskars/mundan.jpg',
  vidyarambh:     '/assets/sanskars/vidyaarambh2.jpg',
  yagyopavit:     '/assets/sanskars/yagyopaveet.jpg',
  'janm-divas':   '/assets/sanskars/janmdin.jpg',
  'vivah-divas':  '/assets/sanskars/vivah-diwas.png',
  'pitru-tarpan': '/assets/sanskars/tarpan.jpeg',
  marnottar:      '/assets/sanskars/anthesyti.jpg',
};

export const SANSKAR_STAGE = {
  punsavan:       { en: 'Before Birth',        hi: 'गर्भकाल',          kn: 'ಜನನಪೂರ್ವ' },
  naamkaran:      { en: 'The Newborn',         hi: 'नवजात शिशु',       kn: 'ನವಜಾತ ಶಿಶು' },
  annaprashan:    { en: 'First Foods',         hi: 'प्रथम आहार',        kn: 'ಮೊದಲ ಆಹಾರ' },
  mundan:         { en: 'Early Childhood',     hi: 'शैशव',             kn: 'ಶೈಶವ' },
  vidyarambh:     { en: 'Learning Begins',     hi: 'शिक्षा का आरंभ',    kn: 'ಶಿಕ್ಷಣ ಆರಂಭ' },
  yagyopavit:     { en: 'Coming of Age',       hi: 'उपनयन',            kn: 'ಯೌವನ ಪ್ರವೇಶ' },
  'janm-divas':   { en: 'Celebrating Life',    hi: 'जीवन उत्सव',       kn: 'ಜೀವನ ಉತ್ಸವ' },
  'vivah-divas':  { en: 'Married Life',        hi: 'गृहस्थ जीवन',       kn: 'ಗೃಹಸ್ಥ ಜೀವನ' },
  'pitru-tarpan': { en: 'Honouring Ancestors', hi: 'पितृ स्मरण',        kn: 'ಪಿತೃ ಸ್ಮರಣ' },
  marnottar:      { en: 'Final Farewell',      hi: 'अंतिम विदाई',       kn: 'ಅಂತಿಮ ಬೀಳ್ಕೊಡುಗೆ' },
};
