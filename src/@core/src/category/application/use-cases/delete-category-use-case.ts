import CategoryRepository from "#category/domain/repository/category.repository";
import {default as DefaultUseCase} from "#seedwork/application/use-case";

export namespace DeleteCategoryuseCase{
    export class UseCase implements DefaultUseCase<Input,Output> {

        constructor(private categoryRepo: CategoryRepository.Repository) {
    
        }
    
        async execute(input: Input): Promise<Output> {
            const entity = await this.categoryRepo.findById(input.id)
            try{
                this.categoryRepo.delete(entity.id)
                return{deleted:true}    
            }catch(e){
                return{deleted:false}    
            }
        }
    }
    
    export type Input = {
        id: string
    }
    
    export type Output = {deleted: boolean}
}


