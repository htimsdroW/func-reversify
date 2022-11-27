import mocha from 'mocha'
import { expect } from 'chai'

import { reversify } from '../func-reversify/util/strings/string'

const test = (sentence: string, expected: string): Chai.Assertion => {
  const actual = reversify(sentence)
  
  return expect(actual).to.equal(expected)
}

describe('getStringComponents', function () {
  describe('reversify function', function() {
    it('can reverse a single word: word', function() {
      const sentence = 'abc'
      const expected = 'cba'

      test(sentence, expected)
    })

    it('can reverse two words separated with space: two words', function() {
      const sentence = 'abc def'
      const expected = 'cba fed'

      test(sentence, expected)
    })

    it('ignores a trailing . (dot): word.', function() {
      const sentence = 'word.'
      const expected ='drow.'

      test(sentence, expected)
    })

    it('reverses hyphenated words: deep-fried', function() {
      const sentence = 'deep-fried'
      const expected = 'deirf-peed'

      test(sentence, expected)
    })

    it('reverses words with multiple hyphens: wait-and-see', function() {
      const sentence = 'wait-and-see'
      const expected = 'ees-dna-tiaw'

      test(sentence, expected)
    })

    it('ignores a leading hyphen: ~word', function() {
      const sentence = '-word'
      const expected = '-drow'

      test(sentence, expected)
    })

    it('ignores a trailing hyphen: word~', function() {
      const sentence = 'word-'
      const expected = 'drow-'

      test(sentence, expected)
    })

    it('reverses words with a single special character: wórd', function() {
      const sentence = 'éither'
      const expected = 'rehtié'

      test(sentence, expected)
    })

    it('reverses words with multiple special characters: wórdý', function() {
      const sentence = 'åäöâëéè'
      const expected = 'èéëâöäå'

      test(sentence, expected)
    })

    it('reverses words with cyrillic characters: Привет', function() {
      const sentence = 'Привет'
      const expected = 'тевирП'

      test(sentence, expected)
    })

    it('reverses a hyphenated word with cyrillic characters: На-здоровье', function() {
      const sentence = 'На-здоровье'
      const expected = 'еьвородз-аН'

      test(sentence, expected)
    })

    it('reverses words with kanji+hiragana: ペン回し', function() {
      const sentence = 'ペン回し'
      const expected = 'し回ンペ'

      test(sentence, expected)
    })

    it('reverses short sentences: A short sentence.', function() {
      const sentence = 'A short sentence.'
      const expected = 'A trohs ecnetnes.'

      test(sentence, expected)
    })

    it('reverses "Quick fox jumped over the lazy dog."', function (){
      const sentence = 'Quick fox jumped over the lazy dog.'
      const expected = 'kciuQ xof depmuj revo eht yzal god.'

      test(sentence, expected)
    })
    
    it('reverses a sentence with oxford comma', function() {
      const sentence = 'Today I ate an apple, cottage cheese, and some fruit for breakfast.'
      const expected = 'yadoT I eta na elppa, egattoc eseehc, dna emos tiurf rof tsafkaerb.'

      test(sentence, expected)
    })

    it('reverses a sentence with -- addon(?)', function () {
      const sentence = 'First part -- second part.'
      const expected = 'tsriF trap -- dnoces trap.'

      test(sentence, expected)
    })

    it('reverses multiple sentences', function() {
      const sentence = "It's over Anakin. I have the higher ground!"
      const expected = "tI's revo nikanA. I evah eht rehgih dnuorg!"

      test(sentence, expected)
    })

    it('returns an empty string if supplied with one', function() {
      const sentence = ''
      const expected = ''

      test(sentence, expected)
    })

    it('does not reverse lone numbers', function() {
      const sentence = 'My cat is 10 years old.'
      const expected = 'yM tac si 10 sraey dlo.' // todo what should we do about this?

      test(sentence, expected)
    })

    it('reverses words with hyphenated numbers', function() {
      const sentence = 'I have a 10-year-old.'
      const expected = 'I evah a dlo-raey-01.'

      test(sentence, expected)
    })

    it('ignores trailing ~', function() {
      const sentence = 'Hi~.'
      const expected = 'iH~.'

      test(sentence, expected)
    })

    it('ignores leading ~', function() {
      const sentence = '~1337.'
      const expected = '~1337.'

      test(sentence, expected)
    })
  })
})