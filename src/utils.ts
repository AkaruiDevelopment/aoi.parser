export enum ButtonStyles {
    primary = 1,
    secondary,
    success,
    danger,
    link,
}

export enum ChannelTypes {
    text = 0,
    dm,
    voice,
    group,
    category,
    news,
    newsThread = 10,
    publicThread,
    privateThread,
    stage,
    directory,
    forum,

    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_ANNOUCEMENT = 5,
    ANNOUNCEMENT_THREAD = 10,
    PUBLIC_THREAD = 11,
    PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
    GUILD_DIRECTORY = 14,
    GUILD_FORUM = 15,
}

export enum TextInputStyles {
    short = 1,
    paragraph,
    SHORT = 1,
    PARAGRAPH,
}

export function removeEscapesAndTrim(msg:string) {
    return msg
        .replace(/#RIGHT#/g, "[")
        .replace(/#LEFT#/g, "]")
        .replace(/#SEMI#/g, ";")
        .replace(/#COLON#/g, ":")
        .replace(/#CHAR#/g, "$")
        .replace(/#RIGHT_CLICK#/g, ">")
        .replace(/#LEFT_CLICK#/g, "<")
        .replace(/#EQUAL#/g, "=")
        .replace(/#RIGHT_BRACKET#/g, "{")
        .replace(/#LEFT_BRACKET#/g, "}")
        .replace(/#COMMA#/g, ",")
        .replace(/#LB#/g, "(")
        .replace(/#RB#/g, ")")
        .replace(/#AND#/g, "&&")
        .replace(/#OR#/g, "||").trim();
}
