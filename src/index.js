import { Game } from "./Game.js";
import { renderGameboard } from "./DOM.js";
import "../styles.css";

const game = Game();

const playerBoard = document.querySelector("#player-board");
const computerBoard = document.querySelector("#enemy-board");
const gameStatus = document.querySelector("#game-status");
let waitingForComputer = false;

function renderGame() {
    playerBoard.innerHTML = "";
    playerBoard.appendChild(renderGameboard(game.humanPlayer.gameboard, true));

    computerBoard.innerHTML = "";
    computerBoard.appendChild(renderGameboard(game.computerPlayer.gameboard, true));
}

function updateGameStatus(result, from) {
    let message = "";
    const user = from === game.humanPlayer ? "You" : "Computer";

    switch (result) {
        case "Hit":
            message = `${user} hit a ship!`;
            break;
        
        case "Water":
            message = `${user} missed.`;
            break;

        case "Already attacked":
            message = `${user} already attacked that cell.`;
            break;

        case "Victory":
            if (from === game.humanPlayer) {
                message = `Congratulations! You sank all enemy ships!`;
            }

            if (from === game.computerPlayer) {
                message = `Game over. The computer sank all your ships.`;
            }
            break;

        default:
            message = "Cannot read that status";
    }

    gameStatus.textContent = message;
}

game.humanPlayer.randomPlaceShips();
renderGame();   

computerBoard.addEventListener("click", (event) => {
    if (waitingForComputer) {
        return;
    }

    if (!event.target.classList.contains("cell")) {
        return;
    }

    if (game.currentTurn !== game.humanPlayer) {
        return;
    }

    const x = parseInt(event.target.dataset.x, 10);
    const y = parseInt(event.target.dataset.y, 10);
    let winner = game.getWinner();

    if (winner !== null) {
        updateGameStatus("Victory", winner);
        return;
    }

    const result = game.playRound([x, y]);

    updateGameStatus(result, game.humanPlayer);
    renderGame();

    if (result === "Already attacked") {
        return;
    }

    waitingForComputer = true;

    setTimeout(() => {
        winner = game.getWinner();

        if (
            game.currentTurn === game.computerPlayer &&
            winner === null
        ) {
            const computerResult = game.playRound();

            updateGameStatus(computerResult, game.computerPlayer);
            waitingForComputer = false;
            renderGame();
        }

        winner = game.getWinner();

        if (winner !== null) {
            updateGameStatus("Victory", winner);
            waitingForComputer = false;
            renderGame();
            return;
        }
    }, 100);
});