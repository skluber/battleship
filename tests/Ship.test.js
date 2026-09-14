import { Ship } from "../src/Ship.js";

test("creates a ship with the given length", () => {
    const ship = Ship(3);

    expect(ship.length).toBe(3);
});