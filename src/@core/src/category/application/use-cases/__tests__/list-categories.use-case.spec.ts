
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import ListCategoriesUseCase from "../list-categories.use-case"
import CategoryRepository from "../../../domain/repository/category.repository";
import { Category } from "../../../domain/entities/category";

describe('GetCategoryUseCase Unit Tests', () => {
    let useCase: ListCategoriesUseCase;
    let repository: CategoryInMemoryRepository

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new ListCategoriesUseCase(repository)
    })

    test('toOutput method', () => {
        let result = new CategoryRepository.SearchResult({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null
        })
        let output = useCase['toOutput'](result)
        expect(output).toStrictEqual({
            items: [],
            total: 1,
            current_page: 1,
            last_page: 1,
            per_page: 2,
        })

        const entity = new Category({ name: 'Movie' })
        result = new CategoryRepository.SearchResult({
            items: [entity],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null
        })
        output = useCase['toOutput'](result)
        expect(output).toStrictEqual({
            items: [entity.toJSON()],
            total: 1,
            current_page: 1,
            last_page: 1,
            per_page: 2,
        })
    })

    it('should returns output using empty input with categories ordered by created_at', async () => {
        const items = [
            new Category({ name: 'test 1' }), 
            new Category({ name: 'test 2', created_at: new Date(new Date().getTime()+100) })]
         repository.items = items;   

         const output = await useCase.execute({})
         const items_reversed = [...items].reverse().map(i=>i.toJSON())
         expect(output).toStrictEqual({
            items:items_reversed,
            total: 2,
            current_page:1,
            per_page:15,
            last_page: 1
         })
    })

    it('should returns output using paination, sort and filter',async ()=>{
        const items = [
            new Category({ name: 'a' }), 
            new Category({ name: 'AAA'}),
            new Category({ name: 'b'}),
            new Category({ name: 'c'}),
        ]
         repository.items = items;   

         const output = await useCase.execute({page:1, per_page:2, sort:'name', filter:'a'})
         const items_reversed = [items[0].toJSON(), items[1].toJSON()]
         expect(output).toStrictEqual({
            items:items_reversed,
            total: 2,
            current_page:1,
            per_page:2,
            last_page: 1
         })
    })
})