import { Gameboard } from "../src/Gameboard";
import { Ship } from "../src/Ship";

test("creates a 10x10 gameboard", () => {
    const gameboard = Gameboard();

    expect(gameboard.cells.length).toBe(10);
    expect(gameboard.cells[0].length).toBe(10);
});

test("places a ship horizontally", () => {
    const gameboard = Gameboard();
    const ship = Ship(3)

    gameboard.placeShip(ship, [2, 4], "horizontal");

    expect(gameboard.cells[4][2]).toBe(ship);
    expect(gameboard.cells[4][3]).toBe(ship);
    expect(gameboard.cells[4][4]).toBe(ship);
});

test("places a ship vertically", () => {
    const gameboard = Gameboard();
    const ship = Ship(3)

    gameboard.placeShip(ship, [2, 4], "vertical");

    expect(gameboard.cells[4][2]).toBe(ship);
    expect(gameboard.cells[5][2]).toBe(ship);
    expect(gameboard.cells[6][2]).toBe(ship);
});

test("doesn't place a ship out of board", () => {
    const gameboard = Gameboard();
    const ship = Ship(3)

    expect(() => {
        gameboard.placeShip(ship, [2, 8], "vertical")
    }).toThrow("Ship is out of board");
});

test("doesn't place a ship on an occupied position", () => {
    const gameboard = Gameboard();
    const ship = Ship(3)
    const ship2 = Ship(3)

    expect(() => {
        gameboard.placeShip(ship, [2, 2], "vertical");
        gameboard.placeShip(ship2, [2, 2], "vertical");
    }).toThrow("Already a ship in position");
});

test("checks supported orientations", () => {
    const gameboard = Gameboard();
    const ship = Ship(3)

    expect(() => {
        gameboard.placeShip(ship, [2, 2], "diagonal");
    }).toThrow("Orientation is not supported");
});

test("hits a ship when attacked", () => {
    const gameboard = Gameboard();
    const ship = Ship(3)

    gameboard.placeShip(ship, [2, 4], "vertical");

    expect(gameboard.receiveAttack([2, 4])).toBe("Hit");
    expect(ship.hits).toBe(1);
});

test("returns Water when attacking an empty cell ", () => {
    const gameboard = Gameboard();

    expect(gameboard.receiveAttack([2, 4])).toBe("Water");
});

test("attacking out of bounds (vertical)", () => {
    const gameboard = Gameboard();

    expect(() => {
        gameboard.receiveAttack([1,10]);
    }).toThrow("Out of bounds");
});

test("attacking out of bounds (horizontal)", () => {
    const gameboard = Gameboard();

    expect(() => {
        gameboard.receiveAttack([10,1]);
    }).toThrow("Out of bounds");
});

test("hits a ship that was already attacked", () => {
    const gameboard = Gameboard();
    const ship = Ship(3);

    gameboard.placeShip(ship, [2, 4], "vertical");
    gameboard.receiveAttack([2,4]);

    expect(gameboard.receiveAttack([2,4])).toBe("Already attacked");
    expect(ship.hits).toBe(1);
});

test("hits water that was already attacked", () => {
    const gameboard = Gameboard();

    gameboard.receiveAttack([2,4]);

    expect(gameboard.receiveAttack([2,4])).toBe("Already attacked");
});

test("returns false when there are unsunk ships", () => {
    const gameboard = Gameboard();
    const ship = Ship(3);

    gameboard.placeShip(ship, [2, 4], "vertical");
    gameboard.receiveAttack([2,4]);

    expect(gameboard.isAllSunk()).toBe(false);
});

test("returns true when all ships are sunk", () => {
    const gameboard = Gameboard();
    const ship = Ship(3);

    gameboard.placeShip(ship, [2, 4], "vertical");
    gameboard.receiveAttack([2,4]);
    gameboard.receiveAttack([2,5]);
    gameboard.receiveAttack([2,6]);

    expect(gameboard.isAllSunk()).toBe(true);
});

test("returns false when there are no ships", () => {
    const gameboard = Gameboard();

    expect(gameboard.isAllSunk()).toBe(false);
});