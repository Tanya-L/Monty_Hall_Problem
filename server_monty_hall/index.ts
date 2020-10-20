const express = require('express');

const app = express();
const PORT = 5000

interface GameLog {
    prize: number, // where the prize was
    step1: number, // player chooses a door
    step2: number, // presenter removes a door without prize
    step3: number, // player chooses a door again
    result: boolean // whether player wins
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 1. Simulate 3 door choice, where one door contains a prize, and two doors contain nothing
// 2. Player chooses a door
// 3. Presenter removes one door without prize and offers player to change their choice
// 4. Presenter opens the chosen door
function simulateMontyHallOneGame(changeChoice: boolean): GameLog {
    // Game is just a position of a prize
    let prize = randomInt(0, 2)

    // --- Step 1 ---
    // Player chooses one door without opening
    const firstChoice = randomInt(0, 2)

    // --- Step 2 ---
    // Presenter chooses (and removes) one door without prize
    let choices: number[] = []
    for (let i = 0; i < 3; i++) {
        // if player did not choose i, and i is not the prize
        if (firstChoice != i && prize != i) {
            choices.push(i)
        }
    }

    const presenterOpenNoPrize = choices[randomInt(0, choices.length - 1)]

    // --- Step 3 ---
    // Player MIGHT choose another door, if changeChoice is true
    let secondChoice = firstChoice
    if (changeChoice) {
        // remove step2 from choices
        choices = choices.filter(f => f != presenterOpenNoPrize)

        // Remove prize from choices
        // add prize if the player did not already choose it, because they WILL change the choice
        choices = choices.filter(f => f != prize)
        if (firstChoice != prize) {
            choices.push(prize)
        }
        // For 3 doors game choices will always be 1 element, but the code above will work for more doors

        secondChoice = choices[randomInt(0, choices.length - 1)]
    }

    return {
        prize: prize,
        step1: firstChoice,
        step2: presenterOpenNoPrize,
        step3: secondChoice,
        result: secondChoice === prize
    };
}

// Simulate N games and make a list of game results
function simulateMontyHall(numSims: number, changeChoice: boolean): GameLog[] {
    let allGames: GameLog[] = [];
    for (let i = 0; i < numSims; i++) {
        allGames.push(simulateMontyHallOneGame(changeChoice))
    }
    return allGames
}

const cors = require('cors')
app.use(cors())

app.get('/simulate',
    cors(),
    (req, res) => {
    const numSims: number = req.query.numberOfSimulations
    const changeChoice: boolean = req.query.changeChoice === "true"

    const allGames = simulateMontyHall(numSims, changeChoice)

    res.send({
        numberOfSimulations: numSims,
        changeChoice: changeChoice,
        allGames: allGames
    });
});

// run app
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
