import Entity from '../../../@seedwork/domain/entity/entity';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';
import CategoryValidatorFactory from '../validators/category.validator';
import {EntityValidationError} from '../../../@seedwork/domain/erros/validation-error'

export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
}

export class Category extends Entity<CategoryProperties> {
    
    constructor(
        public readonly props: CategoryProperties, id?: UniqueEntityId
    ) {
        super(props,id);
        Category.validate(props)
        this.description = this.props.description;
        this.is_active = this.props.is_active ?? true;
        this.props.created_at = this.props.created_at ?? new Date;

    }

    update(props: CategoryProperties) {
        Category.validate(props)
        this.name = props.name??this.props.name;
        this.description = props.description??this.props.description;
    }

    // static validate(props: Omit<CategoryProperties, 'created_at'>){
    //     ValidatorRules.values(props.name,'name').required().string().maxLength(255)
    //     ValidatorRules.values(props.description,'description').string()
    //     ValidatorRules.values(props.is_active,'is_active').boolean()
    // }

    static validate(props: Omit<CategoryProperties, 'created_at'>){
        const validator = CategoryValidatorFactory.create()
        const isValid = validator.validate(props)
        if(!isValid)
            throw new EntityValidationError(validator.errors)
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

    get created_at(): Date | undefined{
        return this.props.created_at
    }

    deactivate() {
        this.props.is_active = false;
    }

    activate() {
        this.props.is_active = true;
    }

    
}

