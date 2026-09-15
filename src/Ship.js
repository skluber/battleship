export { Ship };

const Ship = (name, length) => {
    return {
        name, 
        length,
        hits: 0,

        hit() {
            if (this.isSunk()) {
                return;
            } else {
                this.hits++;
            }
        },

        isSunk() {
            return this.length === this.hits;
        }
    }
}