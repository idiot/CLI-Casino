const Blackjack = require('./src/Blackjack')
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

// Fetch list of available games, allow user to pick one and load it.

 numberToGame = {
   "1": "Blackjack",
   "2": "Poker"
 }

var userGameNumberChoice

async function getGameChoice() {
  for(key in numberToGame) {
    console.log(`${key}) ${numberToGame[key]}`)
  }

  userGameNumberChoice = await ask('Enter your choice ')

  while(!numberToGame.hasOwnProperty(userGameNumberChoice)) {
    console.log("Uh-Oh, that is not a valid choice, try again!")
    var userGameNumberChoice = await ask('Enter your choice ')
  }

  if(numberToGame[userGameNumberChoice] == "Blackjack") {
    let game = new Blackjack()
    game.play()
  }
}

getGameChoice()