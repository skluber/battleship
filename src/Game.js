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

        playRound([x, y] = [0, 0]) {
            const opponent = this.currentTurn === humanPlayer ? computerPlayer : humanPlayer;

            if (this.currentTurn === humanPlayer) {
                this.currentTurn.attack(opponent.gameboard, [x, y]);
            } else {
                this.currentTurn.randomAttack(opponent.gameboard);
            }

            if (this.getWinner() === null) {
                this.switchTurn();
                
            }
        }
    }
}