"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("category/domain/entities/category");
const category_output_dto_1 = require("./category-output.dto");
describe('CategoryOutputMapper', () => {
    it('should convert a category in output', () => {
        const created_at = new Date();
        const entity = new category_1.Category({
            name: 'Movie',
            description: 'some description', is_active: true, created_at
        });
        const spyToJSON = jest.spyOn(entity, 'toJSON');
        const output = category_output_dto_1.CategoryOutputMapper.toOutput(entity);
        expect(spyToJSON).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: entity.id,
            name: 'Movie',
            description: 'some description', is_active: true, created_at
        });
    });
});
