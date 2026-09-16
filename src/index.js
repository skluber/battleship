import { Game } from "./Game.js";
import { renderGameboard } from "./DOM.js";
import "../styles.css";

const game = Game();

const playerBoard = document.querySelector("#player-board");
const computerBoard = document.querySelector("#enemy-board");

game.humanPlayer.randomPlaceShips();

function renderGame() {
    playerBoard.innerHTML = "";
    playerBoard.appendChild(renderGameboard(game.humanPlayer.gameboard, true));

    computerBoard.innerHTML = "";
    computerBoard.appendChild(renderGameboard(game.computerPlayer.gameboard, false));
}

renderGame();   

computerBoard.addEventListener("click", (event) => {
    if (event.target.classList.contains("cell")) {
        if (game.currentTurn === game.humanPlayer) {
            const x = parseInt(event.target.dataset.x, 10);
            const y = parseInt(event.target.dataset.y, 10);

            game.playRound([x, y]);
            
            if (game.currentTurn === game.computerPlayer) {
                game.playRound();
            }

            renderGame();
        }
    }
});