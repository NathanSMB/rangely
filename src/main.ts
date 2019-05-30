import { Big } from "big.js";

/**
 * @ignore
 * This class is just used to convert the JavaScript numbers to BigNumbers.
 * By using BigNumbers we are able to easily avoid floating point precision errors.
 */
class RangeDefinition {
    public start: Big;
    public end: Big;
    constructor (first: number, second?: number) {
        if (second !== undefined) {
            this.start = new Big(first);
            this.end = new Big(second);
        } else {
            this.start = new Big(0);
            this.end = new Big(first);
        }
    }
}

/**
 * Used to create an iterator in the same manner as pythons range built-in.
 *
 * @param start - The first number in the range.
 * @param end
 * When the range stops. This is exclusive so the range will only include up to this number but not this number itself.
 * @param step - How big of a step to take between numbers in the range. Defaults to 1 when not specified.
 *
 * @returns - An iterator from `start` to `end` with a gap size of `step`.
 */
export function range (start: number, end: number, step: number): IterableIterator<number>;

/**
 * Used to create an iterator in the same manner as pythons range built-in.
 *
 * @param start - The first number in the range.
 * @param end
 * When the range stops. This is exclusive so the range will only include up to this number but not this number itself.
 *
 * @returns - An iterator from `start` to `end` with a gap size of one.
 */
export function range (start: number, end: number): IterableIterator<number>;

/**
 * Used to create an iterator in the same manner as pythons range built-in.
 *
 * @param end
 * When the range stops. This is exclusive so the range will only include up to this number but not this number itself.
 *
 * @returns - An iterator from zero to `end` with a gap size of one.
 */
export function range (end: number): IterableIterator<number>;

export function* range (first: number, second?: number, step = 1) {
    const { start, end } = new RangeDefinition(first, second);
    const stepSize = new Big(step);

    for (let counter = start; counter.lt(end); counter = counter.add(stepSize)) {
        yield parseFloat(counter.toString());
    }
}
