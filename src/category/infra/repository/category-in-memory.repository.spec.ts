import { SearchParams } from "../../../@seedwork/domain/repository/repository-contracts";
import { Category } from "../../domain/entities/category";
import CategoryInMemoryRepository from "./category-in-memory.repository"

let repository: CategoryInMemoryRepository



describe('Category in memory Unit tests',()=>{

    beforeEach(()=>{
        repository = new CategoryInMemoryRepository();
        repository.insert(new Category({
            name: 'test',
            created_at: new Date(2023,8,10)
        }))
        repository.insert(new Category({
            name: 'Test',
            created_at: new Date(2023,8,2)
        }))
        repository.insert(new Category({
            name: 'Categoria',
            created_at: new Date(2023,8,11)
        }))
        repository.insert(new Category({
            name: 'CategoriaDeTestCadastrado',
            created_at: new Date(2023,8,1)
        }))
    })

    it('Should filter category by name',async ()=>{
        const items_found = await repository.search(new SearchParams({filter:'test'}))
        expect(items_found.total).toBe(3)
    })

    it('Should sort category by created_at',async ()=>{
        const items_found = await repository.search(new SearchParams())
        expect(items_found.total).toBe(4)
        expect(items_found.sort).toBe('created_at')
        
    })
})