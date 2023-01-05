import Block from "./block";
export declare function createAst(input: string): Block;
export declare function parse(input: string): {
    data: import("discord.js").MessageCreateOptions;
    options: {
        interaction: boolean;
        reactions: string[];
        edits: {
            time: string | number;
            messages: any[];
        };
        deleteIn: string | number;
        deleteCommand: boolean;
    } | undefined;
};
//# sourceMappingURL=index.d.ts.map