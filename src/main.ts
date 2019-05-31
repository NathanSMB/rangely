import { RangeDefinition } from "./rangeDefinition";

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
    const rangeDefinition = new RangeDefinition(first, second, step);
    for (let counter = rangeDefinition.start;
        rangeDefinition.isInRange(counter);
        counter = rangeDefinition.getStepAfter(counter)) {
            yield rangeDefinition.convertToJSNumber(counter);
    }
}

export { RangelyDefinitionError } from "./rangelyError";
