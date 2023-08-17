import Entity from "../../../domain/entity/entity"
import { InMemoryRepositorySearchableRepository } from "../in-memory-repository";
import { SearchParams, SearchResult } from "../repository-contracts";

type StubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StubEntityProps>{

}


class StubInMemotySearchableRepository extends InMemoryRepositorySearchableRepository<StubEntity>{

    sortableFields: string[] = ['name'];

    protected applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
        if (!filter) {
            return Promise.resolve(items);
        }

        const itemsFiltered = items.filter(i => {
            return (i.props.name.toLowerCase().includes(filter.toLowerCase())) ||
                i.props.price.toString() === filter
        })

        return Promise.resolve(itemsFiltered)

    }

}


describe("InMemorySearchableRepository unit Tests", () => {

    let repository: StubInMemotySearchableRepository

    beforeEach(() => {
        repository = new StubInMemotySearchableRepository()
    })

    describe("applyFilter method", () => {
        it('should no filter items when filter param is null', async () => {
            const items = [new StubEntity({ name: 'name value', price: 5 })]
            const spyFilterMethod = jest.spyOn(items, 'filter' as any)
            const itemsFiltered = await repository['applyFilter'](items, null)
            expect(itemsFiltered).toStrictEqual(items)
            expect(spyFilterMethod).not.toHaveBeenCalled()
        })

        it('should filter using a filter params', async () => {
            const items = [
                new StubEntity({ name: 'test', price: 5 }),
                new StubEntity({ name: 'Test', price: 5 }),
                new StubEntity({ name: 'fake', price: 0 })
            ]

            const spyFilterMethod = jest.spyOn(items, 'filter' as any)
            let itemsFiltered = await repository['applyFilter'](items, "test")
            expect(itemsFiltered).toStrictEqual([items[0], items[1]])
            expect(spyFilterMethod).toHaveBeenCalledTimes(1)

            itemsFiltered = await repository['applyFilter'](items, "5")
            expect(itemsFiltered).toStrictEqual([items[0], items[1]])
            expect(spyFilterMethod).toHaveBeenCalledTimes(2)

            itemsFiltered = await repository['applyFilter'](items, null)
            expect(itemsFiltered).toStrictEqual(items)
            expect(spyFilterMethod).toHaveBeenCalledTimes(2)
        })



    })


    describe("applySort method", () => {
        it('should no sort items', async () => {
            const items = [
                new StubEntity({ name: 'test', price: 5 }),
                new StubEntity({ name: 'Test', price: 5 }),
                new StubEntity({ name: 'fake', price: 0 })
            ]

            let itemsSorted = await repository['applysort'](items, null, null)
            expect(itemsSorted).toStrictEqual(items)

            itemsSorted = await repository['applysort'](items, "price", "asc")
            expect(itemsSorted).toStrictEqual(items)

        })

        it('should sort items', async () => {
            const items = [
                new StubEntity({ name: 'b', price: 5 }),
                new StubEntity({ name: 'a', price: 5 }),
                new StubEntity({ name: 'c', price: 0 })
            ]

            let itemsSorted = await repository['applysort'](items, "name", "asc")
            expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]])

            itemsSorted = await repository['applysort'](items, "name", "desc")
            expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]])
        })

    })

    it("applyPaginate method", async () => {
        const items = [
            new StubEntity({ name: 'b', price: 5 }),
            new StubEntity({ name: 'a', price: 5 }),
            new StubEntity({ name: 'c', price: 0 }),
            new StubEntity({ name: 'd', price: 7 }),
            new StubEntity({ name: 'e', price: 5 })
        ]

        let itemPaginated = await repository['applyPaginate'](items, 1, 2)
        expect(itemPaginated).toStrictEqual([items[0], items[1]])

        itemPaginated = await repository['applyPaginate'](items, 2, 2)
        expect(itemPaginated).toStrictEqual([items[2], items[3]])

        itemPaginated = await repository['applyPaginate'](items, 3, 2)
        expect(itemPaginated).toStrictEqual([items[4]])

        itemPaginated = await repository['applyPaginate'](items, 4, 2)
        expect(itemPaginated).toStrictEqual([])
    })

    describe("search method", () => {
        it('should apply only paginate when other params is null', async () => {
            const entity = new StubEntity({ name: 'a', price: 5 });
            const items = Array(16).fill(entity)
            repository.items = items
            const result = await repository.search(new SearchParams())
            expect(result).toStrictEqual(
                new SearchResult({
                    items: Array(15).fill(entity),
                    total: 16,
                    current_page: 1,
                    per_page: 15,
                    sort: null,
                    sort_dir: null,
                    filter: null
                })
            )
        })

        it('should apply paginate and filter', async () => {
            const items = [
                new StubEntity({ name: 'test', price: 5 }),
                new StubEntity({ name: 'a', price: 5 }),
                new StubEntity({ name: 'TEST', price: 0 }),
                new StubEntity({ name: 'TeSt', price: 7 }),
            ]

            repository.items = items
            let result = await repository.search(new SearchParams({
                page: 1,
                per_page: 2,
                filter: 'TEST'
            }))

            expect(result)
                .toStrictEqual(
                    new SearchResult({
                        items: [items[0], items[2]],
                        total: 3,
                        current_page: 1,
                        per_page: 2,
                        sort: null,
                        sort_dir: null,
                        filter: "TEST"
                    })
                )

            result = await repository.search(new SearchParams({
                page: 2,
                per_page: 2,
                filter: 'TEST'
            }))

            expect(result)
                .toStrictEqual(
                    new SearchResult({
                        items: [items[3]],
                        total: 3,
                        current_page: 2,
                        per_page: 2,
                        sort: null,
                        sort_dir: null,
                        filter: "TEST"
                    })
                )
        })

        it('should apply paginate and sort', async () => {
            const items = [
                new StubEntity({ name: 'b', price: 5 }),
                new StubEntity({ name: 'a', price: 5 }),
                new StubEntity({ name: 'd', price: 0 }),
                new StubEntity({ name: 'e', price: 7 }),
                new StubEntity({ name: 'c', price: 7 }),
            ]

            repository.items = items


            const arrange = [{

                params: new SearchParams<string>({
                    page: 1,
                    per_page: 2,
                    sort: 'name'
                }), result: new SearchResult({
                    items: [items[1], items[0]],
                    total: 5,
                    current_page: 1,
                    per_page: 2,
                    sort: 'name',
                    sort_dir: 'asc',
                    filter: null
                })
            },
            {

                params: new SearchParams<string>({
                    page: 2,
                    per_page: 2,
                    sort: 'name'
                }), result: new SearchResult({
                    items: [items[4], items[2]],
                    total: 5,
                    current_page: 2,
                    per_page: 2,
                    sort: 'name',
                    sort_dir: 'asc',
                    filter: null
                })
            },
            {

                params: new SearchParams<string>({
                    page: 1,
                    per_page: 2,
                    sort: 'name',
                    sort_dir: "desc"
                }), result: new SearchResult({
                    items: [items[3], items[2]],
                    total: 5,
                    current_page: 1,
                    per_page: 2,
                    sort: 'name',
                    sort_dir: 'desc',
                    filter: null
                })
            },
            {

                params: new SearchParams<string>({
                    page: 2,
                    per_page: 2,
                    sort: 'name',
                    sort_dir: "desc"
                }), result: new SearchResult({
                    items: [items[4], items[0]],
                    total: 5,
                    current_page: 2,
                    per_page: 2,
                    sort: 'name',
                    sort_dir: 'desc',
                    filter: null
                })
            }

            ]

            for (const i of arrange) {
                let result = await repository.search(i.params)
                expect(result)
                    .toStrictEqual(i.result)
            }

        })

        it('should search using filter, sort and paginate',async ()=>{
            const items = [
                new StubEntity({ name: 'test', price: 5 }),
                new StubEntity({ name: 'a', price: 5 }),
                new StubEntity({ name: 'TEST', price: 0 }),
                new StubEntity({ name: 'e', price: 7 }),
                new StubEntity({ name: 'TeSt', price: 7 }),
            ]

            repository.items = items

            const arrange = [{

                params: new SearchParams({
                    page: 1,
                    per_page: 3,
                    sort: 'name',
                    filter:'TEST',
                    
                }), result: new SearchResult({
                    items: [items[2], items[4], items[0]],
                    total: 3,
                    current_page: 1,
                    per_page: 3,
                    sort: 'name',
                    sort_dir: 'asc',
                    filter: 'TEST'
                })
            },
            {

                params: new SearchParams({
                    page: 2,
                    per_page: 2,
                    sort: 'name',
                    filter:'TEST',
                    
                }), result: new SearchResult({
                    items: [items[0]],
                    total: 3,
                    current_page: 2,
                    per_page: 2,
                    sort: 'name',
                    sort_dir: 'asc',
                    filter: 'TEST'
                })
            }]

            for (const i of arrange) {
                let result = await repository.search(i.params)
                expect(result)
                    .toStrictEqual(i.result)
            }

        })

    })
})