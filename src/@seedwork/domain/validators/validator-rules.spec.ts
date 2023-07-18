import ValidationError from "../erros/validation-error"
import ValidatorRules from "./validator-rules"


type Values = {
    value: any,
    property: string,
}

type ExpectedRule = {
    value: any,
    property: string,
    rule: keyof ValidatorRules,
    error: ValidationError,
    params?: any[]
}

function assertIsValid(expetedRule: ExpectedRule) {
    expect(() => {
        runRule(expetedRule)
    }).not.toThrow(expetedRule.error)
}

function assertIsInvalid(expetedRule: ExpectedRule) {
    expect(() => {
        runRule(expetedRule)
    }).toThrow(expetedRule.error)
}

function runRule({ value, property, rule, params = [] }: Omit<ExpectedRule, "error">) {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule] as (...args: any[]) => ValidatorRules;
    method.apply(validator, params);
}

describe('ValidorRules Unit Tests', () => {
    test('values method', () => {
        const validator = ValidatorRules.values('some value', 'field')
        expect(validator).toBeInstanceOf(ValidatorRules)
        expect(validator['value']).toBe('some value')
        expect(validator['property']).toBe('field')
    })

    test('required validation rule', () => {
        //invalid
        let arrange: Values[] = [
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
            { value: "", property: 'field' }
        ]

        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: 'required', error: new ValidationError('The field is required') })
        })

        //valid
        arrange = [
            { value: 5, property: 'field', },
            { value: true, property: 'field', },
            { value: "String", property: 'field', }
        ]

        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: 'required', error: new ValidationError('The field is required') })
        })
    })

    test('string validation rule', () => {
        //invalid
        let arrange: Values[] = [
            { value: 1, property: 'field' },
            { value: true, property: 'field' },
            { value: {}, property: 'field' }
        ]

        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: 'string', error: new ValidationError('The field must be a string') })
        })

        //valid
        arrange = [
            { value: "String", property: 'field', },
            { value: null, property: 'field', },
            { value: undefined, property: 'field', }
        ]

        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: 'string', error: new ValidationError('The field must be a string') })
        })
    })


    test('max Length validation rule', () => {
        //invalid
        let arrange: Values[] = [
            { value: 'aaaaa', property: 'field' },
        ]

        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: 'maxLength', params: [4], error: new ValidationError('The field must be less or equal than 4 characters') })
        })

        //valid
        arrange = [
            { value: "test", property: 'field', },
            { value: null, property: 'field', },
            { value: undefined, property: 'field', }
        ]

        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: 'maxLength', params: [4], error: new ValidationError('The field must be less or equal than 4 characters') })
        })
    })

    test('boolean validation rule', () => {
        //invalid
        let arrange: Values[] = [
            { value: 1, property: 'field' },
            { value: "string", property: 'field' },
            { value: {}, property: 'field' }
        ]

        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: 'boolean', error: new ValidationError('The field must be a boolean') })
        })

        //valid
        arrange = [
            { value: true, property: 'field', },
            { value: false, property: 'field', },
            { value: null, property: 'field', },
            { value: undefined, property: 'field', }
        ]

        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: 'boolean', error: new ValidationError('The field must be a boolean') })
        })
    })

    it("should throw a validation error when combine two or more validation rules", () => {
        let validator = ValidatorRules.values(null, "field");
        expect(() => {
            validator.required().string().maxLength(5);
        }).toThrow(new ValidationError("The field is required"));

        validator = ValidatorRules.values(5, "field");
        expect(() => {
            validator.required().string().maxLength(5);
        }).toThrow(new ValidationError("The field must be a string"));

        validator = ValidatorRules.values("aaaaaa", "field");
        expect(() => {
            validator.required().string().maxLength(5);
        }).toThrow(
            new ValidationError("The field must be less or equal than 5 characters")
        );

        validator = ValidatorRules.values(null, "field");
        expect(() => {
            validator.required().boolean();
        }).toThrow(new ValidationError("The field is required"));

        validator = ValidatorRules.values(5, "field");
        expect(() => {
            validator.required().boolean();
        }).toThrow(new ValidationError("The field must be a boolean"));

    })

    it("should valid when combine two or more validation rules", () => {
        expect.assertions(0);
        ValidatorRules.values("test", "field").required().string();
        ValidatorRules.values("aaaaa", "field").required().string().maxLength(5);

        ValidatorRules.values(true, "field").required().boolean();
        ValidatorRules.values(false, "field").required().boolean();
    });
})