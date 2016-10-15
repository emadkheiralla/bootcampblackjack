### Texas Holdem Hand Ranker

This component ranks poker hands. For example, you can give it an array of hands and it resolves the winning one for you.

### Installation

```javascript

npm install holdemhandranker --save

```

### Usage

HoldemRanker presents very simple API. The API has two methods:

> **HoldemRanker.valueOfHand(communityCards, holeCards)**
>
> *Returns a representation of the value of given hand*
>
> @param {Array(5)} communityCards - Array of five cards on board
>
> @param {Array(2)} holeCards - Array of two cards player is holding
>
> @returns {Object} - Returns object containing info about the hand (see examples)
>
> ---
>
> **HoldemRanker.getWinners(communityCards, arrayOfHoleCards)**
>
> *Given an array of hands, returns the winning hands. If one hand is superior to all the rest,*
>
> *return value is Array(1). Otherwise Array(x) where x is num of hands sharing the win.*
>
> @param {Array(5)} communityCards - Array of five cards on board
>
> @param {Array(x)} arrayOfHoleCards - Array of hand objects of each player's hole cards
>
> @returns {Array} - Returns Array containing winning hands (see examples)
>
> * Note: hand object is simply a object with at least two keys: id and cards.

---

### Examples

**Example: valueOfHand**
```javascript

var handRanker = require('holdemhandranker');

var handValue = handRanker.valueOfHand(
  ['Ah', 'Kh', 'Qh', '8h', '9h'], // Community cards
  ['Jh', 'Th'] // Player hole cards
);

expect(handValue).to.deep.equal({
	cards: ['Ah', 'Kh', 'Qh', 'Jh', 'Th'], // Cards used
	handType: 'royalFlush', // Hand rank
	kickers: [14, 13, 12, 11, 10] // Sorted array of card values
});


```

**Example: getWinners (1)**
```javascript

var handRanker = require('holdemhandranker');

var winningHands = handRanker.getWinners(
  ['Kh', 'Kc', 'Qh', 'Qc', '3c'], // BOARD
  [
    // Hand object must have 'id' and 'cards' keys
    {id: 1, cards: ['4c', 'Ac']}, // P1 -> flush
    {id: 2, cards: ['5c', '6c']}, // P2 -> flush
    {id: 3, cards: ['Kd', '6s']}, // P3 -> full house
    {id: 4, cards: ['Qs', 'Qd']}, // P4 -> quads
  ]
);

// winningHands is now Array of hands that share the win.
// Using passed-in hand objects with 'id'-keys we can now check which player won.

// One winner
expect(winningHands.length).to.equal(1);
// P4 wins
expect(winningHands[0].id).to.equal(4);

```

**Example: getWinners (2)**
```javascript

var handRanker = require('holdemhandranker');

var winningHands = handRanker.getWinners(
  ['3s', '5s', '7c', '8c', 'Jd'], // BOARD
  [
    {id: 1, cards: ['2d', '4h']}, // 8-high straight, loses
    {id: 2, cards: ['9s', 'Ts']}, // J-high straight, shares win
    {id: 3, cards: ['Tc', '9d']}, // J-high straight, shares win
    {id: 4, cards: ['6s', '9h']}, // 9-high straight, loses
  ]
);

// Two winners
expect(winningHands.length).to.equal(2);
// P2 and P3 win
var winnerIDs = _.map(winningHands, function(winningEval) {
	return winningEval.id;
})
expect(winnerIDs).to.deep.equal([2,3]);

```

### Tests

Uses Mocha. Run:

```javascript

npm test

```

### Dependencies

Uses Lodash as only depedency.

--- 

#### MIT License and so on

### Todo:

1. Ranking hands from best -> worst (currently only returns best hand(s))
2. Async hand resolving?
3. Omaha hand resolving?