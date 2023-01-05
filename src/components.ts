import Block from "./block";
import {} from "@discordjs/builders";
import {
    ActionRow,
    Button,
    ChannelInput,
    MentionableInput,
    RoleInput,
    StringInput,
    TextInput,
    UserInput,
} from "./typing";
import { ChannelTypes, ButtonStyles, TextInputStyles } from "./utils";
import {
    AttachmentBuilder,
    ColorResolvable,
    MessageCreateOptions,
    ReplyOptions,
    resolveColor,
} from "discord.js";
import { parse } from ".";

export function parseEmbed(embedBlock: Block) {
    const res: {
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
    } = {
        type: "embed",
        data: {
            fields: [],
        },
    };
    for (let child of embedBlock.childs) {
        const [name, ...values] = child.splits;
        if (name === "title") {
            res.data.title = values.join(":").trim().replaceAll("#COLON#", ":");
        }
        if (name === "description") {
            res.data.description = values
                .join(":")
                .trim()
                .replaceAll("#COLON#", ":");
        }
        if (name === "url") {
            res.data.url = values.join(":").trim().replaceAll("#COLON#", ":");
        }
        if (name === "color") {
            res.data.color = resolveColor(
                <ColorResolvable>(
                    values.join(":").trim().replaceAll("#COLON#", ":")
                ),
            );
        }
        if (name === "timestamp") {
            res.data.timestamp =
                values.join(":").trim().replaceAll("#COLON#", ":") ??
                Date.now();
        }
        if (name === "footer") {
            const potentialIcon = values.pop()?.trim();
            if (potentialIcon?.startsWith("http")) {
                res.data.footer = {
                    text: values.join(":").trim().replaceAll("#COLON#", ":"),
                    icon_url: potentialIcon.trim().replaceAll("#COLON#", ":"),
                };
            } else {
                res.data.footer = {
                    text: `${values.join(":")}:${potentialIcon}`
                        .trim()
                        .replaceAll("#COLON#", ":"),
                };
            }
        }
        if (name === "image") {
            res.data.image = {
                url: values.join(":").trim().replaceAll("#COLON#", ":"),
            };
        }
        if (name === "thumbnail") {
            res.data.thumbnail = {
                url: values.join(":").trim().replaceAll("#COLON#", ":"),
            };
        }
        if (name === "author") {
            if (values[values.length - 1]?.startsWith("http")) {
                const potentialIcon = values.pop()?.trim();
                res.data.author = {
                    name: values.join(":").trim().replaceAll("#COLON#", ":"),
                    icon_url: potentialIcon?.trim().replaceAll("#COLON#", ":"),
                };
            } else {
                res.data.author = {
                    name: values.join(":").trim().replaceAll("#COLON#", ":"),
                };
            }
        }
        if (name === "authorURL") {
            if (res.data.author) {
                res.data.author.url = values
                    .join(":")
                    .trim()
                    .replaceAll("#COLON#", ":");
            }
        }
        if (name === "field") {
            if (["yes", "no"].includes(values[values.length - 1]?.trim())) {
                const inline = values.pop()?.trim() === "yes";
                const name =
                    values.shift()?.trim().replaceAll("#COLON#", ":") ?? " ";
                const value = values
                    .join(":")
                    .trim()
                    .replaceAll("#COLON#", ":");
                const field = { name, value, inline };
                res.data.fields.push(field);
            } else {
                const name =
                    values.shift()?.trim().replaceAll("#COLON#", ":") ?? " ";
                const value = values
                    .join(":")
                    .trim()
                    .replaceAll("#COLON#", ":");
                const field = { name, value };
                res.data.fields.push(field);
            }
        }
    }
    return res;
}

