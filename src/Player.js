import { Gameboard } from "./Gameboard.js";

export { Player };

const Player = (type) => {
    if (type !== "human" && type !== "computer") {
        throw new Error("Invalid player type");
    }

    return {
        gameboard: Gameboard(),
        type,

        attack(enemy, [x,y]) {
            return enemy.receiveAttack([x,y]);
        },

        randomAttack(enemy){
            if (this.type === "human") throw new Error("Forbidden function for humans");

            let result = null;

            do {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);

                result = this.attack(enemy, [x, y]);

            } while (result === "Already attacked");
        }
    };
};