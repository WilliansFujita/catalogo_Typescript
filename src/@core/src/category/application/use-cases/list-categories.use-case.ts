import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output.dto";
import {default as DefaultUseCase} from "../../../@seedwork/application/use-case";
import { SearchInputDto } from "../../../@seedwork/application/dto/search-input";
import { PaginationOutPutDto, PaginationOutputMapper } from "../../../@seedwork/application/dto/pagination-output";


export namespace ListCategoryuseCase{
    export class UseCase implements DefaultUseCase<Input, Output> {

        constructor(private categoryRepo: CategoryRepository.Repository) {
    
        }
    
    
        async execute(input: Input): Promise<Output> {
            const params = new CategoryRepository.SearchParams(input)
            const searchResult = await this.categoryRepo.search(params)
            return this.toOutput(searchResult)
        }
    
        private toOutput(searchResult: CategoryRepository.SearchResult):Output{
            return {
                items: searchResult.items.map(i => CategoryOutputMapper.toOutput(i)),
                ...PaginationOutputMapper.toPaginationOutput(searchResult)
            }
        }
    }
    
    
    
    export type Input = SearchInputDto
    
    
    export type Output = PaginationOutPutDto<CategoryOutput[]>
}
