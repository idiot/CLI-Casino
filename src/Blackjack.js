const random = require('random')
const delay = require('delay');
const colors = require('colors');
const readline = require('readline');

function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(question, answer => {
        rl.close();
        resolve(answer);
    }))
}

const Card = require('./Card')

class Blackjack {
  constructor() {
    console.log('Blackjack Loaded')
    this.userHand = []
    this.computerHand = []
    this.finished = false
  }
  async play() {
    console.log('Blackjack.play Loaded')
    await delay(1000)
    console.clear()
    console.log("Welcome to Blackjack!")
    await delay(1000)
    console.log("Dealing cards...")
    await delay(1000)

    // Initial card dealing, 2 cards for the user and 2 for the computer
    this.userHand.push(this.drawCard())
    this.userHand.push(this.drawCard())
    this.computerHand.push(this.drawCard())
    this.computerHand.push(this.drawCard())
    this.update()
  }

  async update() {
    // If bust, finish round, else keep going
    if(this.getTotal(this.userHand) > 21 || this.getTotal(this.computerHand) > 21) {
      this.finishRound()
    }
    else {
      let computerVisibleHand = () => {
        let fullHand = this.getHandNames(this.computerHand)
        let cvh = fullHand
        cvh[0] = '(??? Hidden)'
        return cvh
      }
      console.log("Computer's hand:", computerVisibleHand())
      console.log("Your hand:", this.getHandNames(this.userHand), "Total:", this.getTotal(this.userHand))
      await delay(1000)

      // Get and handle user's next choice, Hit or Stand
      this.getNextMoves()
    }
  }

  async getNextMoves() {
    // Get User's Next Move
    let userNextMove = await ask("Type 'H' to hit, 'S' to stand! > ")
      userNextMove = userNextMove.toLowerCase()

      if(userNextMove == 'h') {
        console.log("You Hit\n")
        this.userHand.push(this.drawCard())
        if(this.getTotal(this.userHand) > 21) {
          this.finishRound()
        }
      }
      else if(userNextMove == 's') {
        console.log("You Stand\n")
      }
      else {
        console.log("Whoops, that is not a valid choice, try again!")
        this.getNextMoves()
      }

    // Get Computer's Next Move
    let computerNumberNextMove = random.int(1, 2)
    if(computerNumberNextMove == 1) {
      // Hit
      await delay(1000)
      console.log("Computer Hits\n")
        this.computerHand.push(this.drawCard())
      }
    else {
      // Stand
      await delay(1000)
      console.log("Computer Stands\n")
    }

    if(userNextMove == 's' && computerNumberNextMove == 2) {
      await delay(1000)
      this.finishRound()
    }
    else {
      await delay(1000)
      console.clear()
      this.update()
    }
  }

async finishRound() {
    this.finished = true
    console.log('Round finished')
    await delay(1000)

    console.log("Computer's hand:", this.getHandNames(this.computerHand), "Total:", this.getTotal(this.computerHand))
    console.log("Your hand:", this.getHandNames(this.userHand), "Total:", this.getTotal(this.userHand))

    if(this.getTotal(this.userHand) > 21) {
      console.log("You bust! Computer wins.")
    }
    else if(this.getTotal(this.computerHand) > 21) {
      console.log("Computer bust! You win.")
    }
    else {
      if(this.getTotal(this.userHand) > this.getTotal(this.computerHand)) {
        console.log("You win!") 
      }
      else if(this.getTotal(this.computerHand) > this.getTotal(this.userHand)) {
        console.log("You lose, Computer wins.")
      }
      else {
        console.log("Tied!")
      }
    }
  }

  getTotal(hand) {
    let total = 0
    let card
    for(card in hand) {
      // Ace value 1 or 11
      if(hand[card].number == 1) {
        if(total + 11 > 21) {
          total += 1
        }
        else if(total + 11 <= 21) {
          total += 11
        }
      }
      // Turn Jack, Queen, King into 10
      else if(hand[card].number > 10) {
        total += 10  
      }
      else {
        total += hand[card].number
      }
    }
    return total
  }

  getHandNames(hand) {
    let handNames = []
    let card
    for(card in hand) {
      handNames.push(hand[card].getName())
    }
    return handNames
  }

  drawCard() {
    let numberToSuit = {
      "1": "Spades",
      "2": "Diamonds",
      "3": "Clubs",
      "4": "Hearts"
    }

    let number = random.int(1, 13)
    let suitNumber = random.int(1, 4)
    let suit = numberToSuit[`${suitNumber}`]

    return new Card(number, suit)
  }
}

module.exports = Blackjack