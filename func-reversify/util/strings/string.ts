
/**
 * Utility function for splitting a incoming _sentence_ string to regexp groups.
 * @param s 
 * @returns 
 */
function getStringComponents(s: string) {
  return s.match(sentenceRegexp) ?? []
}

/**
 * Returns true if `s === String(Number(s))`.
 * @param s any string
 * @returns 
 */
function isNumber(s: string): boolean {
  return String(Number(s)) === s
}

/**
 * Returns true if _s_ matches the wordRegexp regex.
 * @param s any string
 * @returns 
 */
function isWord(s: string): boolean {
  return s.match(wordRegexp) !== null
}

/**
 * Return _s_ reversed if _s_ if it is a word but not a number.
 * @param s 
 * @returns 
 */
function controller(s: string): string {
  switch (true) {
    case isNumber(s): return s // number precedes word since isWords would return true
    case isWord(s): return reverse(s)
    default: return s 
  }
}

/**
 * Returns a new string that is the reverses this string.
 */
function reverse (s: string) {
  return Array.from(s).reverse().join('')
}

export const reversify = (s: string) => {
  const components = getStringComponents(s)
  
  return components.map(controller).join('')
}

/**
 * Matches conjoined words that follow the pattern A+(-B)* where A is any unicode letter or number and B is any letter. 
 */
const wordRegexp = new RegExp(/[\p{Letter}\p{Number}]+((-\p{Letter}+)+)?/, 'ug')
/**
 * Matches any continuous sequence of unicode punctuation or white space.
 */
const notWordRegexp = new RegExp(/[\p{Punctuation}\p{White_Space}\p{Symbol}]+/, 'ug')
/**
 * Matches any sentence made up of any number of tokens matching either wordRegexp or notWordRegexp.
 */
const sentenceRegexp = new RegExp(`${wordRegexp.source}|${notWordRegexp.source}`, 'ug')
