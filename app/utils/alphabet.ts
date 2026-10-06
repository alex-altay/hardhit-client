const OTHER_LETTER = '#'
const INDEX_LETTERS = [OTHER_LETTER, ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']

function getIndexLetter(name: string): string {
  const letter = toSearchable(name.trim()).charAt(0).toUpperCase()
  return /^[A-Z]$/.test(letter) ? letter : OTHER_LETTER
}

function getLetterId(letter: string): string {
  return letter === OTHER_LETTER ? 'letter-other' : `letter-${letter.toLowerCase()}`
}

export { INDEX_LETTERS, getIndexLetter, getLetterId }
