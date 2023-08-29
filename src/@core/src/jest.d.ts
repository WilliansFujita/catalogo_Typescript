import { FieldErrors } from "./@seedwork/domain/validators/validator-fields.interfaces";

declare global{
    declare namespace jest{
        interface Matcher<R>{
            containsErrorMessages: (expected: FieldErrors) => R
        }
    }
}

