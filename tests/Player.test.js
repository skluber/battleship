import expect from "expect";
import { Gameboard } from "../src/Gameboard.js";
import { Player } from "../src/Player.js";
import { Ship } from "../src/Ship.js";
import { jest } from "@jest/globals";

test("creates a player with a gameboard", () => {
    const player = Player("human");

    expect(player.gameboard).toBeDefined();
});

test("player can attack enemy gameboard", () => {
    const player = Player("human");
    const enemy = Gameboard();

    expect(player.attack(enemy, [2,4])).toBe("Water");
});

test("player can attack enemy ship", () => {
    const player = Player("human");
    const enemy = Gameboard();
    const ship = Ship("destroyer", 3);

    enemy.placeShip(ship, [2,4], "horizontal");

    expect(player.attack(enemy, [2,4])).toBe("Hit");
    expect(ship.hits).toBe(1);
});

test("player can be created as computer", () => {
    const player = Player("computer");
    
    expect(player.type).toBe("computer");
});

test("player can be created as human", () => {
    const player = Player("human");
    
    expect(player.type).toBe("human");
});

test("can control Math.random", () => {
    const randomSpy = jest.spyOn(Math, "random");
    randomSpy.mockReturnValue(0.5);

    expect(Math.random()).toBe(0.5)
    
    randomSpy.mockRestore();
});

test("computer can generate a random attack", () => {
    const player = Player("computer");
    const enemy = Gameboard();
    const ship = Ship("destroyer", 1);

    const randomSpy = jest.spyOn(Math, "random");
    randomSpy.mockReturnValue(0.5);

    enemy.placeShip(ship, [5, 5], "horizontal");
    player.randomAttack(enemy);

    expect(ship.hits).toBe(1);
    expect(enemy.attacked[5][5]).toBe(true);

    randomSpy.mockRestore();
});

test("computer avoids attacking an already attacked cell", () => {
    const player = Player("computer");
    const enemy = Gameboard();
    enemy.attacked[5][5] = true;

    const randomSpy = jest.spyOn(Math, "random");
    randomSpy
    .mockReturnValueOnce(0.5)
    .mockReturnValueOnce(0.5)
    .mockReturnValueOnce(0.6)
    .mockReturnValueOnce(0.6);

    player.randomAttack(enemy);
    expect(enemy.attacked[6][6]).toBe(true);

    randomSpy.mockRestore();
});

test("human player cannot use random attacks", () => {
    const player = Player("human");
    const enemy = Gameboard();

    expect(() => {
        player.randomAttack(enemy);
    }).toThrow("Forbidden function for humans");
});

test("doesn't allow invalid player types", () => {
    expect(() => {
        Player("root");
    }).toThrow("Invalid player type");
});

test("a player is created with his independent fleet (5 boats)", () => {
    const humanPlayer = Player("human");
    const computerPlayer = Player("computer");

    expect(humanPlayer.fleet).toHaveLength(5);
    expect(humanPlayer.fleet[0].hits).toBe(0);
    expect(humanPlayer.fleet[0].length).toBe(5);
    expect(humanPlayer.fleet[0]).not.toBe(computerPlayer.fleet[0]);
});

test("places the entire fleet randomly on the gameboard", () => {
    const humanPlayer = Player("human");
    humanPlayer.randomPlaceShips();

    const flatBoard = humanPlayer.gameboard.cells.flat();
    const totalBoatCells = flatBoard.filter(cell => cell !== null).length;

    // All boats means 17 not null cells
    expect(totalBoatCells).toBe(17)
});

test("player can place a ship from their fleet", () => {
    const player = Player("human");
    const ship = player.fleet[0];

    player.placeShip(ship, [2, 2], "horizontal");

    expect(player.gameboard.cells[2][2]).toBe(ship);
});

test("doesn't allow placing the same ship twice", () => {
    const player = Player("human");
    const ship = player.fleet[0];

    player.placeShip(ship, [2, 2], "horizontal");

    expect(() => {
        player.placeShip(ship, [5, 5], "horizontal");
    }).toThrow();
});

test("doesn't allow placing enemy ships as his own", () => {
    const player = Player("human");
    const opponent = Player("computer");

    const opponentShip = opponent.fleet[0];

    expect(() => {
        player.placeShip(opponentShip, [5, 5], "horizontal");
    }).toThrow();
});