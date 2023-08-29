"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRepositorySearchableRepository = void 0;
const not_found_error_1 = __importDefault(require("../erros/not-found.error"));
const repository_contracts_1 = require("./repository-contracts");
class InMemoryRepository {
    constructor() {
        this.items = [];
    }
    async insert(entity) {
        this.items.push(entity);
    }
    async findById(id) {
        const _id = `${id}`;
        return this._get(_id);
    }
    async findAll() {
        return this.items;
    }
    async update(entity) {
        await this._get(entity.id);
        const index = this.items.findIndex(item => item.id === entity.id);
        this.items[index] = entity;
    }
    async delete(id) {
        const _id = `${id}`;
        await this._get(_id);
        const index = this.items.findIndex(item => item.id === _id);
        this.items.splice(index, 1);
    }
    async _get(id) {
        const item = this.items.find(item => item.id === id);
        if (!item) {
            throw new not_found_error_1.default(`Entity not Found using ID ${id}`);
        }
        return item;
    }
}
exports.default = InMemoryRepository;
class InMemoryRepositorySearchableRepository extends InMemoryRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = [];
    }
    async search(props) {
        const itemsfiltered = await this.applyFilter(this.items, props.filter);
        const itemSorted = await this.applysort(itemsfiltered, props.sort, props.sort_dir);
        const items_paginated = await this.applyPaginate(itemSorted, props.page, props.per_page);
        return new repository_contracts_1.SearchResult({
            items: items_paginated,
            total: itemsfiltered.length,
            current_page: props.page,
            per_page: props.per_page,
            sort: props.sort,
            sort_dir: props.sort_dir,
            filter: props.filter
        });
    }
    applysort(items, sort, sort_dir) {
        if (sort == null || !this.sortableFields.includes(sort))
            return Promise.resolve(items);
        return new Promise((resolve, result) => {
            const itemSorted = [...items].sort((a, b) => {
                if (a.props[sort] < b.props[sort]) {
                    return sort_dir === 'asc' ? -1 : 1;
                }
                if (a.props[sort] > b.props[sort]) {
                    return sort_dir === 'asc' ? 1 : -1;
                }
                return 0;
            });
            resolve(itemSorted);
        });
    }
    ;
    applyPaginate(items, page, per_page) {
        const start = (page - 1) * per_page;
        const limit = start + per_page;
        return Promise.resolve(items.slice(start, limit));
    }
}
exports.InMemoryRepositorySearchableRepository = InMemoryRepositorySearchableRepository;
