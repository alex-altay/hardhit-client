const SPECIAL_LETTERS: Record<string, string> = {
  æ: 'ae',
  ø: 'o',
  ł: 'l',
  œ: 'oe',
  þ: 'th',
  ð: 'd',
  ß: 'ss',
}

export function toSearchable(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[æøłœþðß]/g, (letter) => SPECIAL_LETTERS[letter]!)
}
