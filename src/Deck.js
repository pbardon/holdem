class Deck {
  constructor() {
    this.shuffleCount = 7;
    this.cards = [];
    this.resetDeck();
  }

  resetDeck() {
    this.cards = [];
    for (let value of Deck.values) {
      for (let suit of Deck.suits) {
        this.cards.push(`${value}:${suit}`);
      }
    }

    for (let i = 0; i++; i < this.shuffleCount) {
      this.shuffleDeck();
    }
  }

  shuffleDeck() {
    this.cards.sort((a,b) => {
      return (Math.random > 0.5 ? 1 : -1);
    });
  }

  dealCard() {
    return this.cards.shift();
  }
}

Deck.suits = ['♣', '♠️', '♦️', '♥️'];

Deck.values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

export default Deck