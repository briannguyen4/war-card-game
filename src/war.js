
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const SUITS = ["♢", "♡", "♧", "♤"];

const newDeck = () => {
    const deck = [];
    for (let i = 0; i < VALUES.length; i++) {
        for (let j = 0; j < SUITS.length; j++) {
            deck.push(new Card(VALUES[i], SUITS[j]));
        }
    }
    //shuffle
    for (let i = deck.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * i);
        [ deck[i], deck[j] ] = [ deck[j], deck[i] ];
    }

    //split
    return {
        deck1: deck.slice(0, 26),
        deck2: deck.slice(26, 52)
    };
}


export class Deck {
    constructor(decks = newDeck()) {
        this.decks = decks;
    }

    
}

export class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}