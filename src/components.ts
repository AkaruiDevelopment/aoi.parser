import Block from "./block";
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
import {
    ChannelTypes,
    ButtonStyles,
    TextInputStyles,
    removeEscapesAndTrim,
} from "./utils";
import {
    ApplicationCommandBooleanOptionData,
    ApplicationCommandChannelOptionData,
    ApplicationCommandMentionableOptionData,
    ApplicationCommandNumericOptionData,
    ApplicationCommandOptionChoiceData,
    ApplicationCommandOptionData,
    ApplicationCommandRoleOptionData,
    ApplicationCommandStringOptionData,
    ApplicationCommandUserOptionData,
    ApplicationCommandSubCommandData,
    ApplicationCommandSubGroupData,
    AttachmentBuilder,
    ChannelType,
    ColorResolvable,
    InteractionReplyOptions,
    Locale,
    MessageCreateOptions,
    ReplyOptions,
    resolveColor,
} from "discord.js";

export function parseEmbed(embedBlock: Block) {
    const res: {
        type: "embed";
        data: {
            title?: string;
            description: string;
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
            description: " ",
            fields: [],
        },
    };
    for (let child of embedBlock.children) {
        let [name, ...values] = child.splits.map(removeEscapesAndTrim);
        name = name.trim();
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
            let timestamp = values.join(":").trim().replaceAll("#COLON#", ":");
            console.log(timestamp);
            let parsedTimestamp =
                timestamp == "" ? Date.now() : Number(timestamp);
            res.data.timestamp = new Date(parsedTimestamp).toISOString();
        }
        if (name === "footer") {
            const potentialIcon = values.pop()?.trim();
            if (
                potentialIcon?.startsWith("http://") ||
                potentialIcon?.startsWith("attachment://") ||
                potentialIcon?.startsWith("https://") ||
                potentialIcon?.startsWith("//")
            ) {
                res.data.footer = {
                    text: values.join(":").trim().replaceAll("#COLON#", ":"),
                    icon_url: potentialIcon.trim().replaceAll("#COLON#", ":"),
                };
            } else {
                res.data.footer = {
                    text: `${
                        values.join(":").trim().replaceAll("#COLON#", ":") !==
                        ""
                            ? `${values
                                  .join(":")
                                  .trim()
                                  .replaceAll("#COLON#", ":")}:`
                            : ""
                    }${potentialIcon}`
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
            if (
                values[values.length - 1]?.startsWith("http") ||
                (values.length > 2 &&
                    values[values.length - 2]?.startsWith("http"))
            ) {
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
    for (let child of input.children) {
        let [name, ...values] = child.splits.map(removeEscapesAndTrim);
        name = name.trim();
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
                | { name: string; id?: string; animated?: boolean } = undefined;
            if (emoji) {
                let [animated, name, id] = emoji.split(":");
                if (!name && !id) {
                    name = animated;
                    id = "";
                    animated = "";
                }
                const isAnimated = animated.replace("<", "") === "a";
                id = id.replace(">", "");
                parsedEmoji = {
                    name: name,
                    id: id === "" ? undefined : id,
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
            for (const subchild of child.children) {
                let [subname, ...subvalues] =
                    subchild.splits.map(removeEscapesAndTrim);
                subname = subname.trim();
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
                        if (!name && !id) {
                            name = animated;
                            id = "";
                            animated = "";
                        }
                        const isAnimated = animated.replace("<", "") === "a";
                        id = id.replace(">", "");
                        parsedEmoji = {
                            name,
                            id: id === "" ? undefined : id,
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
            for (const subchild of child.children) {
                let [subname, ...subvalues] =
                    subchild.splits.map(removeEscapesAndTrim);
                subname = subname.trim();
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
            input.value = !value ? undefined : value;
            input.min_length = min_length;
            input.max_length = max_length;

            res.components.push(input);
        }
    }
    return res;
}

export function parseReactions(input: Block) {
    const reactions = [];
    const [_, ...values] = input.splits.map(removeEscapesAndTrim);
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
    const [_, ...values] = input.splits.map(removeEscapesAndTrim);
    return <[string] | [string, string] | [string, string, string]>values;
}

export function parseFiles(input: Block) {
    let [name, ...values] = input.splits.map(removeEscapesAndTrim);
    name = name.trim();
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
    for (const child of input.children) {
        let [name, ...values] = child.splits.map(removeEscapesAndTrim);
        name = name.trim();
        if (name === "tts") {
            options.tts = true;
        } else if (name === "reply") {
            options.message_reference = {
                message_id: values[0]?.trim(),
            };
            options.allowed_mentions.replied_user = true;
        } else if (name === "allowedMentions") {
            for (const subchild of child.children) {
                let [subname, ...subvalues] =
                    subchild.splits.map(removeEscapesAndTrim);
                subname = subname.trim();
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

    for (const child of input.children) {
        let [name, ...values] = child.splits.map(removeEscapesAndTrim);
        name = name.trim();
        if (name === "interaction") {
            options.interaction = true;
        } else if (name === "reactions") {
            options.reactions = parseReactions(child);
        } else if (name === "edits") {
            const [time, ...msgs] = values;
            options.edits.time = time;
            for (const msg of child.children) {
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
    const messageData: MessageCreateOptions | InteractionReplyOptions = {
        tts: false,
        embeds: [],
        components: [],
        reply: undefined,
    };
    let content = ast.content;
    for (const child of ast.children) {
        content = content.replace(child.name, "");

        let [name, _] = child.splits.map(removeEscapesAndTrim);
        name = name.trim();
        if (name === "newEmbed") {
            messageData.embeds?.push(parseEmbed(child).data);
        } else if (name === "actionRow") {
            messageData.components?.push(<any>parseComponents(child));
        } else if (name === "options") {
            const options = parseOptions(child);
            messageData["tts"] = options.tts;
            messageData.allowedMentions = <any>options.allowed_mentions;
            messageData.reply = options.message_reference?.message_id ? <ReplyOptions>{
                messageReference: options.message_reference?.message_id,
            }: undefined;
            // @ts-ignore
            messageData.fetchReply = options.fetchReply;
            // @ts-ignore
            messageData.ephemeral = options.ephemeral;
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

export function parseChatInputChoice<
    type extends string | number = string | number,
>(ast: Block): ApplicationCommandOptionChoiceData<type> {
    const parent = ast.parent;
    let type: "string" | "number";
    if (parent?.splits[0] === "string") type = "string";
    else type = "number";
    const choice: ApplicationCommandOptionChoiceData = {
        name: "",
        value: "",
    };
    const [_, ...values] = ast.splits.map(removeEscapesAndTrim);
    choice.name = values.shift()?.trim() ?? "";
    choice.value =
        type === "string"
            ? values.join(":")?.trim() ?? ""
            : parseInt(values.join(":")?.trim() ?? "0");

    for (const child of ast.children) {
        let [name, ...values] = child.splits.map(removeEscapesAndTrim);
        name = name.trim();
        if (name === "locale") {
            if (!choice.nameLocalizations) choice.nameLocalizations = {};
            const locale = <Locale>values.shift()?.trim();
            choice.nameLocalizations[locale] = values.join(":")?.trim() ?? "";
        }
    }
    // @ts-ignore
    return choice;
}
export function parseChatInputStringOptions(ast: Block) {
    const options: ApplicationCommandStringOptionData = {
        type: 3,
        name: "",
        description: "",
    };
    const [_, ...values] = ast.splits.map(removeEscapesAndTrim);
    options.name = <string>values.shift()?.trim();
    options.description = <string>values.shift()?.trim();
    options.required = values.shift()?.trim() === "yes";
    // @ts-ignore
    options.autocomplete = values.shift()?.trim() === "yes";
    options.minLength = parseInt(values.shift()?.trim() ?? "0");
    options.maxLength = parseInt(values.shift()?.trim() ?? "1");

    for (const child of ast.children) {
        const [name, ...value] = child.splits.map(removeEscapesAndTrim);
        if (name === "choice") {
            if (!options.choices) options.choices = [];
            options.choices.push(parseChatInputChoice(child));
        } else if (name === "locale") {
            const childname = child.name;
            const pos = values.findIndex((x) => x.includes(childname));
            if (pos === 7) {
                if (!options.nameLocalizations) options.nameLocalizations = {};
                const locale = <Locale>value.shift()?.trim();
                options.nameLocalizations[locale] =
                    value.join(":")?.trim() ?? "";
            } else if (pos === 8) {
                if (!options.descriptionLocalizations)
                    options.descriptionLocalizations = {};
                const locale = <Locale>value.shift()?.trim();
                options.descriptionLocalizations[locale] =
                    value.join(":")?.trim() ?? "";
            }
        }
    }
    return options;
}

export function parseChatInputUserRoleMentionableOptions(ast: Block) {
    const [name, ...values] = ast.splits.map(removeEscapesAndTrim);

    const options:
        | ApplicationCommandUserOptionData
        | ApplicationCommandRoleOptionData
        | ApplicationCommandMentionableOptionData = {
        type: name === "user" ? 6 : name === "role" ? 8 : 9,
        name: "",
        description: "",
    };

    options.name = <string>values.shift()?.trim();
    options.description = <string>values.shift()?.trim();
    options.required = values.shift()?.trim() === "yes";

    for (const child of ast.children) {
        const [name, ...value] = child.splits.map(removeEscapesAndTrim);
        if (name === "locale") {
            const childname = child.name;
            const pos = values.findIndex((x) => x.includes(childname));
            if (pos === 3) {
                if (!options.nameLocalizations) options.nameLocalizations = {};
                const locale = <Locale>value.shift()?.trim();
                options.nameLocalizations[locale] =
                    value.join(":")?.trim() ?? "";
            } else if (pos === 4) {
                if (!options.descriptionLocalizations)
                    options.descriptionLocalizations = {};
                const locale = <Locale>value.shift()?.trim();
                options.descriptionLocalizations[locale] =
                    value.join(":")?.trim() ?? "";
            }
        }
    }
    return options;
}

export function parseChatInputChannelOptions(ast: Block) {
    const [_, ...values] = ast.splits.map(removeEscapesAndTrim);
    const options: ApplicationCommandChannelOptionData = {
        type: 7,
        name: "",
        description: "",
    };
    options.name = <string>values.shift()?.trim();
    options.description = <string>values.shift()?.trim();
    options.required = values.shift()?.trim() === "yes";

    for (const child of ast.children) {
        const [name, ...value] = child.splits.map(removeEscapesAndTrim);
        if (name === "type") {
            options.channelTypes = value.map((x) =>
                !isNaN(parseInt(x))
                    ? parseInt(x)
                    : ChannelType[<keyof typeof ChannelType>x],
            );
        }
        if (name === "locale") {
            const childname = child.name;
            const pos = values.findIndex((x) => x.includes(childname));
            if (pos === 4) {
                if (!options.nameLocalizations) options.nameLocalizations = {};
                const locale = <Locale>value.shift()?.trim();
                options.nameLocalizations[locale] =
                    value.join(":")?.trim() ?? "";
            } else if (pos === 5) {
                if (!options.descriptionLocalizations)
                    options.descriptionLocalizations = {};
                const locale = <Locale>value.shift()?.trim();
                options.descriptionLocalizations[locale] =
                    value.join(":")?.trim() ?? "";
            }
        }
    }
    return options;
}

export function parseChatInputBooleanOptions(ast: Block) {
    const [_, ...values] = ast.splits.map(removeEscapesAndTrim);
    const options: ApplicationCommandBooleanOptionData = {
        type: 5,
        name: "",
        description: "",
    };

    options.name = <string>values.shift()?.trim();
    options.description = <string>values.shift()?.trim();
    options.required = values.shift()?.trim() === "yes";

    for (const child of ast.children) {
        const [name, ...value] = child.splits.map(removeEscapesAndTrim);
        if (name === "locale") {
            const childname = child.name;
            const pos = values.findIndex((x) => x.includes(childname));
            if (pos === 3) {
                if (!options.nameLocalizations) options.nameLocalizations = {};
                const locale = <Locale>value.shift()?.trim();
                options.nameLocalizations[locale] =
                    value.join(":")?.trim() ?? "";
            } else if (pos === 4) {
                if (!options.descriptionLocalizations)
                    options.descriptionLocalizations = {};
                const locale = <Locale>value.shift()?.trim();
                options.descriptionLocalizations[locale] =
                    value.join(":")?.trim() ?? "";
            }
        }
    }
    return options;
}

export function parseChatInputNumberOptions(ast: Block) {
    const [name, ...values] = ast.splits.map(removeEscapesAndTrim);
    const options: ApplicationCommandNumericOptionData = {
        type: name === "integer" ? 4 : 10,
        name: "",
        description: "",
    };

    options.name = <string>values.shift()?.trim();
    options.description = <string>values.shift()?.trim();
    options.required = values.shift()?.trim() === "yes";
    // @ts-ignore
    options.autocomplete = values.shift()?.trim() === "yes";
    const min = values.shift()?.trim();
    const max = values.shift()?.trim();
    options.minValue = min ? parseInt(min) : undefined;
    options.maxValue = max ? parseInt(max) : undefined;

    for (const child of ast.children) {
        const [name, ...value] = child.splits.map(removeEscapesAndTrim);
        if (name === "choice") {
            if (!options.choices) options.choices = [];
            options.choices.push(parseChatInputChoice<number>(child));
        } else if (name === "locale") {
            const childname = child.name;
            const pos = values.findIndex((x) => x.includes(childname));
            if (pos === 6) {
                if (!options.nameLocalizations) options.nameLocalizations = {};
                const locale = <Locale>value.shift()?.trim();
                options.nameLocalizations[locale] =
                    value.join(":")?.trim() ?? "";
            } else if (pos === 7) {
                if (!options.descriptionLocalizations)
                    options.descriptionLocalizations = {};
                const locale = <Locale>value.shift()?.trim();
                options.descriptionLocalizations[locale] =
                    value.join(":")?.trim() ?? "";
            }
        }
    }
    return options;
}

export function parseChatInputSubCommandOptions(ast: Block) {
    const [_, ...values] = ast.splits.map(removeEscapesAndTrim);
    const options: ApplicationCommandSubCommandData = {
        type: 1,
        name: "",
        description: "",
        options: [],
    };

    options.name = <string>values.shift()?.trim();
    options.description = <string>values.shift()?.trim();

    for (const child of ast.children) {
        const [name, _] = child.splits.map(removeEscapesAndTrim);
        if (!options.options) options.options = [];
        if (name === "string") {
            options.options.push(parseChatInputStringOptions(child));
        } else if (name === "integer" || "number") {
            options.options.push(parseChatInputNumberOptions(child));
        } else if (
            name === "user" ||
            name === "role" ||
            name === "mentionable"
        ) {
            options.options.push(
                parseChatInputUserRoleMentionableOptions(child),
            );
        } else if (name === "channel") {
            options.options.push(parseChatInputChannelOptions(child));
        } else if (name === "boolean") {
            options.options.push(parseChatInputBooleanOptions(child));
        } else if (name === "subCommand") {
            throw new TypeError("SubCommand cannot be nested in SubCommand");
        } else if (name === "subCommandGroup") {
            throw new TypeError(
                "SubCommandGroup cannot be nested in SubCommand",
            );
        }
    }
    return options;
}

export function parseChatInputSubCommandGroupOptions(ast: Block) {
    const [_, ...values] = ast.splits.map(removeEscapesAndTrim);
    const options: ApplicationCommandSubGroupData = {
        type: 2,
        name: "",
        description: "",
        options: [],
    };

    options.name = <string>values.shift()?.trim();
    options.description = <string>values.shift()?.trim();

    for (const child of ast.children) {
        if (!options.options) options.options = [];
        const [name, _] = child.splits.map(removeEscapesAndTrim);
        if (name === "subCommand") {
            options.options.push(parseChatInputSubCommandOptions(child));
        } else if (name === "subCommandGroup") {
            throw new TypeError(
                "subCommandGroup cannot be nested in subCommandGroup",
            );
        } else {
            throw new TypeError("SubCommandGroup can only have SubCommand");
        }
    }
    return options;
}
