"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMessage = exports.parseExtraOptions = exports.parseOptions = exports.parseFiles = exports.parseStickers = exports.parseReactions = exports.parseComponents = exports.parseEmbed = void 0;
const utils_1 = require("./utils");
const discord_js_1 = require("discord.js");
function parseEmbed(embedBlock) {
    const res = {
        type: "embed",
        data: {
            fields: [],
        },
    };
    console.log({ embedBlock: embedBlock.obj });
    for (let child of embedBlock.childs) {
        const [name, ...values] = child.splits;
        if (name === "title") {
            res.data.title = values
                .join(":")
                .trim()
                .replaceAll("##COLON##", ":");
        }
        if (name === "description") {
            res.data.description = values
                .join(":")
                .trim()
                .replaceAll("##COLON##", ":");
        }
        if (name === "url") {
            res.data.url = values.join(":").trim().replaceAll("##COLON##", ":");
        }
        if (name === "color") {
            res.data.color = (0, discord_js_1.resolveColor)((values.join(":").trim().replaceAll("##COLON##", ":")));
        }
        if (name === "timestamp") {
            res.data.timestamp =
                values.join(":").trim().replaceAll("##COLON##", ":") ??
                    Date.now();
        }
        if (name === "footer") {
            const potentialIcon = values.pop()?.trim();
            if (potentialIcon?.startsWith("http")) {
                res.data.footer = {
                    text: values.join(":").trim().replaceAll("##COLON##", ":"),
                    icon_url: potentialIcon.trim().replaceAll("##COLON##", ":"),
                };
            }
            else {
                res.data.footer = {
                    text: `${values.join(":")}:${potentialIcon}`
                        .trim()
                        .replaceAll("##COLON##", ":"),
                };
            }
        }
        if (name === "image") {
            res.data.image = {
                url: values.join(":").trim().replaceAll("##COLON##", ":"),
            };
        }
        if (name === "thumbnail") {
            res.data.thumbnail = {
                url: values.join(":").trim().replaceAll("##COLON##", ":"),
            };
        }
        if (name === "author") {
            if (values[values.length - 1]?.startsWith("http")) {
                const potentialIcon = values.pop()?.trim();
                res.data.author = {
                    name: values.join(":").trim().replaceAll("##COLON##", ":"),
                    icon_url: potentialIcon
                        ?.trim()
                        .replaceAll("##COLON##", ":"),
                };
            }
            else {
                res.data.author = {
                    name: values.join(":").trim().replaceAll("##COLON##", ":"),
                };
            }
        }
        if (name === "authorURL") {
            if (res.data.author) {
                res.data.author.url = values
                    .join(":")
                    .trim()
                    .replaceAll("##COLON##", ":");
            }
        }
        if (name === "field") {
            if (["yes", "no"].includes(values[values.length - 1]?.trim())) {
                const inline = values.pop()?.trim() === "yes";
                const name = values.shift()?.trim().replaceAll("##COLON##", ":") ?? " ";
                const value = values
                    .join(":")
                    .trim()
                    .replaceAll("##COLON##", ":");
                const field = { name, value, inline };
                res.data.fields.push(field);
            }
            else {
                const name = values.shift()?.trim().replaceAll("##COLON##", ":") ?? " ";
                const value = values
                    .join(":")
                    .trim()
                    .replaceAll("##COLON##", ":");
                const field = { name, value };
                res.data.fields.push(field);
            }
        }
    }
    return res;
}
exports.parseEmbed = parseEmbed;
function parseComponents(input) {
    const res = {
        type: 1,
        components: [],
    };
    for (let child of input.childs) {
        const [name, ...values] = child.splits;
        if (name === "button") {
            const button = {
                type: 2,
                style: 1,
                label: "",
            };
            const label = values.shift()?.trim();
            const style = values.shift()?.trim();
            const customIdorUrl = values.shift()?.trim();
            const disabled = values.shift()?.trim() === "yes";
            const emoji = values.shift()?.trim();
            let parsedEmoji = undefined;
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
            const parsedStyle = ((!isNaN(Number(style)) ? Number(style) : utils_1.ButtonStyles[style]));
            button.label = label;
            button.style = parsedStyle;
            button.emoji = parsedEmoji;
            button.disabled = disabled;
            if (parsedStyle === 5) {
                button.url = customIdorUrl;
            }
            else {
                button.custom_id = customIdorUrl;
            }
            res.components.push(button);
        }
        else if (name === "stringInput") {
            const menu = {
                custom_id: "",
                type: 3,
                placeholder: "",
                options: [],
            };
            const customId = values.shift()?.trim();
            const placeholder = values.shift()?.trim();
            const minValues = Number(values.shift()?.trim());
            const maxValues = Number(values.shift()?.trim());
            const disabled = values.shift()?.trim() === "yes";
            const options = [];
            for (const subchild of child.childs) {
                const [subname, ...subvalues] = subchild.splits;
                if (subname === "option") {
                    const label = subvalues.shift()?.trim();
                    const value = subvalues.shift()?.trim();
                    const description = subvalues.shift()?.trim();
                    const defaultSelected = subvalues.shift()?.trim() === "yes";
                    const emoji = subvalues.shift()?.trim();
                    let parsedEmoji = undefined;
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
        }
        else if (name === "userInput") {
            const userInput = {
                custom_id: "",
                type: 5,
                placeholder: "",
            };
            const customId = values.shift()?.trim(), placeholder = values.shift()?.trim(), min_values = Number(values.shift()?.trim()), max_values = Number(values.shift()?.trim()), disabled = values.shift()?.trim() === "yes";
            userInput.custom_id = customId;
            userInput.placeholder = placeholder;
            userInput.min_values = min_values;
            userInput.max_values = max_values;
            userInput.disabled = disabled;
            res.components.push(userInput);
        }
        else if (name === "roleInput") {
            const roleInput = {
                custom_id: "",
                type: 6,
                placeholder: "",
            };
            const customId = values.shift()?.trim(), placeholder = values.shift()?.trim(), min_values = Number(values.shift()?.trim()), max_values = Number(values.shift()?.trim()), disabled = values.shift()?.trim() === "yes";
            roleInput.custom_id = customId;
            roleInput.placeholder = placeholder;
            roleInput.min_values = min_values;
            roleInput.max_values = max_values;
            roleInput.disabled = disabled;
            res.components.push(roleInput);
        }
        else if (name === "mentionInput") {
            const menu = {
                custom_id: "",
                type: 7,
                placeholder: "",
            };
            const customId = values.shift()?.trim();
            const placeholder = values.shift()?.trim();
            const min_values = Number(values.shift()?.trim());
            const max_values = Number(values.shift()?.trim());
            const disabled = values.shift()?.trim() === "yes";
            menu.custom_id = customId;
            menu.placeholder = placeholder;
            menu.min_values = min_values;
            menu.max_values = max_values;
            menu.disabled = disabled;
            res.components.push(menu);
        }
        else if (name === "channelInput") {
            const menu = {
                custom_id: "",
                type: 8,
                placeholder: "",
                channel_types: [],
            };
            const customId = values.shift()?.trim();
            const placeholder = values.shift()?.trim();
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
                    const type = subvalues[0]?.trim();
                    const parsedType = !isNaN(Number(type))
                        ? Number(type)
                        : utils_1.ChannelTypes[type];
                    channelTypes.push(type);
                }
            }
            menu.channel_types = channelTypes;
            res.components.push(menu);
        }
        else if (name === "textInput") {
            const input = {
                custom_id: "",
                type: 4,
                label: "",
                style: 1,
            };
            const label = values.shift()?.trim();
            const style = values.shift()?.trim();
            const customId = values.shift()?.trim();
            const parsedStyle = ((!isNaN(Number(style)) ? Number(style) : utils_1.TextInputStyles[style]));
            const placeholder = values.shift()?.trim();
            const required = values.shift()?.trim() === "yes";
            const value = values.shift()?.trim();
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
exports.parseComponents = parseComponents;
function parseReactions(input) {
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
        }
        else {
            reactions.push(v);
            i++;
        }
    }
    return reactions;
}
exports.parseReactions = parseReactions;
function parseStickers(input) {
    const [_, ...values] = input.splits;
    return values;
}
exports.parseStickers = parseStickers;
function parseFiles(input) {
    const [name, ...values] = input.splits;
    if (name === "file") {
        const name = values.shift()?.trim();
        return new discord_js_1.AttachmentBuilder(Buffer.from(values.join(":")?.trim()), {
            name,
        });
    }
    else {
        const name = values.shift()?.trim();
        return new discord_js_1.AttachmentBuilder(values.join(":")?.trim(), { name });
    }
}
exports.parseFiles = parseFiles;
function parseOptions(input) {
    const options = {
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
        }
        else if (name === "reply") {
            options.message_reference = {
                message_id: values[0]?.trim(),
            };
            options.allowed_mentions.replied_user = true;
        }
        else if (name === "allowedMentions") {
            for (const subchild of child.childs) {
                const [subname, ...subvalues] = subchild.splits;
                if (subname === "parse") {
                    options.allowed_mentions.parse = subvalues;
                }
                else if (subname === "roles") {
                    options.allowed_mentions.roles = subvalues;
                }
                else if (subname === "users") {
                    options.allowed_mentions.users = subvalues;
                }
            }
        }
        else if (name === "fetchReply") {
            options.fetchReply = true;
        }
    }
    return options;
}
exports.parseOptions = parseOptions;
function parseExtraOptions(input) {
    const options = {
        interaction: false,
        ephemeral: false,
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
        }
        else if (name === "ephemeral") {
            options.ephemeral = true;
        }
        else if (name === "reactions") {
            options.reactions = parseReactions(child);
        }
        else if (name === "edits") {
            const [time, ...msgs] = values;
            options.edits.time = time;
            for (const msg of child.childs) {
                options.edits.messages.push(parseMessage(msg));
            }
        }
        else if (name === "delete") {
            options.deleteIn = values[0];
        }
        else if (name === "deleteCommand") {
            options.deleteCommand = true;
        }
    }
    return options;
}
exports.parseExtraOptions = parseExtraOptions;
function parseMessage(ast) {
    const messageData = {
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
        }
        else if (name === "actionRow") {
            messageData.components?.push(parseComponents(child));
        }
        else if (name === "options") {
            const options = parseOptions(child);
            messageData["tts"] = options.tts;
            messageData.allowedMentions = options.allowed_mentions;
            messageData.reply = options.message_reference?.message_id;
        }
        else if (name === "stickers") {
            messageData.stickers = parseStickers(child);
        }
        else if (name === "file" || name === "attachment") {
            if (!messageData.files)
                messageData.files = [];
            messageData.files?.push(parseFiles(child));
        }
    }
    messageData.content = content?.trim() === "" ? " " : content.trim();
    return messageData;
}
exports.parseMessage = parseMessage;
//# sourceMappingURL=components.js.map