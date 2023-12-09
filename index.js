// Description: This file contains the code for the card game War. The game is  played by two players, each of whom is dealt half of a shuffled deck of cards. Each player plays a card from the top of their hand, and the player with the higher card wins the round. The game ends when all cards have been played, and the player with the most points wins. It defines 3 classes: Card, Deck, and Game. The Card class represents a playing card with a rank and a suit.  The Deck class represents a deck of cards, and contains a method to shuffle the deck and a method to divide the deck into two hands. The Game class represents a game of War, and contains a method to play the game, a method to print the scores, and a method to declare the winner.  The game is played by creating a new Game object and calling the play() method.

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }
}

class Deck {
  constructor() {
    this.ranks = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];
    this.suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    this.cards = [];
    this.shuffle(); // Shuffle the deck upon initialization
  }

  shuffle() {
    // Shuffle the cards using Fisher-Yates algorithm
    for (let i = this.ranks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.ranks[i], this.ranks[j]] = [this.ranks[j], this.ranks[i]];
    }

    // Create card objects for each combination of rank and suit
    for (let suit of this.suits) {
      for (let rank of this.ranks) {
        this.cards.push(new Card(rank, suit));
      }
    }
  }

  divideIntoHands() {
    const handSize = this.cards.length / 2;
    const player1Hand = this.cards.slice(0, handSize);
    const player2Hand = this.cards.slice(handSize);
    return [player1Hand, player2Hand];
  }
}

class Game {
  constructor() {
    this.deck = new Deck(); // Create a new deck
    this.players = ["Player 1", "Player 2"];
    this.scores = [0, 0];
  }

  play() {
    const [player1Hand, player2Hand] = this.deck.divideIntoHands();

    // Iterate through each card in the hands
    for (let i = 0; i < player1Hand.length; i++) {
      const player1Card = player1Hand[i];
      const player2Card = player2Hand[i];

      // Compare the ranks of the cards
      const rankComparison =
        this.deck.ranks.indexOf(player1Card.rank) -
        this.deck.ranks.indexOf(player2Card.rank);

      // update the scores based on the comparison
      if (rankComparison > 0) {
        this.scores[0]++; // Increment player 1's score
      } else if (rankComparison < 0) {
        this.scores[1]++; // Increment player 2's score
      }
    }

    // Print the scores
    this.printScores();

    // Declare the winner
    this.declareWinner();
  }

  printScores() {
    console.log(`${this.players[0]} score: ${this.scores[0]}`);
    console.log(`${this.players[1]} score: ${this.scores[1]}`);
  }

  declareWinner() {
    if (this.scores[0] > this.scores[1]) {
      console.log(`${this.players[0]} wins!`);
    } else if (this.scores[0] < this.scores[1]) {
      console.log(`${this.players[1]} wins!`);
    } else {
      console.log("It's a tie!");
    }
  }
}

const game = new Game();
game.play(); // Start the game
