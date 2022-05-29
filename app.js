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
    let attempts = [];
    let proposedCombination;
    const SECRET_COMBINATION = setSecretCombination();
    let winner = false;
    const MAIN_TITLE = '\n----- MASTERMIND -----\n \n 0 attempt(s):\ ****'

    console.writeln(MAIN_TITLE);

    do {
        proposedCombination = getProposedCombination();
        attempts.push(proposedCombination);
        console.writeln(attempts.length + " attempt(s): ");
        console.writeln("****");
        console.writeln(showResults(attempts));
    }while ( !winner && attempts.length < MAX_ATTEMPTS );

    function setSecretCombination() {
        //todo math.random
        return ['r', 'g', 'b', 'y'];
    }

    function getProposedCombination() {
        const VALID_COLORS = ['r', 'g', 'b', 'y', 'c', 'm'];
        let combination;
        let validCombination;

        do {
            combination = [];
            combination = console.readString("Propose a combination:");
            if (combination.length != 4) {
                console.writeln("Wrong proposed combination length");
            }
        } while ( !isCorrectLengthAndColors(combination) );

        function isCorrectLengthAndColors(combination) {
            validCombination = [];
            let usedColors = [];

            for (let i = 0; i < VALID_COLORS.length; i++) {
                usedColors[i] = VALID_COLORS[i];
            }

            for (let i = 0; i < usedColors.length; i++) {
                for (let char of combination) {
                    if (usedColors[i] == char) {
                        validCombination += usedColors[i];
                        delete usedColors[i];
                    }
                }
            }

            if (validCombination.length != 4) {
                console.writeln("Wrong colors, they must be unique and: rgybmc");
            }
            return validCombination.length == 4;
        }
        return combination;
    }

    function showResults(attempts) {
        let blacks = 0;
        let whites = 0;

        for (let attempt of attempts) {
            calculateResults(attempt);
            console.writeln(attempt + "-->" + + blacks + " blacks and " + whites + " whites");
            blacks = 0;
            whites = 0;
        }

        function calculateResults(attempt) {
            let match = false;

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
                match = false;
                if (blacks == 4) {
                    winner = true;
                }
            }
        }
    }
}

function isResumed() {
    let answer;

    do{
        answer = console.readString("Do you want to play again? (y/n)");
    }while (answer != "y" && answer != "n");

    return answer === "y";
}
