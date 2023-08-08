import Entity from "../entity/entity";
import NotFoundError from "../erros/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface, SearchbleRepositoryInterface, SearchParams, SearchResult, SortDirection } from "./repository-contracts";

export default abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E>{

    items: E[] = [];

    async insert(entity: E): Promise<void> {
        this.items.push(entity);
    }

    async findById(id: string | UniqueEntityId): Promise<E> {
        const _id = `${id}`
        return this._get(_id)
    }

    async findAll(): Promise<E[]> {
        return this.items
    }

    async update(entity: E): Promise<void> {
        await this._get(entity.id)
        const index = this.items.findIndex(item => item.id === entity.id)
        this.items[index] = entity
    }

    async delete(id: string): Promise<void> {
        const _id = `${id}`
        await this._get(_id)
        const index = this.items.findIndex(item => item.id === _id)
        this.items.splice(index, 1)

    }

    protected async _get(id: string): Promise<E> {
        const item = this.items.find(item => item.id === id)
        if (!item) {
            throw new NotFoundError(`Entity not Found using ID ${id}`);
        }
        return item
    }

}

export abstract class InMemoryRepositorySearchableRepository<E extends Entity> extends InMemoryRepository<E>
    implements SearchbleRepositoryInterface<E>{
    sortableFields: string[] = [];


    async search(props: SearchParams): Promise<SearchResult<E>> {
        const itemsfiltered = await this.applyFilter(this.items, props.filter)
        const itemSorted = await this.applysort(itemsfiltered, props.sort, props.sort_dir)
        const items_paginated = await this.applyPaginate(itemSorted, props.page, props.per_page)

        return new SearchResult({
            items: items_paginated,
            total: itemsfiltered.length,
            current_page: props.page,
            per_page: props.per_page,
            sort: props.sort,
            sort_dir: props.sort_dir,
            filter: props.filter
        })
    }

    protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>;

    protected applysort(items: E[], sort: string | null, sort_dir: SortDirection): Promise<E[]> {
        if (sort == null || !this.sortableFields.includes(sort))
            return Promise.resolve(items)

        return new Promise((resolve, result) => {
            const itemSorted = [...items].sort((a, b) => {
                if (a.props[sort] < b.props[sort]) {
                    return sort_dir === 'asc' ? -1 : 1;
                }


                if (a.props[sort] > b.props[sort]) {
                    return sort_dir === 'asc' ? 1 : -1;
                }

                return 0;
            })

            resolve(itemSorted)
        })

    };

    protected  applyPaginate(items: E[], page: SearchParams['page'], per_page: SearchParams['per_page']): Promise<E[]>{
        const start = (page -1) * per_page
        const limit = start + per_page;
        return Promise.resolve(items.slice(start, limit))
    }

}