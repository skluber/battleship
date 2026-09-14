export { Gameboard };

const Gameboard = () => {
    return {
        cells: Array(10).fill(null).map(() => {
            return Array(10).fill(null);
        }),
    }
}