"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_fields_1 = require("../class-validator-fields");
const libValidator = __importStar(require("class-validator"));
class StubValidatorFields extends class_validator_fields_1.ClassValidatorFields {
}
describe('Class validator fields unit tests', () => {
    it('should initialize erros and validatedData variables with null', () => {
        const validator = new StubValidatorFields();
        expect(validator.errors).toBeNull();
        expect(validator.validateData).toBeNull();
    });
    it('should validate with erros', () => {
        const spyValidateSync = jest.spyOn(libValidator, 'validateSync');
        spyValidateSync.mockReturnValue([
            { property: 'field', constraints: { isRequired: 'some error' } }
        ]);
        const validator = new StubValidatorFields();
        expect(validator.validate(null)).toBeFalsy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validateData).toBeNull();
        expect(validator.errors).toStrictEqual({ field: ["some error"] });
    });
    it('should validate without errors', () => {
        const spyValidateSync = jest.spyOn(libValidator, 'validateSync');
        spyValidateSync.mockReturnValue([]);
        const validator = new StubValidatorFields();
        expect(validator.validate(null)).toBeTruthy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validateData).toBeNull();
        expect(validator.errors).toBeNull();
    });
});
