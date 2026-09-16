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
        },

        playRound(coordinates) {
            if (this.getWinner() !== null) throw new Error("Game is over");
            
            const opponent = this.currentTurn === humanPlayer ? computerPlayer : humanPlayer;
            let result;

            if (this.currentTurn === humanPlayer) {
                result = this.currentTurn.attack(opponent.gameboard, coordinates);
            } else {
                result = this.currentTurn.randomAttack(opponent.gameboard);
            }

            if (result === "Already attacked") {
                return result;
            }

            if (this.getWinner() === null) {
                this.switchTurn();
            }   

            return result;
        }
    }
}