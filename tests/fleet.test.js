import { fleet } from "../src/fleet.js";

test("defines the standard fleet", () => {
    expect(fleet).toHaveLength(5);

    expect(fleet).toContainEqual({
        name: "Carrier", 
        length: 5
    });

    expect(fleet).toContainEqual({
        name: "Destroyer", 
        length: 2
    });

})