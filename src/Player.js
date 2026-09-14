import { Gameboard } from "./Gameboard.js";

export { Player };

const Player = () => {
    return {
        gameboard: Gameboard(),

        attack(enemy, [x,y]) {
            return enemy.receiveAttack([x,y]);
        }
    };
};