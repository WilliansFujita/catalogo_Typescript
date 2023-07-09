"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const entity_1 = __importDefault(require("../../../@seedwork/domain/entity/entity"));
class Category extends entity_1.default {
    constructor(props, id) {
        var _a, _b;
        super(props, id);
        this.props = props;
        this.description = this.props.description;
        this.is_active = (_a = this.props.is_active) !== null && _a !== void 0 ? _a : true;
        this.props.created_at = (_b = this.props.created_at) !== null && _b !== void 0 ? _b : new Date;
    }
    get name() {
        return this.props.name;
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
    get create_at() {
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
