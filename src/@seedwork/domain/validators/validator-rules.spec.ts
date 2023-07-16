import ValidatorRules from "./validator-rules"

describe('ValidorRules Unit Tests',()=>{
    test('values method',()=>{
        const validator = ValidatorRules.values('some value','value')
        expect(validator).toBeInstanceOf(ValidatorRules)
    })
})