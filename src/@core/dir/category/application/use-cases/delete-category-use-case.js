"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteCategoryuseCase {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const entity = await this.categoryRepo.findById(input.id);
        try {
            this.categoryRepo.delete(entity.id);
            return { deleted: true };
        }
        catch (e) {
            return { deleted: false };
        }
    }
}
exports.default = DeleteCategoryuseCase;
