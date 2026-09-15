import { Game } from "../src/Game.js";
import { Ship } from "../src/Ship.js";

test("creates a game with two players", () => {
    const game = Game();

    expect(game.humanPlayer).toBeDefined();
    expect(game.computerPlayer).toBeDefined();
});

test("first turn is for the human player", () => {
    const game = Game();

    expect(game.currentTurn).toBe(game.humanPlayer);
});

test("switches turn after the first human play", () => {
    const game = Game();

    game.switchTurn();
    expect(game.currentTurn).toBe(game.computerPlayer);
});

test("switches turn after the first computer play", () => {
    const game = Game();

    game.switchTurn();
    game.switchTurn();
    expect(game.currentTurn).toBe(game.humanPlayer);
});

test("game is not over at the start", () => {
    const game = Game();

    expect(game.getWinner()).toBe(null);
});

test("human destroys computer ship and becomes the winner", () => {
    const game = Game();
    const ship = Ship(1);

    game.computerPlayer.gameboard.placeShip(ship, [2, 2], "horizontal");
    game.computerPlayer.gameboard.receiveAttack([2, 2]);

    expect(game.getWinner()).toBe(game.humanPlayer);
});

test("computer destroys human ship and becomes the winner", () => {
    const game = Game();
    const ship = Ship(1);

    game.humanPlayer.gameboard.placeShip(ship, [2, 2], "horizontal");
    game.humanPlayer.gameboard.receiveAttack([2, 2]);

    expect(game.getWinner()).toBe(game.computerPlayer);
});