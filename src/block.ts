export default class Block {
    #content: string;
    #children: Block[];
    #parent: Block | null;
    name: string;
    constructor(input: string) {
        this.name = `#OBJECT#_${Math.random().toString(36).slice(2, 9)}`;
        this.#content = "";
        this.#children = [];
        this.#parent = null;
    }
    add(char: string): void {
        this.#content += char;
    }
    addChild(child: Block): void {
        this.#children.push(child);
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
    get children(): Block[] {
        return this.#children;
    }
    get splits(): string[] {
        return this.#content.split(":");
    }

    get obj(): any {
        return {
            name: this.name,
            content: this.content,
            children: this.children.map((child) => child.obj),
            parent: this.parent,
        };
    }
}
