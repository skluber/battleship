import { Gameboard } from "./Gameboard.js";
import { fleet } from "./fleet.js";
import { Ship } from "./Ship.js";

export { Player };

const Player = (type) => {
    if (type !== "human" && type !== "computer") {
        throw new Error("Invalid player type");
    }

    const playerFleet = fleet.map((boat) => {
        return Ship(boat.name, boat.length)
    }) 

    return {
        gameboard: Gameboard(),
        type,
        fleet: playerFleet,

        attack(enemy, [x,y]) {
            return enemy.receiveAttack([x,y]);
        },

        randomAttack(enemy) {
            if (this.type === "human") throw new Error("Forbidden function for humans");

            let result = null;

            do {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);

                result = this.attack(enemy, [x, y]);

            } while (result === "Already attacked");
        },

        randomPlaceShips() {
            
            const orientations = ["horizontal", "vertical"];
            
            
            this.fleet.forEach((boat) => {
                let placed = false;

                while (!placed) {
                    const x = Math.floor(Math.random() * 10);
                    const y = Math.floor(Math.random() * 10);
                    const randomIndex = Math.floor(Math.random() * orientations.length);

                    try {
                        this.gameboard.placeShip(boat, [x, y], orientations[randomIndex]);
                        placed = true;
                    } catch {
                        // Continue placed = false
                    }
                }
            });

        }
    };
};