import {
    isJidGroup,
    isJidUser,
    isJidStatusBroadcast,
    jidDecode,
    getContentType,
    jidNormalizedUser
} from "@whiskeysockets/baileys";
import cases from "../cases.js";

export default function messagesUpsert(bot, m) {
    if (!m.message) return;
    m.id = m.key.id;
    m.chatId = m.key.remoteJid;
    m.isGroup = isJidGroup(m.chatId);
    m.isPrivate = isJidUser(m.chatId);
    m.isSw = isJidStatusBroadcast(m.chatId);
    m.senderid = m.isNewsletter
        ? ""
        : m.isGroup || m.isSw
        ? m.key.participant || jidNormalizedUser(m.participant)
        : m.key.remoteJid;
    m.isfromMe = m.key.fromMe;
    m.isOwner = jidDecode(m.senderid).user === global.owner.number;
    m.type = getContentType(m.message);
    m.body =
        m.type === "conversation"
            ? m.message.conversation
            : m.message[m.type].caption ||
              m.message[m.type].text ||
              m.message[m.type].singleSelectReply?.selectedRowId ||
              m.message[m.type].selectedButtonId ||
              (m.message[m.type].nativeFlowResponseMessage?.paramsJson
                  ? JSON.parse(
                        m.message[m.type].nativeFlowResponseMessage.paramsJson
                    ).id
                  : "") ||
              "";
    m.text =
        m.type === "conversation"
            ? m.message.conversation
            : m.message[m.type].caption ||
              m.message[m.type].text ||
              m.message[m.type].description ||
              m.message[m.type].title ||
              m.message[m.type].contentText ||
              m.message[m.type].selectedDisplayText ||
              "";
    m.isCommand = m.body.trim().startsWith(global.bot.prefix);
    m.cmd = m.body
        .trim()
        .normalize("NFKC")
        .replace(global.bot.prefix, "")
        .split(" ")[0]
        .toLowerCase();
    m.args = m.body
        .trim()
        .replace(/^\S*\b/g, "")
        .split(global.bot.splitArgs)
        .map(arg => arg.trim())
        .filter(arg => arg);
    m.reply = text =>
        bot.sendMessage(
            m.chatId,
            {
                text
            },
            {
                quoted: {
                    key: {
                        id: m.id,
                        fromMe: false,
                        remoteJid: "status@broadcast",
                        participant: "0s@.whatsapp.net"
                    },
                    message: {
                        conversation: `💬 ${m.text}`
                    }
                }
            }
        );
    return cases(bot, m);
}
