import Block from "./block";
import { ActionRow } from "./typing";
import { AttachmentBuilder, MessageCreateOptions } from "discord.js";
import { parse } from ".";
export declare function parseEmbed(embedBlock: Block): {
    type: "embed";
    data: {
        title?: string;
        description?: string;
        url?: string;
        color?: number;
        timestamp?: string;
        footer?: {
            text: string;
            icon_url?: string;
            proxy_icon_url?: string;
        };
        image?: {
            url: string;
            proxy_url?: string;
        };
        thumbnail?: {
            url: string;
        };
        fields: {
            name: string;
            value: string;
            inline?: boolean;
        }[];
        author?: {
            name: string;
            url?: string;
            icon_url?: string;
        };
    };
};
export declare function parseComponents(input: Block): ActionRow;
export declare function parseReactions(input: Block): string[];
export declare function parseStickers(input: Block): [string] | [string, string] | [string, string, string];
export declare function parseFiles(input: Block): AttachmentBuilder;
export declare function parseOptions(input: Block): {
    tts?: boolean | undefined;
    message_reference?: {
        message_id: string;
    } | undefined;
    allowed_mentions: {
        parse?: string[];
        roles?: string[];
        users?: string[];
        replied_user?: boolean;
    };
    fetchReply?: boolean | undefined;
    ephemeral?: boolean | undefined;
};
export declare function parseExtraOptions(input: Block): {
    interaction: boolean;
    reactions: string[];
    edits: {
        time: string | number;
        messages: any[];
    };
    deleteIn: number | string;
    deleteCommand: boolean;
};
export declare function parseMessage(ast: Block): MessageCreateOptions;
//# sourceMappingURL=components.d.ts.map