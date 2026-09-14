import { Ship } from "../src/Ship.js";

test("creates a ship with the given length", () => {
    const ship = Ship(3);

    expect(ship.length).toBe(3);
});

test("hitting a ship increases its hit count", () => {
    const ship = Ship(3);

    ship.hit();

    expect(ship.hits).toBe(1);
});

test("ship gests sunk when hits reach its length", () => {
    const ship = Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
});

test("ship never gets more hits than its own length", () => {
    const ship = Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.hits).toBe(3);
});
