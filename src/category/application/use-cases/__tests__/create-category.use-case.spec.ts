import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import CreateCategoryuseCase from "../create-category.use-case"

describe('CreateCategoryUseCase Unit Tests', () => {
    let useCase: CreateCategoryuseCase;
    let repository: CategoryInMemoryRepository

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new CreateCategoryuseCase(repository)
    })

    it('should create a category', async () => {
        const spyOnInsert = jest.spyOn(repository,'insert')
        let output = await useCase.execute({ name: 'test' })
        expect(spyOnInsert).toHaveBeenCalledTimes(1)
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: repository.items[0].created_at
        })

        output = await useCase.execute({ name: 'test', description: 'some description', is_active: false })
        expect(spyOnInsert).toHaveBeenCalledTimes(2)
        expect(output).toStrictEqual({
            id: repository.items[1].id,
            name: 'test',
            description: 'some description',
            is_active: false,
            created_at: repository.items[1].created_at
        })
    })
})