export function parseComponents(input: Block) {
    const res: ActionRow = {
        type: 1,
        components: [],
    };
    for (let child of input.childs) {
        const [name, ...values] = child.splits;
        if (name === "button") {
            const button: Button = {
                type: 2,
                style: 1,
                label: "",
            };
            const label = <string>(
                values.shift()?.trim().replaceAll("#COLON#", ":")
            );
            const style = <
                "primary" | "secondary" | "success" | "danger" | "link" | number
            >values.shift()?.trim();
            const customIdorUrl = <string>(
                values.shift()?.trim().replaceAll("#COLON#", ":")
            );
            const disabled = values.shift()?.trim() === "yes";
            const emoji = values.shift()?.trim().replaceAll("#COLON#", ":");
            let parsedEmoji:
                | undefined
                | { name: string; id: string; animated: boolean } = undefined;
            if (emoji) {
                let [animated, name, id] = emoji.split(":");
                const isAnimated = animated.replace("<", "") === "a";
                id = id.replace(">", "");
                parsedEmoji = {
                    name,
                    id,
                    animated: isAnimated,
                };
            }
            const parsedStyle = <1 | 2 | 3 | 4 | 5>(
                (!isNaN(Number(style)) ? Number(style) : ButtonStyles[style])
            );

            button.label = label;
            button.style = parsedStyle;
            button.emoji = parsedEmoji;
            button.disabled = disabled;
            if (parsedStyle === 5) {
                button.url = customIdorUrl;
            } else {
                button.custom_id = customIdorUrl;
            }
            res.components.push(button);
        } else if (name === "stringInput") {
            const menu: StringInput = {
                custom_id: "",
                type: 3,
                placeholder: "",
                options: [],
            };
            const customId = <string>(
                values.shift()?.trim().replaceAll("#COLON#", ":")
            );
            const placeholder = <string>(
                values.shift()?.trim().replaceAll("#COLON#", ":")
            );
            const minValues = <number>Number(values.shift()?.trim());
            const maxValues = <number>Number(values.shift()?.trim());
            const disabled = values.shift()?.trim() === "yes";
            const options = [];
            for (const subchild of child.childs) {
                const [subname, ...subvalues] = subchild.splits;
                if (subname === "option") {
                    const label = <string>(
                        subvalues.shift()?.trim().replaceAll("#COLON#", ":")
                    );
                    const value = <string>(
                        subvalues.shift()?.trim().replaceAll("#COLON#", ":")
                    );
                    const description = <string>(
                        subvalues.shift()?.trim().replaceAll("#COLON#", ":")
                    );
                    const defaultSelected = subvalues.shift()?.trim() === "yes";
                    const emoji = <string>(
                        subvalues.shift()?.trim().replaceAll("#COLON#", ":")
                    );
                    let parsedEmoji:
                        | undefined
                        | { name: string; id?: string; animated?: boolean } =
                        undefined;
                    if (emoji) {
                        let [animated, name, id] = emoji.split(":");
                        const isAnimated = animated.replace("<", "") === "a";
                        id = id.replace(">", "");
                        parsedEmoji = {
                            name,
                            id,
                            animated: isAnimated,
                        };
                    }
                    options.push({
                        label,
                        value,
                        description,
                        emoji: parsedEmoji,
                        default: defaultSelected,
                    });
                }
            }
            menu.custom_id = customId;
            menu.placeholder = placeholder;
            menu.min_values = minValues;
            menu.max_values = maxValues;
            menu.disabled = disabled;
            menu.options = options;
            res.components.push(menu);
        } else if (name === "userInput") {
            const userInput: UserInput = {
                custom_id: "",
                type: 5,
                placeholder: "",
            };

            const customId = <string>(
                    values.shift()?.trim().replaceAll("#COLON#", ":")
                ),
                placeholder = <string>(
                    values.shift()?.trim().replaceAll("#COLON#", ":")
                ),
                min_values = Number(values.shift()?.trim()),
                max_values = Number(values.shift()?.trim()),
                disabled = values.shift()?.trim() === "yes";

            userInput.custom_id = customId;
            userInput.placeholder = placeholder;
            userInput.min_values = min_values;
            userInput.max_values = max_values;
            userInput.disabled = disabled;
            res.components.push(userInput);
        } else if (name === "roleInput") {
            const roleInput: RoleInput = {
                custom_id: "",
                type: 6,
                placeholder: "",
            };

            const customId = <string>(
                    values.shift()?.trim().replaceAll("#COLON#", ":")
                ),
                placeholder = <string>(
                    values.shift()?.trim().replaceAll("#COLON#", ":")
                ),
                min_values = Number(values.shift()?.trim()),
                max_values = Number(values.shift()?.trim()),
                disabled = values.shift()?.trim() === "yes";

            roleInput.custom_id = customId;
            roleInput.placeholder = placeholder;
            roleInput.min_values = min_values;
            roleInput.max_values = max_values;
            roleInput.disabled = disabled;
            res.components.push(roleInput);
        } else if (name === "mentionInput") {
            const menu: MentionableInput = {
                custom_id: "",
                type: 7,
                placeholder: "",
            };
            const customId = <string>(
                values.shift()?.trim().replaceAll("#COLON#", ":")
            );
            const placeholder = <string>(
                values.shift()?.trim().replaceAll("#COLON#", ":")
            );
            const min_values = Number(values.shift()?.trim());
            const max_values = Number(values.shift()?.trim());
            const disabled = values.shift()?.trim() === "yes";
            menu.custom_id = customId;
            menu.placeholder = placeholder;
            menu.min_values = min_values;
            menu.max_values = max_values;
            menu.disabled = disabled;
            res.components.push(menu);
        } else if (name === "channelInput") {
            const menu: ChannelInput = {
                custom_id: "",
                type: 8,
                placeholder: "",
                channel_types: [],
            };
            const customId = <string>(
                values.shift()?.trim().replaceAll("#COLON#", ":")
            );
            const placeholder = <string>(
                values.shift()?.trim().replaceAll("#COLON#", ":")
            );
            const min_values = Number(values.shift()?.trim());
            const max_values = Number(values.shift()?.trim());
            const disabled = values.shift()?.trim() === "yes";
            menu.custom_id = customId;
            menu.placeholder = placeholder;
            menu.min_values = min_values;
            menu.max_values = max_values;
            menu.disabled = disabled;
            const channelTypes = [];
            for (const subchild of child.childs) {
                const [subname, ...subvalues] = subchild.splits;
                if (subname === "channelType") {
                    const type = <ChannelTypes>(<unknown>subvalues[0]?.trim());
                    const parsedType = !isNaN(Number(type))
                        ? Number(type)
                        : ChannelTypes[type];
                    channelTypes.push(type);
                }
            }
            menu.channel_types = channelTypes;
            res.components.push(menu);
        } else if (name === "textInput") {
            const input: TextInput = {
                custom_id: "",
                type: 4,
                label: "",
                style: 1,
            };
            const label = <string>(
                values.shift()?.trim().replaceAll("#COLON#", ":")
            );
            const style = <TextInputStyles>(<unknown>values.shift()?.trim());
            const customId = <string>(
                values.shift()?.trim().replaceAll("#COLON#", ":")
            );
            const parsedStyle = <1 | 2>(
                (!isNaN(Number(style)) ? Number(style) : TextInputStyles[style])
            );
            const placeholder = <string>(
                values.shift()?.trim().replaceAll("#COLON#", ":")
            );
            const required = values.shift()?.trim() === "yes";
            const value = <string>(
                values.shift()?.trim().replaceAll("#COLON#", ":")
            );
            const min_length = Number(values.shift()?.trim()) ?? 1;
            const max_length = Number(values.shift()?.trim()) ?? 1;

            input.custom_id = customId;
            input.label = label;
            input.style = parsedStyle;
            input.placeholder = placeholder;
            input.required = required;
            input.value = value;
            input.min_length = min_length;
            input.max_length = max_length;

            res.components.push(input);
        }
    }
    return res;
}

