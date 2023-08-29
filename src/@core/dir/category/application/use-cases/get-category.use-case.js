"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_output_dto_1 = require("../dto/category-output.dto");
class GetCategoryuseCase {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const entity = await this.categoryRepo.findById(input.id);
        return category_output_dto_1.CategoryOutputMapper.toOutput(entity);
    }
}
exports.default = GetCategoryuseCase;
