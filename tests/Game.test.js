import { Game } from "../src/Game.js";
import { jest } from "@jest/globals";
import { Player } from "../src/Player.js";
import expect from "expect";

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

test("human wins when all computer ships are sunk", () => {
    const game = Game();

    jest.spyOn(game.computerPlayer.gameboard, "isAllSunk").mockReturnValue(true);

    expect(game.getWinner()).toBe(game.humanPlayer);
});

test("computer wins when all human ships are sunk", () => {
    const game = Game();

    jest.spyOn(game.humanPlayer.gameboard, "isAllSunk").mockReturnValue(true);

    expect(game.getWinner()).toBe(game.computerPlayer);
});

test("computer player starts with all ships placed, human with none", () => {
    const game = Game();

    const flatBoard = game.computerPlayer.gameboard.cells.flat();
    const occupiedCells = flatBoard.filter(cell => cell !== null).length;

    expect(occupiedCells).toBe(17);

    const humanBoard = game.humanPlayer.gameboard.cells.flat();
    const humanOccupiedCells = humanBoard.filter(cell => cell !== null).length;

    expect(humanOccupiedCells).toBe(0);
});

test("places the same ship objects from the fleet on the gameboard", () => {
    const player = Player("human");

    player.randomPlaceShips();

    const flatBoard = player.gameboard.cells.flat();
    const occupiedCells = flatBoard.filter(cell => cell !== null);

    expect(
        player.fleet.every((boat) => occupiedCells.includes(boat))
    ).toBe(true);
});

test("player hits opponent board and changes turn", () => {
    const game = Game();

    game.playRound([2, 2]);

    expect(game.computerPlayer.gameboard.attacked[2][2]).toBe(true);
    expect(game.currentTurn).toBe(game.computerPlayer);
});

test("does not switch turn when the game is over", () => {
    const game = Game();
    jest.spyOn(game, "getWinner").mockReturnValue(game.currentTurn);

    game.playRound([2, 2]);
    expect(game.currentTurn).toBe(game.humanPlayer);
});

test("computer attacks randomly after the human turn", () => {
    const game = Game();

    game.playRound([2, 2]);
    expect(game.currentTurn).toBe(game.computerPlayer);

    game.playRound();
    expect(game.currentTurn).toBe(game.humanPlayer);
    const attackedCells = game.humanPlayer.gameboard.attacked.flat();
    expect(attackedCells.filter(cell => cell === true)).toHaveLength(1);
});