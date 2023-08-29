import { Category } from "../../../domain/entities/category";
import NotFoundError from "#seedwork/domain/erros/not-found.error";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import {DeleteCategoryuseCase} from "../delete-category-use-case"

describe('DeleteCategoryUseCase Unit Tests', () => {
    let useCase: DeleteCategoryuseCase.UseCase;
    let repository: CategoryInMemoryRepository

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new DeleteCategoryuseCase.UseCase(repository)
    })


    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake id'}))
            .rejects.toThrow(new NotFoundError('Entity not Found using ID fake id'))
    })

    it('should delete a category', async () => {
        const spyOnUpdate = jest.spyOn(repository, 'delete')
        const entity = new Category({ name: 'Movie' })
        repository.items = [entity]
        let output = await useCase.execute({ id: entity.id })
        expect(spyOnUpdate).toHaveBeenCalledTimes(1)
        expect(output).toStrictEqual({
            deleted:true
        })
        expect(repository.items.length).toBe(0)

    })

})