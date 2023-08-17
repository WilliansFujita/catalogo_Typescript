import CategoryRepository from "../../domain/repository/category.repository";
import  { InMemoryRepositorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory-repository";
import { Category } from "../../domain/entities/category";
import { SearchParams, SearchResult, SortDirection } from "../../../@seedwork/domain/repository/repository-contracts";

export default class CategoryInMemoryRepository 
    extends InMemoryRepositorySearchableRepository<Category>
    implements CategoryRepository.Repository {

        sortableFields: string[] = ["created_at"];
    

    protected applyFilter(
        items: Category[],
        filter: CategoryRepository.Filter): Promise<Category[]> {
        if (!filter) {
            return Promise.resolve(items);
        }

        const itemsFiltered = items.filter(i => {
            return i.props.name.toLowerCase().includes(filter.toLowerCase())
        })

        return Promise.resolve(itemsFiltered)
    }

    search(props: SearchParams<string>): Promise<SearchResult<Category, string>> {
        if(!props.sort || props.sort ==="" || props.sort===undefined || props.sort ===null){
            const new_props = new SearchParams<string>({
                filter: props.filter,
                page: props.page,
                per_page: props.per_page,
                sort: 'created_at',
                sort_dir: props.sort_dir
            })
            return super.search(new_props)
        }

        return super.search(props)
    }

}