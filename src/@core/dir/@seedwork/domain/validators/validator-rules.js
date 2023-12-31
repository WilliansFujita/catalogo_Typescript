"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
const validation_error_1 = require("../erros/validation-error");
class ValidatorRules {
    constructor(value, property) {
        this.value = value;
        this.property = property;
    }
    static values(value, property) {
        return new ValidatorRules(value, property);
    }
    required() {
        if (this.value === null || this.value === undefined || this.value === "") {
            throw new validation_error_1.ValidationError(`The ${this.property} is required`);
        }
        return this;
    }
    string() {
        if (!isEmpty(this.value) && typeof this.value != "string") {
            throw new validation_error_1.ValidationError(`The ${this.property} must be a string`);
        }
        return this;
    }
    boolean() {
        if (!isEmpty(this.value) && typeof this.value != "boolean") {
            throw new validation_error_1.ValidationError(`The ${this.property} must be a boolean`);
        }
        return this;
    }
    maxLength(max) {
        console.log(max);
        console.log(this.value.length);
        if (this.value.length > max) {
            throw new validation_error_1.ValidationError(`The ${this.property} must be less or equal than ${max} characters`);
        }
        return this;
    }
}
exports.default = ValidatorRules;
function isEmpty(value) {
    return value === undefined || value === null;
}
exports.isEmpty = isEmpty;
