export { renderGameboard }

function renderGameboard(gameboard, showShips) {
    const board = document.createElement("div");
    board.classList.add("board");

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div");
            cell.dataset.x = x;
            cell.dataset.y = y;
            
            cell.classList.add("cell");

            if (gameboard.cells[y][x] === null) {
                if (gameboard.attacked[y][x]) {
                    cell.classList.add("miss");
                }
            } else {
                if (showShips) {
                    if (gameboard.attacked[y][x]) {
                        cell.classList.add("hit");
                    } else if (showShips) {
                        cell.classList.add("ship");
                    }


                    if (gameboard.attacked[y][x]) {
                        cell.classList.add("hit");
                    } else {
                        cell.classList.add("ship");
                    }
                } else {
                    if (gameboard.attacked[y][x]) {
                        cell.classList.add("hit");
                    }
                }  
            }

            board.appendChild(cell);
        }
    }

    return board;
}