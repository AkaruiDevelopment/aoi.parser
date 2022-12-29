import Block from "./block";
export declare function createAst(input: string): Block;
export declare function parse(input: string): {
    data: import("discord.js").MessageCreateOptions;
    options: {
        interaction: boolean;
        ephemeral: boolean;
        reactions: string[];
        edits: {
            time: string | number;
            messages: any[];
        };
        deleteAfter: string | number;
        deleteCommand: boolean;
    } | undefined;
};
//# sourceMappingURL=index.d.ts.map