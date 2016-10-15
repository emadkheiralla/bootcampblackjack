var _ = require('lodash');
// Testing dev deps
var chai = require('chai');
var expect = chai.expect;
// Domain deps
var handRanker = require('../index');

// As a reminder, not used in code
var CARDS = [
	['Ah', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh'],
	['As', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks'],
	['Ac', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc'],
	['Ad', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd']
];
/*
describe("INTERNAL: Get combos", function() {

	it("Should get all combos", function() {
		var combos = handRanker.getCombos(['Ah', '2h', '3h', '4h', '5h'], ['6h', '7h']);
		//console.log(combos);
	})
})
*/

describe("Hand resolve (ROYAL FLUSH)", function() {


	it("Should resolve to royal flush", function() {
		var handValue = handRanker.valueOfHand(['Ah', 'Kh', 'Qh', 'Jh', '6d'], ['Tc', 'Th']);
		//console.log("Hand value");
		console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ah', 'Kh', 'Qh', 'Jh', 'Th'],
			handType: 'royalFlush',
			kickers: [14, 13, 12, 11, 10]
		});
	})

	it("Should resolve to royal flush (2)", function() {
		var handValue = handRanker.valueOfHand(['Ah', 'Kh', 'Qh', '8h', '9h'], ['Jh', 'Th']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ah', 'Kh', 'Qh', 'Jh', 'Th'],
			handType: 'royalFlush',
			kickers: [14, 13, 12, 11, 10]
		});
	})

	it("Should resolve to royal flush (3)", function() {
		var handValue = handRanker.valueOfHand(['As', 'Tc', 'Qc', 'Jc', 'Kc'], ['Ad', 'Ac']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ac', 'Kc', 'Qc', 'Jc', 'Tc'],
			handType: 'royalFlush',
			kickers: [14, 13, 12, 11, 10]
		});
	})

	it("Should resolve to royal flush (4)", function() {
		var handValue = handRanker.valueOfHand(['Ac', 'Tc', 'Qc', 'Jc', 'Kc'], ['2c', '2s']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ac', 'Kc', 'Qc', 'Jc', 'Tc'],
			handType: 'royalFlush',
			kickers: [14, 13, 12, 11, 10]
		});
	})	
});

describe("Hand resolve (STRAIGHT FLUSH)", function() {


	it("Should resolve to straight flush", function() {
		//console.log("A low straight flush!")
		var handValue = handRanker.valueOfHand(['Ad', '3d', '5d', 'Kc', 'Ts'], ['4d', '2d']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ad', '5d', '4d', '3d', '2d'],
			handType: 'straightFlush',
			kickers: [14, 5, 4, 3, 2]
		});
	})

	it("Should resolve to straight flush (2)", function() {
		var handValue = handRanker.valueOfHand(['Kd', '9d', 'Qd', 'Jd', 'Td'], ['Ac', 'As']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Kd', 'Qd', 'Jd', 'Td', '9d'],
			handType: 'straightFlush',
			kickers: [13, 12, 11, 10, 9]
		});
	})

	it("Should resolve to straight flush (3)", function() {
		var handValue = handRanker.valueOfHand(['6d', '3d', '5d', 'Kc', 'Ts'], ['4d', '2d']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['6d', '5d', '4d', '3d', '2d'],
			handType: 'straightFlush',
			kickers: [6, 5, 4, 3, 2]
		});
	})
	
});

describe("Hand resolve (FOUR OF A KIND)", function() {


	it("Should resolve to four of a kind", function() {
		var handValue = handRanker.valueOfHand(['Ac', 'As', '5d', 'Kc', 'Ts'], ['Ah', 'Ad']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ac', 'As', 'Ad', 'Ah', 'Kc'],
			handType: 'fourOfAKind',
			kickers: [14, 14, 14, 14, 13]
		});
	})

	it("Should resolve to four of a kind (2)", function() {
		var handValue = handRanker.valueOfHand(['7h', '7c', '7s', 'Tc', 'Ts'], ['Td', '7d']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Tc', '7h', '7c', '7s', '7d'],
			handType: 'fourOfAKind',
			kickers: [10, 7, 7, 7, 7]
		});
	})	

	it("Should resolve to four of a kind (3)", function() {
		var handValue = handRanker.valueOfHand(['7h', '7c', '7s', 'Jc', '7d'], ['2h', '3h']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Jc', '7h', '7c', '7s', '7d'],
			handType: 'fourOfAKind',
			kickers: [11, 7, 7, 7, 7]
		});
	})	

});

