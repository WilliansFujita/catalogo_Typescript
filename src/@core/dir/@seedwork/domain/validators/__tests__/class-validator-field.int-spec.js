"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_fields_1 = require("../class-validator-fields");
const class_validator_1 = require("class-validator");
class StubRule {
    constructor(data) {
        Object.assign(this, data);
    }
}
__decorate([
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], StubRule.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)()
], StubRule.prototype, "price", void 0);
class StubValidatorFields extends class_validator_fields_1.ClassValidatorFields {
    validate(data) {
        return super.validate(new StubRule(data));
    }
}
describe('ClassValidatorFields Integration Tests', () => {
    it('should validate with erros', () => {
        const validator = new StubValidatorFields();
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.errors).toStrictEqual({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters'
            ],
            price: [
                'price should not be empty',
                'price must be a number conforming to the specified constraints'
            ]
        });
    });
    it('should be valid', () => {
        const validator = new StubValidatorFields();
        expect(validator.validate({ name: 'some value', price: 5 })).toBeTruthy();
        expect(validator.validateData).toStrictEqual(new StubRule({ name: 'some value', price: 5 }));
    });
});
