import { ClassValidatorFields } from "../validators/class-validator-fields"
import { FieldErrors } from "../validators/validator-fields.interfaces"

type Expected = { validator: ClassValidatorFields<any>, data: any }

expect.extend({
    containsErrorMessages(expected: Expected, received: FieldErrors) {
        const { validator, data } = expected
        const isValid = validator.validate(data)

        if (isValid) {
            return {
                pass: false,
                message: () => 'the data is valid'
            }
        }

        const isMatch = expect.objectContaining(received)

        return isMatch ? { pass: true, message: () => "" } : {
            pass: false, message: () =>
                `The validation erros not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(validator.errors)}`
        }

    }
})