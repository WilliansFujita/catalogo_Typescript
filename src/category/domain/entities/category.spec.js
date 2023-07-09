"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("./category");
const lodash_1 = require("lodash");
describe("Category Unit tests", () => {
    test("constructor of category", () => {
        let category = new category_1.Category({ name: "Movie" });
        let props = (0, lodash_1.omit)(category.props, "created_at");
        expect(props).toStrictEqual({
            name: "Movie",
            description: null,
            is_active: true,
        });
        expect(category.props.created_at).toBeInstanceOf(Date);
        let created_at = new Date(); //string
        category = new category_1.Category({
            name: "Movie",
            description: "some description",
            is_active: false,
            created_at,
        });
        expect(category.props).toStrictEqual({
            name: "Movie",
            description: "some description",
            is_active: false,
            created_at,
        });
        category = new category_1.Category({
            name: "Movie",
            description: "other description",
        });
        expect(category.props).toMatchObject({
            name: "Movie",
            description: "other description",
        });
        category = new category_1.Category({
            name: "Movie",
            is_active: true,
        });
        expect(category.props).toMatchObject({
            name: "Movie",
            is_active: true,
        });
        created_at = new Date();
        category = new category_1.Category({
            name: "Movie",
            created_at,
        });
        expect(category.props).toMatchObject({
            name: "Movie",
            created_at,
        });
        // expect(category.name).toBe("Movie");
        // expect(category.description).toBe("some description");
        // expect(category.is_active).toBeTruthy();
        // expect(category.created_at).toBe(created_at);
    });
    test('getter of name field', () => {
        const category = new category_1.Category({ name: 'Movie' });
        expect(category.name).toBe('Movie');
    });
    test('getter and setter of descrition field', () => {
        let category = new category_1.Category({ name: 'Movie' });
        expect(category.description).toBeNull();
        category = new category_1.Category({
            name: 'Movie',
            description: 'Some description'
        });
        expect(category.description).toBe('Some description');
        category = new category_1.Category({ name: 'Movie' });
        category['description'] = 'other description';
        expect(category.description).toBe('other description');
        category['description'] = undefined;
        expect(category.description).toBeNull;
    });
    test("getter and setter of is_active prop", () => {
        let category = new category_1.Category({
            name: "Movie",
        });
        expect(category.is_active).toBeTruthy();
        category = new category_1.Category({
            name: "Movie",
            is_active: true,
        });
        expect(category.is_active).toBeTruthy();
        category = new category_1.Category({
            name: "Movie",
            is_active: false,
        });
        expect(category.is_active).toBeFalsy();
    });
    test("getter of created_at prop", () => {
        let category = new category_1.Category({
            name: "Movie",
        });
        expect(category.create_at).toBeInstanceOf(Date);
        let created_at = new Date();
        category = new category_1.Category({ name: 'Movie', created_at });
        expect(category.create_at).toBe(created_at);
    });
    test("if field is uuid", () => {
        const category = new category_1.Category({ name: 'movie' });
        expect(category.uniqueEntityId).not.toBeNull();
    });
    test('should deactivate a active category', () => {
        const category = new category_1.Category({ name: 'movie' });
        expect(category.is_active).toBeTruthy();
        category.deactivate();
        expect(category.is_active).toBeFalsy();
    });
    test('should activate a deactiveted category', () => {
        const category = new category_1.Category({ name: 'movie', is_active: false });
        expect(category.is_active).toBeFalsy();
        category.activate();
        expect(category.is_active).toBeTruthy();
    });
});
