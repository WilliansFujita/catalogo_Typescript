"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_contracts_1 = require("../repository-contracts");
describe('SearchParams Unit Tests', () => {
    test('page prop', () => {
        const params = new repository_contracts_1.SearchParams();
        expect(params.page).toBe(1);
        const arrange = [
            { page: null, expect: 1 },
            { page: undefined, expect: 1 },
            { page: "", expect: 1 },
            { page: "fake", expect: 1 },
            { page: 0, expect: 1 },
            { page: -1, expect: 1 },
            { page: 5.5, expect: 1 },
            { page: true, expect: 1 },
            { page: false, expect: 1 },
            { page: {}, expect: 1 },
            { page: 1, expect: 1 },
            { page: 2, expect: 2 },
        ];
        arrange.forEach(i => {
            expect(new repository_contracts_1.SearchParams({ page: i.page }).page).toBe(i.expect);
        });
    });
    test('per_page prop', () => {
        const params = new repository_contracts_1.SearchParams();
        expect(params.per_page).toBe(15);
        const arrange = [
            { per_page: null, expect: 15 },
            { per_page: undefined, expect: 15 },
            { per_page: "", expect: 15 },
            { per_page: "fake", expect: 15 },
            { per_page: 0, expect: 15 },
            { per_page: -1, expect: 15 },
            { per_page: 5.5, expect: 15 },
            { per_page: true, expect: 15 },
            { per_page: false, expect: 15 },
            { per_page: {}, expect: 15 },
            { per_page: 1, expect: 1 },
            { per_page: 2, expect: 2 },
            { per_page: 10, expect: 10 },
        ];
        arrange.forEach(i => {
            expect(new repository_contracts_1.SearchParams({ per_page: i.per_page }).per_page).toBe(i.expect);
        });
    });
    test('sort prop', () => {
        const params = new repository_contracts_1.SearchParams();
        expect(params.sort).toBeNull();
        const arrange = [
            { sort: null, expect: null },
            { sort: undefined, expect: null },
            { sort: "", expect: null },
            { sort: "field", expect: "field" },
            { sort: 0, expect: "0" },
            { sort: -1, expect: "-1" },
            { sort: 5.5, expect: "5.5" },
            { sort: true, expect: "true" },
            { sort: false, expect: "false" },
            { sort: {}, expect: "[object Object]" },
            { sort: 1, expect: "1" },
            { sort: 2, expect: "2" },
            { sort: 10, expect: "10" },
        ];
        arrange.forEach(i => {
            expect(new repository_contracts_1.SearchParams({ sort: i.sort }).sort).toBe(i.expect);
        });
    });
    test('sort dir prop', () => {
        let params = new repository_contracts_1.SearchParams();
        expect(params.sort_dir).toBeNull();
        params = new repository_contracts_1.SearchParams({ sort: null });
        expect(params.sort_dir).toBeNull();
        const arrange = [
            { sort_dir: null, expect: "asc" },
            { sort_dir: undefined, expect: "asc" },
            { sort_dir: "", expect: "asc" },
            { sort_dir: "field", expect: "asc" },
            { sort_dir: 0, expect: "asc" },
            { sort_dir: "asc", expect: "asc" },
            { sort_dir: "ASC", expect: "asc" },
            { sort_dir: "desc", expect: "desc" },
            { sort_dir: "DESC", expect: "desc" },
        ];
        arrange.forEach(i => {
            expect(new repository_contracts_1.SearchParams({ sort: "field", sort_dir: i.sort_dir }).sort_dir).toBe(i.expect);
        });
    });
    test('filter prop', () => {
        const params = new repository_contracts_1.SearchParams();
        expect(params.filter).toBeNull();
        const arrange = [
            { filter: null, expect: null },
            { filter: undefined, expect: null },
            { filter: "", expect: null },
            { filter: "fake", expect: "fake" },
            { filter: 0, expect: "0" },
            { filter: -1, expect: "-1" },
            { filter: 5.5, expect: "5.5" },
            { filter: true, expect: "true" },
            { filter: false, expect: "false" },
            { filter: {}, expect: "[object Object]" },
            { filter: 1, expect: "1" },
            { filter: 2, expect: "2" },
            { filter: 10, expect: "10" },
        ];
        arrange.forEach(i => {
            expect(new repository_contracts_1.SearchParams({ filter: i.filter }).filter).toBe(i.expect);
        });
    });
});
describe('SearchResult Unit Tests', () => {
    test('', () => {
        const result = new repository_contracts_1.SearchResult({
            items: ["entity1", "entity2"],
            total: 4,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null
        });
        expect(result.toJSON()).toStrictEqual({
            items: ["entity1", "entity2"],
            total: 4,
            current_page: 1,
            per_page: 2,
            last_page: 2,
            sort: null,
            sort_dir: null,
            filter: null
        });
    });
    it('should set last_page 1 when per_page field is greater tham total field', () => {
        const result = new repository_contracts_1.SearchResult({
            items: ["entity1", "entity2"],
            total: 4,
            current_page: 1,
            per_page: 15,
            sort: "name",
            sort_dir: "asc",
            filter: "test"
        });
        expect(result.last_page).toBe(1);
    });
    it('when total is not a multiple of per_page', () => {
        const result = new repository_contracts_1.SearchResult({
            items: [],
            total: 101,
            current_page: 1,
            per_page: 20,
            sort: "name",
            sort_dir: "asc",
            filter: "test"
        });
        expect(result.last_page).toBe(6);
    });
});
