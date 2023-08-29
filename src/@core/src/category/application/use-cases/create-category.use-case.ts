import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output.dto";
import CategoryRepository from "#category/domain/repository/category.repository";
import { Category } from "#category/domain/entities/category";
import {default as DefaultUseCase} from "#seedwork/application/use-case";


export namespace CreateCategoryuseCase{

    export class UseCase implements DefaultUseCase<Input,Output> {

        constructor(private categoryRepo: CategoryRepository.Repository) {
    
        }
    
        async execute(input: Input): Promise<Output> {
            const entity = new Category(input)
            await this.categoryRepo.insert(entity)
            return CategoryOutputMapper.toOutput(entity)
        }
    }
    
    export type Input = {
        name: string,
        description?: string;
        is_active?: boolean;
    }
    
    export type Output = CategoryOutput
}
