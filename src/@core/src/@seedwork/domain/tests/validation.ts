import { EntityValidationError } from "../erros/validation-error"
import { ClassValidatorFields } from "../validators/class-validator-fields"
import { FieldErrors } from "../validators/validator-fields.interfaces"
import { objectContaining } from 'expect'

type Expected =
    | { validator: ClassValidatorFields<any>, data: any }
    | (() => any)

expect.extend({
    containsErrorMessages(expected: Expected, received: FieldErrors) {

        if (typeof expected === "function") {
            try {
                expected()
                return isValid()
            } catch (e) {
                const error = e as EntityValidationError
                return assertContains(error.error, received)
            }
        } else {
            const { validator, data } = expected
            const validated = validator.validate(data)

            if (validated) {
                return isValid()
            }

            return assertContains(validator.errors, received)
        }
    }
}
)

function isValid() {
    return { pass: true, message: () => "" }
}

function assertContains(exepected: FieldErrors, received: FieldErrors) {
    const isMatch = objectContaining(received).asymmetricMatch(exepected)

    return isMatch ? { pass: true, message: () => "" } : {
        pass: false, message: () =>
            `The validation erros not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(exepected)}`
    }
}