import { CategoryProperties } from "../entities/category";
import { ClassValidatorFields } from "../../../@seedwork/domain/validators/class-validator-fields";
import { IsNotEmpty, IsString, MaxLength, IsOptional,IsBoolean,IsDate } from 'class-validator'

export class CategoryRules {

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsBoolean()
    @IsOptional()
    is_active: boolean

    @IsDate()
    @IsOptional()
    created_at: Date

    constructor({ name, description, is_active, created_at }: CategoryProperties) {
        Object.assign(this, { name, description, is_active, created_at })
    }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules>{
    validate(data: CategoryProperties): boolean {
        return super.validate(new CategoryRules(data?? {} as any))
    }
}

export default class CategoryValidatorFactory{
    static create(): CategoryValidator{
        return new CategoryValidator();
    }
}