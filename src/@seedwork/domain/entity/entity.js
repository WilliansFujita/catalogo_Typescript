"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_vo_1 = __importDefault(require("../value-objects/unique-entity-id.vo"));
class Entity {
    constructor(props, id) {
        this.props = props;
        this.uniqueEntityId = id || new unique_entity_id_vo_1.default();
    }
    get id() {
        return this.uniqueEntityId.value;
    }
    toJSON() {
        return Object.assign({ id: this.id }, this.props);
    }
}
exports.default = Entity;
