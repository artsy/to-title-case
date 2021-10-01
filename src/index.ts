import deburr from "lodash.deburr"
import isNumber from "lodash.isnumber"
import upperFirst from "lodash.upperfirst"

/**
 * Extract only words from the string (excluding special characters. For example, $)
 *
 * Some examples
 *
 * Hello, world -> ["hello", "world"]
 * Musée Picasso -> ["Musée", "Picasso"]
 * Some name [Unique] -> ["Some", "name", "Unique"]
 * hang-up Gallery -> ["hang", "up", "Gallery"]
 * $Whatever space -> ["Whatever", "space"]
 */
const ONLY_WORDS_REGEX = /[^!@#\$%\^\&*\)\(+=.\-\s,\[\]\/\"\?]+/g
export const alwaysLowercaseWords = [
  "and",
  "or",
  "of",
  "but",
  "for",
  "or",
  "nor",
  "the",
  "a",
  "an",
  "as",
  "down",
  "under",
  "over",
  "to",
  "through",
  "during",
  "without",
  "on",
  "x",
]

export const isAllCapitalized = (word: string) => {
  return word.toUpperCase() === word && word.length > 1
}

export const isSpaceCharacter = (word: string) => {
  return /^\s$/.test(word)
}

/**
 * Checks for irregular capitalization
 *
 * Hello -> false
 * hello user -> false
 * HellO -> true
 * heLlo UsEr -> true
 */
export const isIrregularCapitalized = (word: string) => {
  if (isAllCapitalized(word)) {
    return false
  }

  const restOfWord = word.slice(1)
  const convertedWord = deburr(restOfWord)

  return /[A-Z]+/.test(convertedWord)
}

export const toTitleCase = (text: string) => {
  const words = text.match(ONLY_WORDS_REGEX)
  let counter = 0

  if (words === null) {
    return text
  }

  return text.replace(ONLY_WORDS_REGEX, (word, index) => {
    const lowercaseWord = word.toLowerCase()
    counter += 1

    /**
     * We don't change:
     * - full capitalized words (maybe the brand name)
     * - irregular capitalization (heLlo UsEr)
     * - numbers
     */
    if (
      isNumber(word) ||
      isAllCapitalized(word) ||
      isIrregularCapitalized(word)
    ) {
      return word
    }

    // Capitalize the first and last words
    if (counter === 1 || counter === words.length) {
      return upperFirst(word)
    }

    if (alwaysLowercaseWords.includes(lowercaseWord)) {
      return lowercaseWord
    }

    return upperFirst(word)
  })
}
