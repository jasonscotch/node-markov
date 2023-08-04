/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = {};
    
    for (let i = 0; i < this.words.length - 1; i++) {
      let currentWords = [this.words[i], this.words[i + 1]];
      let nextWord = this.words[i + 2] || null;

      let key = currentWords.join(' ');

      if (!chains[key]) {
        chains[key] = [];
      }
      chains[key].push(nextWord);
    }
    this.chains = chains;
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    const generatedText = [];
    let currentWords = this.words.slice(
      this.getRandom(0, this.words.length - 2),
      this.getRandom(1, this.words.length -1)
    );
    
    for (let i = 0; i < numWords; i++) {
      if (!currentWords || !this.chains[currentWords.join(' ')]) {
        break;
      }
      const possibleNextWords = this.chains[currentWords.join(' ')];
      const nextWord = possibleNextWords[this.getRandom(0,possibleNextWords.length)];
      generatedText.push(...currentWords);
      currentWords = [currentWords[1], nextWord];
    }
    generatedText.push(...currentWords);

    let res = generatedText.join(' ');
    return res;
    
  }
}

module.exports = { MarkovMachine };
