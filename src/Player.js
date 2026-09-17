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

    const targetQueue = [];

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
                if (targetQueue.length > 0) {
                    const possibleTarget = targetQueue.shift();
                    const x = possibleTarget[0];
                    const y = possibleTarget[1];

                    result = this.attack(enemy, [x, y]);

                    if (result === "Hit") {
                        this.addTargets(enemy, [x, y]);
                    }

                } else {
                    const x = Math.floor(Math.random() * 10);
                    const y = Math.floor(Math.random() * 10);

                    result = this.attack(enemy, [x, y]);

                    if (result === "Hit") {
                        this.addTargets(enemy, [x, y]);
                    }
                }

            } while (result === "Already attacked");

            return result;
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
        },

        placeShip(ship, position, orientation) {
            if (this.gameboard.ships.includes(ship)) {
                throw new Error("Ship already placed on gameboard");
            }

            if (this.fleet.includes(ship)) {
                this.gameboard.placeShip(ship, position, orientation);
            } else {
                throw new Error("Ship not found")
            }
        },

        getAdjacentCells(enemyboard, [x, y]) {
            const result = [];

            if ((x + 1 >= 0) && (x + 1 <= 9)) {
                if (!enemyboard.attacked[y][x + 1]) {
                    result.push([ x + 1, y ])
                }
            }

            if ((x - 1 >= 0) && (x - 1 <= 9)) {
                if (!enemyboard.attacked[y][x - 1]) {
                    result.push([ x - 1, y ])
                }
            }

            if ((y + 1 >= 0) && (y + 1 <= 9)) {
                if (!enemyboard.attacked[y + 1][x]) {
                    result.push([ x , y + 1 ])
                }
            }

            if ((y - 1 >= 0) && (y - 1 <= 9)) {
                if (!enemyboard.attacked[y - 1][x]) {
                    result.push([ x , y - 1 ])
                }
            }

            return result;
        },

        addTargets(enemy, [x, y]) {
            console.log("Queue before:", targetQueue);

            this.getAdjacentCells(enemy, [x, y]).forEach((coordinate) => {
                if (!targetQueue.some(option => option[0] === coordinate[0] && option[1] === coordinate[1])) {
                    targetQueue.push(coordinate);
                    }
            });

            console.log("Queue after:", targetQueue);   
        }
    };
};