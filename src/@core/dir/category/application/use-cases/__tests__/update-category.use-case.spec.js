"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../../domain/entities/category");
const not_found_error_1 = __importDefault(require("../../../../@seedwork/domain/erros/not-found.error"));
const category_in_memory_repository_1 = __importDefault(require("../../../infra/repository/category-in-memory.repository"));
const update_category_use_case_1 = __importDefault(require("../update-category.use-case"));
describe('UpdateCategoryUseCase Unit Tests', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new update_category_use_case_1.default(repository);
    });
    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake id', name: 'teste' }))
            .rejects.toThrow(new not_found_error_1.default('Entity not Found using ID fake id'));
    });
    it('should create a category', async () => {
        const spyOnUpdate = jest.spyOn(repository, 'update');
        const entity = new category_1.Category({ name: 'Movie' });
        repository.items = [entity];
        let output = await useCase.execute({ id: entity.id, name: 'test' });
        expect(spyOnUpdate).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: repository.items[0].created_at
        });
        const arrange = [{
                entity: { id: entity.id, name: 'test', description: 'some description' },
                expect: {
                    id: repository.items[0].id,
                    name: 'test',
                    description: 'some description',
                    is_active: true,
                    created_at: repository.items[0].created_at
                }
            },
            {
                entity: { id: entity.id, name: 'test', description: 'some description', is_active: false },
                expect: {
                    id: repository.items[0].id,
                    name: 'test',
                    description: 'some description',
                    is_active: false,
                    created_at: repository.items[0].created_at
                }
            },
            {
                entity: { id: entity.id, name: 'test', description: 'some description', is_active: true },
                expect: {
                    id: repository.items[0].id,
                    name: 'test',
                    description: 'some description',
                    is_active: true,
                    created_at: repository.items[0].created_at
                }
            }
        ];
        for (const i of arrange) {
            let output = await useCase.execute(i.entity);
            expect(output).toStrictEqual(i.expect);
        }
    });
});
