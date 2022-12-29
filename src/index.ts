import Block from "./block";
import { parseMessage, parseExtraOptions } from "./components";

export function createAst(input: string) {
    input = input
        .replaceAll("\\{", "##OPEN_BRACE##")
        .replaceAll("\\}", "##CLOSE_BRACE##").replaceAll("\\:", "##COLON##");
    let parent = new Block("");
    for (let char of input) {
        if (char === "{") {
            const child = new Block("");
            parent.addChild(child);
            parent.add(child.name);
            child.setParent(parent);
            parent = child;
        } else if (char === "}") {
            parent = <Block>parent.parent;
        } else {
            parent.add(char);
        }
    }
    return parent;
}


export function parse ( input: string )
{
    const ast = createAst( input );
    const data = parseMessage( ast );
    let options;
    for ( const child of ast.childs )
    {
        const [ name, value ] = child.splits;
        if ( name !== "options" )
        {
            continue;
        }
        options = parseExtraOptions( child );
    }
    return { data, options };
}
