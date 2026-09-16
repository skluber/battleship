import { renderGameboard } from "../src/DOM.js";
import { Gameboard } from "../src/Gameboard.js";

test("rendering board creates a 10x10 with 100 cells", () => {
    const gameboard = Gameboard();
    const board = renderGameboard(gameboard);

    const totalCells = board.querySelectorAll(".cell");

    expect(totalCells.length).toBe(100);
})