export function parseReactions(input: Block) {
    const reactions = [];
    const [_, ...values] = input.splits;
    let i = 0;
    while (i < values.length) {
        const v = values[i]?.trim();
        let reaction = "";
        if (v === "<" || v === "<a") {
            reaction += v + ":" + values[i + 1] + ":" + values[i + 2];
            reactions.push(reaction?.trim());
            i += 3;
        } else {
            reactions.push(v);
            i++;
        }
    }
    return reactions;
}

export function parseStickers(input: Block) {
    const [_, ...values] = input.splits;
    return <[string] | [string, string] | [string, string, string]>values;
}

export function parseFiles(input: Block) {
    const [name, ...values] = input.splits;
    if (name === "file") {
        const name = values.shift()?.trim();
        return new AttachmentBuilder(Buffer.from(values.join(":")?.trim()), {
            name,
        });
    } else {
        const name = values.shift()?.trim();
        return new AttachmentBuilder(values.join(":")?.trim(), { name });
    }
}

export function parseOptions(input: Block) {
    const options: {
        tts?: boolean;
        message_reference?: {
            message_id: string;
        };
        allowed_mentions: {
            parse?: string[];
            roles?: string[];
            users?: string[];
            replied_user?: boolean;
        };
        fetchReply?: boolean;
        ephemeral?: boolean;
    } = {
        tts: false,
        message_reference: undefined,
        allowed_mentions: {
            replied_user: false,
        },
    };
    for (const child of input.childs) {
        const [name, ...values] = child.splits;
        if (name === "tts") {
            options.tts = true;
        } else if (name === "reply") {
            options.message_reference = {
                message_id: values[0]?.trim(),
            };
            options.allowed_mentions.replied_user = true;
        } else if (name === "allowedMentions") {
            for (const subchild of child.childs) {
                const [subname, ...subvalues] = subchild.splits;
                if (subname === "parse") {
                    options.allowed_mentions.parse = subvalues;
                } else if (subname === "roles") {
                    options.allowed_mentions.roles = subvalues;
                } else if (subname === "users") {
                    options.allowed_mentions.users = subvalues;
                }
            }
        } else if (name === "fetchReply") {
            options.fetchReply = true;
        } else if (name === "ephemeral") {
            options.ephemeral = true;
        }
    }
    return options;
}

