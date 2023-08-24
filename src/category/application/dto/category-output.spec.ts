import { Category } from "../../domain/entities/category"
import { CategoryOutputMapper } from "./category-output.dto";

describe('CategoryOutputMapper', () => {

    it('should convert a category in output', () => {
        const created_at = new Date();
        const entity = new Category({
            name: 'Movie',
            description: 'some description', is_active: true, created_at
        })
        const spyToJSON = jest.spyOn(entity, 'toJSON')
        const output = CategoryOutputMapper.toOutput(entity)
        expect(spyToJSON).toHaveBeenCalledTimes(1)
        expect(output).toStrictEqual({
            id: entity.id,
            name: 'Movie',
            description: 'some description', is_active: true, created_at
        })
    })
})