import { RangelyDefinitionError } from "../src/main";

describe("Rangely Unit Tests", () => {
    test("Check rangely definition error.", () => {
        const error = new RangelyDefinitionError();
        const startOfMessage = "Found mix of";

        expect(error instanceof Error).toBe(true);
        expect(error.message.indexOf(startOfMessage)).toBe(0);

        const throwError = () => {
            throw error;
        };

        expect(throwError).toThrowError();
    });
});
