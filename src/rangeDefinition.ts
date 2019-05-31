import { Big } from "big.js";
import { RangelyDefinitionError } from "./rangelyError";

/**
 * Class that stores and manipulates the data for the range iterator.
 */
export class RangeDefinition {

    /** The start of the range. */
    public readonly start: Big | number;

    /**
     * The end of the range.
     * This is exclusive so the range will only include up to this number but not this number itself.
     */
    public readonly end: Big | number;

    /** The size of the steps to take until you hit the end. */
    public readonly step: Big | number;

    /**
     * @param first
     * Either the `start` or `end`. It's the `end` if `second` is undefined otherwise it is the `start`.
     * @param second - The `end` of the range.
     * @param step - The `step` property. Defaults to 1.
     */
    constructor (first: number, second?: number, step: number = 1) {
        if (Number.isInteger(first) && Number.isInteger(step) && (second === undefined || Number.isInteger(second))) {
            if (second !== undefined) {
                this.start = first;
                this.end = second;
            } else {
                this.start = 0;
                this.end = first;
            }
            this.step = step;
        } else {
            if (second !== undefined) {
                this.start = new Big(first);
                this.end = new Big(second);
            } else {
                this.start = new Big(0);
                this.end = new Big(first);
            }
            this.step = new Big(step);
        }
    }

    /**
     * Mainly used for comparing the current count in the generator to `end`.
     *
     * @param current - The number to compare to `end`
     * @returns Whether `current` is in range.
     */
    public isInRange (current: Big | number) {
        if (current instanceof Big) {
            return current.lt(this.end);
        }

        /* istanbul ignore next */
        if (this.end instanceof Big) {
            throw new RangelyDefinitionError();
        }

        return current < this.end;
    }

    /**
     * @param current - The number to add `step` to.
     * @returns The next value in the range after `current`.
     */
    public getStepAfter (current: Big | number) {
        if (current instanceof Big) {
            return current.add(this.step);
        }

        /* istanbul ignore next */
        if (this.step instanceof Big) {
            throw new RangelyDefinitionError();
        }

        return current += this.step;
    }

    /**
     * @param num - The number to convert to a JS number.
     * @returns `num` as a JS number.
     */
    public convertToJSNumber (num: Big | number) {
        if (num instanceof Big) {
            return parseFloat(num.toString());
        }

        return num;
    }
}
