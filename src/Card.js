class Card {
  constructor(number, suit) {
    this.number = number
    this.suit = suit
  }
  getName() {
    let numberToJQK = {
      "11": "Jack",
      "12": "Queen",
      "13": "King"
    }

    if(this.number == 1) {
      return `Ace of ${this.suit}`
    }
    else if(this.number <= 10) {
      return `${this.number} of ${this.suit}`
    }
    else {
      return `${numberToJQK[`${this.number}`]} of ${this.suit}`
    }
  }
}

module.exports = Card