export function parseExtraOptions(input: Block) {
    const options: {
        interaction: boolean;
        reactions: string[];
        edits: {
            time: string | number;
            messages: any[];
        };
        deleteIn: number | string;
        deleteCommand: boolean;
    } = {
        interaction: false,
        reactions: [],
        edits: {
            time: 0,
            messages: [],
        },
        deleteIn: 0,
        deleteCommand: false,
    };

    for (const child of input.childs) {
        const [name, ...values] = child.splits;
        if (name === "interaction") {
            options.interaction = true;
        } else if (name === "reactions") {
            options.reactions = parseReactions(child);
        } else if (name === "edits") {
            const [time, ...msgs] = values;
            options.edits.time = time;
            for (const msg of child.childs) {
                options.edits.messages.push(parseMessage(msg));
            }
        } else if (name === "delete") {
            options.deleteIn = values[0];
        } else if (name === "deleteCommand") {
            options.deleteCommand = true;
        }
    }
    return options;
}

export function parseMessage(ast: Block) {
    const messageData: MessageCreateOptions = {
        tts: false,
        embeds: [],
        components: [],
        reply: undefined,
    };
    let content = ast.content;
    for (const child of ast.childs) {
        content = content.replace(child.name, "");

        const [name, _] = child.splits;
        if (name === "newEmbed") {
            messageData.embeds?.push(parseEmbed(child).data);
        } else if (name === "actionRow") {
            messageData.components?.push(<any>parseComponents(child));
        } else if (name === "options") {
            const options = parseOptions(child);
            messageData["tts"] = options.tts;
            messageData.allowedMentions = <any>options.allowed_mentions;
            messageData.reply = <ReplyOptions>(
                (<unknown>options.message_reference?.message_id)
            );
        } else if (name === "stickers") {
            messageData.stickers = parseStickers(child);
        } else if (name === "file" || name === "attachment") {
            if (!messageData.files) messageData.files = [];
            messageData.files?.push(parseFiles(child));
        }
    }
    messageData.content = content?.trim() === "" ? " " : content.trim();
    return messageData;
}
