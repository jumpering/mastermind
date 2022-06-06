const { Console } = require("console-mpds");
const console = new Console();

const playMastermind = () => {
  do {
    playGame();
  } while (isResumen());
}

const playGame = () => {
  const COLORS = ['r','g','b','y','c','m'];
  const secretCombination = getSecretCombination(COLORS);
  const maxAttempts = 11;
  let currentAttempt = 0;
  let winner;
  do{
    showBoard(currentAttempt);
    const proposedCombination = getproposedCombination();
    const error = validateProposedCombination(proposedCombination, COLORS);
    if(!error) {
      const resultProposedCombination = getResultProposedCombination(proposedCombination, secretCombination);
      winner = isWinner(resultProposedCombination) ;
      const blacks = 0;
      const whites = 1;
      console.writeln(`${proposedCombination} --> ${resultProposedCombination[blacks]} and ${resultProposedCombination[whites]}`);
      currentAttempt += 1;
    }else {
      console.writeln(error);
    }
  }
  while(!winner && currentAttempt < maxAttempts);
  showIsWinnerOrLost(winner);
}

const getSecretCombination = (COLORS) => {
  const COMBINATION_LENGTH = 4;
  const secretCombination = [];
  let index = 0;
  do{
    const min = 0;
    const max = 6;
    let randomInt = Math.floor(Math.random() * (max - min)) + min;
    if(!isRepeatSecretCombination(COLORS[randomInt], secretCombination)) {
      index++;
      secretCombination[secretCombination.length] = COLORS[randomInt];
    }
  }while(index < COMBINATION_LENGTH);
  return secretCombination;
}

const showBoard = (currentAttempt) => {
  const startGame = 0;
  if(currentAttempt === startGame) {
    console.writeln('----- MASTERMIND -----');
  }
  console.writeln(`${currentAttempt} attempt(s):`);
  console.writeln('****');
  console.write(`Propose a combination: `);
}

const getproposedCombination = () => {
  return console.readString();
}

const isRepeatSecretCombination = (color, secretCombination) => {
  if(secretCombination.length === 0) {
    return false;
  }
  for (let i = 0; i < secretCombination.length; i++) {
    if(secretCombination[i] === color) {
      return true;
    }
  }
  return false;
}

const validateProposedCombination = (proposedCombination, COLORS) => {
  const COMBINATION_LENGTH = 4;
  let error;
  if(proposedCombination.length !== COMBINATION_LENGTH) {
    error = 'Wrong proposed combination length';
    return error
  }
  for (let i = 0; i < COMBINATION_LENGTH; i++) {
    let hasColor = false;
    for (let j = 0; j < COLORS.length; j++) {
      if(proposedCombination[i] === COLORS[j]) {
        hasColor = true;
      }
    }
    if (!hasColor) {
      error = 'Wrong colors, they must be';
      return error
    }
  }
  return error;
}

const getResultProposedCombination = (proposedCombination, secretCombination) => {
  let blacks = 0;
  let whites = 0;
  for (let i = 0; i < proposedCombination.length; i++) {
    for (let j = 0; j < secretCombination.length; j++) {
      if(proposedCombination[i] === secretCombination[j]) {
        if(i === j) {
          blacks += 1;
        }else {
          whites += 1;
        }
      }
    }
  }
  return [blacks + ' blacks', whites + ' whites'];
}

const isResumen = () => {
  const answer = console.readString(`Do you want to continue? (y/n): `);
  return answer == 'y' ? true : false;
}

const isWinner = (resultProposedCombination) => {
  const blacks = 0;
  if(resultProposedCombination[blacks] === '4 blacks') {
    return true;
  }
  return false;
}

const showIsWinnerOrLost = (winner) => {
  if(winner) {
    console.writeln(`You've won!!! ;-`);
  }else {
    console.writeln(`You've lost!!! :-(`);
  }
}

playMastermind();