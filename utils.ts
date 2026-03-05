import { Language } from './types';

export const getLocalizedProductName = (name: string, language: Language): string => {
  if (language === 'en') {
    return name
      .replace(/Bodies/gi, 'Bra (Brassier)')
      .replace(/Kachhi/gi, 'Panty')
      .replace(/Chaddi/gi, 'Panty')
      .replace(/बॉडीज/g, 'Bra (Brassier)')
      .replace(/कच्छी/g, 'Panty')
      .replace(/चड्डी/g, 'Panty');
  }
  return name;
};
