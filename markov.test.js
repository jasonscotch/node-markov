const { MarkovMachine } = require('./markov');

describe('MarkovMachine', () => {
    test('initializes words & calls makeChains', () => {
        const text = 'the cat in the hat';
        const mm = new MarkovMachine(text);

        expect(mm.words).toEqual(['the','cat','in','the', 'hat']);
        expect(mm.chains).toEqual({"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]})
    });

    test('returns random values in the specified range', () => {
        const mm = new MarkovMachine(''); 
        const randomNumber = mm.getRandom(5, 10);

        expect(randomNumber).toBeGreaterThanOrEqual(5);
        expect(randomNumber).toBeLessThan(10);
      });

      test('generates random text of the specified length', () => {
        const text = 'the cat in the hat';
        const mm = new MarkovMachine(text);
        const numWords = 10; 
        const generatedText = mm.makeText(numWords);
        const generatedWords = generatedText.split(' ');

        expect(generatedWords.length).toBeLessThanOrEqual(numWords);
      });  
});