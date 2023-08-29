import {ValidationError} from "../erros/validation-error"

export default class ValidatorRules {

    private constructor(private value: any, private property: string) {

    }


    static values(value: any, property: string):ValidatorRules {
        return new ValidatorRules(value, property)
    }

    required(): this {

        if (this.value === null || this.value === undefined || this.value === "") {
            throw new ValidationError(`The ${this.property} is required`)
        }

        return this
    }

    string(): this {
        if (!isEmpty(this.value) && typeof this.value != "string") {
            throw new ValidationError(`The ${this.property} must be a string`)
        }

        return this
    }

    boolean(): this {
        if (!isEmpty(this.value) && typeof this.value != "boolean") {
            throw new ValidationError(`The ${this.property} must be a boolean`)
        }

        return this
    }


    maxLength(max: Number): this {
        console.log(max)
        console.log(this.value.length)
        if (this.value.length > max) {
            throw new ValidationError(`The ${this.property} must be less or equal than ${max} characters`)
        }
        return this
    }

}


export function isEmpty(value:any) {
    return value===undefined || value ===null
}