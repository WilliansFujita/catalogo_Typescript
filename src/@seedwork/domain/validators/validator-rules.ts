import ValidationError from "../erros/validation-error"

export default class ValidatorRules {

    private constructor(private value: any, private properties: string) {

    }


    static values(value: any, properties: string) {
        return new ValidatorRules(value, properties)
    }

    required(): this {

        if (this.value === null || this.value === undefined || this.value === "") {
            throw new ValidationError(`The ${this.properties} is required`)
        }

        return this
    }

    string(): this {
        if (typeof this.value != "string") {
            throw new ValidationError(`The ${this.properties} must be a string`)
        }

        return this
    }

    maxLength(max: Number): this {
        if (this.value.length() > max) {
            throw new ValidationError(`The ${this.properties} must be less or equal than ${max} characters`)
        }
        return this
    }
}