describe("Hand resolve (FULL HOUSE)", function() {

	it("Should resolve to full house", function() {
		var handValue = handRanker.valueOfHand(['2h', '2c', '3h', '3s', '6d'], ['3d', 'Qh']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['3h', '3s', '3d', '2h', '2c'],
			handType: 'fullHouse',
			kickers: [3,3,3,2,2]
		});
	})

	it("Should resolve to full house (2)", function() {
		var handValue = handRanker.valueOfHand(['2h', '2c', '3h', '2s', '3d'], ['3c', 'Ah']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['3h', '3c', '3d', '2h', '2c'],
			handType: 'fullHouse',
			kickers: [3,3,3,2,2]
		});
	})

	it("Should resolve to full house (3)", function() {
		var handValue = handRanker.valueOfHand(['Th', 'Tc', 'Qh', 'Ts', 'Qd'], ['5c', '6c']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Qh', 'Qd', 'Th', 'Tc', 'Ts'],
			handType: 'fullHouse',
			kickers: [12,12,10,10,10]
		});
	})	

	it("Should resolve to full house (4)", function() {
		var handValue = handRanker.valueOfHand(['Th', 'Tc', 'Kh', 'Ts', 'Kd'], ['Ac', 'As']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['As', 'Ac', 'Th', 'Tc', 'Ts'],
			handType: 'fullHouse',
			kickers: [14,14,10,10,10]
		});
	})

	it("Should resolve to full house (5)", function() {
		var handValue = handRanker.valueOfHand(['9h', 'Ad', 'Jc', 'Jd', '8d'], ['Js', '8s']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Jc', 'Js', 'Jd', '8s', '8d'],
			handType: 'fullHouse',
			kickers: [11,11,11,8,8]
		});
	})


});

describe("Hand resolve (FLUSH)", function() {


	it("Should resolve to flush", function() {
		var handValue = handRanker.valueOfHand(['Ah', '2h', '3h', '4h', '6d'], ['Kh', 'Qh']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ah', 'Kh', 'Qh', '4h', '3h'],
			handType: 'flush',
			kickers: [14, 13, 12, 4, 3]
		});
	})

	it("Should resolve to flush (2)", function() {
		var handValue = handRanker.valueOfHand(['4s', '4d', '3d', 'Th', '9d'], ['Ad', 'Td']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ad', 'Td', '9d', '4d', '3d'],
			handType: 'flush',
			kickers: [14, 10, 9, 4, 3]
		});
	})	

	it("Should resolve to flush (3)", function() {
		var handValue = handRanker.valueOfHand(['Kc', '7c', '2c', 'Tc', 'Jc'], ['As', 'Td']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Kc', 'Jc', 'Tc', '7c', '2c'],
			handType: 'flush',
			kickers: [13, 11, 10, 7, 2]
		});
	})	

	it("Should resolve to flush (4)", function() {
		var handValue = handRanker.valueOfHand(['3d', '4s', '5d', '6s', '7d'], ['8d', '9d']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['9d', '8d', '7d', '5d', '3d'],
			handType: 'flush',
			kickers: [9,8,7,5,3]
		});
	})			
});

describe("Hand resolve (STRAIGHT)", function() {

	it("Should resolve to straight (1)", function() {
		var handValue = handRanker.valueOfHand(['Ah', '5c', '3c', '4c', 'Kc'], ['Js', '2s']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ah', '5c', '4c', '3c', '2s'],
			handType: 'straight',
			kickers: [5,4,3,2,1]
		});
	})

	it("Should resolve to straight (2)", function() {
		var handValue = handRanker.valueOfHand(['Ah', 'Tc', 'Jc', 'Qc', 'Kc'], ['Jd', 'Js']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ah', 'Kc', 'Qc', 'Jc', 'Tc'],
			handType: 'straight',
			kickers: [14,13,12,11,10]
		});
	})

	it("Should resolve to straight (3)", function() {
		var handValue = handRanker.valueOfHand(['5h', '6s', '7d', 'Qc', 'Kc'], ['8s', '4c']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['8s', '7d', '6s', '5h', '4c'],
			handType: 'straight',
			kickers: [8,7,6,5,4]
		});
	})	

	it("Should resolve to straight (4)", function() {
		var handValue = handRanker.valueOfHand(['Ah', 'As', '2d', '3c', '4c'], ['Ac', '5c']);

		expect(handValue).to.deep.equal({
			cards: ['Ah', '5c', '4c', '3c', '2d'],
			handType: 'straight',
			kickers: [5,4,3,2,1]
		});
	})

});

