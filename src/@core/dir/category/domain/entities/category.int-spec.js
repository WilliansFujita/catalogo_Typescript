"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("./category");
describe('Category Integration Tests', () => {
    describe("Create Method", () => {
        it('should a invalid category using name property', () => {
            expect(() => {
                new category_1.Category({ name: null });
            })
                //@ts-ignore
                .containsErrorMessages({ "name": ["name must be a string", "name should not be empty", "name must be shorter than or equal to 255 characters"] });
            expect(() => {
                new category_1.Category({ name: "" });
            }) //@ts-ignore
                .containsErrorMessages({ "name": ["name should not be empty"] });
            expect(() => {
                new category_1.Category({ name: 5 });
            }) //@ts-ignore
                .containsErrorMessages({ "name": ["name must be a string", "name must be shorter than or equal to 255 characters"] });
            expect(() => {
                new category_1.Category({ name: "t".repeat(256) });
            }) //@ts-ignore
                .containsErrorMessages({ "name": ["name must be shorter than or equal to 255 characters"] });
        });
        it('should a invalid category using description property', () => {
            expect(() => {
                new category_1.Category({ name: "Movie", description: 5 });
            }) //@ts-ignore
                .containsErrorMessages({ "description": ["description must be a string"] });
        });
        it('should a invalid category using is_active property', () => {
            expect(() => {
                new category_1.Category({ name: "Movie", is_active: 5 });
            }) //@ts-ignore
                .containsErrorMessages({ "is_active": ["is_active must be a boolean value"] });
        });
    });
    describe("update Method", () => {
        it('should a invalid category using name property', () => {
            const category = new category_1.Category({ name: "Movie" });
            expect(() => {
                category.update({ name: null });
            }) //@ts-ignore
                .containsErrorMessages({ "name": ["name must be a string", "name should not be empty", "name must be shorter than or equal to 255 characters"] });
            expect(() => {
                category.update({ name: "" });
            }) //@ts-ignore
                .containsErrorMessages({ "name": ["name should not be empty"] });
            expect(() => {
                category.update({ name: 5 });
            }) //@ts-ignore
                .containsErrorMessages({ "name": ["name must be a string", "name must be shorter than or equal to 255 characters"] });
            expect(() => {
                category.update({ name: "t".repeat(256) });
            }) //@ts-ignore
                .containsErrorMessages({ "name": ["name must be shorter than or equal to 255 characters"] });
        });
        it('should a invalid category using description property', () => {
            const category = new category_1.Category({ name: "Movie" });
            expect(() => {
                category.update({ name: "Movie", description: 5 });
            }) //@ts-ignore
                .containsErrorMessages({
                description: [
                    'description must be a string',
                ],
            });
        });
        it('should a invalid category using is_active property', () => {
            const category = new category_1.Category({ name: "Movie" });
            expect(() => {
                category.update({ name: "Movie", is_active: 5 });
            })
                //@ts-ignore
                .containsErrorMessages({
                is_active: [
                    'is_active must be a boolean value',
                ],
            });
        });
        it('should a valid category', () => {
            expect.assertions(0);
            const category = new category_1.Category({ name: "movie" });
            category.update({ name: "name changed" });
            category.update({ name: "name changed", description: "some description" });
        });
    });
});
