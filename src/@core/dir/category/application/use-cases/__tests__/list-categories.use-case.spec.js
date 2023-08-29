"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_in_memory_repository_1 = __importDefault(require("../../../infra/repository/category-in-memory.repository"));
const list_categories_use_case_1 = __importDefault(require("../list-categories.use-case"));
const category_repository_1 = __importDefault(require("../../../domain/repository/category.repository"));
const category_1 = require("../../../domain/entities/category");
describe('GetCategoryUseCase Unit Tests', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new list_categories_use_case_1.default(repository);
    });
    test('toOutput method', () => {
        let result = new category_repository_1.default.SearchResult({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null
        });
        let output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [],
            total: 1,
            current_page: 1,
            last_page: 1,
            per_page: 2,
        });
        const entity = new category_1.Category({ name: 'Movie' });
        result = new category_repository_1.default.SearchResult({
            items: [entity],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null
        });
        output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [entity.toJSON()],
            total: 1,
            current_page: 1,
            last_page: 1,
            per_page: 2,
        });
    });
    it('should returns output using empty input with categories ordered by created_at', async () => {
        const items = [
            new category_1.Category({ name: 'test 1' }),
            new category_1.Category({ name: 'test 2', created_at: new Date(new Date().getTime() + 100) })
        ];
        repository.items = items;
        const output = await useCase.execute({});
        const items_reversed = [...items].reverse().map(i => i.toJSON());
        expect(output).toStrictEqual({
            items: items_reversed,
            total: 2,
            current_page: 1,
            per_page: 15,
            last_page: 1
        });
    });
    it('should returns output using paination, sort and filter', async () => {
        const items = [
            new category_1.Category({ name: 'a' }),
            new category_1.Category({ name: 'AAA' }),
            new category_1.Category({ name: 'b' }),
            new category_1.Category({ name: 'c' }),
        ];
        repository.items = items;
        const output = await useCase.execute({ page: 1, per_page: 2, sort: 'name', filter: 'a' });
        const items_reversed = [items[0].toJSON(), items[1].toJSON()];
        expect(output).toStrictEqual({
            items: items_reversed,
            total: 2,
            current_page: 1,
            per_page: 2,
            last_page: 1
        });
    });
});
