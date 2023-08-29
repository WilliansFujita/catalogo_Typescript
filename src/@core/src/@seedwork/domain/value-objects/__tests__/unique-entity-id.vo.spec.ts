import InvalidUuidError from "../../erros/invalid-uuid.error"
import UniqueEntityId from "../unique-entity-id.vo"
import {validate as uuidValidate} from 'uuid'

describe("UniqueEntityID Unit Test", ()=>{

    function spyValidateMethod() {
        return jest.spyOn(UniqueEntityId.prototype as any, 'validate')
    }

    beforeEach(()=>{
        jest.clearAllMocks();
    })

    it("should throw error when uuid is invalid",()=>{

        const validateSpy = spyValidateMethod();
        expect (()=>new UniqueEntityId('fake id'))
        .toThrow(new InvalidUuidError())
        expect(validateSpy).toHaveBeenCalled()
    })

    it('should accept a uuid passed in constructor',()=>{
        const validateSpy = spyValidateMethod()
        const uuid = '83c4cc01-cf13-47e0-b007-620bbfa53767'
        const uniqueId = new UniqueEntityId(uuid)
        expect(uniqueId.id).toBe(uuid)
        expect(validateSpy).toHaveBeenCalled()
    })

    it('should accept a uuid passed in constructor',()=>{
        const validateSpy = spyValidateMethod();
        const vo = new UniqueEntityId();
        expect(uuidValidate(vo.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    })
})


