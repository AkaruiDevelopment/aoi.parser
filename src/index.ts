import { ApplicationCommandOptionData } from "discord.js";
import Block from "./block";
import { parseMessage, parseExtraOptions, parseChatInputBooleanOptions, parseChatInputChannelOptions, parseChatInputNumberOptions, parseChatInputStringOptions, parseChatInputSubCommandGroupOptions, parseChatInputSubCommandOptions, parseChatInputUserRoleMentionableOptions } from "./components";
import { removeEscapesAndTrim } from "./utils";

export function createAst(input: string) {
    input = input
        .replaceAll("\\{", "#RIGHT_BRACKET#")
        .replaceAll("\\}", "#LEFT_BRACKET#").replaceAll("\\:", "#COLON#");
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
        if ( name !== "extraOptions" )
        {
            continue;
        }
        options = parseExtraOptions( child );
    }
    return { data, options };
}

export function parseChatInputOptions(ast: Block) {
    const options: ApplicationCommandOptionData[] = [];
    for (const child of ast.childs) {
        const [name, _] = child.splits.map(removeEscapesAndTrim);
        if (name === "string") {
            options.push(parseChatInputStringOptions(child));
        } else if (name === "integer" || "number") {
            options.push(parseChatInputNumberOptions(child));
        } else if (
            name === "user" ||
            name === "role" ||
            name === "mentionable"
        ) {
            options.push(parseChatInputUserRoleMentionableOptions(child));
        } else if (name === "channel") {
            options.push(parseChatInputChannelOptions(child));
        } else if (name === "boolean") {
            options.push(parseChatInputBooleanOptions(child));
        } else if (name === "subCommand") {
            options.push(parseChatInputSubCommandOptions(child));
        } else if (name === "subCommandGroup") {
            options.push(parseChatInputSubCommandGroupOptions(child));
        }
    }
    return options;
}