const { Console } = require("console-mpds");
const console = new Console();

playMastermind();

function playMastermind() {
    do {
        playGame();
    } while (isResumed());
}

function playGame() {
    const MAX_ATTEMPTS = 10;
    const COMBINATION_LENGTH = 4;
    const VALID_COLORS = ['r', 'g', 'b', 'y', 'c', 'm'];
    const MAIN_TITLE = '\n----- MASTERMIND -----\n \n 0 attempt(s):\ ****'
    const MESSAGE_ATTEMPTS = " attempt(s): ";
    const MESSAGE_ASTERISCS = "****";

    const SECRET_COMBINATION = setSecretCombination(VALID_COLORS, COMBINATION_LENGTH);

    let proposedCombination;
    let attempts = [];
    let winner = false;

    console.writeln(MAIN_TITLE);

    do {
        proposedCombination = getProposedCombination(VALID_COLORS, COMBINATION_LENGTH);
        attempts.push(proposedCombination);
        console.writeln(attempts.length + MESSAGE_ATTEMPTS);
        console.writeln(MESSAGE_ASTERISCS);
        console.writeln(showResults(attempts));
        
    } while (!winner && attempts.length < MAX_ATTEMPTS);

    function setSecretCombination(colors, combinationLength) {
        //todo math.random //mocked secretCombination
        return ['r', 'g', 'b', 'y'];
    }

    function getProposedCombination(colors, combinationLength) {
        const MESSAGE_PROPOSECOMBINATION = "Propose a combination:";
        const MESSAGE_WRONG_PROPOSECOMBINATION = "Wrong proposed combination length";
        const MESSAGE_WRONG_INPUT = "Wrong colors, they must be unique and: rgybmc";
        let combination;
        let validCombination;

        do {
            combination = [];
            combination = console.readString(MESSAGE_PROPOSECOMBINATION);
            if (combination.length != combinationLength) {
                console.writeln(MESSAGE_WRONG_PROPOSECOMBINATION);
            }
        } while (!isCorrectColors(combination));

        function isCorrectColors(combination) {
            validCombination = [];
            let usedColors = [];

            for (let i = 0; i < colors.length; i++) {
                usedColors[i] = colors[i];
            }

            for (let i = 0; i < usedColors.length; i++) {
                for (let char of combination) {
                    if (usedColors[i] == char) {
                        validCombination += usedColors[i];
                        delete usedColors[i];
                    }
                }
            }

            if (validCombination.length != combinationLength) {
                console.writeln(MESSAGE_WRONG_INPUT);
            }
            return validCombination.length == combinationLength;
        }
        return combination;
    }

    function showResults(attempts) {
        let blacks;
        let whites;
        const MESSAGE_ARROW = "-->";
        const MESSAGE_BLACKS = " blacks and ";
        const MESSAGE_WHITES = " whites";


        for (let attempt of attempts) {
            calculateResults(attempt);
            console.writeln(attempt + MESSAGE_ARROW + + blacks + MESSAGE_BLACKS + whites + MESSAGE_WHITES);
        }

        function calculateResults(attempt) {
            let match = false;
            blacks = 0;
            whites = 0;

            for (let i = 0; i < attempt.length; i++) {
                for (let j = 0; j < SECRET_COMBINATION.length; j++) {
                    if (attempt[i] == SECRET_COMBINATION[j]) {
                        match = true;
                    }

                    if (match && i == j) {
                        blacks++;
                        match = false;

                    }
                    if (match && i != j) {
                        whites++;
                        match = false;
                    }
                }
                if (blacks == SECRET_COMBINATION.length) {
                    winner = true;
                }
            }
        }
    }
}

function isResumed() {
    let answer;
    const MESSAGE_RESUME = "Do you want to play again? (y/n)";
    const YES = "y";
    const NO = "n";

    do {
        answer = console.readString(MESSAGE_RESUME);
    } while (answer != YES && answer != NO);

    return answer === YES;
}