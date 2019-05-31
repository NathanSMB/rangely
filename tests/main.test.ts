import { range } from "../src/main";

function getLastThreeResults (comparer: number, rangeInstance: IterableIterator<number>) {
    const lastThreeResults = new Array<number>();
    for (const numberInRange of rangeInstance) {
        if (numberInRange >= comparer) {
            lastThreeResults.push(numberInRange);
        }
    }
    return lastThreeResults;
}

describe("Rangely Unit Tests", () => {

    test("Works with floats.", () => {
        const lastThreeResults = getLastThreeResults(0.99996, range(0.00001, 0.99999, 0.00001));
        expect(lastThreeResults).toStrictEqual([0.99996, 0.99997, 0.99998]);

        expect( range(0.1, 0.9, 0.1).next() ).toStrictEqual({
            done: false,
            value: 0.1
        });

        expect( range(0.3, 0.3, 1.5).next() ).toStrictEqual({
            done: true,
            value: undefined
        });

        const lastThreeResultsOneArg = getLastThreeResults(9, range(11.5));
        expect(lastThreeResultsOneArg).toStrictEqual([9, 10, 11]);
    });

    test("Works with ints.", () => {
        const lastThreeResults = getLastThreeResults(91, range(7, 100, 3));
        expect(lastThreeResults).toStrictEqual([91, 94, 97]);

        expect( range(2, 9, 1).next() ).toStrictEqual({
            done: false,
            value: 2
        });

        expect( range(20, 20, 3).next() ).toStrictEqual({
            done: true,
            value: undefined
        });
    });

    test("Works without step.", () => {
        const lastThreeResults = getLastThreeResults(9, range(4, 12));
        expect(lastThreeResults).toStrictEqual([9, 10, 11]);

        expect( range(1, 9).next() ).toStrictEqual({
            done: false,
            value: 1
        });

        expect( range(1, 1).next() ).toStrictEqual({
            done: true,
            value: undefined
        });
    });

    test("Works without step or start.", () => {
        const lastThreeResults = getLastThreeResults(84, range(87));
        expect(lastThreeResults).toStrictEqual([84, 85, 86]);

        expect( range(10).next() ).toStrictEqual({
            done: false,
            value: 0
        });

        expect( range(0).next() ).toStrictEqual({
            done: true,
            value: undefined
        });
    });
});
