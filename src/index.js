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
    computerBoard.appendChild(renderGameboard(game.computerPlayer.gameboard, false));
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

        default:
            message = "Cannot read that status";
    }

    gameStatus.textContent = message;
}

game.humanPlayer.randomPlaceShips();
renderGame();   

computerBoard.addEventListener("click", (event) => {
    if (!waitingForComputer) {
        if (event.target.classList.contains("cell")) {
            if (game.currentTurn === game.humanPlayer) {
                const x = parseInt(event.target.dataset.x, 10);
                const y = parseInt(event.target.dataset.y, 10);

                updateGameStatus(game.playRound([x, y]), game.humanPlayer);
                renderGame();
                waitingForComputer = true;
                
                setTimeout(() => {
                    if (game.currentTurn === game.computerPlayer) {
                        updateGameStatus(game.playRound(), game.computerPlayer);
                        waitingForComputer = false;
                    }
                    renderGame();
                }, 800);
                
            }
        }
    }    
});