import { Gameboard } from "../src/Gameboard";

test("creates a 10x10 gameboard", () => {
    const gameboard = Gameboard();

    expect(gameboard.cells.length).toBe(10);
    expect(gameboard.cells[0].length).toBe(10);
}) 