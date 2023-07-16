import Entity from '../../../@seedwork/domain/entity/entity';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';

export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
}

export class Category extends Entity<CategoryProperties> {
    
    public readonly uniqueEntityId:UniqueEntityId;
    constructor(
        public readonly props: CategoryProperties, id?: UniqueEntityId
    ) {
        super(props,id);
        this.description = this.props.description;
        this.is_active = this.props.is_active ?? true;
        this.props.created_at = this.props.created_at ?? new Date;
    }


    get name():string{
        return this.props.name
    }

    private set name(value: string){
        this.props.name = value
    }

    private set description(value: string){
        this.props.description =value?? null;
    }

    get description(): string | undefined{
        return this.props.description;
    }

    private set is_active(value:boolean){
        this.props.is_active = value?? true;
    }

    get is_active(): boolean | undefined{
        return this.props.is_active
    }

    get create_at(): Date | undefined{
        return this.props.created_at
    }

    deactivate() {
        this.props.is_active = false;
    }

    activate() {
        this.props.is_active = true;
    }

    update(props: CategoryProperties) {
        this.name = props.name??this.props.name;
        this.description = props.description??this.props.description;
    }
}

