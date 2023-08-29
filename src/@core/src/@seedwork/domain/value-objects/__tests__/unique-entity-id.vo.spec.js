"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_uuid_error_1 = __importDefault(require("../../erros/invalid-uuid.error"));
const unique_entity_id_vo_1 = __importDefault(require("../unique-entity-id.vo"));
const uuid_1 = require("uuid");
describe("UniqueEntityID Unit Test", () => {
    function spyValidateMethod() {
        return jest.spyOn(unique_entity_id_vo_1.default.prototype, 'validate');
    }
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should throw error when uuid is invalid", () => {
        const validateSpy = spyValidateMethod();
        expect(() => new unique_entity_id_vo_1.default('fake id'))
            .toThrow(new invalid_uuid_error_1.default());
        expect(validateSpy).toHaveBeenCalled();
    });
    it('should accept a uuid passed in constructor', () => {
        const validateSpy = spyValidateMethod();
        const uuid = '83c4cc01-cf13-47e0-b007-620bbfa53767';
        const uniqueId = new unique_entity_id_vo_1.default(uuid);
        expect(uniqueId.id).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });
    it('should accept a uuid passed in constructor', () => {
        const validateSpy = spyValidateMethod();
        const vo = new unique_entity_id_vo_1.default();
        expect((0, uuid_1.validate)(vo.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});
