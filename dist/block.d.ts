export default class Block {
    #private;
    name: string;
    constructor(input: string);
    add(char: string): void;
    addChild(child: Block): void;
    setParent(parent: Block): void;
    get parent(): Block | null;
    get content(): string;
    get childs(): Block[];
    get splits(): string[];
    get obj(): any;
}
//# sourceMappingURL=block.d.ts.map