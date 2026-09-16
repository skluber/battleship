import { renderGameboard } from "../src/DOM.js";
import { Gameboard } from "../src/Gameboard.js";
import { Ship } from "../src/Ship.js";

test("rendering board creates a 10x10 with 100 cells", () => {
    const gameboard = Gameboard();
    const board = renderGameboard(gameboard, true);

    const totalCells = board.querySelectorAll(".cell");

    expect(totalCells.length).toBe(100);
})

test("renders ships on the board", () => {
    const gameboard = Gameboard();
    const ship = Ship("Destroyer", 2);

    gameboard.placeShip(ship, [2, 3], "horizontal");

    const board = renderGameboard(gameboard, true);

    const cellShip = board.querySelector(`[data-x="2"][data-y="3"]`);

    expect(cellShip.classList.contains("ship")).toBe(true);
});

test("cells contains real coordinates", () => {
    const gameboard = Gameboard();
    const board = renderGameboard(gameboard, true);

    const cell = board.querySelector(`[data-x="2"][data-y="3"]`);

    expect(cell.dataset.x).toBe("2");
    expect(cell.dataset.y).toBe("3");
});

test("doesn't render enemy ships on board if not attacked yet", () => {
    const gameboard = Gameboard();
    const ship = Ship("Destroyer", 2);

    gameboard.placeShip(ship, [2, 3], "horizontal");

    const board = renderGameboard(gameboard, false);

    const totalShipCells = board.querySelectorAll(".ship");

    expect(totalShipCells.length).toBe(0);
});

test("renders an attacked enemy ship", () => {
    const gameboard = Gameboard();
    const ship = Ship("Destroyer", 2);

    gameboard.placeShip(ship, [2, 3], "horizontal");
    gameboard.receiveAttack([2, 3]);

    const board = renderGameboard(gameboard, false);

    const attackedCell = board.querySelector(
        '[data-x="2"][data-y="3"]'
    );

    expect(attackedCell.classList.contains("ship")).toBe(false);
    expect(attackedCell.classList.contains("hit")).toBe(true);
});

test("renders an attacked water miss", () => {
    const gameboard = Gameboard();

    gameboard.receiveAttack([2, 3]);

    const board = renderGameboard(gameboard, false);

    const attackedCell = board.querySelector(
        '[data-x="2"][data-y="3"]'
    );

    expect(attackedCell.classList.contains("ship")).toBe(false);
    expect(attackedCell.classList.contains("miss")).toBe(true);
});