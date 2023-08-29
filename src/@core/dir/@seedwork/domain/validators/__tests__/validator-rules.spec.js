"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_error_1 = require("../../erros/validation-error");
const validator_rules_1 = __importDefault(require("../validator-rules"));
function assertIsValid(expetedRule) {
    expect(() => {
        runRule(expetedRule);
    }).not.toThrow(expetedRule.error);
}
function assertIsInvalid(expetedRule) {
    expect(() => {
        runRule(expetedRule);
    }).toThrow(expetedRule.error);
}
function runRule({ value, property, rule, params = [] }) {
    const validator = validator_rules_1.default.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
}
describe('ValidorRules Unit Tests', () => {
    test('values method', () => {
        const validator = validator_rules_1.default.values('some value', 'field');
        expect(validator).toBeInstanceOf(validator_rules_1.default);
        expect(validator['value']).toBe('some value');
        expect(validator['property']).toBe('field');
    });
    test('required validation rule', () => {
        //invalid
        let arrange = [
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
            { value: "", property: 'field' }
        ];
        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: 'required', error: new validation_error_1.ValidationError('The field is required') });
        });
        //valid
        arrange = [
            { value: 5, property: 'field', },
            { value: true, property: 'field', },
            { value: "String", property: 'field', }
        ];
        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: 'required', error: new validation_error_1.ValidationError('The field is required') });
        });
    });
    test('string validation rule', () => {
        //invalid
        let arrange = [
            { value: 1, property: 'field' },
            { value: true, property: 'field' },
            { value: {}, property: 'field' }
        ];
        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: 'string', error: new validation_error_1.ValidationError('The field must be a string') });
        });
        //valid
        arrange = [
            { value: "String", property: 'field', },
            { value: null, property: 'field', },
            { value: undefined, property: 'field', }
        ];
        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: 'string', error: new validation_error_1.ValidationError('The field must be a string') });
        });
    });
    test('max Length validation rule', () => {
        //invalid
        let arrange = [
            { value: 'aaaaa', property: 'field' },
        ];
        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: 'maxLength', params: [4], error: new validation_error_1.ValidationError('The field must be less or equal than 4 characters') });
        });
        //valid
        arrange = [
            { value: "test", property: 'field', },
            { value: null, property: 'field', },
            { value: undefined, property: 'field', }
        ];
        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: 'maxLength', params: [4], error: new validation_error_1.ValidationError('The field must be less or equal than 4 characters') });
        });
    });
    test('boolean validation rule', () => {
        //invalid
        let arrange = [
            { value: 1, property: 'field' },
            { value: "string", property: 'field' },
            { value: {}, property: 'field' }
        ];
        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: 'boolean', error: new validation_error_1.ValidationError('The field must be a boolean') });
        });
        //valid
        arrange = [
            { value: true, property: 'field', },
            { value: false, property: 'field', },
            { value: null, property: 'field', },
            { value: undefined, property: 'field', }
        ];
        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: 'boolean', error: new validation_error_1.ValidationError('The field must be a boolean') });
        });
    });
    it("should throw a validation error when combine two or more validation rules", () => {
        let validator = validator_rules_1.default.values(null, "field");
        expect(() => {
            validator.required().string().maxLength(5);
        }).toThrow(new validation_error_1.ValidationError("The field is required"));
        validator = validator_rules_1.default.values(5, "field");
        expect(() => {
            validator.required().string().maxLength(5);
        }).toThrow(new validation_error_1.ValidationError("The field must be a string"));
        validator = validator_rules_1.default.values("aaaaaa", "field");
        expect(() => {
            validator.required().string().maxLength(5);
        }).toThrow(new validation_error_1.ValidationError("The field must be less or equal than 5 characters"));
        validator = validator_rules_1.default.values(null, "field");
        expect(() => {
            validator.required().boolean();
        }).toThrow(new validation_error_1.ValidationError("The field is required"));
        validator = validator_rules_1.default.values(5, "field");
        expect(() => {
            validator.required().boolean();
        }).toThrow(new validation_error_1.ValidationError("The field must be a boolean"));
    });
    it("should valid when combine two or more validation rules", () => {
        expect.assertions(0);
        validator_rules_1.default.values("test", "field").required().string();
        validator_rules_1.default.values("aaaaa", "field").required().string().maxLength(5);
        validator_rules_1.default.values(true, "field").required().boolean();
        validator_rules_1.default.values(false, "field").required().boolean();
    });
});