describe("Hand resolve (THREE OF A KIND)", function() {

	it("Should resolve to trips (1)", function() {
		var handValue = handRanker.valueOfHand(['Ah', 'Ac', 'As', 'Qc', 'Kc'], ['Jd', '3s']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ah', 'Ac', 'As', 'Kc', 'Qc'],
			handType: 'threeOfAKind',
			kickers: [14,14,14,13,12]
		});
	})

	it("Should resolve to trips (2)", function() {
		var handValue = handRanker.valueOfHand(['Ah', 'Ac', '2s', 'Qc', 'Kc'], ['Jd', 'As']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ah', 'Ac', 'As', 'Kc', 'Qc'],
			handType: 'threeOfAKind',
			kickers: [14,14,14,13,12]
		});
	})	

	it("Should resolve to trips (3)", function() {
		var handValue = handRanker.valueOfHand(['Ah', '3c', 'Qc', '2s', 'Kc'], ['Ad', 'As']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ah', 'As', 'Ad', 'Kc', 'Qc'],
			handType: 'threeOfAKind',
			kickers: [14,14,14,13,12]
		});
	})	


});

describe("Hand resolve (TWO PAIR)", function() {

	it("Should resolve to two pairs (1)", function() {
		var handValue = handRanker.valueOfHand(['Ah', '3c', '2s', 'Qc', 'Jc'], ['Ad', 'Qd']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ah', 'Ad', 'Qd', 'Qc', 'Jc'],
			handType: 'twoPairs',
			kickers: [14,14,12,12,11]
		});
	})

	it("Should resolve to two pairs (2)", function() {
		var handValue = handRanker.valueOfHand(['7h', '3c', '2s', '7c', '5c'], ['3d', '2d']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['7h', '7c', '5c', '3c', '3d'],
			handType: 'twoPairs',
			kickers: [7,7,5,3,3]
		});
	})

	it("Should resolve to two pairs (3)", function() {
		var handValue = handRanker.valueOfHand(['7h', '5s', '2s', '7c', '5c'], ['Ad', 'Kd']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ad', '7h', '7c', '5s', '5c'],
			handType: 'twoPairs',
			kickers: [14,7,7,5,5]
		});
	})

	it("Should resolve to two pairs (4)", function() {
		var handValue = handRanker.valueOfHand(['7h', '5s', 'Qs', '7c', '5c'], ['Kh', 'Kd']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Kd', 'Kh', 'Qs', '7h', '7c'],
			handType: 'twoPairs',
			kickers: [13, 13, 12, 7,7]
		});
	})	

	it("Should resolve to two pairs (5)", function() {
		var handValue = handRanker.valueOfHand(['Jh', '5s', 'Qs', '7c', 'Jc'], ['5c', 'As']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['As', 'Jh', 'Jc', '5s', '5c'],
			handType: 'twoPairs',
			kickers: [14, 11, 11, 5,5]
		});
	})	
});

describe("Hand resolve (PAIR)", function() {

	it("Should resolve to pair (1)", function() {
		var handValue = handRanker.valueOfHand(['Jh', '5s', '2d', '7c', 'Th'], ['Qs', 'Qc']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Qc', 'Qs', 'Jh', 'Th', '7c'],
			handType: 'pair',
			kickers: [12, 12, 11, 10, 7]
		});
	})	

	it("Should resolve to pair (2)", function() {
		var handValue = handRanker.valueOfHand(['Ah', '5s', '2d', 'Kc', 'Th'], ['Qs', 'Qc']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ah', 'Kc', 'Qc', 'Qs', 'Th'],
			handType: 'pair',
			kickers: [14, 13, 12, 12, 10]
		});
	})	

	it("Should resolve to pair (3)", function() {
		var handValue = handRanker.valueOfHand(['Ah', '5s', '2d', 'Kc', '9h'], ['3d', '2c']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Ah', 'Kc', '9h', '2d', '2c'],
			handType: 'pair',
			kickers: [14, 13, 9, 2, 2]
		});
	})	

	it("Should resolve to pair (4)", function() {
		var handValue = handRanker.valueOfHand(['5s', '4s', 'Kd', '9c', '9h'], ['3d', 'Jc']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Kd', 'Jc', '9c', '9h', '5s'],
			handType: 'pair',
			kickers: [13, 11, 9, 9, 5]
		});
	})
});

