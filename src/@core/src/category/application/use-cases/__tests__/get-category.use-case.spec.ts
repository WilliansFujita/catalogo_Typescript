
import { Category } from "#category/domain/entities/category";
import CategoryInMemoryRepository from "#category/infra/repository/category-in-memory.repository";
import NotFoundError from "#seedwork/domain/erros/not-found.error";
import {GetCategoryuseCase} from "../get-category.use-case"

describe('GetCategoryUseCase Unit Tests', () => {
    let useCase: GetCategoryuseCase.UseCase;
    let repository: CategoryInMemoryRepository

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new GetCategoryuseCase.UseCase(repository)
    })

    it('should throws error when entity not found',async ()=>{
        expect(()=>useCase.execute({id:'fake id'}))
        .rejects.toThrow(new NotFoundError('Entity not Found using ID fake id'))
    })

    it('should returns a category', async () => {
        const items = [
            new Category({name:'Movie'})
        ]
        repository.items = items

        const spyOnFindByID = jest.spyOn(repository,'findById')
        let output = await useCase.execute({id:items[0].id})
        expect(output).toStrictEqual({
            id:items[0].id,
            name: 'Movie',
            description: null,
            is_active: true,
            created_at: items[0].created_at
        })
        expect(spyOnFindByID).toBeCalledTimes(1)
    })
})