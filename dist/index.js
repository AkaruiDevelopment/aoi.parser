"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.createAst = void 0;
const block_1 = __importDefault(require("./block"));
const components_1 = require("./components");
function createAst(input) {
    input = input
        .replaceAll("\\{", "##OPEN_BRACE##")
        .replaceAll("\\}", "##CLOSE_BRACE##").replaceAll("\\:", "##COLON##");
    let parent = new block_1.default("");
    for (let char of input) {
        if (char === "{") {
            const child = new block_1.default("");
            parent.addChild(child);
            parent.add(child.name);
            child.setParent(parent);
            parent = child;
        }
        else if (char === "}") {
            parent = parent.parent;
        }
        else {
            parent.add(char);
        }
    }
    return parent;
}
exports.createAst = createAst;
function parse(input) {
    const ast = createAst(input);
    const data = (0, components_1.parseMessage)(ast);
    let options;
    for (const child of ast.childs) {
        const [name, value] = child.splits;
        if (name !== "options") {
            continue;
        }
        options = (0, components_1.parseExtraOptions)(child);
    }
    return { data, options };
}
exports.parse = parse;
//# sourceMappingURL=index.js.map