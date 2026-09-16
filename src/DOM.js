export { renderGameboard }

function renderGameboard(gameboard) {
    const board = document.createElement("div");
    board.classList.add("board");

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div");
            cell.dataset.x = x;
            cell.dataset.y = y;
            
            if (gameboard.cells[y][x] === null) {
                cell.classList.add("cell");
            } else {
                cell.classList.add("cell");
                cell.classList.add("ship");
            }

            board.appendChild(cell);
        }
    }

    return board;
}