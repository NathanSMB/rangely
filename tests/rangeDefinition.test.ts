import { Big } from "big.js";
import { RangeDefinition } from "../src/rangeDefinition";

describe("Rangely Unit Tests", () => {
    test("Test 1 argument", () => {
        const expectedResults = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const results = new Array<number>();
        const range = new RangeDefinition(10).createRange();

        for (const num of range) {
            results.push(num);
        }

        expect(results).toStrictEqual(expectedResults);
    });

    test("Test 2 argument", () => {
        const expectedResults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const results = new Array<number>();
        const range = new RangeDefinition(1, 11).createRange();

        for (const num of range) {
            results.push(num);
        }

        expect(results).toStrictEqual(expectedResults);
    });

    test("Test 3 argument and floats", () => {
        const expectedResults = [1.5, 2.6, 3.7, 4.8, 5.9, 7, 8.1, 9.2, 10.3, 11.4];
        const results = new Array<number>();
        const range = new RangeDefinition(1.5, 12, 1.1).createRange();

        for (const num of range) {
            results.push(num);
        }

        expect(results).toStrictEqual(expectedResults);
    });
});
