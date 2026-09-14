export { Gameboard };

const Gameboard = () => {
    return {
        cells: Array(10).fill(null).map(() => {
            return Array(10).fill(null);
        }),

        attacked: Array(10).fill(false).map(() => {
            return Array(10).fill(false);
        }),

        ships: [],

        placeShip(ship, [x, y], orientation) {
            if (ship.length <= 0) return;
            if (ship.length + x > 10 && orientation === "horizontal") throw new Error("Ship is out of board");
            if (ship.length + y > 10 && orientation === "vertical") throw new Error("Ship is out of board");
            if (orientation !== "horizontal" && orientation !== "vertical") throw new Error("Orientation is not supported");

            for (let i = 0; i < ship.length; i++) {
                if (orientation === "horizontal") {
                    if (this.cells[y][x + i] !== null) throw new Error("Already a ship in position");
                } else if (orientation === "vertical") {
                    if (this.cells[y + i][x] !== null) throw new Error("Already a ship in position");
                }
            }

            for (let i = 0; i < ship.length; i++) {
                if (orientation === "horizontal") {
                    this.cells[y][x + i] = ship;
                } else if (orientation === "vertical") {
                    this.cells[y + i][x] = ship;
                }
            }

            this.ships.push(ship);
        },

        receiveAttack([x, y]) {
            if (x < 0 || x > 9) throw new Error("Out of bounds");
            if (y < 0 || y > 9) throw new Error("Out of bounds");
            if (this.attacked[y][x]) return "Already attacked";

            if (this.cells[y][x] === null) {
                this.attacked[y][x] = true;
                return "Water"; 
            } else {
                this.attacked[y][x] = true;
                this.cells[y][x].hit();
                return "Hit";
            }
        },

        isAllSunk(){
            if (this.ships.length === 0) return false;
            return this.ships.every(ship => ship.isSunk());
        }
    }
}