describe("Hand resolve (HIGH CARD)", function() {

	it("Should resolve to high card (1)", function() {
		var handValue = handRanker.valueOfHand(['5s', '4s', 'Kd', '9c', 'Qh'], ['3d', 'Jc']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Kd', 'Qh', 'Jc', '9c', '5s'],
			handType: 'highCard',
			kickers: [13, 12, 11, 9, 5]
		});
	})

	it("Should resolve to high card (2)", function() {
		var handValue = handRanker.valueOfHand(['4h', '5h', '6h', '7h', '9s'], ['As', '2s']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['As', '9s', '7h', '6h', '5h'],
			handType: 'highCard',
			kickers: [14,9,7,6,5]
		});
	})

	it("Should resolve to high card (2)", function() {
		var handValue = handRanker.valueOfHand(['Th', '5h', '6h', '7h', '9s'], ['3s', '2s']);
		//console.log("Hand value");
		//console.log(handValue)
		expect(handValue).to.deep.equal({
			cards: ['Th', '9s', '7h', '6h', '5h'],
			handType: 'highCard',
			kickers: [10,9,7,6,5]
		});
	})		
});


describe("Hand comparisons", function() {
	it("All should draw with equal flush", function() {
		var winningHands = handRanker.getWinners(
			['2h', '3h', '5h', '6h', 'Kh'], // BOARD
			[
				{id: 1, cards: ['3s', 'Ac']}, // P1
				{id: 2, cards: ['Ks', 'Qd']}, // P2
				{id: 3, cards: ['2s', '6c']}  // P2
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)
		expect(winningHands.length).to.equal(3);

		var winnerIDs = _.map(winningHands, function(winningEval) {
			return winningEval.id;
		})
		expect(winnerIDs).to.deep.equal([1,2,3]);
	})

	it("Pair should win highCard", function() {
		var winningHands = handRanker.getWinners(
			['2h', '3c', '5h', '6h', '8s'], // BOARD
			[
				{id: 1, cards: ['3s', 'Ad']}, // P1
				{id: 2, cards: ['Ks', 'Qd']}  // P2
			]
		);
		//console.log("Winning hand");
		//console.log(winningHands)
		// One winner
		expect(winningHands.length).to.equal(1);
		// P1 wins
		expect(winningHands[0].id).to.equal(1);
	})	

	it("Higher straight should win lower straight and trips", function() {
		var winningHands = handRanker.getWinners(
			['Ah', 'Kc', 'Qh', '2h', '3s'], // BOARD
			[
				{id: 1, cards: ['4d', '5d']}, // P1
				{id: 2, cards: ['Td', 'Jd']}, // P2
				{id: 3, cards: ['3c', '3h']}, // P3
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)
		// One winner
		expect(winningHands.length).to.equal(1);
		// P2 wins
		expect(winningHands[0].id).to.equal(2);
	})	

	it("Quads should win lower flush and full house", function() {
		var winningHands = handRanker.getWinners(
			['Kh', 'Kc', 'Qh', 'Qc', '3c'], // BOARD
			[
				{id: 1, cards: ['4c', 'Ac']}, // P1 -> flush
				{id: 2, cards: ['5c', '6c']}, // P2 -> flush
				{id: 3, cards: ['Kd', '6s']}, // P3 -> full house
				{id: 4, cards: ['Qs', 'Qd']}, // P4 -> quads
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)
		// One winner
		expect(winningHands.length).to.equal(1);
		// P2 wins
		expect(winningHands[0].id).to.equal(4);
	})

	it("Two pairs with same kickers draw", function() {
		var winningHands = handRanker.getWinners(
			['Th', 'Kc', '3h', '4c', 'Tc'], // BOARD
			[
				{id: 1, cards: ['Jd', 'Jh']}, // P1 -> two pairs winning
				{id: 2, cards: ['Jc', 'Js']}, // P2 -> two pairs winning
				{id: 3, cards: ['4d', '6s']}, // P3 -> two pairs losing
				{id: 4, cards: ['As', '2c']}, // P4 -> pair
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// Two winners
		expect(winningHands.length).to.equal(2);

		var winnerIDs = _.map(winningHands, function(winningEval) {
			return winningEval.id;
		})
		// P1 and P2 win
		expect(winnerIDs).to.deep.equal([1,2]);
	})

	it("Pair with good kicker wins over pair with lousy kicker", function() {
		var winningHands = handRanker.getWinners(
			['6h', 'Kc', '3d', '8d', 'Jh'], // BOARD
			[
				{id: 1, cards: ['3s', 'As']}, // P1 -> small pair
				{id: 2, cards: ['Js', '4h']}, // P3 -> big pair with lousy kicker
				{id: 3, cards: ['Jc', 'Qd']}, // P2 -> big pair with good kicker
				{id: 4, cards: ['2d', '2c']}, // P4 -> small pair
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// One winner
		expect(winningHands.length).to.equal(1);
		// P3 wins
		expect(winningHands[0].id).to.equal(3);
	})

	it("Full house wins over flush and two pairs", function() {
		var winningHands = handRanker.getWinners(
			['2d', '3h', '3d', '2h', 'Jd'], // BOARD
			[
				{id: 1, cards: ['2s', 'As']}, // P1 -> small full house
				{id: 2, cards: ['5d', 'Ad']}, // P2 -> flush
				{id: 3, cards: ['3s', 'Kh']}, // P3 -> big full house
				{id: 4, cards: ['Ah', 'Ac']}, // P4 -> two pairs
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// One winner
		expect(winningHands.length).to.equal(1);
		// P3 wins
		expect(winningHands[0].id).to.equal(3);
	})

	it("Board quads with ace kicker on board", function() {
		var winningHands = handRanker.getWinners(
			['Td', 'Th', 'Ah', 'Tc', 'Ts'], // BOARD
			[
				// All players must draw
				{id: 1, cards: ['Ac', 'As']}, // P1
				{id: 2, cards: ['2c', '7h']}, // P2
				{id: 3, cards: ['3s', 'Ks']}, // P3 
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// Three winners
		expect(winningHands.length).to.equal(3);
		// All win
		var winnerIDs = _.map(winningHands, function(winningEval) {
			return winningEval.id;
		})
		expect(winnerIDs).to.deep.equal([1,2,3]);
	})

	it("Only high card hands", function() {
		var winningHands = handRanker.getWinners(
			['Td', 'Jh', 'Ah', 'Qc', '5s'], // BOARD
			[
				// All players must draw
				{id: 1, cards: ['2c', '9s']}, // P1 wins with 9 kicker
				{id: 2, cards: ['3h', '8h']}, // P2 loses with 8 kicker
				{id: 3, cards: ['4h', '8d']}, // P3 loses with 8 kicker
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// One winner
		expect(winningHands.length).to.equal(1);
		// P1 wins
		expect(winningHands[0].id).to.equal(1);
	})

	it("Trips vs. two pairs", function() {
		var winningHands = handRanker.getWinners(
			['Td', 'Jh', 'Ah', 'Qc', '5s'], // BOARD
			[
				// All players must draw
				{id: 1, cards: ['5d', '5h']}, // P1 loses with lousy trips
				{id: 2, cards: ['3h', '9c']}, // P2 loses nothing
				{id: 3, cards: ['As', 'Qh']}, // P3 loses with two pairs
				{id: 4, cards: ['Qd', 'Qs']}, // P3 wins with good trips
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// One winner
		expect(winningHands.length).to.equal(1);
		// P1 wins
		expect(winningHands[0].id).to.equal(4);
	})

	it("Three straights against each other", function() {
		var winningHands = handRanker.getWinners(
			['3s', '5s', '7c', '8c', 'Ad'], // BOARD
			[
				// All players must draw
				{id: 1, cards: ['2d', '4h']}, // P1 loses with small straight
				{id: 2, cards: ['9s', '6s']}, // P2 wins with big straight
				{id: 3, cards: ['6c', '4d']}, // P3 loses with middle straight
				{id: 4, cards: ['Kd', 'As']}, // P4 loses with pair
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// One winner
		expect(winningHands.length).to.equal(1);
		// P2 wins
		expect(winningHands[0].id).to.equal(2);
	})	

	it("Three straights against each other, two win", function() {
		var winningHands = handRanker.getWinners(
			['3s', '5s', '7c', '8c', 'Jd'], // BOARD
			[
	
				{id: 1, cards: ['2d', '4h']}, // P1 loses with small straight
				{id: 2, cards: ['9s', 'Ts']}, // P2 wins with big straight
				{id: 3, cards: ['Tc', '9d']}, // P3 wins with same big straight
				{id: 4, cards: ['6s', '9h']}, // P4 loses with middle straight
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// One winner
		expect(winningHands.length).to.equal(2);
		// P2 and P3 win
		var winnerIDs = _.map(winningHands, function(winningEval) {
			return winningEval.id;
		})
		expect(winnerIDs).to.deep.equal([2,3]);
	})	

	it("Straigh flush versus quads", function() {
		var winningHands = handRanker.getWinners(
			['3c', '5c', '7c', 'Ac', '7d'], // BOARD
			[
	
				{id: 1, cards: ['2c', '4c']}, // P1 wins with straight flush
				{id: 2, cards: ['7s', '7h']}, // P2 loses with quads
				{id: 3, cards: ['Tc', 'Jc']}, // P2 loses with flush
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// One winner
		expect(winningHands.length).to.equal(1);
		// P1 wins
		expect(winningHands[0].id).to.equal(1);
	})	

	it("Players share two pairs with same kicker", function() {
		var winningHands = handRanker.getWinners(
			['Jc', 'Jd', 'Ah', 'Ac', '7d'], // BOARD
			[

				{id: 1, cards: ['2c', '4c']}, // P1 loses
				{id: 2, cards: ['8h', '8s']}, // P2 shares
				{id: 3, cards: ['8c', '6h']}, // P3 shares
				{id: 4, cards: ['8d', '4c']}, // P4 shares
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// Three winners
		expect(winningHands.length).to.equal(3);
		// P2 and P3 win
		var winnerIDs = _.map(winningHands, function(winningEval) {
			return winningEval.id;
		})
		expect(winnerIDs).to.deep.equal([2,3,4]);
	})	

	it("Players share on board full house, yet one has bigger snd pair", function() {
		var winningHands = handRanker.getWinners(
			['Jc', 'Jd', 'Ah', 'Ac', 'As'], // BOARD
			[
	
				{id: 1, cards: ['2c', '4c']}, // P1 loses AAAJJ
				{id: 2, cards: ['8h', 'Js']}, // P2 loses AAAJJ
				{id: 3, cards: ['Qs', 'Qh']}, // P3 shares AAAQQ
				{id: 4, cards: ['8d', '4c']}, // P4 loses AAAJJ
				{id: 5, cards: ['Qd', 'Qc']}, // P4 shares AAAQQ
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// Three winners
		expect(winningHands.length).to.equal(2);
		// P2 and P3 win
		var winnerIDs = _.map(winningHands, function(winningEval) {
			return winningEval.id;
		})
		expect(winnerIDs).to.deep.equal([3,5]);
	})

	it("Different pairs against each others", function() {
		var winningHands = handRanker.getWinners(
			['Jc', 'Td', 'Qs', '2c', '3s'], // BOARD
			[
	
				{id: 1, cards: ['2d', '4c']}, // P1 loses pair of twos
				{id: 2, cards: ['8h', 'Js']}, // P2 loses pair of jacks 
				{id: 3, cards: ['5s', '5h']}, // P3 loses pair of fives
				{id: 4, cards: ['2h', '6h']}, // P4 loses pair of twos
				{id: 5, cards: ['Qd', '3d']}, // P5 wins pair of queens
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// One winner
		expect(winningHands.length).to.equal(1);
		// P5 wins
		expect(winningHands[0].id).to.equal(5);
	})

	it("Royal flush beats straight flush", function() {
		var winningHands = handRanker.getWinners(
			['Js', 'Ts', 'Qs', '2c', '3s'], // BOARD
			[
	
				{id: 1, cards: ['As', 'Ks']}, // P1 wins with royal
				{id: 2, cards: ['9s', '8s']}, // P2 loses with straight flush
				{id: 3, cards: ['2d', '5h']}, // P3 loses with pair of twos
				{id: 3, cards: ['6s', '6c']}, // P4 loses with flush
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// One winner
		expect(winningHands.length).to.equal(1);
		// P5 wins
		expect(winningHands[0].id).to.equal(1);
	})	

	it("Two pairs beats pairs", function() {
		var winningHands = handRanker.getWinners(
			['Jc', 'Ts', '3d', '2c', '3s'], // BOARD
			[
	
				{id: 1, cards: ['Th', 'Ks']}, // P1 loses with TT33J
				{id: 2, cards: ['9s', '8s']}, // P2 loses with nothing
				{id: 3, cards: ['Td', 'Ad']}, // P3 loses with TT33A
				{id: 4, cards: ['Kc', 'Kh']}, // P4 wins with KK33J
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// One winner
		expect(winningHands.length).to.equal(1);
		// P4 wins
		expect(winningHands[0].id).to.equal(4);
	})	

	it("Trips share", function() {
		var winningHands = handRanker.getWinners(
			['Jc', 'Ts', '3d', 'Ac', 'As'], // BOARD
			[
	
				{id: 1, cards: ['Th', 'Ks']}, // P1 loses with two pairs
				{id: 2, cards: ['Ad', '8s']}, // P2 shares with trips
				{id: 3, cards: ['5h', 'Ah']}, // P3 shares with trips
				{id: 4, cards: ['Kc', 'Kh']}, // P4 loses with two pairs
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// Two winners
		expect(winningHands.length).to.equal(2);
		// P2 and P3 win
		var winnerIDs = _.map(winningHands, function(winningEval) {
			return winningEval.id;
		})
		expect(winnerIDs).to.deep.equal([2,3]);
	})	

	it("Ace-high straights beat ace-low straigh", function() {
		var winningHands = handRanker.getWinners(
			['Jc', 'Ts', '3d', 'Ac', '5h'], // BOARD
			[
	
				{id: 1, cards: ['Qh', 'Kh']}, // P1 shares
				{id: 2, cards: ['Qs', 'Ks']}, // P2 shares
				{id: 3, cards: ['4h', '2h']}, // P3 loses with ace-low straight
				{id: 4, cards: ['Kc', 'Qc']}, // P4 shares
				{id: 5, cards: ['Ah', 'Ad']}, // P5 loses with trips
				{id: 6, cards: ['Kd', 'Qd']}, // P6 shares
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// Two winners
		expect(winningHands.length).to.equal(4);
		// P2 and P3 win
		var winnerIDs = _.map(winningHands, function(winningEval) {
			return winningEval.id;
		})
		expect(winnerIDs).to.deep.equal([1,2,4,6]);
	})	

	it("Full house beats flush", function() {
		var winningHands = handRanker.getWinners(
			['Jc', 'Jd', '3c', 'Ac', '7c'], // BOARD
			[
	
				{id: 1, cards: ['Qh', 'Kc']}, // P1 loses with flush
				{id: 2, cards: ['Qc', 'Ks']}, // P2 loses with flush
				{id: 3, cards: ['4c', '2c']}, // P3 loses with flush
				{id: 4, cards: ['Jh', '3h']}, // P4 loses with small full house
				{id: 5, cards: ['Js', 'Ad']}, // P5 wins with bigger full house
				{id: 6, cards: ['Tc', 'Th']}, // P6 loses with flush
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// One winner
		expect(winningHands.length).to.equal(1);
		// P5 wins
		expect(winningHands[0].id).to.equal(5);
	})	

	it("All share a high card", function() {
		var winningHands = handRanker.getWinners(
			['Ac', 'Kd', 'Qc', '8h', '7s'], // BOARD
			[
	
				{id: 1, cards: ['2h', '3c']}, // P1 shares
				{id: 2, cards: ['2c', '4s']}, // P2 shares
				{id: 3, cards: ['4c', '6c']}, // P3 shares
			]
		);
		//console.log("Winning hands");
		//console.log(winningHands)

		// Three winners
		expect(winningHands.length).to.equal(3);
		// All win
		var winnerIDs = _.map(winningHands, function(winningEval) {
			return winningEval.id;
		})
		expect(winnerIDs).to.deep.equal([1,2,3]);
	})
});