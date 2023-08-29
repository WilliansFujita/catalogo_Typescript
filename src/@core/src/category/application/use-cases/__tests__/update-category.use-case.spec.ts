import { Category } from "../../../domain/entities/category";
import NotFoundError from "../../../../@seedwork/domain/erros/not-found.error";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import {UpdateCategoryUseCase} from "../update-category.use-case"

describe('UpdateCategoryUseCase Unit Tests', () => {
    let useCase: UpdateCategoryUseCase.UseCase;
    let repository: CategoryInMemoryRepository

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new UpdateCategoryUseCase.UseCase(repository)
    })


    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake id', name: 'teste' }))
            .rejects.toThrow(new NotFoundError('Entity not Found using ID fake id'))
    })

    it('should create a category', async () => {
        const spyOnUpdate = jest.spyOn(repository, 'update')
        const entity = new Category({ name: 'Movie' })
        repository.items = [entity]
        let output = await useCase.execute({ id: entity.id, name: 'test' })
        expect(spyOnUpdate).toHaveBeenCalledTimes(1)
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: repository.items[0].created_at
        })

        const arrange = [{
            entity: { id: entity.id, name: 'test', description: 'some description' },
            expect: {
                id: repository.items[0].id,
                name: 'test',
                description: 'some description',
                is_active: true,
                created_at: repository.items[0].created_at
            }
        },
        {
            entity: { id: entity.id, name: 'test', description: 'some description', is_active: false },
            expect: {
                id: repository.items[0].id,
                name: 'test',
                description: 'some description',
                is_active: false,
                created_at: repository.items[0].created_at
            }
        },
        {
            entity: { id: entity.id, name: 'test', description: 'some description', is_active: true },
            expect: {
                id: repository.items[0].id,
                name: 'test',
                description: 'some description',
                is_active: true,
                created_at: repository.items[0].created_at
            }

        }

        ]

        for (const i of arrange) {
            let output = await useCase.execute(i.entity)
            expect(output).toStrictEqual(i.expect)
        }

    })

})