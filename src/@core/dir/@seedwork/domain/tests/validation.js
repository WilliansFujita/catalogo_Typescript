"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("expect");
expect.extend({
    containsErrorMessages(expected, received) {
        if (typeof expected === "function") {
            try {
                expected();
                return isValid();
            }
            catch (e) {
                const error = e;
                return assertContains(error.error, received);
            }
        }
        else {
            const { validator, data } = expected;
            const validated = validator.validate(data);
            if (validated) {
                return isValid();
            }
            return assertContains(validator.errors, received);
        }
    }
});
function isValid() {
    return { pass: true, message: () => "" };
}
function assertContains(exepected, received) {
    const isMatch = (0, expect_1.objectContaining)(received).asymmetricMatch(exepected);
    return isMatch ? { pass: true, message: () => "" } : {
        pass: false, message: () => `The validation erros not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(exepected)}`
    };
}
