import CategoryValidatorFactory, { CategoryRules, CategoryValidator } from "./category.validator"

describe('CategoryValidator Tests', () => {
    let validator: CategoryValidator

    beforeEach(() => {
        validator = CategoryValidatorFactory.create();
    })

    test('invalidation cases for name field', () => {
        //@ts-ignore
        expect({ validator, data: null }).containsErrorMessages({
            name: [
                "name must be a string",
                "name should not be empty",
                "name must be shorter than or equal to 255 characters",
            ],
        });
        //@ts-ignore
        expect({ validator, data: { name: null } }).containsErrorMessages({
            name: [
                "name must be a string",
                "name should not be empty",
                "name must be shorter than or equal to 255 characters",
            ],
        });

        //@ts-ignore
        expect({ validator, data: { name: "" } }).containsErrorMessages({
            name: ["name should not be empty"],
        });

        //@ts-ignore
        expect({ validator, data: { name: 5 as any } }).containsErrorMessages({
            name: [
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
        });

        
        expect({
            validator,
            data: { name: "t".repeat(256) },
            //@ts-ignore
        }).containsErrorMessages({
            name: ["name must be shorter than or equal to 255 characters"],
        });
    })

    test('valid cases for field', () => {
        const arrange: { name: string, description?: string, is_active?: boolean }[] = [
            { name: 'some value' },
            { name: 'some value', description: null },
            { name: 'some value', description: undefined },
            { name: 'some value', is_active: true },
            { name: 'some value', is_active: false }
        ]

        arrange.forEach(item => {
            const isValid = validator.validate(item)
            expect(isValid).toBeTruthy()
            expect(validator.validateData).toStrictEqual(new CategoryRules(item))

        })

    })
})