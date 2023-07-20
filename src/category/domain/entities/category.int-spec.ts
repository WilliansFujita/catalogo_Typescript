import ValidationError from "../../../@seedwork/domain/erros/validation-error"
import { Category } from "./category"

describe('Category Integration Tests', () => {

    describe("Create Method", () => {
        it('should a invalid category using name property', () => {
            expect(() => {
                new Category({ name: null })
            }).toThrow(new ValidationError('The name is required'))

            expect(() => {
                new Category({ name: "" })
            }).toThrow(new ValidationError('The name is required'))

            expect(() => {
                new Category({ name: 5 as any })
            }).toThrow(new ValidationError('The name must be a string'))

            expect(() => {
                new Category({ name: "t".repeat(256) })
            }).toThrow(new ValidationError('The name must be less or equal than 255 characters'))
        })

        it('should a invalid category using description property', () => {
            expect(() => {
                new Category({ name: "Movie", description: 5 as any })
            }).toThrow(new ValidationError('The description must be a string'))
        })

        it('should a invalid category using is_active property', () => {
            expect(() => {
                new Category({ name: "Movie", is_active: 5 as any })
            }).toThrow(new ValidationError('The is_active must be a boolean'))
        })
    })

    describe("update Method", () => {
        it('should a invalid category using name property', () => {
            const category = new Category({name:"Movie"})
            expect(() => {
                category.update({name:null})
            }).toThrow(new ValidationError('The name is required'))

            expect(() => {
                category.update({name:""})
            }).toThrow(new ValidationError('The name is required'))

            expect(() => {
                category.update({ name: 5 as any })
            }).toThrow(new ValidationError('The name must be a string'))

            expect(() => {
                category.update({ name: "t".repeat(256) })
            }).toThrow(new ValidationError('The name must be less or equal than 255 characters'))
        })

        it('should a invalid category using description property', () => {
            const category = new Category({name:"Movie"})
            expect(() => {
                category.update({ name: "Movie", description: 5 as any })
            }).toThrow(new ValidationError('The description must be a string'))
        })

        it('should a invalid category using is_active property', () => {
            const category = new Category({name:"Movie"})
            expect(() => {
                category.update({ name: "Movie", is_active: 5 as any })
            }).toThrow(new ValidationError('The is_active must be a boolean'))
        })

        it('should a valid category',()=>{
            expect.assertions(0)
            const category = new Category({name:"movie"})
            category.update({name:"name changed"})
            category.update({name:"name changed", description:"some description"})
        })
    })

})