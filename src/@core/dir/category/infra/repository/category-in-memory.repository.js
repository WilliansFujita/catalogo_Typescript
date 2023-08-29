"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_repository_1 = require("../../../@seedwork/domain/repository/in-memory-repository");
const repository_contracts_1 = require("../../../@seedwork/domain/repository/repository-contracts");
class CategoryInMemoryRepository extends in_memory_repository_1.InMemoryRepositorySearchableRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = ["created_at"];
    }
    applyFilter(items, filter) {
        if (!filter) {
            return Promise.resolve(items);
        }
        const itemsFiltered = items.filter(i => {
            return i.props.name.toLowerCase().includes(filter.toLowerCase());
        });
        return Promise.resolve(itemsFiltered);
    }
    search(props) {
        if (!props.sort || props.sort === "" || props.sort === undefined || props.sort === null) {
            const new_props = new repository_contracts_1.SearchParams({
                filter: props.filter,
                page: props.page,
                per_page: props.per_page,
                sort: 'created_at',
                sort_dir: props.sort_dir ? props.sort_dir : 'desc'
            });
            return super.search(new_props);
        }
        return super.search(props);
    }
}
exports.default = CategoryInMemoryRepository;
