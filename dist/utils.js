"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputStyles = exports.ChannelTypes = exports.ButtonStyles = void 0;
var ButtonStyles;
(function (ButtonStyles) {
    ButtonStyles[ButtonStyles["primary"] = 1] = "primary";
    ButtonStyles[ButtonStyles["secondary"] = 2] = "secondary";
    ButtonStyles[ButtonStyles["success"] = 3] = "success";
    ButtonStyles[ButtonStyles["danger"] = 4] = "danger";
    ButtonStyles[ButtonStyles["link"] = 5] = "link";
})(ButtonStyles = exports.ButtonStyles || (exports.ButtonStyles = {}));
var ChannelTypes;
(function (ChannelTypes) {
    ChannelTypes[ChannelTypes["text"] = 0] = "text";
    ChannelTypes[ChannelTypes["dm"] = 1] = "dm";
    ChannelTypes[ChannelTypes["voice"] = 2] = "voice";
    ChannelTypes[ChannelTypes["group"] = 3] = "group";
    ChannelTypes[ChannelTypes["category"] = 4] = "category";
    ChannelTypes[ChannelTypes["news"] = 5] = "news";
    ChannelTypes[ChannelTypes["newsThread"] = 10] = "newsThread";
    ChannelTypes[ChannelTypes["publicThread"] = 11] = "publicThread";
    ChannelTypes[ChannelTypes["privateThread"] = 12] = "privateThread";
    ChannelTypes[ChannelTypes["stage"] = 13] = "stage";
    ChannelTypes[ChannelTypes["directory"] = 14] = "directory";
    ChannelTypes[ChannelTypes["forum"] = 15] = "forum";
    ChannelTypes[ChannelTypes["GUILD_TEXT"] = 0] = "GUILD_TEXT";
    ChannelTypes[ChannelTypes["DM"] = 1] = "DM";
    ChannelTypes[ChannelTypes["GUILD_VOICE"] = 2] = "GUILD_VOICE";
    ChannelTypes[ChannelTypes["GROUP_DM"] = 3] = "GROUP_DM";
    ChannelTypes[ChannelTypes["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
    ChannelTypes[ChannelTypes["GUILD_ANNOUCEMENT"] = 5] = "GUILD_ANNOUCEMENT";
    ChannelTypes[ChannelTypes["ANNOUNCEMENT_THREAD"] = 10] = "ANNOUNCEMENT_THREAD";
    ChannelTypes[ChannelTypes["PUBLIC_THREAD"] = 11] = "PUBLIC_THREAD";
    ChannelTypes[ChannelTypes["PRIVATE_THREAD"] = 12] = "PRIVATE_THREAD";
    ChannelTypes[ChannelTypes["GUILD_STAGE_VOICE"] = 13] = "GUILD_STAGE_VOICE";
    ChannelTypes[ChannelTypes["GUILD_DIRECTORY"] = 14] = "GUILD_DIRECTORY";
    ChannelTypes[ChannelTypes["GUILD_FORUM"] = 15] = "GUILD_FORUM";
})(ChannelTypes = exports.ChannelTypes || (exports.ChannelTypes = {}));
var TextInputStyles;
(function (TextInputStyles) {
    TextInputStyles[TextInputStyles["short"] = 1] = "short";
    TextInputStyles[TextInputStyles["paragraph"] = 2] = "paragraph";
    TextInputStyles[TextInputStyles["SHORT"] = 1] = "SHORT";
    TextInputStyles[TextInputStyles["PARAGRAPH"] = 2] = "PARAGRAPH";
})(TextInputStyles = exports.TextInputStyles || (exports.TextInputStyles = {}));
//# sourceMappingURL=utils.js.map