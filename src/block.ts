export default class Block {
    #content: string;
    #childs: Block[];
    #parent: Block | null;
    name: string;
    constructor(input: string) {
        this.name = `#OBJECT#_${Math.random().toString(36).slice(2, 9)}`;
        this.#content = "";
        this.#childs = [];
        this.#parent = null;
    }
    add(char: string): void {
        this.#content += char;
    }
    addChild(child: Block): void {
        this.#childs.push(child);
    }
    setParent(parent: Block): void {
        this.#parent = parent;
    }
    get parent(): Block | null {
        return this.#parent;
    }

    get content(): string {
        return this.#content;
    }
    get childs(): Block[] {
        return this.#childs;
    }
    get splits(): string[] {
        return this.#content.split(":");
    }

    get obj():any {
        return {
            name: this.name,
            content: this.content,
            childs: this.childs.map((child) => child.obj),
            parent: this.parent,
        };
    }
}
