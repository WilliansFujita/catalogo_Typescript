"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const entity_1 = __importDefault(require("#seedwork/domain/entity/entity"));
const category_validator_1 = __importDefault(require("../validators/category.validator"));
const validation_error_1 = require("#seedwork/domain/erros/validation-error");
class Category extends entity_1.default {
    constructor(props, id) {
        var _a, _b;
        super(props, id);
        this.props = props;
        Category.validate(props);
        this.description = this.props.description;
        this.is_active = (_a = this.props.is_active) !== null && _a !== void 0 ? _a : true;
        this.props.created_at = (_b = this.props.created_at) !== null && _b !== void 0 ? _b : new Date;
    }
    update(props) {
        var _a, _b;
        Category.validate(props);
        this.name = (_a = props.name) !== null && _a !== void 0 ? _a : this.props.name;
        this.description = (_b = props.description) !== null && _b !== void 0 ? _b : this.props.description;
    }
    // static validate(props: Omit<CategoryProperties, 'created_at'>){
    //     ValidatorRules.values(props.name,'name').required().string().maxLength(255)
    //     ValidatorRules.values(props.description,'description').string()
    //     ValidatorRules.values(props.is_active,'is_active').boolean()
    // }
    static validate(props) {
        const validator = category_validator_1.default.create();
        const isValid = validator.validate(props);
        if (!isValid)
            throw new validation_error_1.EntityValidationError(validator.errors);
    }
    get name() {
        return this.props.name;
    }
    set name(value) {
        this.props.name = value;
    }
    set description(value) {
        this.props.description = value !== null && value !== void 0 ? value : null;
    }
    get description() {
        return this.props.description;
    }
    set is_active(value) {
        this.props.is_active = value !== null && value !== void 0 ? value : true;
    }
    get is_active() {
        return this.props.is_active;
    }
    get created_at() {
        return this.props.created_at;
    }
    deactivate() {
        this.props.is_active = false;
    }
    activate() {
        this.props.is_active = true;
    }
}
exports.Category = Category;
