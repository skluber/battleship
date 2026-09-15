import { Player } from "./Player.js";

export { Game };

const Game = () => {
    const humanPlayer = Player("human");
    const computerPlayer = Player("computer");

    computerPlayer.randomPlaceShips();

    return {
        humanPlayer,
        computerPlayer,
        currentTurn: humanPlayer,

        switchTurn() {
            this.currentTurn = this.currentTurn === humanPlayer ? computerPlayer : humanPlayer;
        },

        getWinner() {
            if (humanPlayer.gameboard.isAllSunk()) {
                return computerPlayer;
            }

            if (computerPlayer.gameboard.isAllSunk()) {
                return humanPlayer;
            }

            return null;
        }
    }
}