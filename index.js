const Blackjack = require('./src/Blackjack')

// Fetch list of available games, allow user to pick one and load it.

 numberToGame = {
   "1": "Blackjack",
   "2": "Poker"
 }

for(key in numberToGame) {
  console.log(`${key}) ${numberToGame[key]}`)
}

var userGameNumberChoice = prompt('Enter your choice ')

while(!numberToGame.hasOwnProperty(userGameNumberChoice)) {
  console.log("Uh-Oh, that is not a valid choice, try again!")
  var userGameNumberChoice = prompt('Enter your choice ')
}

if(numberToGame[userGameNumberChoice] == "Blackjack") {
  let game = new Blackjack()
  game.play()
}