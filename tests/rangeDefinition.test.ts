import { Big } from "big.js";
import { RangeDefinition } from "../src/rangeDefinition";

describe("Rangely Unit Tests", () => {
    test("Test 1 argument", () => {
        const rangeDefinition = new RangeDefinition(100);
        const { start, end, step } = rangeDefinition;
        expect(start).toBe(0);
        expect(end).toBe(100);
        expect(step).toBe(1);
        expect(rangeDefinition.isInRange(100)).toBe(false);
        expect(rangeDefinition.isInRange(50)).toBe(true);
        expect(rangeDefinition.getStepAfter(10)).toBe(11);
    });

    test("Test 2 argument", () => {
        const rangeDefinition = new RangeDefinition(1, 11);
        const { start, end, step } = rangeDefinition;
        expect(start).toBe(1);
        expect(end).toBe(11);
        expect(step).toBe(1);
        expect(rangeDefinition.isInRange(11)).toBe(false);
        expect(rangeDefinition.isInRange(5)).toBe(true);
        expect(rangeDefinition.getStepAfter(7)).toBe(8);
    });

    test("Test 3 argument and floats", () => {
        const rangeDefinition = new RangeDefinition(1.5, 13.9, 1.1);
        const { start, end, step } = rangeDefinition;
        expect(start).toStrictEqual(new Big("1.5"));
        expect(end).toStrictEqual(new Big("13.9"));
        expect(step).toStrictEqual(new Big("1.1"));
        expect(rangeDefinition.isInRange(new Big("13.9"))).toBe(false);
        expect(rangeDefinition.isInRange(new Big("5.2"))).toBe(true);
        expect(rangeDefinition.getStepAfter(new Big("3.6"))).toStrictEqual(new Big("4.7"));
    });
});
