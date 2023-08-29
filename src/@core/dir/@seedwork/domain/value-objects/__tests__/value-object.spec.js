"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const value_object_1 = __importDefault(require("../value-object"));
class StubValueObject extends value_object_1.default {
}
describe('ValueObject Unit Tests', () => {
    it('Should set value', () => {
        const vo = new StubValueObject('String value');
        expect(vo.value).toBe('String value');
    });
    describe("should convert to a string", () => {
        const date = new Date();
        let arrange = [
            { received: "", expected: "" },
            { received: "fake test", expected: "fake test" },
            { received: 0, expected: "0" },
            { received: 1, expected: "1" },
            { received: 5, expected: "5" },
            { received: true, expected: "true" },
            { received: false, expected: "false" },
            { received: date, expected: date.toString() },
            {
                received: { prop1: "value1" },
                expected: JSON.stringify({ prop1: "value1" }),
            },
        ];
        test.each(arrange)("from $received to $expected", ({ received, expected }) => {
            const vo = new StubValueObject(received);
            expect(vo + "").toBe(expected);
        });
    });
});
