import Deck from './Deck';

const deck = new Deck();

const headers = [
  "Player Name", "Bank Amount", "Current Bet Amount", "Hand"
];

const data = [
  ["Bart", 100, 5, [deck.dealCard(), deck.dealCard()].join(', ')],
  ["Homer", 50, 1, [deck.dealCard(), deck.dealCard()].join(', ')],
  ["Lisa", 60, 10, [deck.dealCard(), deck.dealCard()].join(', ')],
  ["Marge", 20, 0, [deck.dealCard(), deck.dealCard()].join(', ')]
];

export { headers, data }