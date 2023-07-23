import { ClassValidatorFields } from "../class-validator-fields"
import * as libValidator from 'class-validator' 

class StubValidatorFields extends ClassValidatorFields<{field: string}>{

}

describe('Class validator fields unit tests',()=>{
    it('should initialize erros and validatedData variables with null',()=>{
        const validator = new StubValidatorFields()
        expect(validator.errors).toBeNull()
        expect(validator.validateData).toBeNull()
    })

    it('should validate with erros',()=>{
        const spyValidateSync = jest.spyOn(libValidator, 'validateSync')
        spyValidateSync.mockReturnValue([
            {property:'field', constraints:{isRequired:'some error'}}
        ])
        const validator = new StubValidatorFields()
        
        expect(validator.validate(null)).toBeFalsy()
        expect(spyValidateSync).toHaveBeenCalled()
        expect(validator.validateData).toBeNull()
        expect(validator.errors).toStrictEqual({field:["some error"]})
    })

    it('should validate without errors',()=>{
        const spyValidateSync = jest.spyOn(libValidator, 'validateSync')
        spyValidateSync.mockReturnValue([])
        const validator = new StubValidatorFields()
        
        expect(validator.validate(null)).toBeTruthy()
        expect(spyValidateSync).toHaveBeenCalled()
        expect(validator.validateData).toBeNull()
        expect(validator.errors).toBeNull()
    })
})