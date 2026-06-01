export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export const slugify = (text: string): string => {
  const map: { [key: string]: string } = {
    'أ': 'a', 'إ': 'a', 'آ': 'a', 'ا': 'a',
    'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j',
    'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'th',
    'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh',
    'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z',
    'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q',
    'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
    'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'y',
    'ة': 'a', 'ئ': 'e', 'ؤ': 'o', 'لا': 'la',
    ' ': '-',
  };

  let result = text.toLowerCase();
  
  let transliterated = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    // If it's a mapped char, use it. If it's alphanumeric, keep it. If it's hyphen, keep it.
    if (map[char] !== undefined) {
      transliterated += map[char];
    } else if (/[a-z0-9-]/.test(char)) {
      transliterated += char;
    }
  }

  return transliterated
    .replace(/-+/g, '-') // replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // trim hyphens
};
