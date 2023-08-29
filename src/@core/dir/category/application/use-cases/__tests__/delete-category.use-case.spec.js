"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../../domain/entities/category");
const not_found_error_1 = __importDefault(require("#seedwork/domain/erros/not-found.error"));
const category_in_memory_repository_1 = __importDefault(require("../../../infra/repository/category-in-memory.repository"));
const delete_category_use_case_1 = __importDefault(require("../delete-category-use-case"));
describe('DeleteCategoryUseCase Unit Tests', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new delete_category_use_case_1.default(repository);
    });
    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake id' }))
            .rejects.toThrow(new not_found_error_1.default('Entity not Found using ID fake id'));
    });
    it('should delete a category', async () => {
        const spyOnUpdate = jest.spyOn(repository, 'delete');
        const entity = new category_1.Category({ name: 'Movie' });
        repository.items = [entity];
        let output = await useCase.execute({ id: entity.id });
        expect(spyOnUpdate).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            deleted: true
        });
        expect(repository.items.length).toBe(0);
    });
});
