"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Block_content, _Block_childs, _Block_parent;
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor(input) {
        _Block_content.set(this, void 0);
        _Block_childs.set(this, void 0);
        _Block_parent.set(this, void 0);
        this.name = `#OBJECT#_${Math.random().toString(36).slice(2, 9)}`;
        __classPrivateFieldSet(this, _Block_content, "", "f");
        __classPrivateFieldSet(this, _Block_childs, [], "f");
        __classPrivateFieldSet(this, _Block_parent, null, "f");
    }
    add(char) {
        __classPrivateFieldSet(this, _Block_content, __classPrivateFieldGet(this, _Block_content, "f") + char, "f");
    }
    addChild(child) {
        __classPrivateFieldGet(this, _Block_childs, "f").push(child);
    }
    setParent(parent) {
        __classPrivateFieldSet(this, _Block_parent, parent, "f");
    }
    get parent() {
        return __classPrivateFieldGet(this, _Block_parent, "f");
    }
    get content() {
        return __classPrivateFieldGet(this, _Block_content, "f");
    }
    get childs() {
        return __classPrivateFieldGet(this, _Block_childs, "f");
    }
    get splits() {
        return __classPrivateFieldGet(this, _Block_content, "f").split(":");
    }
    get obj() {
        return {
            name: this.name,
            content: this.content,
            childs: this.childs.map((child) => child.obj),
            parent: this.parent,
        };
    }
}
exports.default = Block;
_Block_content = new WeakMap(), _Block_childs = new WeakMap(), _Block_parent = new WeakMap();
//# sourceMappingURL=block.js.map