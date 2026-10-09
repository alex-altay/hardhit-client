const OTHER_LETTER = '#'
const INDEX_LETTERS = [OTHER_LETTER, ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']

function getIndexLetter(name: string): string {
  const letter = toSearchable(name.trim()).charAt(0).toUpperCase()
  return /^[A-Z]$/.test(letter) ? letter : OTHER_LETTER
}

function getLetterId(letter: string): string {
  return letter === OTHER_LETTER ? 'letter-other' : `letter-${letter.toLowerCase()}`
}

/**
 * Groups bands by the first letter of their name:
 * letters in index order, only those letters that have bands,
 * bands sorted by name inside a letter
 */
function groupBandsByLetter<T extends { name: string }>(bands: T[]): Map<string, T[]> {
  const groups = new Map<string, T[]>()
  for (const letter of INDEX_LETTERS) {
    const group = bands
      .filter((band) => getIndexLetter(band.name) === letter)
      .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
    if (group.length) {
      groups.set(letter, group)
    }
  }
  return groups
}

export { INDEX_LETTERS, getIndexLetter, getLetterId, groupBandsByLetter }
