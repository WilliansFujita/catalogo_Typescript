import Entity from "../../entity/entity"
import NotFoundError from "../../erros/not-found.error"
import InMemoryRepository from "../in-memory-repository"

type StubEntityProps = {
    name: string,
    price: number
}

class StubEntity extends Entity<StubEntityProps>{

}

class StubInMemoryRepository extends InMemoryRepository<StubEntity>{

}

describe('InMemoryRepository Unit Tests', () => {
    let repository: StubInMemoryRepository;

    beforeEach(() => {
        repository = new StubInMemoryRepository();
    })

    it('should inserts a new entity', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 })
        await repository.insert(entity)
        expect(repository.items[0].toJSON).toStrictEqual(entity.toJSON)
    })

    it('should throw erros when entity not found', () => {
        expect(repository.findById('fake id')).rejects.toThrow(new NotFoundError('Entity not Found using ID fake id'))
        
        expect(repository.findById('93666b7bc-2d71-4799-b91c-c64adb205184')).rejects.toThrow(new NotFoundError('Entity not Found using ID 93666b7bc-2d71-4799-b91c-c64adb205184'))
    })

    it('should finds a entity by id',async ()=>{
        const entity = new StubEntity({ name: 'name value', price: 5 })
        await repository.insert(entity)

        let entityFound = await repository.findById(entity.id)
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON())
    })

    it('should return all entities',async ()=>{
        const entity = new StubEntity({ name: 'name value', price: 5 })
        await repository.insert(entity)

        let entitiesFound = await repository.findAll()
        expect(entitiesFound).toStrictEqual([entity])
    })
    

    it('should throws error on update when entity not found',async ()=>{
        const entity = new StubEntity({ name: 'name value', price: 5 })
        expect(repository.update(entity)).rejects.toThrow(new NotFoundError(`Entity not Found using ID ${entity.id}`))
    })

    it('should updates an entity',async ()=>{
        const entity = new StubEntity({ name: 'name value', price: 5 })
        await repository.insert(entity)

        const entityUpdated = new StubEntity({ name: 'name value', price: 10 }, entity.uniqueEntityId)

        await repository.update(entityUpdated)
        expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON())
    })

    it('should throws error on delete when entity not found',async ()=>{
        const entity = new StubEntity({ name: 'name value', price: 5 })
        expect(repository.delete(entity.id)).rejects.toThrow(new NotFoundError(`Entity not Found using ID ${entity.id}`))
    })

    it('should delete an entity',async ()=>{
        const entity = new StubEntity({ name: 'name value', price: 5 })
        await repository.insert(entity)
        await repository.delete(entity.id)
        expect(repository.items).toHaveLength(0)
    })
})