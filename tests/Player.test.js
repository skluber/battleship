import { Gameboard } from "../src/Gameboard.js";
import { Player } from "../src/Player.js";
import { Ship } from "../src/Ship.js";

test("creates a player with a gameboard", () => {
    const player = Player();

    expect(player.gameboard).toBeDefined();
});

test("player can attack enemy gameboard", () => {
    const player = Player();
    const enemy = Gameboard();

    expect(player.attack(enemy, [2,4])).toBe("Water");
});

test("player can attack enemy ship", () => {
    const player = Player();
    const enemy = Gameboard();
    const ship = Ship(3);

    enemy.placeShip(ship, [2,4], "horizontal");

    expect(player.attack(enemy, [2,4])).toBe("Hit");
    expect(ship.hits).toBe(1);
});