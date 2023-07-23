import { ClassValidatorFields } from "../class-validator-fields"
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

class StubRule {

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    constructor(data: any) {
        Object.assign(this, data)
    }
}

class StubValidatorFields extends ClassValidatorFields<{ field: string }>{
    validate(data: any): boolean {
        return super.validate(new StubRule(data))
    }
}


describe('ClassValidatorFields Integration Tests', () => {

    it('should validate with erros', () => {
        const validator = new StubValidatorFields()
        expect(validator.validate(null)).toBeFalsy()
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
        })
    })

    it('should be valid', () => {
        const validator = new StubValidatorFields()
        expect(validator.validate({ name: 'some value', price: 5 })).toBeTruthy()
        expect(validator.validateData).toStrictEqual(new StubRule({ name: 'some value', price: 5 }))
    })
})