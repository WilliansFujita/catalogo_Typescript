"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_contracts_1 = require("#seedwork/domain/repository/repository-contracts");
const category_1 = require("category/domain/entities/category");
const category_in_memory_repository_1 = __importDefault(require("./category-in-memory.repository"));
let repository;
describe('Category in memory Unit tests', () => {
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        repository.insert(new category_1.Category({
            name: 'test',
            created_at: new Date(2023, 8, 10)
        }));
        repository.insert(new category_1.Category({
            name: 'Test',
            created_at: new Date(2023, 8, 2)
        }));
        repository.insert(new category_1.Category({
            name: 'Categoria',
            created_at: new Date(2023, 8, 11)
        }));
        repository.insert(new category_1.Category({
            name: 'CategoriaDeTestCadastrado',
            created_at: new Date(2023, 8, 1)
        }));
    });
    it('Should filter category by name', async () => {
        const items_found = await repository.search(new repository_contracts_1.SearchParams({ filter: 'test' }));
        expect(items_found.total).toBe(3);
    });
    it('Should sort category by created_at', async () => {
        const items_found = await repository.search(new repository_contracts_1.SearchParams());
        expect(items_found.total).toBe(4);
        expect(items_found.sort).toBe('created_at');
    });
});
