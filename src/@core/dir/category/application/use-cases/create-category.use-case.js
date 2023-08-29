"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_output_dto_1 = require("../dto/category-output.dto");
const category_1 = require("#category/domain/entities/category");
class CreateCategoryuseCase {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const entity = new category_1.Category(input);
        await this.categoryRepo.insert(entity);
        return category_output_dto_1.CategoryOutputMapper.toOutput(entity);
    }
}
exports.default = CreateCategoryuseCase;
